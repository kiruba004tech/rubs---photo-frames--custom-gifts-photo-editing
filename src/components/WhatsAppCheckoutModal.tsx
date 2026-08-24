import React, { useState } from 'react';
import { X, MessageCircle, ArrowRight, ShieldCheck, MapPin, User, Phone, FileText, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { buildWhatsAppUrl, formatCartWhatsAppOrder } from '../utils/whatsapp';
import { RubsLogo } from './RubsLogo';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    cart,
    items,
    subtotal,
    deliveryFee,
    grandTotal,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    directCheckoutItem,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isPhotoReady, setIsPhotoReady] = useState(true);

  if (!isCheckoutModalOpen) return null;

  const checkoutItems = directCheckoutItem ? [directCheckoutItem] : (cart || items || []);
  const checkoutSubtotal = directCheckoutItem
    ? directCheckoutItem.price * directCheckoutItem.quantity
    : subtotal;
  const checkoutDelivery =
    checkoutSubtotal === 0
      ? 0
      : checkoutSubtotal >= STORE_CONFIG.freeDeliveryThreshold
      ? 0
      : STORE_CONFIG.standardDeliveryFee;
  const checkoutTotal = checkoutSubtotal + checkoutDelivery;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const customerDetails = {
      name: customerName,
      phone: phone,
      deliveryAddress: address,
      notes: notes + (isPhotoReady ? ' (I will attach photos directly in WhatsApp)' : ''),
    };

    const message = formatCartWhatsAppOrder(
      checkoutItems,
      checkoutSubtotal,
      checkoutDelivery,
      checkoutTotal,
      customerDetails
    );
    const url = buildWhatsAppUrl(message);

    // Open WhatsApp in new tab
    window.open(url, '_blank');

    // Close checkout and clear cart if it was a general cart checkout
    setIsCheckoutModalOpen(false);
    if (!directCheckoutItem) {
      clearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-[#1A1A1A]">
      {/* Backdrop */}
      <div
        onClick={() => setIsCheckoutModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden z-10 animate-scale-in">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#F9F7F2] border-b border-black/5 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <RubsLogo size="sm" showText={false} />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
                  Direct WhatsApp Order
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                Complete Your RUBS Order
              </h3>
              <p className="text-xs text-black/60">
                Provide delivery details to auto-generate your direct WhatsApp order.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-2 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsAppOrder} className="p-6 sm:p-8 space-y-5">
          
          {/* Order Snapshot */}
          <div className="p-4 rounded-2xl bg-[#F9F7F2] border border-black/5 flex items-center justify-between text-xs">
            <div>
              <span className="text-black/60 font-medium">Order Total ({checkoutItems.length} {checkoutItems.length === 1 ? 'item' : 'items'}):</span>
              <strong className="block text-base font-serif font-bold text-black">
                {STORE_CONFIG.currencySymbol}{checkoutTotal}
              </strong>
            </div>
            <div className="text-right text-[10px] uppercase tracking-wider text-black/50">
              <span>{checkoutDelivery === 0 ? 'Free Delivery' : `+ ${STORE_CONFIG.currencySymbol}${checkoutDelivery} Delivery`}</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-black" />
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-black" />
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 6379769997"
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-black" />
                Delivery Address & Pincode *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No, Street, City, State & Pincode"
                className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 flex items-center gap-1.5">
                <FileText className="w-3 h-3 text-black" />
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Gift wrap required, please ship before Friday"
                className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
              />
            </div>

            {/* Photo Attachment Prompt */}
            <div className="p-4 rounded-2xl bg-[#F9F7F2] border border-black/5 flex items-center gap-3">
              <input
                type="checkbox"
                id="photoAttach"
                checked={isPhotoReady}
                onChange={(e) => setIsPhotoReady(e.target.checked)}
                className="w-4 h-4 rounded text-black focus:ring-black accent-black"
              />
              <label htmlFor="photoAttach" className="text-xs text-black/70 cursor-pointer">
                I will share the high-resolution photo files directly in the WhatsApp chat.
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#25D366] hover:opacity-90 active:scale-95 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Send Order to RUBS WhatsApp Desk</span>
            </button>

            <p className="text-[10px] text-center text-black/40 font-mono">
              Our artisan will confirm photo resolution & dispatch timelines immediately.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
