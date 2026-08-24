import React from 'react';
import { MessageCircle, ArrowRight, Sparkles, Star, ShieldCheck, Heart, Frame, Gift, Sliders, Ruler, CheckCircle2, ChevronRight, Truck, Clock } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';
import { PHOTO_FRAMES, CUSTOM_GIFTS, PHOTO_EDITING_SERVICES } from '../data/products';
import { FrameCard } from '../components/FrameCard';
import { CustomGiftCard } from '../components/CustomGiftCard';
import { EditingServiceCard } from '../components/EditingServiceCard';
import { useCart } from '../context/CartContext';
import { buildWhatsAppUrl, formatGeneralEnquiryMessage } from '../utils/whatsapp';
import { RubsLogo } from '../components/RubsLogo';

interface HomeViewProps {
  setCurrentView: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentView }) => {
  const { setIsSizeGuideOpen, setProductDetailModal } = useCart();

  const handleWhatsAppOrder = () => {
    const url = buildWhatsAppUrl(formatGeneralEnquiryMessage('placing a custom order'));
    window.open(url, '_blank');
  };

  const featuredHeroProduct = PHOTO_FRAMES[0]; // Signature Teak / Oak

  return (
    <div className="space-y-20 lg:space-y-28 pb-20">
      
      {/* 1. HERO SECTION (Bold Typography Layout) */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-20 border-b border-black/5 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Editorial Line Badge with Official Logo Mark */}
              <div className="flex items-center gap-3.5">
                <RubsLogo size="xs" showText={false} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
                  RUBS • Premium Photo Frames & Custom Gifts
                </span>
              </div>

              {/* Bold Typography Headline */}
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black text-[#1A1A1A] leading-[0.88] tracking-tighter">
                Turn Your <span className="italic font-light">Memories</span><br />
                Into Art.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-black/60 max-w-lg leading-relaxed font-normal">
                Beautiful photo frames, custom gifts and professional photo editing by <strong className="text-black font-semibold">RUBS</strong>.
              </p>

              {/* Pill Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('frames')}
                  className="bg-black text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all shadow-xl active:scale-95 whitespace-nowrap"
                >
                  Shop Frames
                </button>

                <button
                  onClick={() => setCurrentView('custom-gifts')}
                  className="border border-black text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all whitespace-nowrap"
                >
                  Custom Gifts
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="bg-[#25D366] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl active:scale-95 flex items-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-widest font-black text-black/40 border-t border-black/5">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-black" />
                  Shatterproof Packaging
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-black" />
                  24–48h Dispatch
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-black text-black" />
                  4.9/5 Rating (1,200+ Reviews)
                </span>
              </div>

            </div>

            {/* Right: Split Feature Column (#F9F7F2 Box + Sub cards) (5 cols) */}
            <div className="lg:col-span-5 bg-[#F9F7F2] p-6 sm:p-8 rounded-[2.5rem] border border-black/5 flex flex-col gap-6 shadow-sm">
              
              {/* Featured Showcase Card */}
              <div
                onClick={() => setProductDetailModal(featuredHeroProduct)}
                className="bg-white p-6 sm:p-7 rounded-[2rem] shadow-2xl border border-black/5 flex flex-col flex-1 relative overflow-hidden group cursor-pointer"
              >
                <div className="h-52 bg-[#FDFCFB] rounded-2xl flex flex-col items-center justify-center text-[10px] text-black/30 font-bold uppercase tracking-widest border border-dashed border-black/10 mb-6 p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black mb-2">
                    <Frame className="w-5 h-5" />
                  </div>
                  <span>8 × 10 SIGNATURE TEAK FRAME</span>
                  <span className="text-[8px] tracking-widest text-black/20 mt-1 font-mono">
                    MUSEUM ARCHIVAL GLASS
                  </span>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
                    Signature Teak Series
                  </h3>
                  <span className="text-xl font-light tracking-tighter italic font-serif text-[#1A1A1A]">
                    {STORE_CONFIG.currencySymbol}{featuredHeroProduct.basePrice}
                  </span>
                </div>

                <p className="text-sm text-black/50 mb-6 leading-snug">
                  Handcrafted solid wood with anti-reflective optical glass. Available in 10 standard sizes.
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductDetailModal(featuredHeroProduct);
                  }}
                  className="mt-auto w-full bg-black text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all"
                >
                  Inspect & Configure
                </button>
              </div>

              {/* 2 Quick Portal Cards */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div
                  onClick={() => setCurrentView('editing')}
                  className="bg-[#1A1A1A] p-6 rounded-[2rem] text-white flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-lg min-h-[140px]"
                >
                  <div className="text-[9px] uppercase tracking-widest opacity-50 font-bold">Services</div>
                  <div className="text-base sm:text-lg font-bold leading-tight font-serif">
                    Professional<br />Photo Editing
                  </div>
                </div>

                <div
                  onClick={() => setCurrentView('custom-gifts')}
                  className="bg-white border border-black/5 p-6 rounded-[2rem] flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-lg min-h-[140px]"
                >
                  <div className="text-[9px] uppercase tracking-widest opacity-50 font-bold text-black">Requests</div>
                  <div className="text-base sm:text-lg font-bold leading-tight font-serif text-[#1A1A1A]">
                    Personalized<br />Gifting Items
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. THREE CORE CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-black/5 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-black"></div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
                Categories
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight">
              Explore Our Specialized Craft
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/50 max-w-md">
            From gallery-grade wall framing to personalized sentimental gifting and professional digital photo restoration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Category 1: Photo Frames */}
          <div
            onClick={() => setCurrentView('frames')}
            className="group cursor-pointer bg-white rounded-[2rem] border border-black/5 p-8 flex flex-col justify-between space-y-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F2] border border-black/5 flex items-center justify-center text-black">
                <Frame className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] group-hover:text-black">
                Photo Frames
              </h3>
              <p className="text-xs text-black/60 leading-relaxed">
                Beautiful frames in multiple sizes and styles. Crafted from solid teak wood, matte polymers, metallic rose gold, and floating cast acrylic.
              </p>
              <ul className="text-[11px] text-black/50 space-y-1.5 pt-2 font-medium">
                <li>• 10 Standard Sizes (4×6 inch up to A2)</li>
                <li>• Museum-grade acrylic and float glass</li>
                <li>• Dual horizontal and vertical wall mounts</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black">
              <span>Shop All 10 Frames</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Category 2: Custom Gifts */}
          <div
            onClick={() => setCurrentView('custom-gifts')}
            className="group cursor-pointer bg-white rounded-[2rem] border border-black/5 p-8 flex flex-col justify-between space-y-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F2] border border-black/5 flex items-center justify-center text-black">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] group-hover:text-black">
                Custom Gifts
              </h3>
              <p className="text-xs text-black/60 leading-relaxed">
                Personalized gifts created according to customer requirements. Personalized lamps, custom mugs, velvet cushions, t-shirts, and photo collages.
              </p>
              <ul className="text-[11px] text-black/50 space-y-1.5 pt-2 font-medium">
                <li>• Name, date, and Spotify song integration</li>
                <li>• Free digital proof on WhatsApp before making</li>
                <li>• Beautiful gift boxing and ribbon wrap</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black">
              <span>Explore 11 Gift Types</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Category 3: Photo Editing */}
          <div
            onClick={() => setCurrentView('editing')}
            className="group cursor-pointer bg-white rounded-[2rem] border border-black/5 p-8 flex flex-col justify-between space-y-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F2] border border-black/5 flex items-center justify-center text-black">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] group-hover:text-black">
                Photo Editing
              </h3>
              <p className="text-xs text-black/60 leading-relaxed">
                Professional photo editing, enhancement and restoration services. Turn blurry phone pictures into crisp, printable high-resolution masters.
              </p>
              <ul className="text-[11px] text-black/50 space-y-1.5 pt-2 font-medium">
                <li>• Old vintage damage repair & recoloring</li>
                <li>• Background removal and studio replacement</li>
                <li>• Turnaround in as little as 6 to 12 hours</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black">
              <span>View 10 Editing Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PHOTO FRAMES SECTION (With Add to Cart & Buy Now) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-black"></div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
                Signature Collection
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              Featured Handcrafted Photo Frames
            </h2>
            <p className="text-xs text-black/50">
              Select your required size directly or open quick view for complete specifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#F9F7F2] hover:bg-black hover:text-white text-black border border-black/5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Size Comparison Guide</span>
            </button>
            <button
              onClick={() => setCurrentView('frames')}
              className="px-5 py-2.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:bg-black/80 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHOTO_FRAMES.slice(0, 4).map((frame) => (
            <FrameCard key={frame.id} product={frame} />
          ))}
        </div>
      </section>

      {/* 4. CUSTOM GIFTS SPOTLIGHT SECTION */}
      <section className="bg-[#F9F7F2] border-y border-black/5 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-black"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
                  Personalized Keepsakes
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
                Trending Custom Gifts
              </h2>
              <p className="text-xs text-black/50">
                Share your photos, text, and themes. We generate a custom WhatsApp mockup before production.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('custom-gifts')}
              className="px-5 py-2.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:bg-black/80 transition-colors self-start sm:self-auto"
            >
              <span>View All 11 Types</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CUSTOM_GIFTS.slice(0, 3).map((gift) => (
              <CustomGiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. PHOTO EDITING SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-black"></div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
                Studio Retouching
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              Professional Photo Editing Services
            </h2>
            <p className="text-xs text-black/50">
              Toggle between Before and After to inspect our studio quality retouching.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('editing')}
            className="px-5 py-2.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:bg-black/80 transition-colors self-start sm:self-auto"
          >
            <span>Explore 10 Services</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PHOTO_EDITING_SERVICES.slice(0, 3).map((service) => (
            <EditingServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 6. DIRECT WHATSAPP ORDERING PROCESS BANNER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-[2.5rem] bg-[#1A1A1A] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-[#25D366] text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 inline-block">
                Direct WhatsApp Workflow
              </span>
              
              <h3 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Browse. Select. Add to Cart.<br />
                <span className="text-[#25D366] italic font-light font-serif">Order via WhatsApp in 30 Seconds.</span>
              </h3>

              <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                We believe in genuine personal service. You never have to worry about complicated checkout gateways or robotic forms. Simply choose your frames or custom gifts, click <strong>Order via WhatsApp</strong>, and our team in Chennai will guide you through photo adjustments and dispatch tracking.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-white/80">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <strong className="text-white block font-mono text-sm mb-1">01. SELECT</strong>
                  <span className="text-white/60">Pick your frame sizes & items</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <strong className="text-white block font-mono text-sm mb-1">02. SEND</strong>
                  <span className="text-white/60">Click "Order via WhatsApp"</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <strong className="text-white block font-mono text-sm mb-1">03. CRAFT</strong>
                  <span className="text-white/60">RUBS team confirms & crafts!</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4 text-center">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-5 px-8 rounded-full bg-[#25D366] hover:opacity-90 active:scale-95 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </button>
              <span className="text-[11px] text-white/50 uppercase tracking-widest font-bold">
                Direct Helpline: {STORE_CONFIG.whatsappDisplayNumber}
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
