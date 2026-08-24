import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Zap, Ruler, Check, Palette, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { SizePriceOption } from '../types';
import { playPopSound } from '../utils/audio';

export interface FrameColorOption {
  id: string;
  name: string;
  swatchHex: string;
  frameColor: string;
  innerColor: string;
  borderShadow: string;
  textureLabel: string;
  accentBadge: string;
}

export const FRAME_COLOR_VARIANTS: FrameColorOption[] = [
  {
    id: 'matte-black',
    name: 'Noir Matte Black',
    swatchHex: '#1c1917',
    frameColor: '#1c1917',
    innerColor: '#f5f5f4',
    borderShadow: '0 25px 40px -15px rgba(0, 0, 0, 0.65), inset 0 0 14px rgba(0,0,0,0.85)',
    textureLabel: 'Velvet Architectural Matte',
    accentBadge: 'Bestseller',
  },
  {
    id: 'natural-teak',
    name: 'Heritage Natural Teak',
    swatchHex: '#78350f',
    frameColor: '#78350f',
    innerColor: '#fafaf9',
    borderShadow: '0 25px 40px -15px rgba(69, 26, 3, 0.6), inset 0 0 12px rgba(69, 26, 3, 0.7)',
    textureLabel: 'Handcrafted Solid Wood Grain',
    accentBadge: 'Handcrafted',
  },
  {
    id: 'antique-gold',
    name: 'Royale Antique Gold',
    swatchHex: '#d97706',
    frameColor: '#d97706',
    innerColor: '#fffbeb',
    borderShadow: '0 25px 40px -15px rgba(180, 83, 9, 0.55), inset 0 0 10px rgba(120, 53, 15, 0.6)',
    textureLabel: 'Brushed Champagne Gold Foil',
    accentBadge: 'Luxury',
  },
  {
    id: 'blonde-birch',
    name: 'Nordic Blonde Birch',
    swatchHex: '#d6d3d1',
    frameColor: '#e7e5e4',
    innerColor: '#ffffff',
    borderShadow: '0 20px 35px -12px rgba(0, 0, 0, 0.25), inset 0 0 8px rgba(0,0,0,0.15)',
    textureLabel: 'Scandinavian Raw Blonde Timber',
    accentBadge: 'Minimalist',
  },
  {
    id: 'dark-walnut',
    name: 'Artisan Dark Walnut',
    swatchHex: '#451a03',
    frameColor: '#451a03',
    innerColor: '#fafaf9',
    borderShadow: '0 25px 40px -15px rgba(41, 15, 2, 0.7), inset 0 0 14px rgba(0,0,0,0.8)',
    textureLabel: 'Deep Espresso Walnut Stained',
    accentBadge: 'Shadowbox',
  },
  {
    id: 'pure-white',
    name: 'Studio Gallery White',
    swatchHex: '#f8fafc',
    frameColor: '#ffffff',
    innerColor: '#f1f5f9',
    borderShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.2), inset 0 0 6px rgba(0,0,0,0.1)',
    textureLabel: 'Crisp Architectural Satin White',
    accentBadge: 'Contemporary',
  },
  {
    id: 'rose-gold',
    name: 'Luxe Rose Gold',
    swatchHex: '#fb7185',
    frameColor: '#fb7185',
    innerColor: '#fff1f2',
    borderShadow: '0 25px 40px -15px rgba(225, 29, 72, 0.45), inset 0 0 10px rgba(159, 18, 57, 0.5)',
    textureLabel: 'Anodized Brushed Aluminum',
    accentBadge: 'Metallic',
  },
  {
    id: 'floating-acrylic',
    name: 'Lumina Crystal Acrylic',
    swatchHex: '#38bdf8',
    frameColor: '#38bdf8',
    innerColor: '#f0f9ff',
    borderShadow: '0 25px 45px -12px rgba(2, 132, 199, 0.4), inset 0 0 12px rgba(14, 165, 233, 0.5)',
    textureLabel: 'Diamond-Polished Frameless Float',
    accentBadge: 'UV-Shield',
  },
];

export const ProductDetailModal: React.FC = () => {
  const { productDetailModal, setProductDetailModal, addToCart, triggerBuyNow, setIsSizeGuideOpen } = useCart();
  const [selectedSizeIdx, setSelectedSizeIdx] = useState<number>(3); // 8x10
  const [isAddedAnim, setIsAddedAnim] = useState(false);
  const [activeColorId, setActiveColorId] = useState<string>('matte-black');
  const [isFading, setIsFading] = useState<boolean>(false);

  // Sync initial color variant when a product is opened
  useEffect(() => {
    if (productDetailModal) {
      const match = FRAME_COLOR_VARIANTS.find(
        (v) =>
          v.name.toLowerCase().includes(productDetailModal.color?.toLowerCase() || '') ||
          productDetailModal.name.toLowerCase().includes(v.id) ||
          v.frameColor.toLowerCase() === productDetailModal.imagePlaceholder?.frameColor?.toLowerCase()
      );
      setActiveColorId(match ? match.id : 'matte-black');
    }
  }, [productDetailModal]);

  if (!productDetailModal) return null;

  const currentSize: SizePriceOption = productDetailModal.sizes[selectedSizeIdx] || productDetailModal.sizes[0];
  const activeColor = FRAME_COLOR_VARIANTS.find((c) => c.id === activeColorId) || FRAME_COLOR_VARIANTS[0];

  const handleColorChange = (colorId: string) => {
    if (colorId === activeColorId) return;
    playPopSound();
    setIsFading(true);
    setTimeout(() => {
      setActiveColorId(colorId);
      setIsFading(false);
    }, 150);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: productDetailModal.id,
      name: productDetailModal.name,
      type: 'frame',
      size: currentSize.size,
      material: `${productDetailModal.material} (${activeColor.name})`,
      customDetails: `Finish: ${activeColor.name} • ${activeColor.textureLabel}`,
      price: currentSize.price,
      quantity: 1,
      imageLabel: `${currentSize.size.toUpperCase()} ${activeColor.name.toUpperCase()}`,
    });
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1500);
  };

  const handleBuyNow = () => {
    triggerBuyNow({
      productId: productDetailModal.id,
      name: productDetailModal.name,
      type: 'frame',
      size: currentSize.size,
      material: `${productDetailModal.material} (${activeColor.name})`,
      customDetails: `Finish: ${activeColor.name} • ${activeColor.textureLabel}`,
      price: currentSize.price,
      quantity: 1,
      imageLabel: `${currentSize.size.toUpperCase()} ${activeColor.name.toUpperCase()}`,
    });
    setProductDetailModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-[#1A1A1A]">
      {/* Backdrop */}
      <div
        onClick={() => setProductDetailModal(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden z-10 animate-scale-in">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#F9F7F2] border-b border-black/5 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
                {productDetailModal.material}
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/5 text-black/70 uppercase tracking-wider">
                {activeColor.name}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-black text-[#1A1A1A]">
              {productDetailModal.name}
            </h3>
          </div>

          <button
            onClick={() => setProductDetailModal(null)}
            className="p-2 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors"
            title="Close dialog"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split Presentation */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left: Frame Interactive Dynamic Visualization (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-between bg-[#F9F7F2] rounded-[2rem] p-6 border border-black/5 relative overflow-hidden">
            
            {/* Visualizer Header Tag */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono uppercase text-black/50 tracking-wider mb-4">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#25D366]" />
                Live Finish Render
              </span>
              <span className="font-bold text-black/70">{activeColor.accentBadge}</span>
            </div>

            {/* Smooth-Fading Frame Container */}
            <div className="py-4 flex items-center justify-center w-full min-h-[260px]">
              <div
                className={`relative w-48 aspect-[4/5] rounded-sm p-4.5 transition-all duration-300 ease-out flex flex-col items-center justify-center text-center ${
                  isFading ? 'opacity-20 scale-95 blur-[1px]' : 'opacity-100 scale-100 blur-0'
                }`}
                style={{
                  backgroundColor: activeColor.frameColor,
                  boxShadow: activeColor.borderShadow,
                }}
              >
                {/* Frame Inner Mat */}
                <div
                  className="w-full h-full rounded-[1px] p-3 flex flex-col items-center justify-center border border-black/10 transition-colors duration-300"
                  style={{ backgroundColor: activeColor.innerColor }}
                >
                  <div className="w-full h-full border border-black/10 flex flex-col items-center justify-center p-2 text-[#1A1A1A] space-y-1">
                    <span className="text-[11px] font-black uppercase font-mono tracking-widest text-[#1A1A1A]">
                      {currentSize.size}
                    </span>
                    <span className="text-[8px] uppercase font-bold text-black/50 tracking-wider">
                      {activeColor.name}
                    </span>
                    <span className="text-[7px] uppercase font-mono text-black/30 tracking-tight">
                      RUBS ARCHIVAL
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Specs Footer */}
            <div className="w-full mt-4 pt-3 border-t border-black/5 text-center space-y-0.5">
              <span className="block text-[11px] font-semibold text-black/80">
                {activeColor.textureLabel}
              </span>
              <span className="block text-[9px] text-black/40 font-mono font-bold uppercase tracking-widest">
                Dimensions: {currentSize.dimensionsCm}
              </span>
            </div>
          </div>

          {/* Right: Specifications, Color Variants & Size Selection (7 cols) */}
          <div className="md:col-span-7 space-y-5 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-light italic font-serif text-black">
                  {STORE_CONFIG.currencySymbol}{currentSize.price}
                </span>
                <span className="text-xs text-black/50">
                  Tax included • Safe bubble packing included
                </span>
              </div>

              <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
                {productDetailModal.description}
              </p>

              {/* Dynamic Frame Color Variant Selector */}
              <div className="space-y-2.5 pt-2 pb-1 border-t border-black/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-black/80">
                    <Palette className="w-3.5 h-3.5 text-black" />
                    <span>Frame Finish & Color Variant:</span>
                  </div>
                  <span className="text-[11px] font-bold text-black">
                    {activeColor.name}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {FRAME_COLOR_VARIANTS.map((col) => {
                    const isSelected = col.id === activeColorId;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => handleColorChange(col.id)}
                        className={`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md scale-105 ring-2 ring-black/20'
                            : 'bg-[#F9F7F2] text-black/75 border-black/10 hover:border-black/30 hover:bg-white'
                        }`}
                        title={`${col.name} (${col.textureLabel})`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full shrink-0 border transition-transform ${
                            isSelected ? 'border-white ring-1 ring-white/50 scale-110' : 'border-black/20 group-hover:scale-110'
                          }`}
                          style={{ backgroundColor: col.swatchHex }}
                        />
                        <span className="text-[10px] font-semibold whitespace-nowrap">
                          {col.name.replace('RUBS ', '')}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-white ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Matrix */}
              <div className="space-y-2 pt-1 border-t border-black/5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-black/70">
                    Select Frame Size:
                  </span>
                  <button
                    onClick={() => {
                      setProductDetailModal(null);
                      setIsSizeGuideOpen(true);
                    }}
                    className="text-[10px] uppercase font-bold text-black hover:underline flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {productDetailModal.sizes.map((sz, idx) => {
                    const isSelected = idx === selectedSizeIdx;
                    return (
                      <button
                        key={sz.size}
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setSelectedSizeIdx(idx);
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-[#F9F7F2] text-black/70 border-black/5 hover:border-black/20'
                        }`}
                      >
                        <div className="text-xs font-mono font-bold">{sz.size}</div>
                        <div className="text-[10px] opacity-70 flex justify-between">
                          <span>{sz.dimensionsCm}</span>
                          <span className="font-bold">{STORE_CONFIG.currencySymbol}{sz.price}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-1 pt-1 text-xs text-black/70">
                {productDetailModal.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Add to Cart & Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-black/5">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`py-3.5 px-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  isAddedAnim
                    ? 'bg-[#25D366] text-white'
                    : 'bg-[#F9F7F2] hover:bg-black hover:text-white text-black border border-black/5'
                }`}
              >
                {isAddedAnim ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="py-3.5 px-4 rounded-full bg-black hover:bg-black/80 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

