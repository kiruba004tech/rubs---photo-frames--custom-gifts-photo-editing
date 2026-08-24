import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { CustomGiftModal } from './components/CustomGiftModal';
import { EditingRequestModal } from './components/EditingRequestModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { PolicyModal } from './components/PolicyModal';
import { SearchModal } from './components/SearchModal';

import { HomeView } from './views/HomeView';
import { FramesView } from './views/FramesView';
import { CustomGiftsView } from './views/CustomGiftsView';
import { EditingView } from './views/EditingView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col font-sans selection:bg-black selection:text-white">
        
        {/* Navigation */}
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />

        {/* Dynamic Main View */}
        <main className="flex-1">
          {currentView === 'home' && <HomeView setCurrentView={setCurrentView} />}
          {currentView === 'frames' && <FramesView />}
          {currentView === 'custom-gifts' && <CustomGiftsView />}
          {currentView === 'editing' && <EditingView />}
          {currentView === 'about' && <AboutView setCurrentView={setCurrentView} />}
          {currentView === 'contact' && <ContactView />}
        </main>

        {/* Global Floating WhatsApp Contact Action */}
        <FloatingWhatsApp />

        {/* Modals & Slide-outs */}
        <CartDrawer />
        <WhatsAppCheckoutModal />
        <CustomGiftModal />
        <EditingRequestModal />
        <ProductDetailModal />
        <SizeGuideModal />
        <PolicyModal />
        <SearchModal setCurrentView={setCurrentView} />

        {/* Footer */}
        <Footer setCurrentView={setCurrentView} />

      </div>
    </CartProvider>
  );
}
