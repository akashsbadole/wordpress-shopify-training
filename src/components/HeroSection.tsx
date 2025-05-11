import React from 'react';
import { BookOpen, Users, Award } from 'lucide-react';
import { Link } from './Link';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
              Master WordPress with <span className="text-blue-600">Expert Training</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              Learn to build, customize, and manage professional WordPress websites with our comprehensive courses designed for beginners to advanced users.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="#syllabus" 
                className="flex-1 px-8 py-3 rounded-md shadow bg-blue-600 text-white text-center font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                View Syllabus
              </Link>
              <Link 
                href="#contact" 
                className="flex-1 px-8 py-3 border border-blue-600 rounded-md text-blue-600 text-center font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span>1000+ Students</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <span>20+ Courses</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-blue-600 mr-2" />
                <span>Industry Recognized</span>
              </div>
            </div>
          </div>
          <div className="mt-12 relative lg:mt-0 lg:col-span-6 xl:col-span-7">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-64 w-64 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              </div>
              <img
                className="relative rounded-lg shadow-xl mx-auto"
                src="https://images.pexels.com/photos/35550/ipad-tablet-technology-touch.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="WordPress Dashboard on laptop"
              />
              <div className="absolute top-0 right-0 -mr-8 -mt-8 bg-blue-600 rounded-full p-3 shadow-lg transform transition-transform hover:scale-110">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 bg-white rounded-lg p-4 shadow-lg transform transition-transform hover:scale-110">
                <div className="text-sm font-medium text-gray-900">WordPress Professional</div>
                <div className="text-xs text-gray-600">Certified Training</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;