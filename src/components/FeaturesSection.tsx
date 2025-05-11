import React from 'react';
import { Layout, Code, Image, Globe, Database, Search, ShieldCheck, Zap } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow group">
      <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Theme Development",
      description: "Learn to create custom WordPress themes from scratch that perfectly match your design vision."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Plugin Development",
      description: "Build custom plugins to extend WordPress functionality for specific business requirements."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Website Management",
      description: "Master the day-to-day operations of maintaining a WordPress website effectively."
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Content Creation",
      description: "Create engaging content with WordPress's powerful content management tools."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Management",
      description: "Understand WordPress database structure and optimize it for better performance."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Optimization",
      description: "Implement best SEO practices to rank higher in search engine results."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Security Practices",
      description: "Learn essential security measures to protect your WordPress website from threats."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Tuning",
      description: "Optimize your WordPress site for lightning-fast loading speeds."
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What You'll Learn
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our comprehensive WordPress curriculum covers everything you need to become a WordPress professional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;