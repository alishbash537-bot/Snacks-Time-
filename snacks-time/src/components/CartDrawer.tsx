import { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, Flame, Sparkles, Compass, Bike, CheckCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: 'Small' | 'Medium' | 'Large' | undefined, addons: string[] | undefined, delta: number) => void;
  onRemoveItem: (id: string, size: 'Small' | 'Medium' | 'Large' | undefined, addons: string[] | undefined) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'idle' | 'contacting' | 'infusing' | 'smoking' | 'departed';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [cookingNotes, setCookingNotes] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('idle');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const getItemPrice = (cartItem: CartItem) => {
    let basePrice = cartItem.menuItem.price;
    if (cartItem.selectedSize && cartItem.menuItem.prices) {
      basePrice = cartItem.menuItem.prices[cartItem.selectedSize];
    }
    const addonsPrice = cartItem.selectedAddons?.reduce((sum, name) => {
      const addon = cartItem.menuItem.addons?.find(a => a.name === name);
      return sum + (addon ? addon.price : 0);
    }, 0) || 0;
    return basePrice + addonsPrice;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0);
  const midnightFee = subtotal > 0 ? 150 : 0; // Late night delivery fee
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + midnightFee + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Simulate the theatrical order creation
    setCheckoutStep('contacting');
    setOrderId(`ST-${Math.floor(100000 + Math.random() * 900000)}`);

    setTimeout(() => {
      setCheckoutStep('infusing');
    }, 1800);

    setTimeout(() => {
      setCheckoutStep('smoking');
    }, 3600);

    setTimeout(() => {
      setCheckoutStep('departed');
    }, 5400);
  };

  const resetCheckout = () => {
    setCheckoutStep('idle');
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md bg-[#121212] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBagIcon className="w-5 h-5 text-[#FF4D00]" />
              <h2 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                MIDNIGHT SELECTION
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#c8c6c5] hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {checkoutStep === 'idle' ? (
            /* ACTIVE CART VIEW */
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#ad897e] opacity-40 animate-pulse" />
                    </div>
                    <div>
                      <p className="font-heading font-medium text-[#c8c6c5]">Your night platter is currently vacant.</p>
                      <p className="font-sans text-xs text-[#ad897e] mt-1">Summon delicious snacks from the menu.</p>
                    </div>
                  </div>
                ) : (
                  cartItems.map((item, index) => {
                    const itemPrice = getItemPrice(item);
                    return (
                      <div 
                        key={`${item.menuItem.id}-${item.selectedSize || 'none'}-${item.selectedAddons?.join('_') || 'none'}-${index}`}
                        className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-4 flex items-center space-x-4 transition-all duration-300"
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover border border-white/10"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-semibold text-sm text-white truncate">
                            {item.menuItem.name}
                          </h4>
                          
                          {/* Display Selected Pizza Size tag */}
                          {item.selectedSize && (
                            <span className="inline-block mt-1 px-2 py-0.5 font-mono text-[9px] uppercase font-extrabold tracking-wider bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/20 rounded">
                              {item.selectedSize}
                            </span>
                          )}

                          {/* Display Selected Add-ons */}
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.selectedAddons.map((addon) => (
                                <span key={addon} className="inline-block px-1.5 py-0.5 font-mono text-[8px] uppercase font-bold tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded">
                                  + {addon}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="font-mono text-xs text-[#FF4D00] font-bold mt-1.5">
                            Rs. {(itemPrice * item.quantity).toFixed(0)}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2.5 mt-2">
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, item.selectedSize, item.selectedAddons, -1)}
                              className="p-1 rounded bg-[#121212] border border-white/5 text-[#c8c6c5] hover:text-white hover:border-white/20"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, item.selectedSize, item.selectedAddons, 1)}
                              className="p-1 rounded bg-[#121212] border border-white/5 text-[#c8c6c5] hover:text-white hover:border-white/20"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.menuItem.id, item.selectedSize, item.selectedAddons)}
                          className="p-2 rounded-xl bg-[#121212] border border-white/5 text-[#ad897e] hover:text-[#FF4D00] hover:border-[#FF4D00]/20 transition-all"
                          title="Discard from Platter"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}

                {/* Midnight Preparation Notes */}
                {cartItems.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <label className="block font-mono text-[9px] text-[#ad897e] uppercase tracking-widest mb-2 font-bold">
                      SPECIAL NIGHT PREPARATION INSTRUCTIONS
                    </label>
                    <textarea
                      value={cookingNotes}
                      onChange={(e) => setCookingNotes(e.target.value)}
                      placeholder="e.g. Extra hot sauce, crisp crust, or leave at the porch door."
                      rows={3}
                      className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#FF4D00] rounded-xl py-3 px-4 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF4D00] resize-none transition-all duration-300"
                    />
                  </div>
                )}
              </div>

              {/* Checkout Section & Pricing */}
              {cartItems.length > 0 && (
                <div className="px-6 py-6 border-t border-white/10 bg-[#121212]">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between font-sans text-xs text-[#c8c6c5]">
                      <span>Items Subtotal</span>
                      <span>Rs. {subtotal.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-xs text-[#c8c6c5]">
                      <span>Late-Night Delivery</span>
                      <span>Rs. {midnightFee.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-xs text-[#c8c6c5]">
                      <span>GST Tax (5%)</span>
                      <span>Rs. {tax.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm font-bold text-white pt-2 border-t border-white/5">
                      <span>Grand Midnight Total</span>
                      <span className="text-[#FF4D00] font-mono">Rs. {total.toFixed(0)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 px-4 rounded-xl bg-[#FF4D00] hover:bg-[#FF6A22] text-black font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(255,77,0,0.25)] flex items-center justify-center space-x-2"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Initiate Midnight Order</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* THEATRICAL MIDNIGHT ORDER SEQUENCE */
            <div className="flex-1 flex flex-col justify-between p-8 bg-[#0c0f0f]">
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                
                {/* Timed Animated Icons depending on state */}
                {checkoutStep === 'contacting' && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#FF4D00]/5 border border-[#FF4D00]/20 flex items-center justify-center animate-spin-slow">
                      <Compass className="w-10 h-10 text-[#FF4D00] animate-pulse" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white">TRANSMITTING ORDER</h3>
                    <p className="font-sans text-xs text-[#ad897e] max-w-xs leading-relaxed">
                      Sending your food order to our late-night kitchen... Order ID <span className="font-mono text-white font-bold">{orderId}</span>.
                    </p>
                  </div>
                )}

                {checkoutStep === 'infusing' && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-20 h-20 rounded-full bg-indigo-500/5 border border-indigo-500/20 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-indigo-400 animate-spin" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white">PREPARING FRESH INGREDIENTS</h3>
                    <p className="font-sans text-xs text-[#ad897e] max-w-xs leading-relaxed">
                      Slicing fresh toppings, preparing freshly rolled dough, and tossing golden fries.
                    </p>
                  </div>
                )}

                {checkoutStep === 'smoking' && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-yellow-500/5 border border-yellow-500/20 flex items-center justify-center animate-pulse">
                      <Flame className="w-10 h-10 text-yellow-400 animate-bounce" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white">BAKING & GRILLING</h3>
                    <p className="font-sans text-xs text-[#ad897e] max-w-xs leading-relaxed">
                      Baking your pizzas, grilling burgers, and packaging them hot to lock in absolute taste.
                    </p>
                  </div>
                )}

                {checkoutStep === 'departed' && (
                  <div className="flex flex-col items-center space-y-4 animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">DISPATCHED FOR DELIVERY</h3>
                    <p className="font-sans text-xs text-[#c8c6c5] max-w-xs leading-relaxed">
                      Our dispatch rider has picked up your food. Your hot snacks are racing through the night directly to your location!
                    </p>
                    <div className="bg-[#121212] rounded-xl border border-white/5 p-4 w-full mt-4 flex items-center justify-between text-left">
                      <div className="flex items-center space-x-3">
                        <Bike className="w-5 h-5 text-[#FF4D00]" />
                        <div>
                          <p className="font-mono text-[9px] text-[#ad897e] uppercase">COURIER ACTIVE</p>
                          <p className="font-sans text-xs font-bold text-white">ETA ~24 MINUTES</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-white font-bold bg-[#FF4D00]/10 border border-[#FF4D00]/20 px-2 py-0.5 rounded-md">LIVE TRACK</span>
                    </div>
                  </div>
                )}

                {/* Progress Indicators */}
                <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full overflow-hidden mt-6">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF4D00] to-[#FF8040] transition-all duration-1000"
                    style={{
                      width: 
                        checkoutStep === 'contacting' ? '25%' :
                        checkoutStep === 'infusing' ? '55%' :
                        checkoutStep === 'smoking' ? '85%' : '100%'
                    }}
                  />
                </div>
              </div>

              {checkoutStep === 'departed' && (
                <button
                  onClick={resetCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-white text-black font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-neutral-200"
                >
                  Order Again
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Minimal icons matching lucide-react to avoid missing exports
function ShoppingBagIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
