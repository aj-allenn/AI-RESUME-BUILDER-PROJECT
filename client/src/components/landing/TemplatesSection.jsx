import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';

const TemplatesSection = () => {
  // Placeholder data for templates
  const templates = [
    { id: 1, name: 'The Professional', tags: ['ATS-Friendly', 'Corporate'], color: 'bg-slate-100' },
    { id: 2, name: 'Modern Creative', tags: ['Design', 'Clean'], color: 'bg-primary-50' },
    { id: 3, name: 'Executive Minimalist', tags: ['Leadership', 'Simple'], color: 'bg-slate-100' },
    { id: 4, name: 'Tech Innovator', tags: ['IT', 'Engineering'], color: 'bg-slate-50' },
    { id: 5, name: 'Marketing Pro', tags: ['Creative', 'Bold'], color: 'bg-indigo-50' },
    { id: 6, name: 'Academic CV', tags: ['Education', 'Detailed'], color: 'bg-slate-50' },
  ];

  return (
    <section id="templates" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Professional <span className="text-primary-600">Resume Templates</span>
            </h2>
            <p className="text-lg text-slate-600">
              Stand out from the crowd with our expertly designed, ATS-optimized templates. Customizable to fit any industry or career level.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 hover:text-primary-600 transition-all">
            View All Templates
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="group flex flex-col">
              
              {/* Template Preview (Mockup Image Area) */}
              <div className={`relative aspect-[3/4] ${template.color} rounded-2xl mb-4 border border-slate-200 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300`}>
                
                {/* Abstract representation of a resume for the placeholder */}
                <div className="absolute inset-4 bg-white shadow-sm flex flex-col p-4 gap-3 opacity-80">
                  <div className="h-6 bg-slate-800 rounded w-1/2"></div>
                  <div className="h-2 bg-primary-500 rounded w-1/4 mb-2"></div>
                  <div className="h-1 bg-slate-200 rounded w-full mb-4"></div>
                  
                  {[1, 2, 3].map(i => (
                    <div key={i} className="mb-2">
                      <div className="h-2 bg-slate-700 rounded w-1/3 mb-2"></div>
                      <div className="h-1.5 bg-slate-300 rounded w-full mb-1"></div>
                      <div className="h-1.5 bg-slate-300 rounded w-5/6 mb-1"></div>
                      <div className="h-1.5 bg-slate-300 rounded w-4/5"></div>
                    </div>
                  ))}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm z-10">
                  <button className="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-medium shadow-lg hover:bg-primary-400 transition-colors w-40 text-center">
                    Use Template
                  </button>
                  <button className="flex items-center justify-center gap-2 text-white font-medium hover:text-primary-300 transition-colors">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary-600 transition-colors">
                    {template.name}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    {template.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl w-full sm:w-auto bg-slate-50 border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors">
            View All Templates
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TemplatesSection;
