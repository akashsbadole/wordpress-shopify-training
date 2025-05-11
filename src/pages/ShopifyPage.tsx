import React, { useEffect } from 'react';
import ShopifySection from '../components/ShopifySection';
import PricingSection from '../components/PricingSection';

const ShopifyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Shopify Training - WPMastery';
  }, []);

  return (
    <>
      <div className="pt-20">
        <ShopifySection />
        <PricingSection />
      </div>
    </>
  );
};

export default ShopifyPage;