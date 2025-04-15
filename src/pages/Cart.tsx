
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { getProductById } from '@/utils/data';

const Cart = () => {
  const { 
    cartItems, 
    cartTotal, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();
  
  // Shipping options
  const shippingOptions = [
    { id: 'free', name: 'Free Shipping', price: 0, description: 'Delivery in 7-14 business days' },
    { id: 'standard', name: 'Standard Shipping', price: 10, description: 'Delivery in 5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 25, description: 'Delivery in 2-3 business days' },
  ];
  
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  
  // Calculate total with shipping
  const total = cartTotal + selectedShipping.price;
  
  // Handle increment/decrement quantity
  const handleIncrement = (productId: string, currentQty: number) => {
    updateQuantity(productId, currentQty + 1);
  };
  
  const handleDecrement = (productId: string, currentQty: number) => {
    if (currentQty > 1) {
      updateQuantity(productId, currentQty - 1);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-cream-light">
              <ShoppingCart size={64} className="text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-serif font-bold text-wood-dark mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button className="btn-primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight size={16} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>Shopping Cart</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl font-serif font-bold text-wood-dark mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart items */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-cream-light p-4 border-b hidden md:grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <span className="font-medium">Product</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-medium">Price</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-medium">Quantity</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="font-medium">Total</span>
              </div>
            </div>
            
            <div className="divide-y">
              {cartItems.map(item => {
                const product = getProductById(item.productId);
                if (!product) return null;
                
                const price = product.discountPrice || product.price;
                const itemTotal = price * item.quantity;
                
                return (
                  <div key={item.productId} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    {/* Mobile: Product info with price and controls stacked */}
                    <div className="md:hidden flex mb-4">
                      <div className="w-20 h-20 rounded overflow-hidden mr-4 shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <Link 
                          to={`/products/${product.id}`} 
                          className="font-medium hover:text-wood transition-colors"
                        >
                          {product.name}
                        </Link>
                        <div className="text-muted-foreground text-sm mt-1">
                          ${price.toFixed(2)} each
                        </div>
                        
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDecrement(item.productId, item.quantity)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 rounded-r-none"
                          >
                            <Minus size={14} />
                          </Button>
                          <div className="h-8 px-3 flex items-center justify-center border-y border-input">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleIncrement(item.productId, item.quantity)}
                            className="h-8 w-8 rounded-l-none"
                          >
                            <Plus size={14} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.productId)}
                            className="ml-4 h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between md:hidden mb-2">
                      <span className="text-sm text-muted-foreground">Total:</span>
                      <span className="font-medium">${itemTotal.toFixed(2)}</span>
                    </div>
                    
                    {/* Desktop: Grid layout */}
                    <div className="hidden md:col-span-6 md:flex md:items-center md:space-x-4">
                      <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/products/${product.id}`} 
                          className="font-medium hover:text-wood transition-colors"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </div>
                    
                    <div className="hidden md:block md:col-span-2 md:text-center">
                      ${price.toFixed(2)}
                    </div>
                    
                    <div className="hidden md:flex md:col-span-2 md:justify-center md:items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDecrement(item.productId, item.quantity)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 rounded-r-none"
                      >
                        <Minus size={14} />
                      </Button>
                      <div className="h-8 px-3 flex items-center justify-center border-y border-input">
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleIncrement(item.productId, item.quantity)}
                        className="h-8 w-8 rounded-l-none"
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    
                    <div className="hidden md:flex md:col-span-2 md:justify-between md:items-center">
                      <span className="font-medium text-right w-full">
                        ${itemTotal.toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.productId)}
                        className="ml-2 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    
                    <div className="border-t mt-4 pt-4 md:hidden"></div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
            <Link to="/products">
              <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                <ChevronRight size={16} className="rotate-180" />
                Continue Shopping
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="text-muted-foreground hover:text-destructive hover:border-destructive w-full sm:w-auto"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-cream-light">
            <h2 className="text-xl font-serif font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              
              {/* Shipping Options */}
              <div>
                <span className="text-muted-foreground block mb-2">Shipping</span>
                <div className="space-y-2">
                  {shippingOptions.map(option => (
                    <div 
                      key={option.id} 
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedShipping.id === option.id 
                          ? 'border-wood bg-cream' 
                          : 'hover:border-wood/50'
                      }`}
                      onClick={() => setSelectedShipping(option)}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border mr-2 ${
                            selectedShipping.id === option.id 
                              ? 'border-wood bg-wood' 
                              : 'border-muted-foreground'
                          }`} />
                          <span className="font-medium">{option.name}</span>
                        </div>
                        <span>
                          {option.price === 0 
                            ? 'Free' 
                            : `$${option.price.toFixed(2)}`
                          }
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        {option.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-wood-dark">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full btn-primary flex items-center justify-center gap-1">
              Proceed to Checkout
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
