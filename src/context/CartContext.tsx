
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, getProductById } from '@/utils/data';
import { useToast } from '@/components/ui/use-toast';

type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Update cart count
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    
    // Calculate cart total
    let total = 0;
    cartItems.forEach(item => {
      const product = getProductById(item.productId);
      if (product) {
        const price = product.discountPrice || product.price;
        total += price * item.quantity;
      }
    });
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (productId: string, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return;
    
    if (!product.inStock) {
      toast({
        title: "Cannot add to cart",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === productId);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { productId, quantity }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    
    const product = getProductById(productId);
    if (product) {
      toast({
        title: "Removed from cart",
        description: `${product.name} has been removed from your cart.`,
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.productId === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
