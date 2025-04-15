
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-wood-dark text-cream-light">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <h2 className="font-serif text-cream-light text-2xl font-bold">Wood <span className="font-handwriting text-sage-light">&</span> Whimsy</h2>
            </Link>
            <p className="text-cream/80 text-sm">
              Handcrafted furniture that brings whimsy and elegance to your home. Each piece tells a story and is made with love.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-cream hover:text-sage-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-cream hover:text-sage-light transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-cream hover:text-sage-light transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-cream-light">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-cream/80 hover:text-cream-light transition-colors text-sm">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/80 hover:text-cream-light transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/80 hover:text-cream-light transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-cream/80 hover:text-cream-light transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-cream/80 hover:text-cream-light transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-cream-light">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-sage-light shrink-0 mt-1" />
                <span className="text-cream/80 text-sm">123 Woodland Way, Forestville, CA 95436</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-sage-light" />
                <span className="text-cream/80 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-sage-light" />
                <span className="text-cream/80 text-sm">hello@woodandwhimsy.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-cream-light">Join Our Newsletter</h3>
            <p className="text-cream/80 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-wood border-wood-light text-cream placeholder:text-cream/50" 
              />
              <Button className="bg-sage-dark hover:bg-sage text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-wood mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/70 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Wood & Whimsy. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-cream/70 hover:text-cream-light text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-cream/70 hover:text-cream-light text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-cream/70 hover:text-cream-light text-sm transition-colors">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
