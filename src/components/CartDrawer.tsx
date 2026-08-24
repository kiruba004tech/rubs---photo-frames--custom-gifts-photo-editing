import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { buildWhatsAppUrl, formatCartWhatsAppOrder } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart = [],
    items = [],
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal = 0,
    deliveryFee = 0,
    grandTotal = 0,
    totalItems = 0,
    setIsCheckoutModalOpen,
  } = useCart();

  const cartList = cart && cart.length > 0 ? cart : (items || []);

  if (!isCartOpen) return null;

  const handleProceedToWhatsAppCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleDirectWhatsAppFastTrack = () => {
    const url = buildWhatsAppUrl(formatCartWhatsAppOrder(cartList, subtotal, deliveryFee, grandTotal));
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-black/5 flex flex-col shadow-2xl text-[#1A1A1A]">
          
          {/* Header */}
          <div className="p-6 border-b border-black/5 flex items-center justify-between bg-[#F9F7F2]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-black text-[#1A1A1A]">
                  Shopping Cart
                </h2>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/50">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-black/60 hover:text-black hover:bg-black/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#F9F7F2] border border-black/5 flex items-center justify-center text-black/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-black">Your Cart is Empty</h3>
                  <p className="text-xs text-black/50 max-w-[240px]">
                    Explore our handcrafted photo frames, custom personalized gifts, or editing services.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all shadow-md"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-black/5 text-xs text-black/50">
                  <span>Order Items</span>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-bold uppercase tracking-wider text-[10px]"
                  >
                    Clear All
                  </button>
                </div>

                {cartList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#F9F7F2] border border-black/5 space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold bg-white text-black px-2 py-0.5 rounded border border-black/5">
                            {item.type}
                          </span>
                          {item.size && (
                            <span className="text-[10px] font-bold text-black">
                              {item.size}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#1A1A1A]">
                          {item.name}
                        </h4>
                        {item.material && (
                          <p className="text-[11px] text-black/50">{item.material}</p>
                        )}
                        {item.customDetails && (
                          <p className="text-[11px] text-black/60 italic font-mono">
                            Note: {item.customDetails}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-black/40 hover:text-red-600 rounded-lg hover:bg-black/5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/5">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-black/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-black/70 hover:bg-black/5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-black/70 hover:bg-black/5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-[#1A1A1A]">
                          {STORE_CONFIG.currencySymbol}{item.price * item.quantity}
                        </span>
                        <div className="text-[9px] text-black/40">
                          {STORE_CONFIG.currencySymbol}{item.price} each
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer / Summary */}
          {cartList.length > 0 && (
            <div className="p-6 border-t border-black/5 bg-[#F9F7F2] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-black/60">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-black">{STORE_CONFIG.currencySymbol}{subtotal}</span>
                </div>
                <div className="flex justify-between text-black/60">
                  <span>Estimated Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase tracking-wider">Free Delivery</span>
                    ) : (
                      <span className="font-mono font-bold text-black">{STORE_CONFIG.currencySymbol}{deliveryFee}</span>
                    )}
                  </span>
                </div>
                {subtotal < STORE_CONFIG.freeDeliveryThreshold && (
                  <p className="text-[10px] text-black/50 italic">
                    Add {STORE_CONFIG.currencySymbol}{STORE_CONFIG.freeDeliveryThreshold - subtotal} more for free delivery!
                  </p>
                )}
                <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-black/10">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-serif text-xl font-bold">{STORE_CONFIG.currencySymbol}{grandTotal}</span>
                </div>
              </div>

              {/* Main Checkout CTA: WhatsApp Ordering Flow */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedToWhatsAppCheckout}
                  className="w-full py-4 rounded-full bg-[#25D366] hover:opacity-90 active:scale-95 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Order via WhatsApp ({STORE_CONFIG.currencySymbol}{grandTotal})</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-black/50 font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-black" />
                  <span>No payment gateway required upfront</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
