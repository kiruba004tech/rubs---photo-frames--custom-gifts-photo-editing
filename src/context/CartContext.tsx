import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CustomGiftProduct, FrameProduct, PhotoEditingService } from '../types';
import { STORE_CONFIG } from '../data/storeConfig';

interface CartContextType {
  items: CartItem[];
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'> & { id?: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryCharge: number;
  deliveryFee: number;
  total: number;
  grandTotal: number;
  freeDeliveryRemaining: number;
  
  // Cart Drawer
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // WhatsApp Checkout Modal
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  directCheckoutItem: CartItem | null;
  triggerBuyNow: (item: Omit<CartItem, 'id'> & { id?: string }) => void;
  
  // Custom Gift Request Modal
  customGiftModalProduct: CustomGiftProduct | null;
  setCustomGiftModalProduct: (product: CustomGiftProduct | null) => void;
  
  // Photo Editing Request Modal
  editingModalService: PhotoEditingService | null;
  setEditingModalService: (service: PhotoEditingService | null) => void;
  
  // Product Detail Modal for Frames
  productDetailModal: FrameProduct | null;
  setProductDetailModal: (product: FrameProduct | null) => void;
  
  // Size Guide Modal
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  
  // Policy Modal
  activePolicyModal: 'shipping' | 'return' | 'privacy' | 'terms' | null;
  setActivePolicyModal: (policy: 'shipping' | 'return' | 'privacy' | 'terms' | null) => void;
  
  // Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Toast notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'rubs_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [directCheckoutItem, setDirectCheckoutItem] = useState<CartItem | null>(null);
  
  const [customGiftModalProduct, setCustomGiftModalProduct] = useState<CustomGiftProduct | null>(null);
  const [editingModalService, setEditingModalService] = useState<PhotoEditingService | null>(null);
  const [productDetailModal, setProductDetailModal] = useState<FrameProduct | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<'shipping' | 'return' | 'privacy' | 'terms' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (item: Omit<CartItem, 'id'> & { id?: string }) => {
    const itemId = item.id || `${item.productId}-${item.size || 'default'}`;
    
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (item.quantity || 1),
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            ...item,
            id: itemId,
            quantity: item.quantity || 1,
          },
        ];
      }
    });

    showToast(`Added ${item.name} (${item.size || 'Standard'}) to cart!`);
  };

  const triggerBuyNow = (item: Omit<CartItem, 'id'> & { id?: string }) => {
    const itemId = item.id || `${item.productId}-${item.size || 'default'}`;
    const cartItem: CartItem = {
      ...item,
      id: itemId,
      quantity: item.quantity || 1,
    };
    setDirectCheckoutItem(cartItem);
    setIsCheckoutModalOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const deliveryCharge =
    subtotal === 0
      ? 0
      : subtotal >= STORE_CONFIG.freeDeliveryThreshold
      ? 0
      : STORE_CONFIG.standardDeliveryFee;

  const total = subtotal + deliveryCharge;
  const freeDeliveryRemaining = Math.max(0, STORE_CONFIG.freeDeliveryThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        cart: items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryCharge,
        deliveryFee: deliveryCharge,
        total,
        grandTotal: total,
        freeDeliveryRemaining,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        directCheckoutItem,
        triggerBuyNow,
        customGiftModalProduct,
        setCustomGiftModalProduct,
        editingModalService,
        setEditingModalService,
        productDetailModal,
        setProductDetailModal,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        activePolicyModal,
        setActivePolicyModal,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300">
          <div className="bg-stone-900/95 text-stone-100 text-sm font-medium px-5 py-3 rounded-full shadow-2xl border border-amber-500/30 flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
