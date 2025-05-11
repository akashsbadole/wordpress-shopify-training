import React from 'react';
import { Code, ShoppingBag, Wrench, Users, CheckCircle, Clock } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, price }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transition-transform hover:-translate-y-1 duration-300">
      <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-2xl font-bold text-gray-900 mb-6">{price}</div>
      <button className="w-full py-3 px-6 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
        Get Started
      </button>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const services = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "WordPress Development",
      description: "Custom WordPress websites tailored to your business needs.",
      features: [
        "Custom Theme Development",
        "Plugin Development",
        "E-commerce Integration",
        "Performance Optimization",
        "Security Implementation"
      ],
      price: "Starting at $2,999"
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Shopify Development",
      description: "Professional Shopify stores with custom features.",
      features: [
        "Custom Theme Development",
        "App Development",
        "Store Setup & Configuration",
        "Payment Gateway Integration",
        "Marketing Automation"
      ],
      price: "Starting at $2,499"
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Maintenance & Support",
      description: "Ongoing support and maintenance for your website.",
      features: [
        "Regular Updates",
        "Security Monitoring",
        "Performance Optimization",
        "Content Updates",
        "Technical Support"
      ],
      price: "From $299/month"
    }
  ];

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            <Users className="h-4 w-4 mr-1" /> Client Projects
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Hire Us for Your Next Project
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We offer professional development services for WordPress and Shopify projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              price={service.price}
            />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Development Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-6 w-6" />,
                title: "Discovery",
                description: "We analyze your requirements and create a detailed project plan."
              },
              {
                icon: <Code className="h-6 w-6" />,
                title: "Development",
                description: "Our team builds your project using best practices and modern technologies."
              },
              {
                icon: <CheckCircle className="h-6 w-6" />,
                title: "Testing",
                description: "Rigorous testing ensures everything works perfectly."
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Launch",
                description: "We deploy your project and provide ongoing support."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;