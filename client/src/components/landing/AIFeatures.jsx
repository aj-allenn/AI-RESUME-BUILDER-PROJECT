import React from 'react';
import { Sparkles, FileText, CheckCircle, Search, ArrowRight } from 'lucide-react';

const AIFeatures = () => {
  const features = [
    {
      title: "AI Resume Summary Generator",
      description: "Instantly create professional, tailored summaries that highlight your unique strengths and catch recruiters' attention.",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      color: "from-primary-500 to-primary-600",
      delay: "0",
    },
    {
      title: "AI Bullet Point Improvement",
      description: "Transform weak experience descriptions into powerful, action-oriented achievements that showcase your impact.",
      icon: <FileText className="w-6 h-6 text-white" />,
      color: "from-aqua-500 to-cyan-600",
      delay: "100",
    },
    {
      title: "ATS Optimization Suggestions",
      description: "Get real-time feedback on missing keywords and formatting to ensure your resume passes Applicant Tracking Systems.",
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      color: "from-teal-500 to-emerald-600",
      delay: "200",
    },
    {
      title: "Resume Content Analyzer",
      description: "Our AI scans your entire resume for tone, readability, spelling, and consistency, giving you an overall impact score.",
      icon: <Search className="w-6 h-6 text-white" />,
      color: "from-primary-600 to-indigo-600",
      delay: "300",
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-aqua-100/50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100/50 text-primary-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Smart Technology</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              AI Powered <span className="text-gradient">Resume Assistance</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Stop struggling with writer's block. Our advanced artificial intelligence analyzes your career history and industry to write compelling content that gets you noticed by top employers.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Save hours of writing and formatting",
                "Beat the 6-second recruiter screen",
                "Tailor content to specific job descriptions"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <button className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group">
              Learn more about our AI
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 group hover:-translate-y-1"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-md shadow-primary-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
