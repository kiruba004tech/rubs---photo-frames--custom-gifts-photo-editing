import React, { useState } from 'react';
import { PHOTO_EDITING_SERVICES } from '../data/products';
import { EditingServiceCard } from '../components/EditingServiceCard';
import { Sparkles, Sliders, MessageCircle, Clock, ShieldCheck, Zap } from 'lucide-react';
import { buildWhatsAppUrl, formatGeneralEnquiryMessage } from '../utils/whatsapp';

export const EditingView: React.FC = () => {
  const [selectedTurnaround, setSelectedTurnaround] = useState<string>('all');

  const filteredServices = PHOTO_EDITING_SERVICES.filter((service) => {
    if (selectedTurnaround === 'urgent') return service.turnaround.toLowerCase().includes('6') || service.turnaround.toLowerCase().includes('12');
    return true;
  });

  const handleCustomEditingWhatsApp = () => {
    const url = buildWhatsAppUrl(formatGeneralEnquiryMessage('a custom photo editing or restoration requirement'));
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
              Digital Studio Lab
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-[#1A1A1A] tracking-tighter">
            Photo Editing & Restoration
          </h1>

          <p className="text-xs sm:text-sm text-black/60 max-w-xl leading-relaxed">
            Professional image retouching, old damaged photo restoration, background cleanup, and high-resolution upscaling for crisp framing. Hand-retouched by expert graphic artists.
          </p>
        </div>

        {/* Custom Consultation Action */}
        <button
          onClick={handleCustomEditingWhatsApp}
          className="bg-[#25D366] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-md self-start md:self-auto shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
          <span>Send Photo for Free Quote</span>
        </button>
      </div>

      {/* Benefits Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-[2rem] bg-[#F9F7F2] border border-black/5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xs shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Rapid 6–24 Hour Turnaround</h4>
            <p className="text-[11px] text-black/60 mt-0.5">Quick delivery directly via WhatsApp high-res link.</p>
          </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-[#F9F7F2] border border-black/5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">100% Privacy & Security</h4>
            <p className="text-[11px] text-black/60 mt-0.5">Your personal photos are strictly deleted post delivery.</p>
          </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-[#F9F7F2] border border-black/5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xs shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Unlimited Minor Tweaks</h4>
            <p className="text-[11px] text-black/60 mt-0.5">We make adjustments until you are completely satisfied.</p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <EditingServiceCard key={service.id} service={service} />
        ))}
      </div>

    </div>
  );
};
