import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm';

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  details: string | React.ReactNode;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, details }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="mt-1 text-gray-600">{details}</div>
      </div>
    </div>
  );
};

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions about our WordPress training? We're here to help you start your learning journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <ContactInfo
              icon={<Mail className="h-6 w-6" />}
              title="Email Us"
              details={<a href="mailto:contact@wpmastery.com" className="hover:text-blue-600 transition-colors">contact@wpmastery.com</a>}
            />
            
            <ContactInfo
              icon={<Phone className="h-6 w-6" />}
              title="Call Us"
              details={<a href="tel:+15551234567" className="hover:text-blue-600 transition-colors">+1 (555) 123-4567</a>}
            />
            
            <ContactInfo
              icon={<MapPin className="h-6 w-6" />}
              title="Visit Us"
              details={
                <>
                  <p>123 WordPress Lane</p>
                  <p>San Francisco, CA 94103</p>
                </>
              }
            />
            
            <ContactInfo
              icon={<Clock className="h-6 w-6" />}
              title="Office Hours"
              details={
                <>
                  <p>Monday - Friday: 9AM - 5PM</p>
                  <p>Saturday - Sunday: Closed</p>
                </>
              }
            />
          </div>
          
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;