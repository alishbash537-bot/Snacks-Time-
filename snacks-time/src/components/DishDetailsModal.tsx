import { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { X, Flame, ShieldAlert, Award, Star } from 'lucide-react';

interface DishDetailsModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, size?: 'Small' | 'Medium' | 'Large', addons?: string[]) => void;
}

export default function DishDetailsModal({ item, onClose, onAddToCart }: DishDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Reset states when modal is opened for a different item
  useEffect(() => {
    if (item) {
      setSelectedSize('Medium');
      setSelectedAddons([]);
    }
  }, [item]);

  if (!item) return null;

  const addonsPrice = item.addons
    ? item.addons
        .filter((addon) => selectedAddons.includes(addon.name))
        .reduce((sum, addon) => sum + addon.price, 0)
    : 0;

  const currentPrice = (item.prices ? item.prices[selectedSize] : item.price) + addonsPrice;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="dish-details-modal">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8 z-50 relative">
        <div className="relative w-full max-w-3xl rounded-[32px] bg-[#121212] border border-white/10 overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8)] transition-all transform duration-300">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#1A1A1A] hover:bg-[#262626] border border-white/10 text-white transition-all z-30"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#121212] via-transparent to-transparent z-10 pointer-events-none" />
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest bg-black/70 text-[#FF4D00] rounded-full border border-[#FF4D00]/20 backdrop-blur-md">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Details side */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                {/* Title and Price */}
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-white tracking-tight leading-tight">
                      {item.name}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1.5">
                      <Star className="w-3.5 h-3.5 text-[#FF4D00] fill-[#FF4D00]" />
                      <span className="font-mono text-[10px] text-[#ad897e] uppercase tracking-widest">Late-Night Special</span>
                    </div>
                  </div>
                  <span className="font-mono text-xl font-bold text-[#FF4D00] shrink-0">
                    Rs. {currentPrice.toFixed(0)}
                  </span>
                </div>

                {/* Narrative */}
                <p className="font-sans text-sm text-[#c8c6c5] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Size Selector for Pizza category */}
                {item.prices && (
                  <div className="mb-6">
                    <label className="block font-mono text-[9px] text-[#ad897e] uppercase tracking-widest mb-3 font-bold">
                      SELECT SIZE
                    </label>
                    <div className="flex gap-2">
                      {(['Small', 'Medium', 'Large'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold tracking-wider border transition-all duration-200 ${
                            selectedSize === size
                              ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                              : 'bg-[#1A1A1A] text-[#c8c6c5] border-white/5 hover:border-white/20'
                          }`}
                        >
                          {size.toUpperCase()} (Rs. {item.prices[size].toFixed(0)})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons Selector */}
                {item.addons && item.addons.length > 0 && (
                  <div className="mb-6">
                    <label className="block font-mono text-[9px] text-[#ad897e] uppercase tracking-widest mb-3 font-bold">
                      ADD-ONS
                    </label>
                    <div className="space-y-2">
                      {item.addons.map((addon) => {
                        const isSelected = selectedAddons.includes(addon.name);
                        return (
                          <button
                            key={addon.name}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedAddons(selectedAddons.filter((a) => a !== addon.name));
                              } else {
                                setSelectedAddons([...selectedAddons, addon.name]);
                              }
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider border transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]'
                                : 'bg-[#1A1A1A] text-[#c8c6c5] border-white/5 hover:border-white/10'
                            }`}
                          >
                            <span className="flex items-center space-x-2">
                              <span className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'border-[#FF4D00] bg-[#FF4D00]' : 'border-white/20 bg-transparent'}`}>
                                {isSelected && <span className="block w-2 h-2 bg-black rounded-full" />}
                              </span>
                              <span>{addon.name.toUpperCase()}</span>
                            </span>
                            <span>+Rs. {addon.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Chef's Signature Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-mono text-[10px] text-[#ad897e] uppercase tracking-widest mb-3 flex items-center space-x-2 font-bold">
                      <Award className="w-4 h-4 text-[#FF4D00]" />
                      <span>SNACK HIGHLIGHTS</span>
                    </h4>
                    <ul className="space-y-2">
                      {item.highlights.map((hl, i) => (
                        <li key={i} className="font-mono text-[11px] text-[#e2e2e2] flex items-start space-x-2">
                          <span className="text-[#FF4D00] font-bold mt-0.5">▪</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Add to Midnight Selection Action */}
              <button
                onClick={() => {
                  onAddToCart(item, item.prices ? selectedSize : undefined, selectedAddons);
                  onClose();
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-[#FF4D00] hover:bg-[#FF6A22] text-black font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(255,77,0,0.25)] hover:shadow-[0_6px_22px_rgba(255,77,0,0.4)] flex items-center justify-center space-x-2"
              >
                <Flame className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
