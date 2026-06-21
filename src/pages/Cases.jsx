import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, UploadCloud, FileText, Download, Trash2, Loader2, Lock, LogOut, Plus, X } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

export default function Cases() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 관리자 인증 상태 (sessionStorage를 이용하여 탭 유지)
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('tocfe_admin') === 'true';
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  
  // 글쓰기 폼 상태
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Firestore에서 자료 목록 실시간 수신
  useEffect(() => {
    const q = query(collection(db, 'files'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setFiles(docs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching files: ", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 바이트 수 계산 포맷팅
  const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // 날짜 포맷팅 (YYYY.MM.DD)
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 관리자 로그인 처리
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === 'tocfe') {
      setIsAdmin(true);
      sessionStorage.setItem('tocfe_admin', 'true');
      setShowPasswordModal(false);
      setPassword('');
      alert('관리자 모드로 로그인되었습니다.');
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 관리자 로그아웃 처리
  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('tocfe_admin');
    setShowWriteForm(false);
    alert('관리자 모드가 해제되었습니다.');
  };

  // 파일 선택 시 핸들러
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // 파일 선택 시 제목 초기값으로 파일명 제공 (확장자 제외)
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setTitle(baseName);
    }
  };

  // 파일 업로드 핸들러 (관리자 글쓰기 등록)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('업로드할 파일을 선택해 주세요.');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // 1. Storage 업로드용 레퍼런스 생성
      const fileId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.'));
      const storagePath = `uploads/${fileId}${fileExtension}`;
      const storageRef = ref(storage, storagePath);
      
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(prog);
        }, 
        (error) => {
          console.error("Upload error: ", error);
          alert("파일 업로드 중 오류가 발생했습니다.");
          setUploading(false);
        }, 
        async () => {
          // 2. 다운로드 URL 획득
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // 3. Firestore에 정보 저장
          try {
            await addDoc(collection(db, 'files'), {
              title: title || selectedFile.name,
              description: description || '등록된 설명이 없습니다.',
              fileName: selectedFile.name,
              fileSize: selectedFile.size,
              fileUrl: downloadURL,
              storagePath: storagePath,
              createdAt: new Date().toISOString()
            });

            // 상태 초기화 및 폼 닫기
            setSelectedFile(null);
            setTitle('');
            setDescription('');
            setUploading(false);
            setShowWriteForm(false);
            alert("자료가 성공적으로 등록되었습니다!");
          } catch (err) {
            console.error("Firestore save error: ", err);
            alert("데이터베이스 저장 중 오류가 발생했습니다.");
            setUploading(false);
          }
        }
      );
    } catch (err) {
      console.error("Upload process error: ", err);
      alert("업로드 처리 중 오류가 발생했습니다.");
      setUploading(false);
    }
  };

  // 자료 삭제 핸들러
  const handleDelete = async (id, storagePath, title) => {
    if (!confirm(`'${title}' 자료를 정말 삭제하시겠습니까?`)) return;

    try {
      // 1. Firestore 문서 삭제
      await deleteDoc(doc(db, 'files', id));

      // 2. Firebase Storage 실제 파일 삭제
      if (storagePath) {
        const storageRef = ref(storage, storagePath);
        await deleteObject(storageRef);
      }
      alert("자료가 성공적으로 삭제되었습니다.");
    } catch (err) {
      console.error("Delete error: ", err);
      alert("자료 삭제 중 오류가 발생했습니다. (이미 지워진 파일일 수 있습니다.)");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold mb-6"
          >
            활용 사례 및 자료실
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            생각도구의 실제 활용 사례 영상을 시청하고, 교육 현장에 필요한 다양한 자료를 다운로드 및 공유해 보세요.
          </motion.p>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center">
              <PlayCircle className="w-8 h-8 text-indigo-600 mr-3" />
              추천 영상 갤러리
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              자세한 사례와 강의를 통해 TOCfE 생각도구의 매력을 영상으로 더 쉽게 만나보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { id: 'XmuJKwGo_1A', title: '창의적 문제해결을 위한 생각도구' },
              { id: '9IcpkKDfmjI', title: '회의 문화를 혁신하는 새로운 전략 #목표나무' },
              { id: 'eof2lio0ymA', title: '갈등해결을 위한 윈윈 전략, 구름토론 (Cloud Debate)' },
              { id: 'lTeODtbcCA8', title: '구름 디베이트 (Cloud Debate) 포맷 소개' }
            ].map((video, idx) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`} 
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <h4 className="font-bold text-slate-800 mt-5 mb-1 text-base truncate" title={video.title}>{video.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 자료실 섹션 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 자료실 헤더 및 관리자 제어 버튼 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center">
                <Download className="w-8 h-8 text-indigo-600 mr-3" />
                공식 자료실 다운로드
              </h2>
              <p className="mt-2 text-sm text-slate-500">교육 현장과 업무 등에 활용할 수 있는 생각도구 자료를 다운로드 하세요.</p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              {isAdmin ? (
                <>
                  <button 
                    onClick={() => setShowWriteForm(!showWriteForm)}
                    className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    {showWriteForm ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        작성 취소
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        새 자료 등록 (글쓰기)
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleAdminLogout}
                    className="flex items-center px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    관리자 로그아웃
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  관리자 로그인
                </button>
              )}
            </div>
          </div>

          {/* 1. 관리자 글쓰기(자료 등록) 폼 영역 */}
          <AnimatePresence>
            {isAdmin && showWriteForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <form 
                  onSubmit={handleUpload}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4 text-left"
                >
                  <h3 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center">
                    <Plus className="w-5 h-5 text-indigo-600 mr-2" />
                    새로운 공식 자료 업로드 (글쓰기)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">자료 제목</label>
                        <input 
                          type="text" 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="자료실에 노출될 제목을 적어주세요"
                          required
                          disabled={uploading}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-850"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">자료 설명 (세부 내용)</label>
                        <textarea 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="버전 정보, 파일 형식, 추천 대상 등 유용한 정보를 기술해 주세요"
                          rows="3"
                          disabled={uploading}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-850"
                        />
                      </div>
                    </div>

                    {/* 작성 폼 내부 파일 첨부 영역 */}
                    <div className="flex flex-col justify-center">
                      <label className="block text-sm font-bold text-slate-700 mb-1">파일 첨부</label>
                      <div className="bg-slate-50 border-2 border-dashed border-slate-350 rounded-xl p-6 hover:bg-slate-100 transition-colors cursor-pointer flex flex-col items-center justify-center relative min-h-[140px]">
                        <input 
                          type="file" 
                          id="file-upload" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                          disabled={uploading}
                        />
                        <FileText className="w-10 h-10 text-slate-400 mb-2" />
                        <span className="text-sm font-medium text-slate-700 text-center px-4">
                          {selectedFile ? `선택된 파일: ${selectedFile.name}` : '클릭하여 업로드할 파일 선택'}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">
                          {selectedFile ? `${formatBytes(selectedFile.size)}` : 'PDF, PPT, DOCX, 이미지 (최대 50MB)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {uploading && (
                    <div className="w-full pt-2">
                      <div className="flex justify-between text-xs text-indigo-600 font-bold mb-1">
                        <span>클라우드로 업로드 진행 중...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setTitle('');
                        setDescription('');
                        setShowWriteForm(false);
                      }}
                      disabled={uploading}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 transition-colors rounded-lg text-slate-700 font-semibold text-sm"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold text-sm rounded-lg flex items-center"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          등록 중
                        </>
                      ) : (
                        '게시물 등록하기'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. 게시판 형식의 자료실 다운로드 목록 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-3" />
                <span className="text-sm font-medium">네트워크에서 자료 목록을 동기화하고 있습니다...</span>
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-base font-semibold">등록된 자료가 없습니다.</p>
                {isAdmin && <p className="text-sm text-slate-400 mt-1">상단의 [새 자료 등록] 버튼을 눌러 첫 번째 게시물을 작성해 보세요.</p>}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] table-fixed">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-left text-slate-700 text-xs font-bold uppercase tracking-wider">
                      <th className="w-2/12 py-4 px-6">등록일</th>
                      <th className="w-4/12 py-4 px-4">자료명 (제목)</th>
                      <th className="w-4/12 py-4 px-4">자료 설명</th>
                      <th className="w-2/12 py-4 px-4 text-center">파일 정보</th>
                      <th className="w-2/12 py-4 px-6 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-sm text-slate-800">
                    {files.map((file) => (
                      <tr 
                        key={file.id} 
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                          {formatDate(file.createdAt)}
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-900 truncate" title={file.title}>
                          {file.title}
                        </td>
                        <td className="py-4 px-4 text-slate-600 truncate" title={file.description}>
                          {file.description}
                        </td>
                        <td className="py-4 px-4 text-slate-500 text-xs text-center font-medium">
                          {formatBytes(file.fileSize)}
                        </td>
                        <td className="py-4 px-6 flex items-center justify-center space-x-2">
                          <a 
                            href={file.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="whitespace-nowrap text-indigo-650 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold px-3 py-1.5 bg-indigo-50 rounded-md border border-indigo-200"
                          >
                            다운로드
                          </a>
                          
                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(file.id, file.storagePath, file.title)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200"
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. 관리자 비밀번호 입력 모달 */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-slate-200"
            >
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-900 flex items-center">
                  <Lock className="w-5 h-5 text-indigo-600 mr-2" />
                  관리자 모드 활성화
                </h3>
                <button 
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">관리자 비밀번호</label>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    required
                    autoFocus
                    className="w-full px-4 py-2 border border-slate-350 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-550 bg-white text-slate-800"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword('');
                    }}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-350 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    로그인
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
