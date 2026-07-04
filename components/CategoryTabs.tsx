import React from 'react';
import { BarChart3, LayoutDashboard, Radio, ShoppingBag } from 'lucide-react';
import { ViewState } from '../App';

interface CategoryTabsProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const tabs = [
  {
    view: 'dashboard' as const,
    label: '요약',
    description: '전체 판단',
    icon: LayoutDashboard,
  },
  {
    view: 'ad-analytics' as const,
    label: '선행지표',
    description: '미디어·광고',
    icon: Radio,
  },
  {
    view: 'my-brand' as const,
    label: '후행지표',
    description: '커머스·구매',
    icon: ShoppingBag,
  },
];

const CategoryTabs: React.FC<CategoryTabsProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">
          <BarChart3 className="w-4 h-4" />
          BrandDash Analytics
        </div>
      </div>

      <div className="inline-flex w-full xl:w-auto rounded-2xl bg-white border border-[#ecf3e7] p-1.5 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.view;

          return (
            <button
              key={tab.view}
              onClick={() => onNavigate(tab.view)}
              className={`flex-1 xl:flex-none min-w-0 rounded-xl px-4 py-3 text-left transition-all ${
                isActive
                  ? 'bg-[#6dec13] text-gray-900 shadow-lg shadow-[#6dec13]/20'
                  : 'text-gray-500 hover:bg-[#f7f8f6] hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-black text-sm truncate">{tab.label}</span>
              </div>
              <p className={`mt-0.5 text-[10px] font-bold ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                {tab.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
