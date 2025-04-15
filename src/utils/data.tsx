
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  dimensions: {
    width: number;
    depth: number;
    height: number;
  };
  inStock: boolean;
  featured: boolean;
}

export const categories = [
  {
    id: 'living-room',
    name: 'Living Room',
    image: 'https://images.unsplash.com/photo-1618160472028-15b1902d646d',
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    image: 'https://images.unsplash.com/photo-1615968679312-9b7ed9f04e79',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed',
  },
  {
    id: 'office',
    name: 'Home Office',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Enchanted Oak Coffee Table',
    category: 'living-room',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267',
      'https://images.unsplash.com/photo-1631057426096-3d59e1c94414',
      'https://images.unsplash.com/photo-1581428982868-e410dd047a90',
    ],
    description: 'This whimsical coffee table features hand-carved details with organic, flowing lines that bring a touch of enchantment to your living space. Crafted from sustainable oak with a natural finish that highlights the wood\'s beautiful grain.',
    features: [
      'Handcrafted from sustainable oak',
      'Natural, food-safe finish',
      'Unique, one-of-a-kind carvings',
      'Sturdy construction',
      'Includes felt pads to protect floors',
    ],
    dimensions: {
      width: 120,
      depth: 70,
      height: 45,
    },
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Woodland Dining Table',
    category: 'dining-room',
    price: 899.99,
    discountPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed',
    images: [
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed',
      'https://images.unsplash.com/photo-1617104678098-de229db51182',
      'https://images.unsplash.com/photo-1594131302763-c9771d65d764',
    ],
    description: 'Gather around our Woodland Dining Table for memorable meals and moments. The live-edge design and organic shape celebrate the natural beauty of wood, while the sturdy construction ensures this piece will last for generations.',
    features: [
      'Live-edge design with natural wood slab',
      'Hand-finished with eco-friendly oils',
      'Metal hairpin legs for modern contrast',
      'Seats 6-8 people comfortably',
      'Each piece is unique due to natural wood variations',
    ],
    dimensions: {
      width: 180,
      depth: 90,
      height: 75,
    },
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Fairytale Four-Poster Bed',
    category: 'bedroom',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
      'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15',
      'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0',
    ],
    description: 'Transform your bedroom into a storybook retreat with our Fairytale Four-Poster Bed. Delicate, twisted wooden posts create a dreamy canopy frame, while the solid wood platform provides sturdy support for a restful night\'s sleep.',
    features: [
      'Handcrafted twisted wooden posts',
      'Solid wood platform (no box spring needed)',
      'Available in Queen and King sizes',
      'Non-toxic, water-based finishes',
      'Made to order with customization options available',
    ],
    dimensions: {
      width: 160,
      depth: 200,
      height: 190,
    },
    inStock: false,
    featured: true,
  },
  {
    id: '4',
    name: 'Whispering Willow Bookshelf',
    category: 'living-room',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1602172884306-b28bde61c2a2',
    images: [
      'https://images.unsplash.com/photo-1602172884306-b28bde61c2a2',
      'https://images.unsplash.com/photo-1583944000409-00dd1a71d8d8',
      'https://images.unsplash.com/photo-1615529162924-f8605388461d',
    ],
    description: 'Our Whispering Willow Bookshelf combines function with fantasy through its asymmetrical design and branch-like supports. Each shelf is spaced to accommodate books of various sizes, with special nooks for treasured objects.',
    features: [
      'Sustainably harvested maple wood',
      'Asymmetrical, organic design',
      'Five adjustable shelves',
      'Anti-tip safety wall anchors included',
      'Holds up to 200 books depending on size',
    ],
    dimensions: {
      width: 100,
      depth: 35,
      height: 180,
    },
    inStock: true,
    featured: false,
  },
  {
    id: '5',
    name: 'Enchanted Forest Desk',
    category: 'office',
    price: 749.99,
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705',
    images: [
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705',
      'https://images.unsplash.com/photo-1629054607333-3d3ca80f665f',
      'https://images.unsplash.com/photo-1593062096066-02efdf45ddc9',
    ],
    description: 'Bring imagination to your workspace with our Enchanted Forest Desk. The curved edges and integrated storage solutions are inspired by woodland elements, creating a functional yet fantastical place for creativity to flourish.',
    features: [
      'Solid wood construction with walnut veneer',
      'Integrated cable management system',
      'Two hidden storage drawers',
      'Curved ergonomic edge',
      'Brass leaf-shaped drawer pulls',
    ],
    dimensions: {
      width: 140,
      depth: 70,
      height: 75,
    },
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Moss Garden Side Table',
    category: 'living-room',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89',
    images: [
      'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89',
      'https://images.unsplash.com/photo-1594131302763-c9771d65d764',
      'https://images.unsplash.com/photo-1631057426096-3d59e1c94414',
    ],
    description: 'Add a touch of whimsy to any room with our Moss Garden Side Table. The glass-topped design reveals a miniature landscape beneath, bringing the outdoors inside with zero maintenance required.',
    features: [
      'Tempered glass top',
      'Preserved moss and miniature landscape (no watering needed)',
      'Solid wood base',
      'LED lighting with touch activation',
      'Each piece is unique and handcrafted',
    ],
    dimensions: {
      width: 45,
      depth: 45,
      height: 55,
    },
    inStock: true,
    featured: false,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return products
    .filter(product => product.category === currentProduct.category && product.id !== productId)
    .slice(0, limit);
};

export const getCategoryById = (categoryId: string): string => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : '';
};
