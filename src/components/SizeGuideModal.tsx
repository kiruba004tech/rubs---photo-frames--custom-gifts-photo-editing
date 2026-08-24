import React, { useState } from 'react';
import { X, Ruler, Check, Frame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCart();
  const [activeSizeIdx, setActiveSizeIdx] = useState(3); // 8x10

  if (!isSizeGuideOpen) return null;

  const sizeChart = [
    { size: '4 x 6 inch', cm: '10 x 15 cm', idealFor: 'Desk, nightstand, tabletop memories' },
    { size: '5 x 7 inch', cm: '13 x 18 cm', idealFor: 'Bookshelf display, couple portraits' },
    { size: '6 x 8 inch', cm: '15 x 20 cm', idealFor: 'Console tables, baby milestone photos' },
    { size: '8 x 10 inch', cm: '20 x 25 cm', idealFor: 'Standard wall frames, graduation portraits' },
    { size: '8 x 12 inch (A4)', cm: '21 x 30 cm', idealFor: 'Art prints, certificates, diplomas' },
    { size: '10 x 12 inch', cm: '25 x 30 cm', idealFor: 'Feature photo, office credenza' },
    { size: '12 x 15 inch', cm: '30 x 38 cm', idealFor: 'Living room wall art, family portraits' },
    { size: '12 x 18 inch (A3)', cm: '30 x 45 cm', idealFor: 'Gallery walls, statement photo framing' },
    { size: '16 x 20 inch', cm: '40 x 50 cm', idealFor: 'Above couch centerpiece, wedding master' },
    { size: '18 x 24 inch (A2)', cm: '45 x 60 cm', idealFor: 'Large gallery showcase, dramatic wall centerpiece' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-[#1A1A1A]">
      {/* Backdrop */}
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden z-10 animate-scale-in">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#F9F7F2] border-b border-black/5 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-black">
              Interactive Dimensions Guide
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              Photo Frame Size Matrix
            </h3>
            <p className="text-xs text-black/60">
              Compare RUBS standard frame sizes and wall placements.
            </p>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Visual Scale Indicator */}
          <div className="p-6 rounded-[2rem] bg-[#F9F7F2] border border-black/5 flex flex-col items-center justify-center text-center space-y-3">
            <div className="flex items-center gap-3">
              <Frame className="w-8 h-8 text-black" />
              <div className="text-left">
                <span className="font-serif text-xl font-bold text-black block">
                  {sizeChart[activeSizeIdx].size}
                </span>
                <span className="text-xs font-mono text-black/50">
                  {sizeChart[activeSizeIdx].cm}
                </span>
              </div>
            </div>
            <p className="text-xs text-black/70 italic font-medium">
              "Best for {sizeChart[activeSizeIdx].idealFor}"
            </p>
          </div>

          {/* Table Matrix */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/10 text-[10px] uppercase tracking-widest font-black text-black/60">
                  <th className="py-2.5 px-3">Size (Inches)</th>
                  <th className="py-2.5 px-3">Dimensions (Metric)</th>
                  <th className="py-2.5 px-3">Ideal Usage</th>
                  <th className="py-2.5 px-3 text-right">Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {sizeChart.map((row, idx) => (
                  <tr
                    key={row.size}
                    onClick={() => setActiveSizeIdx(idx)}
                    className={`cursor-pointer transition-colors ${
                      activeSizeIdx === idx
                        ? 'bg-black text-white font-bold'
                        : 'hover:bg-black/5 text-black/80'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold">{row.size}</td>
                    <td className="py-3 px-3 font-mono">{row.cm}</td>
                    <td className="py-3 px-3 text-xs">{row.idealFor}</td>
                    <td className="py-3 px-3 text-right">
                      {activeSizeIdx === idx && <Check className="w-4 h-4 inline-block text-white" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all shadow-md"
            >
              Close Size Guide
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
