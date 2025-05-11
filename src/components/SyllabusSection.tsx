import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, BookOpen, Award } from 'lucide-react';

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
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
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
                <BookOpen className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-gray-700">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const SyllabusSection: React.FC = () => {
  const modules = [
    {
      number: 1,
      title: "WordPress Fundamentals",
      description: "Master the essential concepts of WordPress and build a strong foundation.",
      duration: "2 weeks",
      lessons: [
        "Introduction to WordPress and CMS Concepts",
        "Installing WordPress (Local & Live Environments)",
        "WordPress Dashboard & Administration",
        "Posts, Pages, and Content Management",
        "Media Library & File Management",
        "Users, Roles, and Permissions",
        "Comments and Discussion Settings",
        "WordPress Settings & Configuration"
      ]
    },
    {
      number: 2,
      title: "Theme Development & Customization",
      description: "Learn to create and customize WordPress themes for unique designs.",
      duration: "4 weeks",
      lessons: [
        "WordPress Theme Architecture",
        "Theme Hierarchy & Template Files",
        "Creating Custom Page Templates",
        "Working with WordPress Loop",
        "Advanced Theme Customizer API",
        "Child Themes Development",
        "Theme Security Best Practices",
        "Responsive Design Implementation"
      ]
    },
    {
      number: 3,
      title: "Plugin Development",
      description: "Master the art of extending WordPress functionality through plugins.",
      duration: "4 weeks",
      lessons: [
        "Plugin Development Fundamentals",
        "WordPress Plugin API & Hooks",
        "Creating Admin Interfaces",
        "Custom Post Types & Taxonomies",
        "WordPress Database Operations",
        "AJAX in WordPress Plugins",
        "Plugin Security & Validation",
        "Plugin Testing & Deployment"
      ]
    },
    {
      number: 4,
      title: "E-commerce with WooCommerce",
      description: "Build professional online stores using WooCommerce.",
      duration: "3 weeks",
      lessons: [
        "WooCommerce Setup & Configuration",
        "Product Management & Attributes",
        "Payment Gateway Integration",
        "Shipping Methods & Zones",
        "Order Management System",
        "Custom Product Types",
        "WooCommerce REST API",
        "Store Optimization Techniques"
      ]
    },
    {
      number: 5,
      title: "Advanced Web Applications",
      description: "Create modern web applications using WordPress as a backend.",
      duration: "4 weeks",
      lessons: [
        "WordPress REST API Architecture",
        "Custom API Endpoints",
        "Authentication & Authorization",
        "React.js Integration",
        "State Management with Redux",
        "Real-time Features with WebSockets",
        "Progressive Web Apps (PWA)",
        "Performance Optimization"
      ]
    },
    {
      number: 6,
      title: "Security & Performance",
      description: "Implement robust security measures and optimize performance.",
      duration: "2 weeks",
      lessons: [
        "WordPress Security Fundamentals",
        "SSL Implementation",
        "Security Plugins & Firewalls",
        "Database Optimization",
        "Caching Strategies",
        "CDN Integration",
        "Backup & Recovery",
        "Performance Monitoring"
      ]
    },
    {
      number: 7,
      title: "Headless WordPress",
      description: "Build modern applications using WordPress as a headless CMS.",
      duration: "3 weeks",
      lessons: [
        "Headless CMS Architecture",
        "REST API Authentication",
        "GraphQL in WordPress",
        "Next.js Integration",
        "Content Modeling",
        "Dynamic Routing",
        "SEO for Headless Sites",
        "Deployment Strategies"
      ]
    },
    {
      number: 8,
      title: "WordPress Multisite",
      description: "Manage multiple WordPress sites from a single installation.",
      duration: "2 weeks",
      lessons: [
        "Multisite Network Setup",
        "Network Administration",
        "Domain Mapping",
        "User Management",
        "Theme Management",
        "Plugin Management",
        "Content Sharing",
        "Network Security"
      ]
    }
  ];

  return (
    <section id="syllabus" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <Award className="h-4 w-4 mr-1" /> Comprehensive Curriculum
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            WordPress Course Syllabus
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our structured learning path takes you from WordPress basics to advanced development.
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
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Pricing Plans
          </a>
        </div>
      </div>
    </section>
  );
};

export default SyllabusSection;