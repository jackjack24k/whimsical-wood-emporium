
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-cream pt-16 pb-32 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-wood-dark mb-6 leading-tight">
            Handcrafted <span className="font-handwriting text-sage-dark">Whimsical</span> Furniture
          </h1>
          <p className="text-lg text-wood-dark/80 mb-8 max-w-md">
            Discover our collection of unique, artisanal furniture pieces that bring character and charm to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button className="btn-primary w-full sm:w-auto">Shop Collection</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="btn-outline w-full sm:w-auto">Our Story</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-1/2 h-4/5 bg-sage-light/30 rounded-l-full -z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-wood-light/50 rounded-full -z-0 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-sage-light/70 rounded-full -z-0 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
