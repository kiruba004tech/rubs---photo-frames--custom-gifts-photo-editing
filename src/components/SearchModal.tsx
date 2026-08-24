import React, { useState } from 'react';
import { X, Search, Frame, Gift, Sliders, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PHOTO_FRAMES, CUSTOM_GIFTS, PHOTO_EDITING_SERVICES } from '../data/products';
import { STORE_CONFIG } from '../data/storeConfig';

interface SearchModalProps {
  setCurrentView: (view: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ setCurrentView }) => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setProductDetailModal,
    setCustomGiftModalProduct,
    setEditingModalService,
  } = useCart();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingFrames = trimmed
    ? PHOTO_FRAMES.filter(
        (f) =>
          f.name.toLowerCase().includes(trimmed) ||
          f.description.toLowerCase().includes(trimmed) ||
          f.material.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingGifts = trimmed
    ? CUSTOM_GIFTS.filter(
        (g) =>
          g.name.toLowerCase().includes(trimmed) ||
          g.description.toLowerCase().includes(trimmed) ||
          g.category.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingEditing = trimmed
    ? PHOTO_EDITING_SERVICES.filter(
        (s) =>
          s.name.toLowerCase().includes(trimmed) ||
          s.shortDescription.toLowerCase().includes(trimmed)
      )
    : [];

  const totalResults = matchingFrames.length + matchingGifts.length + matchingEditing.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 text-[#1A1A1A]">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden z-10 animate-scale-in">
        
        {/* Search Input Bar */}
        <div className="p-6 sm:p-8 bg-[#F9F7F2] border-b border-black/5 flex items-center gap-4">
          <Search className="w-6 h-6 text-black/60 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search frames, sizes, custom gifts, photo editing..."
            className="w-full bg-transparent text-base sm:text-lg text-black placeholder-black/40 focus:outline-none font-medium"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          {!trimmed ? (
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-black/40">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['8x10 Frame', 'Acrylic Lamp', 'Old Photo Restoration', 'Teak Wood', 'Spotify Plaque', '12x18 Frame', 'Custom Mug'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 rounded-full bg-[#F9F7F2] hover:bg-black hover:text-white text-xs font-bold text-black/70 transition-all border border-black/5"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-bold text-black">No results found for "{query}"</p>
              <p className="text-xs text-black/50">Try searching for teak, acrylic, mug, portrait, restoration...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Photo Frames Matches */}
              {matchingFrames.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-black/40">
                    Photo Frames ({matchingFrames.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingFrames.map((frame) => (
                      <div
                        key={frame.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setProductDetailModal(frame);
                        }}
                        className="p-3.5 rounded-2xl bg-[#F9F7F2] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Frame className="w-4 h-4 opacity-60" />
                          <div>
                            <strong className="block text-xs">{frame.name}</strong>
                            <span className="text-[10px] opacity-60">{frame.material}</span>
                          </div>
                        </div>
                        <span className="font-serif italic text-sm">{STORE_CONFIG.currencySymbol}{frame.basePrice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Gifts Matches */}
              {matchingGifts.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-black/40">
                    Custom Gifts ({matchingGifts.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingGifts.map((gift) => (
                      <div
                        key={gift.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setCustomGiftModalProduct(gift);
                        }}
                        className="p-3.5 rounded-2xl bg-[#F9F7F2] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Gift className="w-4 h-4 opacity-60" />
                          <div>
                            <strong className="block text-xs">{gift.name}</strong>
                            <span className="text-[10px] opacity-60">{gift.category}</span>
                          </div>
                        </div>
                        <span className="font-serif italic text-sm">from {STORE_CONFIG.currencySymbol}{gift.startingPrice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Editing Matches */}
              {matchingEditing.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-black/40">
                    Photo Editing Services ({matchingEditing.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingEditing.map((svc) => (
                      <div
                        key={svc.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setEditingModalService(svc);
                        }}
                        className="p-3.5 rounded-2xl bg-[#F9F7F2] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Sliders className="w-4 h-4 opacity-60" />
                          <div>
                            <strong className="block text-xs">{svc.name}</strong>
                            <span className="text-[10px] opacity-60">{svc.turnaround}</span>
                          </div>
                        </div>
                        <span className="font-serif italic text-sm">{STORE_CONFIG.currencySymbol}{svc.startingPrice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
