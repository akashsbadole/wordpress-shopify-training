import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600';
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">WPMastery</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/wordpress" className={isActive('/wordpress')}>WordPress</Link>
              <Link to="/shopify" className={isActive('/shopify')}>Shopify</Link>
              <Link to="/projects" className={isActive('/projects')}>Projects</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
              <Link 
                to="/contact" 
                className="ml-2 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`block px-3 py-2 ${isActive('/')}`}>Home</Link>
            <Link to="/wordpress" className={`block px-3 py-2 ${isActive('/wordpress')}`}>WordPress</Link>
            <Link to="/shopify" className={`block px-3 py-2 ${isActive('/shopify')}`}>Shopify</Link>
            <Link to="/projects" className={`block px-3 py-2 ${isActive('/projects')}`}>Projects</Link>
            <Link to="/contact" className={`block px-3 py-2 ${isActive('/contact')}`}>Contact</Link>
            <Link 
              to="/contact" 
              className="block mt-2 px-3 py-2 text-center rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;