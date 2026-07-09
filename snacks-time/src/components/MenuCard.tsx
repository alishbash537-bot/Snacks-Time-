import { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, Eye, Flame, Award } from 'lucide-react';

interface MenuCardProps {
  key?: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem, size?: 'Small' | 'Medium' | 'Large', addons?: string[]) => void;
  onViewDetails: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAddToCart, onViewDetails }: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonsPrice = item.addons
    ? item.addons
        .filter((addon) => selectedAddons.includes(addon.name))
        .reduce((sum, addon) => sum + addon.price, 0)
    : 0;

  const currentPrice = (item.prices ? item.prices[selectedSize] : item.price) + addonsPrice;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#121212] rounded-[24px] border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,77,0,0.08)] hover:-translate-y-1"
      id={`menu-card-${item.id}`}
    >
      {/* Aspect Ratio 4:3 Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Subtle image dark vignette overlay to blend seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 z-10 pointer-events-none" />
        
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Premium Tags/Category Float */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          <span className="px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-widest bg-black/60 text-[#ffb59e] border border-[#ffb59e]/20 rounded-full backdrop-blur-md">
            {item.category}
          </span>
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2.5 py-1 font-sans text-[10px] font-medium bg-[#1A1A1A]/90 text-white rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center space-x-3">
          <button
            onClick={() => onViewDetails(item)}
            className="p-3 rounded-full bg-[#1A1A1A] hover:bg-[#262626] border border-white/10 text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Inspect Dish Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => onAddToCart(item, item.prices ? selectedSize : undefined, selectedAddons)}
            className="p-3 rounded-full bg-[#FF4D00] hover:bg-[#FF6622] text-black transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Add to Cart"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-heading font-semibold text-lg text-white group-hover:text-[#FF4D00] transition-colors duration-200 line-clamp-1">
            {item.name}
          </h3>
          <span className="font-mono text-sm font-bold text-[#FF4D00] bg-[#FF4D00]/5 px-2.5 py-0.5 rounded-md border border-[#FF4D00]/10 shrink-0">
            Rs. {currentPrice.toFixed(0)}
          </span>
        </div>

        <p className="font-sans text-xs text-[#c8c6c5] line-clamp-2 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Size Selector for Pizza category */}
        {item.prices && (
          <div className="mb-4">
            <label className="block font-mono text-[8px] text-[#ad897e] uppercase tracking-wider mb-2">
              SELECT PIZZA SIZE
            </label>
            <div className="flex gap-2">
              {(['Small', 'Medium', 'Large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                      : 'bg-[#1A1A1A] text-[#c8c6c5] border-white/5 hover:border-white/20'
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add-ons Selector */}
        {item.addons && item.addons.length > 0 && (
          <div className="mb-4">
            <label className="block font-mono text-[8px] text-[#ad897e] uppercase tracking-wider mb-2">
              ADD-ONS
            </label>
            <div className="space-y-1.5">
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
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]'
                        : 'bg-[#1A1A1A] text-[#c8c6c5] border-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded border flex items-center justify-center ${isSelected ? 'border-[#FF4D00] bg-[#FF4D00]' : 'border-white/20 bg-transparent'}`}>
                        {isSelected && <span className="block w-1.5 h-1.5 bg-black rounded-full" />}
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

        {/* Premium Curated Technical metadata section in JetBrains Mono */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[8px] text-[#ad897e] uppercase tracking-wider">CATEGORY</span>
            <span className="font-mono text-xs font-semibold text-white uppercase">{item.category}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-mono text-[8px] text-[#ad897e] uppercase tracking-wider">SIGNATURE NOTES</span>
            <span className="font-mono text-[10px] text-white flex items-center space-x-1 uppercase tracking-widest justify-end">
              <Award className="w-3 h-3 text-[#FF4D00] inline mr-1" />
              <span>hot</span>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-1">
          <button
            onClick={() => onAddToCart(item, item.prices ? selectedSize : undefined, selectedAddons)}
            className="w-full py-3 px-4 rounded-xl bg-[#FF4D00] hover:bg-[#FF6A22] text-black font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_12px_rgba(255,77,0,0.15)] hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] flex items-center justify-center space-x-2"
          >
            <Flame className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
