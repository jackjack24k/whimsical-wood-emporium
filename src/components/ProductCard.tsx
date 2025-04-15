
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/utils/data';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden h-64">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-medium bg-black/60 px-4 py-2 rounded">Out of Stock</span>
            </div>
          )}
          {product.discountPrice && (
            <div className="absolute top-3 right-3 bg-sage-dark text-white text-sm font-medium px-2 py-1 rounded">
              Sale
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-lg text-wood-dark mb-1 hover:text-wood transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-wood-dark font-semibold">${product.discountPrice}</span>
                <span className="text-muted-foreground line-through text-sm">${product.price}</span>
              </div>
            ) : (
              <span className="text-wood-dark font-semibold">${product.price}</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-wood hover:text-white hover:bg-wood rounded-full"
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
