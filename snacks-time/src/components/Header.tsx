import { useEffect, useState } from 'react';
import { ShoppingBag, Clock } from 'lucide-react';
import SnacksTimeLogo from './SnacksTimeLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center select-none"
          id="brand-logo"
        >
          <SnacksTimeLogo className="h-10 sm:h-12 w-auto" />
        </div>

        {/* Status Indicators & Cart */}
        <div className="flex items-center space-x-6">
          {/* Active Late Night Clock */}
          <div className="hidden sm:flex items-center space-x-2 bg-[#121212] border border-white/5 px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-[#FF4D00]" />
            <span className="font-mono text-xs font-semibold text-white tracking-widest uppercase">
              {timeStr || '00:00:00 AM'}
            </span>
          </div>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-[#121212] hover:bg-[#1A1A1A] border border-white/10 hover:border-[#FF4D00] group transition-all duration-300"
            aria-label="Open midnight cart"
            id="cart-trigger"
          >
            <ShoppingBag className="w-5 h-5 text-white group-hover:text-[#FF4D00] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FF4D00] text-black font-mono font-bold text-xs rounded-full flex items-center justify-center animate-bounce shadow-[0_0_10px_rgba(255,77,0,0.6)]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
