import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WordPressPage from './pages/WordPressPage';
import ShopifyPage from './pages/ShopifyPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import HireUsSection from './components/HireUsSection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wordpress" element={<WordPressPage />} />
            <Route path="/shopify" element={<ShopifyPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <HireUsSection />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;