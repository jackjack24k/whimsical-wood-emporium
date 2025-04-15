
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/utils/data';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  const [visibleProducts, setVisibleProducts] = useState(4);
  
  const showMoreProducts = () => {
    setVisibleProducts(prev => Math.min(prev + 4, featuredProducts.length));
  };
  
  return (
    <section className="py-16 bg-cream-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-wood-dark mb-4">Featured Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved pieces, handcrafted with care and designed to bring whimsy to your home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, visibleProducts).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {visibleProducts < featuredProducts.length && (
          <div className="text-center mt-12">
            <Button onClick={showMoreProducts} variant="outline" className="btn-outline">
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
