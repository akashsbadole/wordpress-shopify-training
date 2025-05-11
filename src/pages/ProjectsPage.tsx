import React, { useEffect } from 'react';
import ProjectsSection from '../components/ProjectsSection';

const ProjectsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Our Projects - WPMastery';
  }, []);

  return (
    <>
      <div className="pt-20">
        <ProjectsSection />
      </div>
    </>
  );
};

export default ProjectsPage;