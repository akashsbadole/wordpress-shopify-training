import React, { useEffect } from 'react';
import SyllabusSection from '../components/SyllabusSection';
// import PricingSection from '../components/PricingSection';
import EnrollmentForm from "../components/EnrollmentForm";

const WordPressPage: React.FC = () => {
  useEffect(() => {
    document.title = 'WordPress Training - WPMastery';
  }, []);

  return (
    <>
      <div className="pt-20">
        <SyllabusSection />
        {/* <PricingSection /> */}
        <EnrollmentForm courseName="WordPress" />
      </div>
    </>
  );
};

export default WordPressPage;