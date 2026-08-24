import React from 'react';

interface RubsLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  variant?: 'gold' | 'dark' | 'light';
}

export const RubsLogo: React.FC<RubsLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'gold',
}) => {
  const sizeMap = {
    xs: { img: 'w-9 h-9 sm:w-10 sm:h-10', title: 'text-xl', subtitle: 'text-[9px] tracking-[0.2em]' },
    sm: { img: 'w-12 h-12 sm:w-14 sm:h-14', title: 'text-2xl sm:text-3xl', subtitle: 'text-[10px] tracking-[0.22em]' },
    md: { img: 'w-16 h-16 sm:w-18 sm:h-18', title: 'text-3xl sm:text-4xl', subtitle: 'text-[11px] tracking-[0.25em]' },
    lg: { img: 'w-20 h-20 sm:w-24 sm:h-24', title: 'text-4xl sm:text-5xl', subtitle: 'text-[12px] tracking-[0.28em]' },
    xl: { img: 'w-28 h-28 sm:w-36 sm:h-36', title: 'text-5xl sm:text-6xl', subtitle: 'text-xs tracking-[0.3em]' },
    hero: { img: 'w-40 h-40 sm:w-52 sm:h-52', title: 'text-6xl sm:text-7xl', subtitle: 'text-sm tracking-[0.35em]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D Gold Embossed Official Emblem */}
      <div
        className={`relative ${currentSize.img} rounded-xl overflow-hidden shadow-lg border border-[#D4AF37]/30 bg-black flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
        style={{
          boxShadow: '0 4px 14px -2px rgba(0, 0, 0, 0.4), 0 0 10px rgba(212, 175, 55, 0.15)',
        }}
      >
        <img
          src="/logo.png"
          alt="RUBS Premium Photo Frames Logo"
          className="w-full h-full object-contain p-0.5"
          loading="eager"
        />
      </div>

      {/* Brand Typography (Optional next to badge) */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif font-black tracking-tight leading-none ${currentSize.title} ${
                variant === 'light'
                  ? 'text-white'
                  : 'text-[#1A1A1A] group-hover:text-black'
              }`}
            >
              RUBS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-80" />
          </div>
          <span
            className={`font-sans font-bold uppercase ${currentSize.subtitle} leading-none mt-1 ${
              variant === 'light' ? 'text-white/60' : 'text-black/50'
            }`}
          >
            Premium Photo Frames
          </span>
        </div>
      )}
    </div>
  );
};
