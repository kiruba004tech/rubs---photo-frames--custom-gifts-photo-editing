import React, { useState } from 'react';
import { buildWhatsAppUrl, formatGeneralEnquiryMessage } from '../utils/whatsapp';
import { playPopSound } from '../utils/audio';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = () => {
    playPopSound();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 200);

    const url = buildWhatsAppUrl(formatGeneralEnquiryMessage());
    window.open(url, '_blank');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="fixed bottom-8 right-6 sm:bottom-10 sm:right-10 z-50 flex items-center">
      {/* Floating Pill Trigger */}
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center gap-3.5 bg-white p-2 pr-6 rounded-full shadow-2xl border border-black/5 cursor-pointer hover:translate-y-[-4px] active:scale-95 transition-all duration-150 group select-none ${
          isPopping ? 'scale-95 ring-2 ring-[#25D366]/40' : ''
        }`}
        title="Direct WhatsApp Support"
        role="button"
        tabIndex={0}
      >
        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 active:scale-90 transition-transform shrink-0">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]">
            Chat with RUBS
          </span>
          <span className="text-[9px] text-black/40 uppercase font-black tracking-wider">
            Typically replies in 5m
          </span>
        </div>
      </div>
    </div>
  );
};
