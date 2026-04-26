import { motion } from 'framer-motion';
import { ArrowRight, Cloud, GitBranch, Target, Globe, Users, HeartHandshake, ShieldCheck, Lightbulb, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    name: '구름 (Cloud)',
    description: '갈등과 딜레마를 해결하고 모두가 윈윈(Win-Win)하는 창의적 해결책을 찾는 도구입니다.',
    icon: <Cloud className="w-8 h-8 text-indigo-500" />,
    path: '/cloud',
    color: 'bg-indigo-50 border-indigo-100 hover:border-indigo-300',
    titleColor: 'text-indigo-700'
  },
  {
    name: '가지 (Branch)',
    description: '어떤 행동의 결과를 예측하거나, 문제의 근본 원인을 논리적으로 파악하는 도구입니다.',
    icon: <GitBranch className="w-8 h-8 text-emerald-500" />,
    path: '/branch',
    color: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300',
    titleColor: 'text-emerald-700'
  },
  {
    name: '야심찬 목표나무 (Ambitious Target Tree)',
    description: '야심찬 목표를 달성하는 과정을 시각화하고 예상되는 걸림돌을 극복하여 목표달성을 돕는 도구입니다.',
    icon: <Target className="w-8 h-8 text-rose-500" />,
    path: '/target-tree',
    color: 'bg-rose-50 border-rose-100 hover:border-rose-300',
    titleColor: 'text-rose-700'
  }
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-32">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-purple-600 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            스스로 생각하고 <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-400">
              스스로 해결하는 힘
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            TOCfE(Theory of Constraints for Education) 생각도구는 우리가 살아가면서 만나는 수많은 문제와 갈등을 논리적이고 창의적으로 해결하도록 도와줍니다.
          </motion.p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">세 가지 핵심 생각도구</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              상황과 목적에 따라 세 가지 도구를 적절히 활용하여 더 나은 의사결정을 내릴 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={tool.path} className="block h-full cursor-pointer group">
                  <div className={`h-full rounded-2xl p-8 border-2 transition-all duration-300 ${tool.color} bg-opacity-40`}>
                    <div className="bg-white w-16 h-16 rounded-xl shadow-sm flex items-center justify-center mb-6 transition-transform group-hover:-translate-y-2">
                      {tool.icon}
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${tool.titleColor}`}>
                      {tool.name}
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
                      자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">전 세계가 증명한 글로벌 성과</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              미국, 일본, 이스라엘, 소말리아, 유럽(Erasmus 프로젝트) 등 6개 대륙 20여 개국에서 활용되고 있습니다.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 flex justify-center"
            >
              {/* 이미지 경로는 public/flags.png 를 가리킵니다. */}
              <img 
                src="/flags.png" 
                alt="24 Countries on 6 Continents" 
                className="w-full max-w-lg h-auto rounded-xl shadow-[0_4px_12px_rgb(0,0,0,0.06)] border border-slate-200" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Please+Upload+flags.png';
                }}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4">6개 대륙, 24개국 이상 도입</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                호주, 영국, 미국, 대한민국, 일본, 이스라엘 등 전 세계 다양한 문화와 교육 현장에서 TOCfE 생각도구가 적용되어 놀라운 성과를 증명하고 있습니다.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-indigo-50 p-3 rounded-xl mr-5 shrink-0">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 text-lg">250,000명+ 교육 관계자 수료</strong>
                    <span className="text-sm text-slate-500 mt-1 block leading-relaxed">교장, 교사, 학부모 등 수많은 리더들이 생각도구를 배우고 현장에 전파합니다.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-emerald-50 p-3 rounded-xl mr-5 shrink-0">
                    <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 text-lg">8,000,000명+ 수혜 학생</strong>
                    <span className="text-sm text-slate-500 mt-1 block leading-relaxed">유치원생부터 성인까지 스스로 갈등을 해결하고 논리적인 의사결정 힘을 기릅니다.</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">다양한 활용 분야 (Use Cases)</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              TOCfE 생각도구는 연령과 목적에 구애받지 않고 삶의 모든 영역에 적용될 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '갈등 해결 및 예방', icon: <HeartHandshake className="w-6 h-6" />, desc: '양보나 타협 없이 모두가 승리하는 Win-Win 해결책 도출' },
              { title: '학교 폭력 예방 및 또래 조정', icon: <ShieldCheck className="w-6 h-6" />, desc: '학생들 스스로 문제를 인식하고 갈등을 중재하는 역량 강화' },
              { title: '리더십 및 행동 교정', icon: <Target className="w-6 h-6" />, desc: '목표를 세우고 장애물을 극복하며 올바른 의사결정을 내리도록 지도' },
              { title: '가족 관계 및 부모 교육', icon: <Users className="w-6 h-6" />, desc: '자녀와의 소통 개선 및 가정 내 규칙 또는 딜레마를 평화롭게 해결' },
              { title: '진로 및 상담', icon: <Lightbulb className="w-6 h-6" />, desc: '스스로 미래의 가지를 그려보고 진로 앞의 불안감을 논리적으로 분석' },
              { title: '특수 및 차별화 교육', icon: <BookOpen className="w-6 h-6" />, desc: '학습 장애(난독증 등) 완화 및 모든 학생 수준에 맞는 맞춤형 커리큘럼 제공' }
            ].map((useCase, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all cursor-default"
              >
                <div className="text-indigo-600 mb-4 bg-indigo-100 w-12 h-12 flex items-center justify-center rounded-lg">
                  {useCase.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{useCase.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
