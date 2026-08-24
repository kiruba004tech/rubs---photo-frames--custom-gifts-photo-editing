import React, { useState } from 'react';
import { ShoppingBag, Zap, Eye, Star, Check } from 'lucide-react';
import { FrameProduct, SizePriceOption } from '../types';
import { STORE_CONFIG } from '../data/storeConfig';
import { useCart } from '../context/CartContext';

interface FrameCardProps {
  product: FrameProduct;
}

export const FrameCard: React.FC<FrameCardProps> = ({ product }) => {
  const { addToCart, triggerBuyNow, setProductDetailModal } = useCart();
  
  // Default to 8x10 or first size
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(3);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const currentSize: SizePriceOption = product.sizes[selectedSizeIndex] || product.sizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      type: 'frame',
      size: currentSize.size,
      material: product.material,
      price: currentSize.price,
      quantity: 1,
      imageLabel: `${currentSize.size.toUpperCase()} ${product.imagePlaceholder.label}`,
    });
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerBuyNow({
      productId: product.id,
      name: product.name,
      type: 'frame',
      size: currentSize.size,
      material: product.material,
      price: currentSize.price,
      quantity: 1,
      imageLabel: `${currentSize.size.toUpperCase()} ${product.imagePlaceholder.label}`,
    });
  };

  return (
    <div
      onClick={() => setProductDetailModal(product)}
      className="bg-white p-6 rounded-[2rem] shadow-xl border border-black/5 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-[9px] uppercase tracking-[0.2em] font-black text-black/60 bg-[#F9F7F2] px-3 py-1 rounded-full border border-black/5">
          {product.material.split('&')[0].trim()}
        </span>
        {product.bestseller && (
          <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white bg-black px-3 py-1 rounded-full">
            Bestseller
          </span>
        )}
      </div>

      {/* Frame Visual Simulation Box */}
      <div className="relative w-full h-56 bg-[#F9F7F2] rounded-2xl p-4 flex items-center justify-center border border-black/5 mb-5 overflow-hidden">
        
        {/* Frame Outer Border */}
        <div
          className="relative w-40 aspect-[4/5] rounded-sm p-3.5 shadow-xl flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundColor: product.imagePlaceholder.frameColor,
            boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          {/* Matboard */}
          <div
            className="w-full h-full rounded-[1px] p-2.5 flex flex-col items-center justify-center border border-black/10"
            style={{ backgroundColor: product.imagePlaceholder.innerColor }}
          >
            {/* Photo Area with bold typography placeholder */}
            <div className="w-full h-full border border-black/10 flex flex-col items-center justify-center p-2 text-[#1A1A1A]">
              <span className="text-[8px] font-black uppercase font-mono tracking-widest text-[#1A1A1A]">
                {currentSize.size.split('(')[0].trim()}
              </span>
              <span className="text-[7px] uppercase font-bold text-black/40 tracking-wider mt-0.5">
                PHOTO FRAME
              </span>
            </div>
          </div>
        </div>

        {/* Quick View Pill */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-black px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
            <Eye className="w-3 h-3" />
            Quick Inspect
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-black">
              {product.name}
            </h3>
            <span className="text-xl font-light tracking-tighter italic font-serif text-[#1A1A1A] shrink-0">
              {STORE_CONFIG.currencySymbol}{currentSize.price}
            </span>
          </div>

          <p className="text-xs text-black/50 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Size Selection Pills */}
        <div className="space-y-1.5 pt-2 border-t border-black/5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[10px]">
            <span className="uppercase font-bold tracking-wider text-black/60">Choose Size:</span>
            <span className="text-black/40 font-mono">{currentSize.dimensionsCm}</span>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {product.sizes.slice(0, 4).map((sz, idx) => {
              const isSelected = idx === selectedSizeIndex;
              return (
                <button
                  key={sz.size}
                  type="button"
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    isSelected
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-[#F9F7F2] text-black/70 hover:bg-black/10'
                  }`}
                >
                  {sz.size.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="grid grid-cols-2 gap-2 pt-3" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`py-3 px-3 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all ${
              isAddedAnim
                ? 'bg-[#25D366] text-white'
                : 'bg-[#F9F7F2] hover:bg-black hover:text-white text-black border border-black/5'
            }`}
          >
            {isAddedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="py-3 px-3 rounded-full bg-black hover:bg-black/80 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
