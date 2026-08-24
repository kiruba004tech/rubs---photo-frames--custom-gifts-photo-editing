import React, { useState } from 'react';
import { STORE_CONFIG } from '../data/storeConfig';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppUrl, formatGeneralEnquiryMessage } from '../utils/whatsapp';
import { RubsLogo } from '../components/RubsLogo';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceInterest: 'Photo Frames',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDirectWhatsApp = () => {
    let customMsg = `Hello RUBS Team! I would like to get in touch.`;
    if (formData.name) customMsg += ` My name is ${formData.name}.`;
    if (formData.serviceInterest) customMsg += ` Interested in: ${formData.serviceInterest}.`;
    if (formData.message) customMsg += ` Note: ${formData.message}`;

    const url = buildWhatsAppUrl(customMsg);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">
      
      {/* Header Banner (Bold Typography) */}
      <div className="border-b border-black/5 pb-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-black"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
            Studio Concierge & Support
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-7xl font-black text-[#1A1A1A] tracking-tighter">
          Let's Talk About Your Project.
        </h1>

        <p className="text-sm sm:text-base text-black/60 max-w-2xl leading-relaxed">
          Whether you need custom frame dimensions, bulk gifting for weddings/corporate events, or photo restoration advice, our desk is ready.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Information & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-[#F9F7F2] p-8 rounded-[2.5rem] border border-black/5 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-black/5">
              <RubsLogo size="sm" showText={true} />
            </div>

            <h3 className="font-serif text-2xl font-black text-[#1A1A1A]">
              Direct Desk
            </h3>

            <div className="space-y-5 text-xs text-black/70">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#25D366] shadow-xs shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-black block font-bold">WhatsApp Direct Line</strong>
                  <span>{STORE_CONFIG.whatsappDisplayNumber}</span>
                  <p className="text-[11px] text-black/50 mt-0.5">Instant quotes, sizing advice & order tracking</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xs shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-black block font-bold">Voice Support</strong>
                  <span>{STORE_CONFIG.whatsappDisplayNumber}</span>
                  <p className="text-[11px] text-black/50 mt-0.5">Mon – Sat: 9:00 AM – 8:30 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xs shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-black block font-bold">Official Email</strong>
                  <span>{STORE_CONFIG.supportEmail}</span>
                  <p className="text-[11px] text-black/50 mt-0.5">High-resolution print master uploads</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xs shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-black block font-bold">Studio Address</strong>
                  <span>{STORE_CONFIG.businessAddress}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-4 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Open WhatsApp Chat Now</span>
              </button>
            </div>
          </div>

        </div>

        {/* Form to WhatsApp (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-black/5 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
              Direct Inquiry
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              Send Us a Message
            </h3>
            <p className="text-xs text-black/50">
              Fill in your details below to generate an immediate formatted WhatsApp inquiry message.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDirectWhatsApp();
            }}
            className="space-y-4 pt-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-black/70">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-black/70">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 6379769997"
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-black/70">
                Service or Product Interested In
              </label>
              <select
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
              >
                <option value="Photo Frames">Photo Frames (Custom Dimensions / Gallery Frames)</option>
                <option value="Custom Gifts">Custom Personalized Gifts (Lamps, Mugs, Cushions)</option>
                <option value="Photo Editing">Photo Editing / Old Photo Restoration</option>
                <option value="Bulk Corporate/Wedding Order">Bulk / Wedding Gifting Order</option>
                <option value="General Inquiry">General Store Inquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-black/70">
                Message / Specifications
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about the size, quantities, or special requests..."
                className="w-full px-4 py-3 rounded-xl bg-[#F9F7F2] border border-black/10 text-xs text-black focus:outline-none focus:border-black font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-black/80 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Proceed to WhatsApp with Inquiry</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
