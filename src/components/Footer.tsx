import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Heart, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">WPMastery</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              We provide expert WordPress training to help you build beautiful, functional websites and advance your career as a web professional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#syllabus" className="text-gray-300 hover:text-blue-400 transition-colors">Syllabus</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-blue-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">WordPress Basics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Theme Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Plugin Creation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">WooCommerce</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">WordPress Security</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} WPMastery. All rights reserved.
          </p>
          <p className="text-gray-400 mt-2 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for WordPress enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;