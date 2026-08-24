import React, { useState } from 'react';
import { ShoppingBag, Search, MessageCircle, Menu, X, Phone, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';
import { useCart } from '../context/CartContext';
import { buildWhatsAppUrl, formatGeneralEnquiryMessage } from '../utils/whatsapp';
import { RubsLogo } from './RubsLogo';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'frames', label: 'Photo Frames' },
    { id: 'custom-gifts', label: 'Custom Gifts' },
    { id: 'editing', label: 'Photo Editing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickWhatsApp = () => {
    const url = buildWhatsAppUrl(formatGeneralEnquiryMessage());
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Official Brand Logo Emblem & Wordmark */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('home')}
                className="group flex items-center gap-3 text-left focus-visible:outline-none rounded-xl p-1 -ml-1 transition-opacity"
                aria-label="RUBS Home"
              >
                <RubsLogo size="sm" showText={true} />
              </button>
            </div>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[11px] uppercase tracking-[0.2em] font-bold">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`transition-all whitespace-nowrap py-1 relative ${
                      isActive
                        ? 'text-black font-black border-b-2 border-black'
                        : 'text-black/60 hover:text-black'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Actions (Search, Cart, WhatsApp CTA) */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-black/70 hover:text-black hover:bg-black/5 transition-colors"
                aria-label="Search frames, gifts and services"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full text-black/70 hover:text-black hover:bg-black/5 transition-colors"
                aria-label={`Shopping cart with ${totalItems} items`}
                title="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Quick WhatsApp Order Button */}
              <button
                onClick={handleQuickWhatsApp}
                className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Order via WhatsApp</span>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-black/80 hover:text-black hover:bg-black/5 lg:hidden"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-black/5 bg-white px-6 pt-4 pb-8 space-y-4 animate-fade-in shadow-xl">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-[0.2em] font-bold text-left transition-colors ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-black/80 hover:bg-black/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-black/5 flex flex-col gap-3">
              <button
                onClick={handleQuickWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-widest shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Order via WhatsApp</span>
              </button>

              <div className="flex items-center justify-between px-2 text-[10px] text-black/50 uppercase tracking-widest font-bold pt-1">
                <span>Direct Desk: {STORE_CONFIG.whatsappDisplayNumber}</span>
                <span>Chennai, India</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
