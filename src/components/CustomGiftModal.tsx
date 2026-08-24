import React, { useState } from 'react';
import { X, Gift, MessageCircle, Sparkles, UploadCloud, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { buildWhatsAppUrl, formatCustomGiftWhatsAppEnquiry } from '../utils/whatsapp';

export const CustomGiftModal: React.FC = () => {
  const { customGiftModalProduct, setCustomGiftModalProduct, addToCart, setIsCartOpen } = useCart();

  const [personalizationText, setPersonalizationText] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [simulatedUploadedFileName, setSimulatedUploadedFileName] = useState<string | null>(null);

  if (!customGiftModalProduct) return null;

  const handleFileUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSimulatedUploadedFileName(e.target.files[0].name);
    }
  };

  const availableOptions = customGiftModalProduct.customizationOptions || customGiftModalProduct.details || ['Standard Option', 'Personalized Style'];

  const handleDirectWhatsAppCustomize = () => {
    const message = formatCustomGiftWhatsAppEnquiry(
      customGiftModalProduct.name,
      personalizationText || 'Standard Customization',
      selectedVariant || availableOptions[0],
      quantity
    );
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');
    setCustomGiftModalProduct(null);
  };

  const handleAddToCartWithSpecs = () => {
    addToCart({
      productId: customGiftModalProduct.id,
      name: customGiftModalProduct.name,
      type: 'custom-gift',
      price: customGiftModalProduct.startingPrice,
      quantity: quantity,
      imageLabel: `CUSTOM GIFT ${customGiftModalProduct.name.toUpperCase()}`,
      customDetails: personalizationText
        ? `${selectedVariant || 'Standard'} | Custom Text: "${personalizationText}"`
        : selectedVariant || 'Customized on WhatsApp',
    });
    setCustomGiftModalProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-[#1A1A1A]">
      {/* Backdrop */}
      <div
        onClick={() => setCustomGiftModalProduct(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden z-10 animate-scale-in">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#F9F7F2] border-b border-black/5 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
              Personalized Gifting Studio
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              {customGiftModalProduct.name}
            </h3>
            <span className="text-xl font-serif italic text-black font-light block">
              from {STORE_CONFIG.currencySymbol}{customGiftModalProduct.startingPrice}
            </span>
          </div>

          <button
            onClick={() => setCustomGiftModalProduct(null)}
            className="p-2 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs text-black/60 leading-relaxed">
            {customGiftModalProduct.description}
          </p>

          {/* Options Selection */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 block">
              Select Style / Option
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableOptions.map((opt) => {
                const isSelected = selectedVariant === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedVariant(opt)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'bg-black text-white'
                        : 'bg-[#F9F7F2] text-black/70 hover:bg-black/10 border border-black/5'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Text / Song Title / Date input */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-black/70 block">
              Custom Inscription / Name / Date
            </label>
            <input
              type="text"
              value={personalizationText}
              onChange={(e) => setPersonalizationText(e.target.value)}
              placeholder="e.g. 'Aarav & Diya — 14.02.2024' or Spotify Song URL"
              className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
            />
          </div>

          {/* Photo File Selector */}
          <div className="p-4 rounded-2xl bg-[#F9F7F2] border border-black/10 space-y-2 text-center">
            <label className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center gap-1.5">
                <UploadCloud className="w-6 h-6 text-black/60" />
                <span className="text-xs font-bold text-black">
                  {simulatedUploadedFileName ? simulatedUploadedFileName : 'Select Photo for Mockup (Optional)'}
                </span>
                <span className="text-[10px] text-black/40">
                  Or simply attach it directly when WhatsApp opens!
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUploadSimulate}
                className="hidden"
              />
            </label>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCartWithSpecs}
              className="py-3.5 px-4 rounded-full bg-[#F9F7F2] hover:bg-black hover:text-white text-black font-bold text-xs uppercase tracking-widest transition-all border border-black/5 flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleDirectWhatsAppCustomize}
              className="py-3.5 px-4 rounded-full bg-[#25D366] hover:opacity-90 active:scale-95 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Customize via WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
