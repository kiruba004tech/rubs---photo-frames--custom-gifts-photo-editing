import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, ShieldCheck, Heart, Truck, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';
import { useCart } from '../context/CartContext';
import { buildWhatsAppUrl, formatGeneralEnquiryMessage } from '../utils/whatsapp';
import { RubsLogo } from './RubsLogo';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  const { setActivePolicyModal, setIsSizeGuideOpen } = useCart();

  const handleWhatsAppContact = () => {
    const url = buildWhatsAppUrl(formatGeneralEnquiryMessage());
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-white border-t border-black/5 text-[#1A1A1A]">
      {/* Top Value Badges */}
      <div className="border-b border-black/5 py-10 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-black shrink-0 shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">Safe Delivery</h4>
              <p className="text-[11px] text-black/60">5-Ply shatterproof box guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-black shrink-0 shadow-sm">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">Direct WhatsApp</h4>
              <p className="text-[11px] text-black/60">Real photo artisans guide every order</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-black shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">Museum Archival</h4>
              <p className="text-[11px] text-black/60">100+ year fade-resistant inks</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-black shrink-0 shadow-sm">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">Damage Protection</h4>
              <p className="text-[11px] text-black/60">Instant WhatsApp free replacement</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <button
              onClick={() => setCurrentView('home')}
              className="text-left group focus-visible:outline-none"
              aria-label="RUBS Home"
            >
              <RubsLogo size="md" showText={true} />
            </button>

            <p className="text-xs text-black/70 leading-relaxed max-w-sm">
              Archival photo framing, custom personalized gifts, and studio-grade digital photo restoration. Handcrafted with reverence for lifelong memories.
            </p>

            <div className="pt-2">
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat with RUBS on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
              Studio Offerings
            </h4>
            <ul className="space-y-2.5 text-xs text-black/70">
              <li>
                <button
                  onClick={() => setCurrentView('frames')}
                  className="hover:text-black transition-colors"
                >
                  Photo Frames (10 Sizes)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('custom-gifts')}
                  className="hover:text-black transition-colors"
                >
                  Custom Gifts (11 Types)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('editing')}
                  className="hover:text-black transition-colors"
                >
                  Photo Editing & Restoration
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-black transition-colors"
                >
                  Interactive Frame Size Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
              Company & Craft
            </h4>
            <ul className="space-y-2.5 text-xs text-black/70">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-black transition-colors"
                >
                  About RUBS Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-black transition-colors"
                >
                  Studio Location & Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('shipping')}
                  className="hover:text-black transition-colors"
                >
                  Shipping & Dispatch Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('return')}
                  className="hover:text-black transition-colors"
                >
                  Damage Replacement Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-black transition-colors"
                >
                  Privacy & Photo Security
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Desk */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-black/70">
              <div className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                <a href={`tel:${STORE_CONFIG.supportPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-black font-semibold">
                  {STORE_CONFIG.whatsappDisplayNumber}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                <a href={`mailto:${STORE_CONFIG.supportEmail}`} className="hover:text-black">
                  {STORE_CONFIG.supportEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.businessAddress}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Bar */}
      <div className="border-t border-black/5 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/50 text-center sm:text-left">
            © RUBS Gifting Co. — Making memories special
          </div>
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold">
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="text-black/60 hover:text-black transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="text-black/60 hover:text-black transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className="text-black/60 hover:text-black transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
