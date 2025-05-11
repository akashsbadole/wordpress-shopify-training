import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'WPMastery - WordPress & Shopify Training';
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
};

export default HomePage;