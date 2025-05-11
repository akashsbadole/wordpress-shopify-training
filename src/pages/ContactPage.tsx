import React, { useEffect } from 'react';
import ContactSection from '../components/ContactSection';

const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact Us - WPMastery';
  }, []);

  return (
    <>
      <div className="pt-20">
        <ContactSection />
      </div>
    </>
  );
};

export default ContactPage;