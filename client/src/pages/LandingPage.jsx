import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import HowItWorks from '../components/landing/HowItWorks';
import AIFeatures from '../components/landing/AIFeatures';
import TemplatesSection from '../components/landing/TemplatesSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <AIFeatures />
        <TemplatesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
