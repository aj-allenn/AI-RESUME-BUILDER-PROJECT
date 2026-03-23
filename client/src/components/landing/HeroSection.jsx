import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-light -z-10"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-48 w-96 h-96 bg-aqua-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span>AI-Powered Resume Builder</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Build a Professional Resume in <span className="text-gradient">Minutes with AI</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Create ATS-friendly resumes, enhance your resume content using AI, and download a professional resume instantly to land your dream job faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
              
              <a 
                href="#templates" 
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-slate-700 font-medium border border-slate-200 hover:border-primary-200 hover:bg-primary-50 transition-all"
              >
                <FileText className="w-5 h-5 mr-2 text-primary-500" />
                View Templates
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-10 pt-10 border-t border-slate-200/60 flex flex-wrap justify-center lg:justify-start gap-8">
              <div>
                <p className="text-3xl font-bold text-slate-900">10k+</p>
                <p className="text-sm text-slate-500 font-medium">Resumes Created</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">15+</p>
                <p className="text-sm text-slate-500 font-medium">ATS Templates</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">98%</p>
                <p className="text-sm text-slate-500 font-medium">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Mockup */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-2xl glass p-2 shadow-2xl overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-aqua-500/10 z-0"></div>
              
              {/* Mockup Top Bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/80 border-b border-white/20 relative z-10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto bg-slate-100 rounded-md px-3 py-1 text-xs text-slate-500 font-medium">resume-editor.app</div>
              </div>
              
              {/* Mockup Content */}
              <div className="bg-white p-4 sm:p-6 aspect-[4/3] sm:aspect-video relative z-10">
                <div className="flex gap-6 h-full">
                  {/* Editor Sidebar */}
                  <div className="w-1/3 hidden sm:flex flex-col gap-3">
                    <div className="h-8 bg-slate-100 rounded-md mb-2"></div>
                    <div className="h-20 bg-primary-50 border border-primary-100 rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3 h-3 text-primary-500" />
                        <div className="h-2 w-16 bg-primary-200 rounded"></div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                        <div className="h-1.5 bg-slate-200 rounded w-4/5"></div>
                      </div>
                    </div>
                    <div className="h-12 bg-slate-50 border border-slate-100 rounded-md"></div>
                    <div className="h-12 bg-slate-50 border border-slate-100 rounded-md"></div>
                  </div>
                  
                  {/* Resume Preview Area */}
                  <div className="flex-1 border shadow-sm border-slate-200 bg-white rounded-sm p-4 sm:p-6 shadow-[0_0_15px_rgba(0,0,0,0.05)]">
                    <div className="space-y-4">
                      {/* Name & Title */}
                      <div className="text-center border-b border-slate-200 pb-3">
                        <div className="h-4 bg-slate-800 rounded w-1/2 mx-auto mb-2"></div>
                        <div className="h-2 bg-primary-500 rounded w-1/4 mx-auto mb-1"></div>
                        <div className="flex justify-center gap-3 mt-2">
                          <div className="h-1.5 bg-slate-300 rounded w-12"></div>
                          <div className="h-1.5 bg-slate-300 rounded w-16"></div>
                        </div>
                      </div>
                      
                      {/* Experience */}
                      <div>
                        <div className="h-2.5 bg-slate-700 rounded w-24 mb-3"></div>
                        <div className="space-y-3">
                          {[1, 2].map((i) => (
                            <div key={i}>
                              <div className="flex justify-between mb-1.5">
                                <div className="h-2 bg-slate-800 rounded w-32"></div>
                                <div className="h-2 bg-slate-300 rounded w-16"></div>
                              </div>
                              <div className="h-2 bg-primary-600 rounded w-24 mb-2"></div>
                              <div className="space-y-1.5 pl-3">
                                <div className="h-1.5 bg-slate-400 rounded w-full"></div>
                                <div className="h-1.5 bg-slate-400 rounded w-[95%]"></div>
                                <div className="h-1.5 bg-slate-400 rounded w-4/5"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 sm:-left-12 bg-white rounded-xl p-4 shadow-xl border border-slate-100 animate-[bounce_4s_infinite] glass">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">98</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">ATS Score</p>
                  <p className="text-xs text-green-600 font-medium">Excellent</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
