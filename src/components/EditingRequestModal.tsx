import React, { useState } from 'react';
import { X, MessageCircle, Sliders, UploadCloud, CheckCircle2, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { buildWhatsAppUrl, formatEditingRequestWhatsAppMessage } from '../utils/whatsapp';

export const EditingRequestModal: React.FC = () => {
  const { editingModalService, setEditingModalService } = useCart();
  const [editingInstructions, setEditingInstructions] = useState('');
  const [photoCount, setPhotoCount] = useState(1);
  const [isUrgent, setIsUrgent] = useState(false);

  if (!editingModalService) return null;

  const handleSendEditingWhatsApp = () => {
    const message = formatEditingRequestWhatsAppMessage(
      editingModalService.name,
      photoCount,
      editingInstructions || 'Standard restoration as per service sample',
      isUrgent ? 'Express 6-Hour Turnaround' : editingModalService.turnaround
    );
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');
    setEditingModalService(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-[#1A1A1A]">
      {/* Backdrop */}
      <div
        onClick={() => setEditingModalService(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden z-10 animate-scale-in">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#F9F7F2] border-b border-black/5 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
              Digital Studio Retouching
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {editingModalService.name}
            </h3>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xl font-serif italic text-black font-light">
                {STORE_CONFIG.currencySymbol}{editingModalService.startingPrice} {editingModalService.priceUnit}
              </span>
              <span className="text-[10px] uppercase tracking-widest bg-black text-white px-2.5 py-0.5 rounded-full font-bold">
                {editingModalService.turnaround}
              </span>
            </div>
          </div>

          <button
            onClick={() => setEditingModalService(null)}
            className="p-2 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs text-black/60 leading-relaxed">
            {editingModalService.fullDescription}
          </p>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 block">
              Deliverables Included
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {editingModalService.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-black/70 bg-[#F9F7F2] p-2.5 rounded-xl border border-black/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Number of Photos & Urgent flag */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 block">
                Number of Photos
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={photoCount}
                onChange={(e) => setPhotoCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 block">
                Turnaround Speed
              </label>
              <button
                type="button"
                onClick={() => setIsUrgent(!isUrgent)}
                className={`w-full py-3 px-3 rounded-xl text-xs font-bold transition-all border ${
                  isUrgent
                    ? 'bg-black text-white border-black'
                    : 'bg-[#F9F7F2] text-black/70 border-black/10'
                }`}
              >
                {isUrgent ? 'Express (6h)' : 'Standard (24h)'}
              </button>
            </div>
          </div>

          {/* Specific notes */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 block">
              Editing Instructions / Damage Notes
            </label>
            <textarea
              rows={3}
              value={editingInstructions}
              onChange={(e) => setEditingInstructions(e.target.value)}
              placeholder="e.g. Remove background tourist, fix scratch on face, enhance colors for 12x18 frame..."
              className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
            />
          </div>

          {/* WhatsApp Action Button */}
          <div className="pt-2">
            <button
              onClick={handleSendEditingWhatsApp}
              className="w-full py-4 rounded-full bg-[#25D366] hover:opacity-90 active:scale-95 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Send Request to RUBS Studio WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-black/40 mt-2 font-mono">
              You can send your raw photo image files straight to our WhatsApp chat.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
