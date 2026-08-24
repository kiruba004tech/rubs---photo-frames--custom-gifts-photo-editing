import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, ArrowRight, Sliders } from 'lucide-react';
import { PhotoEditingService } from '../types';
import { STORE_CONFIG } from '../data/storeConfig';
import { useCart } from '../context/CartContext';

interface EditingServiceCardProps {
  service: PhotoEditingService;
}

export const EditingServiceCard: React.FC<EditingServiceCardProps> = ({ service }) => {
  const { setEditingModalService } = useCart();
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  return (
    <div
      onClick={() => setEditingModalService(service)}
      className="bg-white p-6 rounded-[2rem] shadow-xl border border-black/5 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer"
    >
      {/* Sample Before/After Simulation Showcase Area */}
      <div className="relative aspect-[16/10] bg-[#F9F7F2] rounded-2xl p-4 flex flex-col justify-between overflow-hidden border border-black/5 mb-5" onClick={(e) => e.stopPropagation()}>
        
        {/* Toggle Switch */}
        <div className="flex items-center justify-between z-20">
          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white text-black shadow-sm border border-black/5">
            {service.turnaround}
          </span>
          <div className="flex bg-white/80 p-0.5 rounded-full border border-black/10 text-[9px] font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('before')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                activeTab === 'before'
                  ? 'bg-black text-white'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                activeTab === 'after'
                  ? 'bg-black text-white'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              After (RUBS)
            </button>
          </div>
        </div>

        {/* Dynamic Visual Mock Preview */}
        <div className="my-auto py-2 flex flex-col items-center justify-center text-center z-10">
          {activeTab === 'before' ? (
            <div className="space-y-1.5 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-lg bg-red-100 border border-red-200 text-red-900 text-xs font-mono font-bold">
                {service.sampleBefore.label}
              </div>
              <p className="text-[11px] text-black/60 max-w-[260px] line-clamp-2">
                {service.sampleBefore.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1 pt-1">
                {service.sampleBefore.tags.map((t, idx) => (
                  <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-white text-black/60 font-medium">
                    ✕ {t}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1.5 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-mono font-bold">
                {service.sampleAfter.label}
              </div>
              <p className="text-[11px] text-black/70 max-w-[260px] line-clamp-2">
                {service.sampleAfter.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1 pt-1">
                {service.sampleAfter.tags.map((t, idx) => (
                  <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-white text-black font-bold shadow-xs">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-[9px] text-black/40 font-mono font-bold text-center z-10 uppercase tracking-widest">
          {service.name.toUpperCase()} — SAMPLE DEMO
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-black">
              {service.name}
            </h3>
            <span className="text-xl font-light tracking-tighter italic font-serif text-[#1A1A1A] shrink-0">
              {STORE_CONFIG.currencySymbol}{service.startingPrice}
              <span className="text-[11px] not-italic font-sans text-black/50 ml-1">{service.priceUnit}</span>
            </span>
          </div>

          <p className="text-xs text-black/50 leading-relaxed line-clamp-2">
            {service.shortDescription}
          </p>

          <div className="space-y-1 pt-2">
            {service.deliverables.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-black/70 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Request Service on WhatsApp */}
        <div className="pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEditingModalService(service);
            }}
            className="w-full py-3.5 px-4 rounded-full bg-black hover:bg-black/80 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Request This Service</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
