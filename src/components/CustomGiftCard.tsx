import React from 'react';
import { Gift, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { CustomGiftProduct } from '../types';
import { STORE_CONFIG } from '../data/storeConfig';
import { useCart } from '../context/CartContext';

interface CustomGiftCardProps {
  gift: CustomGiftProduct;
}

export const CustomGiftCard: React.FC<CustomGiftCardProps> = ({ gift }) => {
  const { setCustomGiftModalProduct } = useCart();

  return (
    <div
      onClick={() => setCustomGiftModalProduct(gift)}
      className="bg-white p-6 rounded-[2rem] shadow-xl border border-black/5 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer"
    >
      {/* Top Category Badge */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-[9px] uppercase tracking-[0.2em] font-black text-black/60 bg-[#F9F7F2] px-3 py-1 rounded-full border border-black/5">
          {gift.category}
        </span>
        <span className="text-[9px] uppercase tracking-[0.15em] font-black text-black/40">
          Personalized
        </span>
      </div>

      {/* Visual Simulation Box */}
      <div
        className="w-full h-52 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden mb-5 border border-black/5 transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundColor: gift.placeholderBg }}
      >
        <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-black mb-3">
          <Gift className="w-6 h-6 text-black" />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
          {gift.name}
        </span>
        <span className="text-[9px] uppercase font-bold text-black/50 tracking-wider mt-1">
          CUSTOM PHOTO PLACEHOLDER
        </span>

        {/* Floating Custom Tag */}
        <div className="mt-3 px-3 py-1 rounded-full bg-white/90 shadow-sm border border-black/5 text-[9px] font-bold tracking-wider text-black">
          Free WhatsApp Mockup Preview
        </div>
      </div>

      {/* Details & Specs */}
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-black">
              {gift.name}
            </h3>
            <span className="text-xl font-light tracking-tighter italic font-serif text-[#1A1A1A] shrink-0">
              from {STORE_CONFIG.currencySymbol}{gift.startingPrice}
            </span>
          </div>

          <p className="text-xs text-black/50 line-clamp-2 leading-relaxed">
            {gift.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {(gift.customizationOptions || gift.details || []).slice(0, 3).map((opt) => (
              <span
                key={opt}
                className="text-[9px] font-medium bg-[#F9F7F2] text-black/70 px-2 py-0.5 rounded-md"
              >
                + {opt}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button: Customize / Request Custom Gift */}
        <div className="pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCustomGiftModalProduct(gift);
            }}
            className="w-full py-3.5 px-4 rounded-full bg-black hover:bg-black/80 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize This Gift</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
