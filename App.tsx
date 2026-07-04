
import React, { useState } from 'react';
import Header from './components/Header';
import AIChat from './components/AIChat';
import ProductDetailPanel from './components/ProductDetailPanel';
import LandingPage from './components/LandingPage';
import ProductDetailPage from './components/ProductDetailPage';
import MyBrandView from './components/MyBrandView';
import AdAnalyticsView from './components/AdAnalyticsView';
import SummaryDashboard from './components/SummaryDashboard';
import CategoryTabs from './components/CategoryTabs';
import AnalysisProductSelector from './components/AnalysisProductSelector';
import { MOCK_PRODUCTS } from './constants';
import { Product } from './types';

export type ViewState = 'landing' | 'dashboard' | 'detail' | 'my-brand' | 'ad-analytics';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [analysisProductRank, setAnalysisProductRank] = useState(MOCK_PRODUCTS[0].rank);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setAnalysisProductRank(product.rank);
    setIsPanelOpen(true);
  };

  const handleGoToDetail = (product: Product) => {
    setSelectedProduct(product);
    setAnalysisProductRank(product.rank);
    setIsPanelOpen(false);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const navigateTo = (newView: ViewState) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8f6]">
      <Header 
        onLogoClick={() => navigateTo('dashboard')} 
        onNavigate={navigateTo}
      />
      
      <div className="flex-1 w-full">
        <main className={`w-full mx-auto p-5 md:p-8 overflow-x-hidden ${view === 'detail' ? 'max-w-7xl' : 'max-w-[1600px]'}`}>
          {view !== 'detail' && (
            <>
              <CategoryTabs currentView={view} onNavigate={navigateTo} />
              {view !== 'dashboard' && (
                <AnalysisProductSelector
                  products={MOCK_PRODUCTS.slice(0, 10)}
                  selectedProductRank={analysisProductRank}
                  onSelectedProductRankChange={setAnalysisProductRank}
                />
              )}
            </>
          )}

          {view === 'dashboard' && (
            <SummaryDashboard
              onProductClick={handleProductClick}
            />
          )}

          {view === 'my-brand' && <MyBrandView selectedProductRank={analysisProductRank} onProductClick={handleProductClick} />}
          
          {view === 'ad-analytics' && (
            <AdAnalyticsView
              selectedProductRank={analysisProductRank}
            />
          )}

          {view === 'detail' && selectedProduct && (
            <ProductDetailPage 
              product={selectedProduct} 
              onBack={() => setView('dashboard')} 
            />
          )}

        </main>
      </div>

      <ProductDetailPanel 
        product={selectedProduct} 
        isOpen={isPanelOpen} 
        onClose={closePanel}
        onViewDetail={handleGoToDetail}
      />

      <AIChat />
    </div>
  );
};

export default App;
