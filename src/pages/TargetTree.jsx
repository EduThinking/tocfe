import { motion } from 'framer-motion';
import { Target as TargetIcon, Mountain, Flag, ArrowUp, CheckCircle } from 'lucide-react';

export default function TargetTree() {
  return (
    <div className="w-full pb-20">
      {/* Header */}
      <section className="bg-rose-50 border-b border-rose-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 bg-white rounded-2xl shadow-sm mb-6"
          >
            <TargetIcon className="w-12 h-12 text-rose-500" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-extrabold text-slate-900 mb-4"
          >
            야심찬 목표나무 <br className="md:hidden" />
            <span className="text-2xl text-slate-500 font-medium ml-2">(Ambitious Target Tree)</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            걸림돌을 디딤돌로 바꾸어 꿈을 이루는 방법
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Mountain className="w-6 h-6 mr-3 text-slate-700" />
              야심찬 목표란 무엇인가요?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              우리는 누구나 이루고 싶은 '야심찬 목표'가 있습니다. 하지만 막상 시작하려면 "무엇부터 시작해야 할 지 모르겠어", "잘 안될 것 같아"와 같이 생각하며 포기하기 쉽습니다. <strong>야심찬 목표나무</strong>는 이러한 걸림돌들을 오히려 목표를 달성하기 위한 구체적인 중간 목표(디딤돌)로 바꾸어 실행 가능한 계획을 세우는 도구입니다.
            </p>

            <div className="bg-gradient-to-br from-slate-50 to-rose-50 rounded-2xl p-8 border border-rose-100 mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">목표나무 작성 5단계</h3>

              <div className="space-y-6 relative">
                {/* Steps */}
                {[
                  {
                    step: '1단계: 목표 설정',
                    desc: '이루고 싶은 야심찬 목표(Ambitious Target)를 정합니다.',
                    icon: <Flag className="w-5 h-5 text-rose-500" />
                  },
                  {
                    step: '2단계: 걸림돌 나열',
                    desc: '목표를 달성하는 데 방해가 되는 걸림돌을 나열합니다.',
                    icon: <Mountain className="w-5 h-5 text-slate-500" />
                  },
                  {
                    step: '3단계: 디딤돌(중간목표)로 변환',
                    desc: '각 걸림돌을 극복했을 때의 상태인 "디딤돌(중간목표)"로 바꾸어 봅니다.',
                    icon: <TargetIcon className="w-5 h-5 text-emerald-500" />
                  },
                  {
                    step: '4단계: 디딤돌(중간목표)의 실행 순서 설정',
                    desc: '디딤돌(중간목표)들을 어떤 순서로 달성할지 실행순서에 따라 나무 모양으로 배치(아래에서 위로)하여 목표나무를 그립니다.',
                    icon: <ArrowUp className="w-5 h-5 text-indigo-500" />
                  },
                  {
                    step: '5단계: 실행 계획 수립',
                    desc: '각 디딤돌(중간목표)을 달성하기 위한 구체적인 실행 계획을 세웁니다.',
                    icon: <CheckCircle className="w-5 h-5 text-blue-500" />
                  }
                ].map((item, i) => (
                  <div key={i} className="flex bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 mr-4 mt-1 bg-slate-50 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{item.step}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 text-white rounded-2xl p-8 mb-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 opacity-10">
                <TargetIcon className="w-48 h-48" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">생각의 전환</h3>
              <p className="text-slate-300 relative z-10 text-lg italic">
                "걸림돌이 많다는 것은 실패의 이유가 아니라,<br />
                우리가 무엇을 해결해야 성공할 수 있는지 알려주는 지도입니다."
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
