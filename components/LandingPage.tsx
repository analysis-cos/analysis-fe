
import React from 'react';
import { ArrowRight, TrendingUp, Zap, BarChart2, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#f7f8f6] flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto pt-24 pb-16 px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6dec13]/10 text-[#2a4519] rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-bounce">
          <Zap className="w-3 h-3" /> 실시간 뷰티 마켓 트래커
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] mb-8 tracking-tighter">
          당신의 뷰티 비즈니스를<br />
          <span className="text-[#6dec13]">데이터</span>로 리드하세요.
        </h1>
        
        <p className="text-lg text-gray-500 max-w-2xl mb-12 font-medium leading-relaxed">
          BrandDash는 브랜드 캠페인, 상품별 반응, 판매 채널 신호를 연결해 
          광고 이후의 변화를 한 화면에서 확인할 수 있게 합니다.
        </p>
        
        <button 
          onClick={onStart}
          className="group relative flex items-center gap-3 px-10 py-5 bg-gray-900 text-[#6dec13] rounded-2xl text-xl font-black shadow-2xl hover:scale-105 transition-all active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          데이터 분석 시작하기 <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Floating Preview Elements */}
        <div className="mt-20 relative w-full max-w-5xl aspect-video bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-[#ecf3e7] overflow-hidden p-4">
          <div className="w-full h-full bg-[#f7f8f6] rounded-[1.5rem] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="w-32 h-6 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-4 gap-4 flex-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="w-12 h-12 bg-[#6dec13]/20 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-100 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between mb-6">
                  <div className="h-4 w-32 bg-gray-100 rounded"></div>
                  <div className="h-4 w-24 bg-gray-100 rounded"></div>
                </div>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-50 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-white py-24 border-t border-[#ecf3e7]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#6dec13]/10 text-[#6dec13] rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">실시간 트렌드 추적</h3>
            <p className="text-gray-500 font-medium">1시간 단위로 업데이트되는 데이터를 통해 가장 빠르게 변동사항을 감지합니다.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#6dec13]/10 text-[#6dec13] rounded-2xl flex items-center justify-center mb-6">
              <BarChart2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">상세 마켓 분석</h3>
            <p className="text-gray-500 font-medium">카테고리별 브랜드 점유율과 가격 경쟁력을 심층적으로 분석할 수 있습니다.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#6dec13]/10 text-[#6dec13] rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">AI 인사이트</h3>
            <p className="text-gray-500 font-medium">복잡한 데이터 사이의 의미를 AI 분석가가 명확하게 요약해드립니다.</p>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 px-6 flex flex-col items-center border-t border-[#ecf3e7] bg-[#f7f8f6]">
        <div className="flex items-center gap-2 mb-4 opacity-50">
          <div className="w-6 h-6 bg-[#6dec13] rounded flex items-center justify-center text-white text-[10px] font-bold">B</div>
          <span className="text-sm font-bold text-gray-900">BrandDash Analytics</span>
        </div>
        <p className="text-xs text-gray-400 font-medium">© 2024 BrandDash. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
