import React from 'react';
import { STORE_CONFIG } from '../data/storeConfig';
import { ShieldCheck, Heart, Sparkles, Award, MapPin, Phone, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, formatGeneralEnquiryMessage } from '../utils/whatsapp';
import { RubsLogo } from '../components/RubsLogo';

interface AboutViewProps {
  setCurrentView: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentView }) => {
  const handleWhatsAppContact = () => {
    const url = buildWhatsAppUrl(formatGeneralEnquiryMessage('the studio and custom framing services'));
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">
      
      {/* Header Banner (Bold Typography) */}
      <div className="border-b border-black/5 pb-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-black"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">
            Our Story & Craftsmanship
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-7xl font-black text-[#1A1A1A] tracking-tighter max-w-4xl">
          Crafting Homes for Lifelong <span className="italic font-light">Memories</span>.
        </h1>

        <p className="text-sm sm:text-base text-black/60 max-w-2xl leading-relaxed">
          Founded in Chennai, RUBS was created with one simple conviction: that digital pixels locked in smartphone galleries deserve a tangible, beautiful, museum-grade home.
        </p>
      </div>

      {/* Editorial Split Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6 text-sm text-black/70 leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A]">
            The Art of Thoughtful Gifting and Framing
          </h2>
          
          <p>
            At <strong>RUBS</strong>, every frame is measured, cut, and assembled with precision. We select seasoned woods, crystal-clear shatterproof acrylics, and archival acid-free matboards that safeguard family portraits and milestone artworks for decades.
          </p>

          <p>
            Beyond traditional framing, we recognized the need for personalized gifts that convey deep emotional resonance—custom photo lamps, engraved keepsakes, and personalized song plaques.
          </p>

          <p>
            And because some precious memories are captured on old polaroids or grainy phone cameras, our dedicated digital restoration studio repairs tears, enhances focus, and delivers gallery-ready files.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentView('frames')}
              className="bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all shadow-md"
            >
              Explore Frames
            </button>
            <button
              onClick={handleWhatsAppContact}
              className="bg-[#25D366] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Chat with Artisan</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#F9F7F2] p-8 rounded-[2.5rem] border border-black/5 space-y-6">
          <div className="flex items-center gap-4 pb-2 border-b border-black/5">
            <RubsLogo size="md" showText={false} />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black block">
                Official Studio Mark
              </span>
              <h3 className="font-serif text-xl font-black text-[#1A1A1A]">
                RUBS Archival Framing
              </h3>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-black/5">
              <strong className="text-black block text-sm font-bold mb-1">Direct Human Touch</strong>
              <span className="text-black/60">No AI bots or robotic checkouts. A real human artisan assists your framing choices on WhatsApp.</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-black/5">
              <strong className="text-black block text-sm font-bold mb-1">Archival Longevity</strong>
              <span className="text-black/60">100+ year fade-resistant pigment inks and solid construction that prevents warping.</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-black/5">
              <strong className="text-black block text-sm font-bold mb-1">Shatterproof Safe Transit</strong>
              <span className="text-black/60">Reinforced 5-ply custom boxing with corner bumpers. Free replacement in case of transit damage.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
