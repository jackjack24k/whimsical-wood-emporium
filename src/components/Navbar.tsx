
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Success',
      description: 'You have been logged out successfully.',
    });
  };

  return (
    <header className="bg-cream-light py-4 sticky top-0 z-50 shadow-sm">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="font-serif text-wood-dark text-2xl font-bold">Wood <span className="font-handwriting text-sage-dark">&</span> Whimsy</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-wood-dark hover:text-wood transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-wood-dark hover:text-wood transition-colors">
            Shop
          </Link>
          <Link to="/about" className="text-wood-dark hover:text-wood transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-wood-dark hover:text-wood transition-colors">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-wood-dark hover:text-wood hover:bg-cream">
            <Search size={20} />
          </Button>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-wood-dark hover:text-wood hover:bg-cream"
                onClick={handleAuthClick}
              >
                <User size={20} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-wood-dark"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-wood-dark hover:text-wood hover:bg-cream"
              onClick={handleAuthClick}
            >
              <User size={20} />
            </Button>
          )}
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-wood-dark hover:text-wood hover:bg-cream relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-sage text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="mr-4 relative">
            <ShoppingCart size={20} className="text-wood-dark" />
            <span className="absolute -top-2 -right-2 bg-sage text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-wood-dark hover:bg-cream"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cream-light border-t border-wood-light">
          <div className="container-custom py-4 space-y-4">
            <Link to="/" className="block text-wood-dark hover:text-wood transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="block text-wood-dark hover:text-wood transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/about" className="block text-wood-dark hover:text-wood transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="block text-wood-dark hover:text-wood transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            
            <div className="flex flex-col space-y-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block text-wood-dark hover:text-wood transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-wood-dark justify-start"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="block text-wood-dark hover:text-wood transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
