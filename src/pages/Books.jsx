import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Books() {
  return (
    <div className="w-full">
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold mb-6"
          >
            도서 및 교재
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            TOCfE와 논리적 사고력을 기를 수 있는 추천 도서와 현장 교재를 소개합니다.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
            <BookOpen className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">추천 도서 목록</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">TOCfE 공식 번역서 및 관련 교육 서적을 곧 업데이트할 예정입니다.</p>
          <div className="w-full max-w-3xl py-16 border-2 border-dashed border-slate-300 rounded-2xl bg-white text-slate-400 text-lg font-medium shadow-sm">
             준비 중입니다. (Coming Soon!!)
          </div>
        </div>
      </section>
    </div>
  );
}
