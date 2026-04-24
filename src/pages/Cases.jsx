import { motion } from 'framer-motion';
import { PlayCircle, UploadCloud, FileText, Download } from 'lucide-react';

export default function Cases() {
  return (
    <div className="w-full">
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
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center">
              <PlayCircle className="w-8 h-8 text-indigo-600 mr-3" />
              추천 영상 갤러리
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
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
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-lg transition-shadow"
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
                <h4 className="font-bold text-slate-800 mt-6 mb-2 text-lg truncate" title={video.title}>{video.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Upload Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
            <UploadCloud className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">자료 공유 및 업로드</h2>
          <p className="text-slate-600 mb-10 leading-relaxed">
            나만의 생각도구 활용 사례를 공유하고 다른 분들의 학습 자료를 다운로드해보세요.<br className="hidden sm:block"/>
            선생님과 학부모님들의 소중한 경험이 더 나은 교육 환경을 만듭니다.
          </p>
          
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-10 hover:bg-slate-100 transition-colors cursor-pointer flex flex-col items-center justify-center group mb-12">
            <FileText className="w-12 h-12 text-slate-400 group-hover:text-indigo-500 mb-4 transition-colors" />
            <span className="text-lg font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">클릭하여 파일 업로드 (PDF, PPT, DOCX, 이미지)</span>
            <span className="text-sm text-slate-500 mt-2">최대 용량 50MB</span>
          </div>

          <div className="text-left bg-indigo-50 rounded-xl p-6 md:p-8 border border-indigo-100">
            <h3 className="font-bold text-indigo-900 flex items-center mb-4 text-xl">
              <Download className="w-6 h-6 mr-3 text-indigo-600" /> 공식 자료실 다운로드
            </h3>
            <ul className="space-y-4">
              <li className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-indigo-300 transition-colors">
                <div>
                  <span className="block text-slate-800 font-bold mb-1">TOCfE 생각도구 소개 공식 가이드북.pdf</span>
                  <span className="text-sm text-slate-500">2026년 개정판 | 2.4MB</span>
                </div>
                <button className="mt-3 sm:mt-0 whitespace-nowrap text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors text-sm font-bold px-4 py-2 bg-indigo-50 rounded-lg">다운로드</button>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-indigo-300 transition-colors">
                <div>
                  <span className="block text-slate-800 font-bold mb-1">구름, 가지, 야심찬 목표나무 활동지 양식.docx</span>
                  <span className="text-sm text-slate-500">프린트용 흑백 워크시트 | 1.1MB</span>
                </div>
                <button className="mt-3 sm:mt-0 whitespace-nowrap text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors text-sm font-bold px-4 py-2 bg-indigo-50 rounded-lg">다운로드</button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
