import React from 'react';
import { ArrowRight, Code, Wrench, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HireUsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Let's transform your ideas into reality with our expert development services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[
            {
              icon: <Code className="h-6 w-6" />,
              title: "Custom Development",
              description: "Tailored solutions for your specific needs"
            },
            {
              icon: <Wrench className="h-6 w-6" />,
              title: "Expert Support",
              description: "Dedicated team for ongoing maintenance"
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Client-Focused",
              description: "Your success is our priority"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HireUsSection;