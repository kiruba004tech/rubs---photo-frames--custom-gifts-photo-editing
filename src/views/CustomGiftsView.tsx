import React, { useState } from 'react';
import { CUSTOM_GIFTS } from '../data/products';
import { CustomGiftCard } from '../components/CustomGiftCard';
import { MessageCircle, Sparkles, Heart } from 'lucide-react';
import { buildWhatsAppUrl, formatGeneralEnquiryMessage } from '../utils/whatsapp';

export const CustomGiftsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Custom Gifts' },
    { id: 'Living & Decor', label: 'Lamps & Acrylic Decor' },
    { id: 'Drinkware', label: 'Custom Drinkware & Mugs' },
    { id: 'Textiles & Apparel', label: 'Velvet Cushions & Tees' },
    { id: 'Desk & Accessories', label: 'Stationery & Keychains' },
  ];

  const filteredGifts = CUSTOM_GIFTS.filter((gift) => {
    if (selectedCategory === 'all') return true;
    return gift.category === selectedCategory;
  });

  const handleCustomRequestWhatsApp = () => {
    const url = buildWhatsAppUrl(formatGeneralEnquiryMessage('a personalized gift idea'));
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-12">
      
      {/* Header Banner (Bold Typography) */}
      <div className="border-b border-black/5 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-black"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
              Personalized Keepsake Studio
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-[#1A1A1A] tracking-tighter">
            Custom Gifts & Keepsakes
          </h1>

          <p className="text-xs sm:text-sm text-black/60 max-w-xl leading-relaxed">
            Turn your happiest memories into physical heirlooms. Choose any gift, share your photos and personal details, and receive a free digital preview on WhatsApp prior to production.
          </p>
        </div>

        {/* Custom Request Action */}
        <button
          onClick={handleCustomRequestWhatsApp}
          className="bg-[#25D366] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-md self-start md:self-auto shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
          <span>Have a Custom Idea?</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-black/5 pb-6">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === c.id
                ? 'bg-black text-white'
                : 'bg-[#F9F7F2] text-black/70 hover:bg-black/10 border border-black/5'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGifts.map((gift) => (
          <CustomGiftCard key={gift.id} gift={gift} />
        ))}
      </div>

      {/* Info Banner */}
      <div className="rounded-[2.5rem] bg-[#F9F7F2] border border-black/5 p-8 sm:p-12 text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
          How Personalization Works
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A]">
          Direct Artisanal Collaboration on WhatsApp
        </h3>
        <p className="text-xs sm:text-sm text-black/60 max-w-xl mx-auto leading-relaxed">
          When you submit a gift request, our design team formats your photo, adjusts colors, adds your personal text, and sends you a high-resolution WhatsApp mockup. Only after your approval is the piece printed and assembled.
        </p>
      </div>

    </div>
  );
};
