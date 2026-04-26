import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { Cloud, GitBranch, Target, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                TOCfE 생각도구
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              <NavLink to="/" className={({ isActive }) => `text-sm font-bold transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>홈</NavLink>
              
              {/* Dropdown Menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-indigo-600 py-5 transition-colors">
                  생각도구 소개
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                  <div className="flex flex-col">
                    <NavLink to="/cloud" className={({ isActive }) => `flex items-center gap-3 px-5 py-3 text-sm font-medium ${isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'}`}>
                      <Cloud className="w-4 h-4 text-indigo-500" /> 구름 (Cloud)
                    </NavLink>
                    <NavLink to="/branch" className={({ isActive }) => `flex items-center gap-3 px-5 py-3 text-sm font-medium ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600'}`}>
                      <GitBranch className="w-4 h-4 text-emerald-500" /> 가지 (Branch)
                    </NavLink>
                    <NavLink to="/target-tree" className={({ isActive }) => `flex items-center gap-3 px-5 py-3 text-sm font-medium ${isActive ? 'text-rose-600 bg-rose-50' : 'text-slate-700 hover:bg-slate-50 hover:text-rose-600'}`}>
                      <Target className="w-4 h-4 text-rose-500" /> 목표나무 (Target Tree)
                    </NavLink>
                  </div>
                </div>
              </div>

              <NavLink to="/books" className={({ isActive }) => `text-sm font-bold transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>BOOKS</NavLink>
              <NavLink to="/cases" className={({ isActive }) => `text-sm font-bold transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>CASES</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `text-sm font-bold transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>CONTACT</NavLink>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-indigo-600 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-5 py-4 space-y-5">
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-indigo-600">홈 (Home)</NavLink>
              
              <div className="space-y-4">
                <div className="text-base font-bold text-slate-800">생각도구 소개</div>
                <div className="pl-4 border-l-2 border-slate-100 space-y-4">
                  <NavLink to="/cloud" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-indigo-600"><Cloud className="w-4 h-4 text-indigo-500" /> 구름 (Cloud)</NavLink>
                  <NavLink to="/branch" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-emerald-600"><GitBranch className="w-4 h-4 text-emerald-500" /> 가지 (Branch)</NavLink>
                  <NavLink to="/target-tree" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-rose-600"><Target className="w-4 h-4 text-rose-500" /> 목표나무 (Target Tree)</NavLink>
                </div>
              </div>

              <NavLink to="/books" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-indigo-600">BOOKS</NavLink>
              <NavLink to="/cases" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-indigo-600">CASES</NavLink>
              <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-indigo-600">CONTACT</NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} TOCfE All rights reserved.</p>
          <p className="mt-2 text-xs">본 사이트는 TOCfE 생각도구 소개와 교육을 위해 구성되었습니다.</p>
        </div>
      </footer>
    </div>
  );
}
