import React, { useState } from 'react';
import { PHOTO_FRAMES } from '../data/products';
import { FrameCard } from '../components/FrameCard';
import { Ruler, Sparkles, Filter, Grid3X3, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FramesView: React.FC = () => {
  const { setIsSizeGuideOpen } = useCart();
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedBestsellerOnly, setSelectedBestsellerOnly] = useState<boolean>(false);

  const materials = [
    { id: 'all', label: 'All Frame Finishes' },
    { id: 'wood', label: 'Solid Teak & Oak' },
    { id: 'metal', label: 'Metallic & Rose Gold' },
    { id: 'acrylic', label: 'Floating Cast Acrylic' },
    { id: 'polymer', label: 'Matte Gallery Polymers' },
  ];

  const filteredFrames = PHOTO_FRAMES.filter((frame) => {
    if (selectedBestsellerOnly && !frame.bestseller) return false;
    if (selectedMaterial === 'wood') return frame.material.toLowerCase().includes('wood') || frame.material.toLowerCase().includes('teak') || frame.material.toLowerCase().includes('oak');
    if (selectedMaterial === 'metal') return frame.material.toLowerCase().includes('metal') || frame.material.toLowerCase().includes('aluminum') || frame.material.toLowerCase().includes('gold');
    if (selectedMaterial === 'acrylic') return frame.material.toLowerCase().includes('acrylic');
    if (selectedMaterial === 'polymer') return frame.material.toLowerCase().includes('polymer') || frame.material.toLowerCase().includes('matte');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-12">
      
      {/* Header Banner (Bold Typography) */}
      <div className="border-b border-black/5 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-black"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
              Bespoke Framing Collection
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-[#1A1A1A] tracking-tighter">
            Handcrafted Photo Frames
          </h1>

          <p className="text-xs sm:text-sm text-black/60 max-w-xl leading-relaxed">
            Museum-quality framing handcrafted from premium seasoned woods, metals, and crystal acrylic. Available in 10 standard dimensions from desktop accents to grand wall galleries.
          </p>
        </div>

        {/* Size Guide Action Pill */}
        <button
          onClick={() => setIsSizeGuideOpen(true)}
          className="bg-black text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black/80 transition-all shadow-md self-start md:self-auto shrink-0"
        >
          <Ruler className="w-4 h-4" />
          <span>Interactive Size Guide</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {materials.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMaterial(m.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedMaterial === m.id
                  ? 'bg-black text-white'
                  : 'bg-[#F9F7F2] text-black/70 hover:bg-black/10 border border-black/5'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSelectedBestsellerOnly(!selectedBestsellerOnly)}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            selectedBestsellerOnly
              ? 'bg-black text-white'
              : 'bg-[#F9F7F2] text-black/70 hover:bg-black/10 border border-black/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bestsellers Only</span>
        </button>
      </div>

      {/* Frames Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredFrames.map((frame) => (
          <FrameCard key={frame.id} product={frame} />
        ))}
      </div>

      {filteredFrames.length === 0 && (
        <div className="text-center py-16 bg-[#F9F7F2] rounded-[2rem] border border-black/5 space-y-4">
          <p className="text-sm font-bold text-black uppercase tracking-wider">No matching frames in this filter.</p>
          <button
            onClick={() => {
              setSelectedMaterial('all');
              setSelectedBestsellerOnly(false);
            }}
            className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
