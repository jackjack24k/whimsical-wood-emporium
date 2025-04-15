
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  ChevronRight, 
  Minus, 
  Plus, 
  ShoppingCart,
  Truck, 
  RefreshCw, 
  Check
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProductById, getCategoryById, getRelatedProducts } from '@/utils/data';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  
  if (!id) {
    navigate('/products');
    return null;
  }
  
  const product = getProductById(id);
  
  if (!product) {
    navigate('/products');
    return null;
  }
  
  const relatedProducts = getRelatedProducts(id, 3);
  const categoryName = getCategoryById(product.category);
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };
  
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
            <BreadcrumbLink href="/products">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight size={16} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category}`}>
              {categoryName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight size={16} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-cream-light">
            <img 
              src={product.images[currentImage]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                  currentImage === index ? 'border-wood' : 'border-transparent'
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-wood-dark mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center mb-4">
            {product.discountPrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-semibold text-wood-dark">${product.discountPrice}</span>
                <span className="text-muted-foreground line-through">${product.price}</span>
                <span className="bg-sage-light text-sage-dark text-xs px-2 py-1 rounded">
                  {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-semibold text-wood-dark">${product.price}</span>
            )}
          </div>
          
          <div className="prose prose-stone mb-6 text-muted-foreground">
            <p>{product.description}</p>
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <div className="flex items-center text-sage-dark">
                <Check size={18} className="mr-2" />
                <span>In Stock</span>
              </div>
            ) : (
              <div className="flex items-center text-muted-foreground">
                <span>Out of Stock</span>
              </div>
            )}
          </div>
          
          {/* Quantity Selector */}
          {product.inStock && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center w-36">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="rounded-r-none"
                >
                  <Minus size={16} />
                </Button>
                <div className="flex-1 py-2 text-center border-y border-x-0 border-input">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="rounded-l-none"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          )}
          
          {/* Add to Cart Button */}
          <div className="mb-8">
            <Button
              onClick={handleAddToCart}
              className="btn-primary w-full md:w-auto flex items-center gap-2"
              disabled={!product.inStock || isInCart(product.id)}
            >
              <ShoppingCart size={18} />
              {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
            </Button>
          </div>
          
          {/* Product Features */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check size={18} className="text-sage-dark mr-2 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Dimensions */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Dimensions</h3>
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div>
                <span className="block text-sm">Width</span>
                <span className="font-medium">{product.dimensions.width} cm</span>
              </div>
              <div>
                <span className="block text-sm">Depth</span>
                <span className="font-medium">{product.dimensions.depth} cm</span>
              </div>
              <div>
                <span className="block text-sm">Height</span>
                <span className="font-medium">{product.dimensions.height} cm</span>
              </div>
            </div>
          </div>
          
          {/* Shipping and Returns */}
          <div className="border-t border-b py-4 space-y-3">
            <div className="flex items-center">
              <Truck size={18} className="text-wood-dark mr-3" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center">
              <RefreshCw size={18} className="text-wood-dark mr-3" />
              <span>30-day returns and exchanges</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-wood-dark mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
