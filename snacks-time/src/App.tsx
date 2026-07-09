import { useState, useEffect } from 'react';
import { Search, Flame } from 'lucide-react';
import Header from './components/Header';
import MenuCard from './components/MenuCard';
import DishDetailsModal from './components/DishDetailsModal';
import CartDrawer from './components/CartDrawer';
import { MENU_ITEMS } from './menuData';
import { MenuItem, CartItem } from './types';

type CategoryType = 'all' | 'pizza' | 'burgers';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state for cart from localStorage for persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('nocturnal_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart storage', e);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('nocturnal_cart', JSON.stringify(updatedCart));
  };

  // Add to Midnight Selection Cart
  const handleAddToCart = (item: MenuItem, size?: 'Small' | 'Medium' | 'Large', addons?: string[]) => {
    const sortedAddons = addons ? [...addons].sort() : [];
    const existing = cartItems.find((c) => {
      const cAddons = c.selectedAddons ? [...c.selectedAddons].sort() : [];
      return (
        c.menuItem.id === item.id &&
        c.selectedSize === size &&
        JSON.stringify(cAddons) === JSON.stringify(sortedAddons)
      );
    });

    let updated: CartItem[];
    if (existing) {
      updated = cartItems.map((c) => {
        const cAddons = c.selectedAddons ? [...c.selectedAddons].sort() : [];
        return (
          c.menuItem.id === item.id &&
          c.selectedSize === size &&
          JSON.stringify(cAddons) === JSON.stringify(sortedAddons)
        )
          ? { ...c, quantity: c.quantity + 1 }
          : c;
      });
    } else {
      updated = [...cartItems, { menuItem: item, quantity: 1, selectedSize: size, selectedAddons: sortedAddons }];
    }
    saveCartToStorage(updated);
    setIsCartOpen(true); // Open the cart so users see immediate visual addition feedback
  };

  const handleUpdateQuantity = (
    id: string,
    size: 'Small' | 'Medium' | 'Large' | undefined,
    addons: string[] | undefined,
    delta: number
  ) => {
    const sortedAddons = addons ? [...addons].sort() : [];
    const updated = cartItems
      .map((item) => {
        const itemAddons = item.selectedAddons ? [...item.selectedAddons].sort() : [];
        if (
          item.menuItem.id === id &&
          item.selectedSize === size &&
          JSON.stringify(itemAddons) === JSON.stringify(sortedAddons)
        ) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (
    id: string,
    size: 'Small' | 'Medium' | 'Large' | undefined,
    addons: string[] | undefined
  ) => {
    const sortedAddons = addons ? [...addons].sort() : [];
    const updated = cartItems.filter((item) => {
      const itemAddons = item.selectedAddons ? [...item.selectedAddons].sort() : [];
      return !(
        item.menuItem.id === id &&
        item.selectedSize === size &&
        JSON.stringify(itemAddons) === JSON.stringify(sortedAddons)
      );
    });
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // Filter logic
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e2e2e2] font-sans flex flex-col justify-between" id="app-root-layout">
      {/* Premium Sticky Navigation Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main content area */}
      <main className="flex-grow pb-16">
        {/* HERO BANNER - High OLED Contrast, dark overlay */}
        <div className="relative h-[440px] w-full overflow-hidden" id="hero-banner">
          {/* Subtle visual vignette & overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <img
            src="/src/assets/images/hero_dining_1783600331297.jpg"
            alt="Nocturnal Epicure Dining Room"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <div className="inline-flex items-center space-x-2 bg-black/60 border border-white/10 px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-[#FF4D00] animate-pulse" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#ffb59e]">
                YOUR GO-TO LATE NIGHT CRAVING SPOT
              </span>
            </div>
            
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight max-w-3xl leading-tight">
              Snacks Time
            </h1>
            
            <p className="font-sans text-sm sm:text-base text-[#c8c6c5] max-w-xl mx-auto mt-4 leading-relaxed">
              Satisfying your midnight cravings with hot, freshly baked pizzas and juicy loaded burgers.
            </p>

            {/* Integrated Search Bar inside the Hero Area */}
            <div className="w-full max-w-lg mt-8" id="hero-search-wrapper">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search late-night snacks (e.g. Cheese Pizza, Beef Burger...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#121212]/95 border border-white/10 focus:border-[#FF4D00] rounded-xl py-4 pl-12 pr-6 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF4D00] shadow-2xl backdrop-blur-md transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT CATALOG CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-6 mt-12" id="catalog-area">
          
          {/* Category Pill selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10" id="category-selector">
            {(['all', 'pizza', 'burgers'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-white border-white text-black font-extrabold'
                    : 'bg-[#121212] border-white/5 text-[#c8c6c5] hover:text-white hover:border-white/20'
                }`}
              >
                {cat === 'all' ? '● ALL ITEMS' : cat}
              </button>
            ))}
          </div>

          {/* Grid Layout matching brand grid specifications */}
          {filteredMenuItems.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-heading text-lg text-[#c8c6c5]">No snacks match your search query.</p>
              <p className="font-sans text-xs text-[#ad897e] mt-1">Try another keyword or reset the category filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-6 px-5 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 hover:border-white/20 text-white font-sans text-xs uppercase font-semibold tracking-wider transition-all"
              >
                Reset Filter Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenuItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  onViewDetails={(selected) => setSelectedItemForModal(selected)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* METRIC FOOTER - High contrast labels in JetBrains Mono */}
      <footer className="bg-[#050505] border-t border-white/5 py-12 px-6 text-center" id="footer-section">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-heading font-extrabold text-white text-sm tracking-widest uppercase">
              SNACKS TIME
            </h3>
            <p className="font-mono text-[9px] text-[#ad897e] tracking-widest uppercase mt-1">
              EPICUREAN SNACKS FOR THE SILENT CONSCIOUSNESS
            </p>
          </div>

          <p className="font-sans text-[11px] text-[#ad897e] tracking-tight">
            &copy; 2026 SNACKS TIME. ALL SENSORY PRIVILEGES RESERVED.
          </p>
        </div>
      </footer>

      {/* Interactive Detail Overlay */}
      <DishDetailsModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
