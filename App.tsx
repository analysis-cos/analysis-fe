
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
import FeatureDetailPage from './components/FeatureDetailPage';
import ServiceRequirementMap from './components/ServiceRequirementMap';
import { Product } from './types';
import type { FeatureCategory, FeaturePageId } from './brandDashPlan';

export type ViewState = 'landing' | 'dashboard' | 'detail' | 'my-brand' | 'ad-analytics' | 'feature-detail' | 'service-map';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState<FeaturePageId>('trend-content');
  const [featureBackView, setFeatureBackView] = useState<ViewState>('dashboard');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsPanelOpen(true);
  };

  const handleGoToDetail = (product: Product) => {
    setSelectedProduct(product);
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

  const handleFeatureOpen = (featureId: FeaturePageId) => {
    setSelectedFeatureId(featureId);
    if (view !== 'feature-detail') {
      setFeatureBackView(view);
    }
    setView('feature-detail');
    window.scrollTo(0, 0);
  };

  const handleFeatureBack = () => {
    setView(featureBackView === 'feature-detail' ? 'dashboard' : featureBackView);
    window.scrollTo(0, 0);
  };

  const handleOpenFeatureCategory = (category: FeatureCategory) => {
    navigateTo(category === 'leading' ? 'ad-analytics' : 'my-brand');
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
          {view !== 'detail' && view !== 'feature-detail' && view !== 'service-map' && (
            <CategoryTabs currentView={view} onNavigate={navigateTo} />
          )}

          {view === 'dashboard' && (
            <SummaryDashboard
              onProductClick={handleProductClick}
              onFeatureOpen={handleFeatureOpen}
              onOpenServiceMap={() => navigateTo('service-map')}
            />
          )}

          {view === 'my-brand' && <MyBrandView onProductClick={handleProductClick} onFeatureOpen={handleFeatureOpen} />}
          
          {view === 'ad-analytics' && <AdAnalyticsView onFeatureOpen={handleFeatureOpen} />}

          {view === 'detail' && selectedProduct && (
            <ProductDetailPage 
              product={selectedProduct} 
              onBack={() => setView('dashboard')} 
            />
          )}

          {view === 'feature-detail' && (
            <FeatureDetailPage
              featureId={selectedFeatureId}
              onBack={handleFeatureBack}
              onFeatureOpen={handleFeatureOpen}
              onOpenCategory={handleOpenFeatureCategory}
            />
          )}

          {view === 'service-map' && (
            <ServiceRequirementMap onBack={() => navigateTo('dashboard')} />
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
