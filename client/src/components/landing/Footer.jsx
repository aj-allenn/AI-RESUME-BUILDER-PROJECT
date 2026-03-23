import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon, Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-aqua-500 text-white shadow-md">
                <Hexagon className="w-5 h-5 absolute" />
                <div className="w-1.5 h-1.5 bg-white rounded-full relative z-10"></div>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                AI Resume Builder
              </span>
            </Link>
            <p className="text-slate-600 leading-relaxed mb-6 max-w-sm">
              An intelligent resume building platform designed to help you stand out and land your dream job faster.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Templates', 'AI Assistant', 'Pricing', 'Changelog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-600 hover:text-primary-600 transition-colors text-sm font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Resume Examples', 'Cover Letter Builder', 'Blog', 'Career Advice', 'Help Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-600 hover:text-primary-600 transition-colors text-sm font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-600 hover:text-primary-600 transition-colors text-sm font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 AI Resume Builder. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
