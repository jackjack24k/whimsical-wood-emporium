
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/utils/data';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by in-stock status
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price-desc':
          result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'newest':
          // In this mock data, we don't have dates, so this is just an example
          // In a real app, you would sort by date
          result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, priceRange, inStockOnly, sortBy]);
  
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 1500]);
    setInStockOnly(false);
    setSortBy('');
  };
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  const getCategoryName = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : '';
  };
  
  return (
    <div className="container-custom py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground mb-6 flex items-center">
        <Link to="/" className="hover:text-wood transition-colors">Home</Link>
        <ChevronRight size={16} className="mx-2" />
        <span>Shop</span>
        {selectedCategory && (
          <>
            <ChevronRight size={16} className="mx-2" />
            <span>{getCategoryName(selectedCategory)}</span>
          </>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-wood-dark">
          {selectedCategory ? getCategoryName(selectedCategory) : 'All Products'}
        </h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleFilters}
          className="md:hidden flex items-center gap-2"
        >
          <SlidersHorizontal size={16} />
          Filters
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters - desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="border rounded-lg p-6 bg-cream-light space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-sm text-muted-foreground hover:text-wood"
              >
                Reset
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={selectedCategory === category.id}
                        onCheckedChange={() => 
                          setSelectedCategory(
                            selectedCategory === category.id ? '' : category.id
                          )
                        }
                        className="text-wood"
                      />
                      <label 
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <Slider 
                  value={priceRange}
                  min={0}
                  max={1500}
                  step={10}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={() => setInStockOnly(!inStockOnly)}
                  className="text-wood"
                />
                <label 
                  htmlFor="in-stock"
                  className="ml-2 text-sm cursor-pointer"
                >
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile filters sidebar */}
        {isFiltersOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-cream-light overflow-y-auto">
              <div className="p-4 border-b sticky top-0 bg-cream-light flex justify-between items-center">
                <h2 className="font-medium">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleFilters}
                  className="text-wood-dark"
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="p-4 space-y-6">
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-sm text-muted-foreground hover:text-wood"
                  >
                    Reset All
                  </Button>
                </div>
                
                <Accordion type="single" collapsible defaultValue="category">
                  <AccordionItem value="category">
                    <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {categories.map(category => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox 
                              id={`mobile-category-${category.id}`} 
                              checked={selectedCategory === category.id}
                              onCheckedChange={() => 
                                setSelectedCategory(
                                  selectedCategory === category.id ? '' : category.id
                                )
                              }
                              className="text-wood"
                            />
                            <label 
                              htmlFor={`mobile-category-${category.id}`}
                              className="ml-2 text-sm cursor-pointer"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="price">
                    <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2">
                        <Slider 
                          value={priceRange}
                          min={0}
                          max={1500}
                          step={10}
                          onValueChange={setPriceRange}
                          className="my-4"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="availability">
                    <AccordionTrigger className="text-sm font-medium">Availability</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 flex items-center">
                        <Checkbox 
                          id="mobile-in-stock"
                          checked={inStockOnly}
                          onCheckedChange={() => setInStockOnly(!inStockOnly)}
                          className="text-wood"
                        />
                        <label 
                          htmlFor="mobile-in-stock"
                          className="ml-2 text-sm cursor-pointer"
                        >
                          In Stock Only
                        </label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="pt-4 flex">
                  <Button onClick={toggleFilters} className="w-full btn-primary">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or browse our other categories.
              </p>
              <Button onClick={resetFilters} className="btn-primary">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
