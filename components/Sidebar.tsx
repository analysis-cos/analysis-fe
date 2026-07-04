
import React, { useState } from 'react';
import { Layers, Award, Tag, BarChart3, ChevronDown, ChevronUp, Check, Search as SearchIcon, LayoutDashboard, Store, Youtube } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  activeCount?: number;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, icon, isOpen, onToggle, children, activeCount }) => (
  <div className="mb-1">
    <div 
      onClick={onToggle}
      className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all ${
        isOpen ? 'bg-[#6dec13]/10 text-[#2a4519]' : 'hover:bg-[#ecf3e7] text-gray-600'
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
        {activeCount ? (
          <span className="text-[10px] bg-[#6dec13] text-white px-1.5 py-0.5 rounded-full font-black">
            {activeCount}
          </span>
        ) : null}
      </div>
      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </div>
    {isOpen && (
      <div className="mt-2 ml-4 pl-4 border-l-2 border-[#ecf3e7] space-y-3 py-1 animate-in slide-in-from-top-1 duration-200">
        {children}
      </div>
    )}
  </div>
);

type ViewState = 'landing' | 'dashboard' | 'detail' | 'my-brand' | 'ad-analytics';

interface SidebarProps {
  onNavigate?: (v: ViewState) => void;
  currentView?: ViewState;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    price: false,
    rank: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ['에센스', '선케어', '립케어', '모이스처라이저', '토너', '클렌저'];

  return (
    <aside className="w-64 shrink-0 border-r border-[#ecf3e7] p-6 hidden lg:flex flex-col gap-8 bg-white/50 h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto">
      
      <div>
              <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6c9a4c] mb-4">네비게이션</h3>
        <div className="space-y-1">
          <button 
            onClick={() => onNavigate?.('dashboard')}
            className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-black transition-all ${
              currentView === 'dashboard' 
                ? 'bg-[#6dec13] text-gray-900 shadow-lg shadow-[#6dec13]/20' 
                : 'text-gray-500 hover:bg-[#ecf3e7] hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>요약 대시보드</span>
          </button>
          <button 
            onClick={() => onNavigate?.('ad-analytics')}
            className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-black transition-all ${
              currentView === 'ad-analytics' 
                ? 'bg-[#6dec13] text-gray-900 shadow-lg shadow-[#6dec13]/20' 
                : 'text-gray-500 hover:bg-[#ecf3e7] hover:text-gray-900'
            }`}
          >
            <Youtube className="w-4 h-4" />
            <span>선행지표 분석관</span>
          </button>
          <button 
            onClick={() => onNavigate?.('my-brand')}
            className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-black transition-all ${
              currentView === 'my-brand' 
                ? 'bg-[#6dec13] text-gray-900 shadow-lg shadow-[#6dec13]/20' 
                : 'text-gray-500 hover:bg-[#ecf3e7] hover:text-gray-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>후행지표 분석관</span>
          </button>
        </div>
      </div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6c9a4c] mb-4">공통 분석 필터</h3>
        
        {/* Category Filter */}
        <FilterSection 
          title="카테고리" 
          icon={<Layers className="w-4 h-4" />} 
          isOpen={openSections.category}
          onToggle={() => toggleSection('category')}
          activeCount={2}
        >
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                ['에센스', '선케어'].includes(cat) ? 'bg-[#6dec13] border-[#6dec13]' : 'bg-white border-gray-300 group-hover:border-[#6dec13]'
              }`}>
                {['에센스', '선케어'].includes(cat) && <Check className="w-3 h-3 text-white stroke-[4]" />}
              </div>
              <span className={`text-xs font-bold ${['에센스', '선케어'].includes(cat) ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                {cat}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Brand Filter - Improved for too many brands */}
        <FilterSection 
          title="브랜드" 
          icon={<Award className="w-4 h-4" />} 
          isOpen={openSections.brand}
          onToggle={() => toggleSection('brand')}
        >
          <div className="pr-2 space-y-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="브랜드 검색..." 
                className="w-full bg-[#f7f8f6] border-none rounded-lg text-[11px] font-bold pl-8 py-2 focus:ring-1 focus:ring-[#6dec13]"
              />
            </div>
            <div className="max-h-32 overflow-y-auto space-y-2 scrollbar-hide">
              {['코스알엑스', '이니스프리', '라네즈', '조선미녀'].map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-gray-300 group-hover:border-[#6dec13] flex items-center justify-center bg-white transition-all"></div>
                  <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection 
          title="가격대" 
          icon={<Tag className="w-4 h-4" />} 
          isOpen={openSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3 pr-2">
            <div className="flex items-center gap-2">
              <input type="number" placeholder="최소" className="w-full bg-[#f7f8f6] border-none rounded-lg text-[11px] font-bold p-2 focus:ring-1 focus:ring-[#6dec13]" />
              <span className="text-gray-300 font-bold">~</span>
              <input type="number" placeholder="최대" className="w-full bg-[#f7f8f6] border-none rounded-lg text-[11px] font-bold p-2 focus:ring-1 focus:ring-[#6dec13]" />
            </div>
          </div>
        </FilterSection>

        {/* Rank Range Filter - Improved Clarity */}
        <FilterSection 
          title="순위 범위" 
          icon={<BarChart3 className="w-4 h-4" />} 
          isOpen={openSections.rank}
          onToggle={() => toggleSection('rank')}
        >
          <div className="space-y-3 pr-2">
          <p className="text-[10px] text-gray-400 font-bold leading-tight">커머스 랭킹 또는 키워드 순위 구간을 직접 입력하세요.</p>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="1" className="w-full bg-[#f7f8f6] border-none rounded-lg text-[11px] font-bold p-2 focus:ring-1 focus:ring-[#6dec13]" />
              <span className="text-gray-300 font-bold">~</span>
              <input type="number" placeholder="100" className="w-full bg-[#f7f8f6] border-none rounded-lg text-[11px] font-bold p-2 focus:ring-1 focus:ring-[#6dec13]" />
            </div>
            <div className="flex flex-wrap gap-1">
              {['TOP 10', 'TOP 20', 'TOP 50'].map(tag => (
                <button key={tag} className="px-2 py-1 bg-white border border-[#ecf3e7] rounded-md text-[9px] font-black text-gray-500 hover:border-[#6dec13] hover:text-[#6dec13] transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </FilterSection>
      </div>

      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6c9a4c] mb-4">정렬 기준</h3>
        <div className="relative">
          <select className="w-full bg-[#f7f8f6] border-none rounded-lg text-sm font-semibold text-gray-700 py-2.5 pl-3 pr-8 appearance-none focus:ring-2 focus:ring-[#6dec13]/50">
            <option>통합 영향도순</option>
            <option>미디어 반응 급상승순</option>
            <option>커머스 랭킹 급상승순</option>
            <option>리뷰 반응 변화순</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c9a4c] pointer-events-none" />
        </div>
      </div>

      <div className="mt-auto space-y-2 pt-4">
        <button className="w-full py-3 bg-[#6dec13] text-gray-900 font-bold rounded-xl shadow-lg shadow-[#6dec13]/20 hover:opacity-90 transition-all active:scale-95">
          필터 적용
        </button>
        <button className="w-full py-2 text-[#6c9a4c] text-xs font-bold hover:underline">
          모든 필터 초기화
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
