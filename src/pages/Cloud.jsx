import { motion } from 'framer-motion';
import { Cloud as CloudIcon, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';

export default function Cloud() {
  return (
    <div className="w-full pb-20">
      {/* Header */}
      <section className="bg-indigo-50 border-b border-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 bg-white rounded-2xl shadow-sm mb-6"
          >
            <CloudIcon className="w-12 h-12 text-indigo-500" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-extrabold text-slate-900 mb-4"
          >
            구름 (Cloud)
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            진 사람없이 모두가 승리하는 Win-Win 해결책 찾기
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-amber-500" />
            구름은 언제 사용하나요?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            우리는 종종 "이것을 해야 하나, 말아야 하나?" 또는 "내 의견을 따를까, 친구의 의견을 따를까?" 같은 갈등이나 딜레마에 빠집니다. 구름(Cloud)은 <strong>타협하지 않고도 양쪽의 요구를 모두 만족시킬 수 있는 창의적인 해결책(Win-Win)</strong>을 찾도록 도와주는 논리적 도구입니다.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-8 mt-12 flex items-center">
            <ArrowRight className="w-6 h-6 mr-3 text-indigo-500" />
            구름의 구조 (A-B-C-D-D')
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Visual Representation */}
            <div className="md:col-span-2 bg-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                {/* A */}
                <div className="w-full md:flex-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200 z-10 flex flex-col justify-center h-[120px]">
                  <span className="block text-sm font-bold text-indigo-600 mb-1">공통목표 (A)</span>
                  <span className="text-xs text-slate-500 leading-snug">양쪽의 필요(니즈)가 만족되면 어떤 상태가 되는가?</span>
                </div>

                {/* Arrows A <- B/C */}
                <div className="hidden md:flex flex-col justify-around h-[264px] py-12 w-8 items-center text-slate-300">
                  <ArrowLeft />
                  <ArrowLeft />
                </div>

                <div className="flex flex-col gap-6 w-full md:flex-1 z-10">
                  {/* B & C */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 h-[120px] flex flex-col justify-center">
                    <span className="block text-sm font-bold text-emerald-600 mb-1">필요(니즈) (B)</span>
                    <span className="text-xs text-slate-500 leading-snug">주장(D)을 통해 만족시키고자 하는 필요(니즈)는 무엇인가?</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 h-[120px] flex flex-col justify-center">
                    <span className="block text-sm font-bold text-rose-600 mb-1">필요(니즈) (C)</span>
                    <span className="text-xs text-slate-500 leading-snug">주장(D')을 통해 만족시키고자 하는 필요(니즈)는 무엇인가?</span>
                  </div>
                </div>

                {/* Arrows B/C <- D/D' */}
                <div className="hidden md:flex flex-col justify-around h-[264px] py-12 w-8 items-center text-slate-300">
                  <ArrowLeft />
                  <ArrowLeft />
                </div>

                <div className="flex flex-col gap-6 w-full md:flex-1 z-10 relative">
                  {/* D & D' with conflict indicator */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-emerald-500 h-[120px] flex flex-col justify-center">
                    <span className="block text-sm font-bold text-slate-900 mb-1">원하는 것/주장 (D)</span>
                    <span className="text-xs text-slate-500 leading-snug">한쪽의 주장/행동</span>
                  </div>

                  {/* Conflict Lightning/Arrow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-px bg-red-400 z-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center border border-red-200">
                      <span className="text-red-500 text-xs font-bold font-mono">VS</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-rose-500 h-[120px] flex flex-col justify-center">
                    <span className="block text-sm font-bold text-slate-900 mb-1">원하는 것 (D')</span>
                    <span className="text-xs text-slate-500 leading-snug">다른쪽의 주장/행동</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-4 space-y-4 text-slate-600">
              <p><strong>1단계:</strong> 갈등하는 양쪽이 원하는 것/주장(D vs D')을 파악합니다. </p>
              <p><strong>2단계:</strong> 각자 왜 그것을 원하는지, 진짜 니즈/필요(B, C)를 찾아냅니다.</p>
              <p><strong>3단계:</strong> 두 가지 니즈/필요를 모두 만족시키면 어떤 상태가 되는지, 공통목표(A)를 확인합니다.</p>
              <p><strong>4단계:</strong> 니즈(필요)와 주장 사이에는 어떤 이유가 있는지 갈등의 이유(가정)를 파악합니다.</p>
              <p><strong>5단계:</strong> 한쪽의 주장으로 다른 쪽의 니즈(필요)(B, C)를 충족할 수 있는 윈윈해결책(유레카!)을 찾습니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
