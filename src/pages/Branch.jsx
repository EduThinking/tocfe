import { motion } from 'framer-motion';
import { GitBranch as BranchIcon, ArrowUp, MoveRight } from 'lucide-react';

export default function Branch() {
  return (
    <div className="w-full pb-20">
      {/* Header */}
      <section className="bg-emerald-50 border-b border-emerald-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 bg-white rounded-2xl shadow-sm mb-6"
          >
            <BranchIcon className="w-12 h-12 text-emerald-500" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-extrabold text-slate-900 mb-4"
          >
            가지 (Branch)
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            "만약 ~(If)라면, 그러면 ~(Then)이다"
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">
            가지는 언제 사용하나요?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            가지는 <strong>원인과 결과</strong>의 논리적 연결을 눈으로 볼 수 있게 펼쳐 놓는 도구입니다. 내가 한 행동이나 어떤 사건이 앞으로 어떤 결과를 가져올지 예측하거나(미래 가지), 또는 지금 일어난 문제가 대체 어디서부터 시작되었는지 근본 원인을 찾을 때(과거 가지) 유용하게 사용됩니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            
            {/* Visual Map Example */}
            <div className="bg-slate-50 p-8 rounded-xl flex flex-col items-center border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-6">논리적 읽기 방식</h3>
              
              <div className="w-full max-w-xs flex flex-col items-center gap-6 relative">
                <div className="w-full bg-white p-5 rounded-lg shadow-[0_4px_12px_rgb(0,0,0,0.03)] border border-emerald-200 text-center z-10">
                  <span className="text-sm font-semibold text-emerald-700 block mb-1">결과 (Then)</span>
                  <span className="text-slate-800 font-medium">성적이 오른다.</span>
                </div>
                
                <div className="flex justify-center items-center relative z-0 py-2">
                  <div className="bg-indigo-50 w-14 h-14 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 shadow-inner"></div>
                  <ArrowUp className="text-indigo-600 w-8 h-8" />
                </div>

                <div className="w-full bg-white p-5 rounded-lg shadow-[0_4px_12px_rgb(0,0,0,0.03)] border border-indigo-200 text-center z-10">
                  <span className="text-sm font-semibold text-indigo-700 block mb-1">원인 (If)</span>
                  <span className="text-slate-800 font-medium">매일 꾸준히 복습한다.</span>
                </div>
              </div>
              
              <p className="mt-8 text-sm text-slate-500 text-center bg-white py-2 px-4 rounded-full border border-slate-100">
                원인을 아래에, 결과를 위에 화살표로 연결합니다.
              </p>
            </div>

            {/* Application */}
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center">
                  <MoveRight className="w-5 h-5 text-emerald-500 mr-2" />
                  부정적 가지 (Negative Branch)
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  어떤 아이디어나 행동이 가져올 나쁜 결과를 미리 예상해보고, 그런 일이 일어나지 않도록 미리 예방책을 찾는 데 사용합니다.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center">
                  <MoveRight className="w-5 h-5 text-indigo-500 mr-2" />
                  긍정적 가지 (Positive Branch)
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  우리가 이루고 싶은 좋은 결과에 도달하기 위해 정확히 어떤 행동과 원인들이 필요한지 체계적으로 계획할 때 사용합니다.
                </p>
              </div>
              
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                <h4 className="font-bold text-amber-900 text-sm mb-1">질문해보기</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  "정말 이 원인이 있으면 반드시 저 결과가 나오는가?" <br />
                  "다른 원인은 없는가?"
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
