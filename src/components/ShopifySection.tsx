import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, BookOpen, Award, ShoppingBag } from 'lucide-react';

interface ModuleProps {
  number: number;
  title: string;
  description: string;
  lessons: string[];
  duration: string;
}

const Module: React.FC<ModuleProps> = ({ number, title, description, lessons, duration }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="px-6 py-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
            {number}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Clock className="h-4 w-4 mr-1" /> {duration}
            </p>
          </div>
        </div>
        <div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-gray-600 mb-4">{description}</p>
          <h4 className="font-medium text-gray-900 mb-2">Lessons:</h4>
          <ul className="space-y-2">
            {lessons.map((lesson, index) => (
              <li key={index} className="flex items-start">
                <BookOpen className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span className="text-gray-700">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ShopifySection: React.FC = () => {
  const modules = [
    {
      number: 1,
      title: "Shopify Fundamentals",
      description: "Learn the basics of Shopify and e-commerce essentials.",
      duration: "2 weeks",
      lessons: [
        "Introduction to Shopify & E-commerce",
        "Setting Up Your Shopify Store",
        "Product Management & Collections",
        "Store Configuration & Settings",
        "Payment Gateways & Shipping",
        "Tax Settings & Configurations",
        "Order Management",
        "Customer Management"
      ]
    },
    {
      number: 2,
      title: "Theme Development",
      description: "Master Shopify theme development and customization.",
      duration: "4 weeks",
      lessons: [
        "Liquid Template Language",
        "Theme Architecture & Structure",
        "Custom Theme Development",
        "Theme Settings & Configurations",
        "Responsive Design Implementation",
        "Theme App Extensions",
        "Performance Optimization",
        "Theme Testing & Deployment"
      ]
    },
    {
      number: 3,
      title: "App Development",
      description: "Create custom Shopify apps and integrations.",
      duration: "4 weeks",
      lessons: [
        "Shopify App Bridge",
        "REST Admin API",
        "GraphQL Admin API",
        "Webhooks & Events",
        "App Security & Authentication",
        "Billing API Integration",
        "App Deployment",
        "App Store Submission"
      ]
    },
    {
      number: 4,
      title: "Advanced E-commerce",
      description: "Learn advanced e-commerce strategies and optimizations.",
      duration: "3 weeks",
      lessons: [
        "Conversion Rate Optimization",
        "Analytics & Reporting",
        "Marketing Automation",
        "Inventory Management",
        "Multi-channel Selling",
        "International E-commerce",
        "Customer Retention",
        "E-commerce SEO"
      ]
    }
  ];

  return (
    <section id="shopify" className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <ShoppingBag className="h-4 w-4 mr-1" /> Shopify Training
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Master Shopify Development
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive training to build and customize professional Shopify stores.
          </p>
        </div>
        
        <div className="mt-12">
          {modules.map((module) => (
            <Module
              key={module.number}
              number={module.number}
              title={module.title}
              description={module.description}
              lessons={module.lessons}
              duration={module.duration}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#pricing" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            View Pricing Plans
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShopifySection;