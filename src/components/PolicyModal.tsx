import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

export const PolicyModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal } = useCart();

  if (!activePolicyModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-[#1A1A1A]">
      {/* Backdrop */}
      <div
        onClick={() => setActivePolicyModal(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden z-10 animate-scale-in">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#F9F7F2] border-b border-black/5 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
              Studio Policy & Assurance
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A] capitalize">
              {activePolicyModal === 'shipping' && 'Shipping & Safe Packaging Policy'}
              {activePolicyModal === 'return' && 'Transit Damage & Replacement Guarantee'}
              {activePolicyModal === 'privacy' && 'Photo Privacy & Data Security Policy'}
              {activePolicyModal === 'terms' && 'Terms of Service & Ordering'}
            </h3>
          </div>

          <button
            onClick={() => setActivePolicyModal(null)}
            className="p-2 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Content */}
        <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-black/70 leading-relaxed max-h-[60vh] overflow-y-auto">
          
          {activePolicyModal === 'shipping' && (
            <>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F9F7F2] border border-black/5 text-black">
                <Truck className="w-6 h-6 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Free delivery across India on orders above {STORE_CONFIG.currencySymbol}{STORE_CONFIG.freeDeliveryThreshold}
                </span>
              </div>
              <p>
                <strong>Dispatch Timeline:</strong> Standard photo frames and digital editing orders are dispatched within 24 to 48 business hours. Custom fabricated gifts (such as 3D acrylic lamps and customized mugs) are dispatched within 3 business days following customer WhatsApp digital proof approval.
              </p>
              <p>
                <strong>5-Ply Shatterproof Packaging:</strong> Glass and acrylic frames are sealed in thermo-insulated corner protectors, multiple layers of industrial bubble wrap, and rigid 5-ply corrugated outer boxes.
              </p>
              <p>
                <strong>Tracking:</strong> Live courier tracking links (Bluedart, Delhivery, DTDC) will be automatically dispatched to your WhatsApp number as soon as the package leaves our studio.
              </p>
            </>
          )}

          {activePolicyModal === 'return' && (
            <>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F9F7F2] border border-black/5 text-black">
                <RotateCcw className="w-6 h-6 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  100% Free Hassle-Free Replacement for Transit Damage
                </span>
              </div>
              <p>
                Because our items are personalized and custom framed to your specifications, returns for change of mind are not accepted once manufactured.
              </p>
              <p>
                <strong>Transit Damage Guarantee:</strong> If your package arrives with broken glass, frame damage, or printing defect, simply record a 15-second unboxing video or take 2 clear photographs and send them to our WhatsApp support line ({STORE_CONFIG.whatsappDisplayNumber}) within 48 hours of delivery.
              </p>
              <p>
                We will immediately manufacture and ship an express replacement frame at zero extra cost to you.
              </p>
            </>
          )}

          {activePolicyModal === 'privacy' && (
            <>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F9F7F2] border border-black/5 text-black">
                <ShieldCheck className="w-6 h-6 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Strict Confidentiality & Auto-Deletion
                </span>
              </div>
              <p>
                We treat your private family photographs, romantic portraits, and personal documents with utmost respect and security.
              </p>
              <p>
                <strong>Zero Public Sharing:</strong> We NEVER post your photos or customized gifts on social media or marketing portfolios without your explicit written permission on WhatsApp.
              </p>
              <p>
                <strong>Photo Deletion:</strong> All high-resolution image files sent for printing and retouching are permanently purged from our workstations 14 days after successful delivery confirmation.
              </p>
            </>
          )}

          {activePolicyModal === 'terms' && (
            <>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F9F7F2] border border-black/5 text-black">
                <FileText className="w-6 h-6 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  RUBS Transparent Ordering Terms
                </span>
              </div>
              <p>
                <strong>Direct WhatsApp Ordering:</strong> Orders submitted on the RUBS platform are transmitted directly to our studio coordinators on WhatsApp. An order is finalized once our coordinator confirms your photo specifications and payment arrangement.
              </p>
              <p>
                <strong>Mockup Approvals:</strong> For custom gifts and photo editing, our team provides digital previews. Production commences only upon receiving your confirmation.
              </p>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 bg-[#F9F7F2] border-t border-black/5 flex justify-end">
          <button
            onClick={() => setActivePolicyModal(null)}
            className="px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
