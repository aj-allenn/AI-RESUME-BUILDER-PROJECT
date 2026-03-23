import React from 'react';
import { LayoutTemplate, FileEdit, Wand2, Download } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <LayoutTemplate className="w-8 h-8 text-primary-500" />,
      title: "Choose a Template",
      description: "Select from our collection of modern, professional, and ATS-friendly resume templates designed by HR experts."
    },
    {
      number: "02",
      icon: <FileEdit className="w-8 h-8 text-aqua-500" />,
      title: "Customize Your Layout",
      description: "Edit sections, fonts, colors, and overall resume structure easily with our intuitive drag-and-drop editor."
    },
    {
      number: "03",
      icon: <Wand2 className="w-8 h-8 text-primary-500" />,
      title: "Enhance with AI",
      description: "Let our AI automatically rewrite and improve your resume summaries, bullet points, and work experience descriptions."
    },
    {
      number: "04",
      icon: <Download className="w-8 h-8 text-aqua-500" />,
      title: "Download Resume",
      description: "Export your highly optimized and polished final resume instantly as a PDF file, ready for applications."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Build Your Resume <span className="text-primary-600">Fast and Easy</span>
          </h2>
          <p className="text-lg text-slate-600">
            Follow our simple 4-step process to create a stunning, professional resume that gets you hired faster than ever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (visible on large screens) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100 z-0 border-dashed border-t-2 border-primary-200"></div>

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative z-10 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 hover:border-primary-200 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-primary-500/20">
                  {step.icon}
                </div>
                <span className="text-5xl font-black text-slate-100 mt-2 tracking-tighter group-hover:text-primary-50 transition-colors">
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
