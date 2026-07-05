
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, User, LayoutDashboard, Store, LogOut, Youtube } from 'lucide-react';
import { ViewState } from '../App';

interface HeaderProps {
  onLogoClick?: () => void;
  onNavigate?: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ecf3e7] px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
        <div 
          className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 bg-[#6dec13] rounded-lg flex items-center justify-center text-white">
             <span className="font-bold text-xs">B</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">BrandDash</h1>
        </div>

        <div className="flex-1 max-w-xl">
          <label className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#6c9a4c]" />
            <input
              className="w-full h-10 pl-12 pr-4 bg-[#ecf3e7] border-none rounded-lg focus:ring-2 focus:ring-[#6dec13]/50 placeholder-[#6c9a4c] text-sm"
              placeholder="캠페인, 상품명 또는 판매 채널을 검색하세요..."
              type="text"
            />
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#6dec13] rounded-full animate-pulse"></span>
              <p className="text-[11px] text-[#6c9a4c] font-bold">데이터 업데이트 중</p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-2 border-l border-[#ecf3e7] pl-6 relative" ref={menuRef}>
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div 
                className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm group-hover:border-[#6dec13] transition-all"
                style={{ backgroundImage: 'url("https://picsum.photos/seed/user/100/100")' }}
              ></div>
              <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-[#ecf3e7] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-[#ecf3e7] bg-gray-50/50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">내 프로필</p>
                  <p className="text-sm font-black text-gray-900">브랜드 매니저님</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => { onNavigate?.('dashboard'); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-[#6dec13]/10 hover:text-[#2a4519] rounded-xl transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" /> 요약 대시보드
                  </button>
                  <button 
                    onClick={() => { onNavigate?.('ad-analytics'); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-[#6dec13]/10 hover:text-[#2a4519] rounded-xl transition-colors"
                  >
                    <Youtube className="w-4 h-4" /> 선행지표 분석
                  </button>
                  <button 
                    onClick={() => { onNavigate?.('my-brand'); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-[#6dec13]/10 hover:text-[#2a4519] rounded-xl transition-colors"
                  >
                    <Store className="w-4 h-4" /> 후행지표 분석
                  </button>
                </div>
                <div className="p-2 border-t border-[#ecf3e7]">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut className="w-4 h-4" /> 로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
