import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-24 my-10 overflow-hidden text-center rounded-3xl mx-4 sm:mx-6 lg:mx-8 bg-slate-900 shadow-2xl">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-600/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-aqua-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-aqua-400" />
          <span>Launch Your Career Today</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Start Building Your <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-aqua-400">
            Professional Resume
          </span>
        </h2>
        
        <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
          Join thousands of job seekers who are already creating ATS-friendly, professional resumes with our AI-powered builder. First resume is 100% free.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1"
          >
            Create My Resume Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <p className="text-sm text-slate-400 mt-4 sm:hidden">No credit card required</p>
        </div>
        
        <p className="hidden sm:block text-sm text-slate-400 mt-6 font-medium">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
