// import React from 'react'
// import { Link } from 'react-router-dom';

// const Navbar = () => {


//   return (
//         <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass border-b border-white/40 dark:border-slate-700/40">
//            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//              <div className="flex items-center justify-between h-20">
//                <div className="flex-shrink-0 flex items-center gap-2">
//                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
//                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
//                  </div>
//                  <span className="font-extrabold text-2xl tracking-tight text-slate-800 dark:text-white">
//                     ResumeForge<span className="text-pink-500">.</span>
//                  </span>
//                </div>
               
//                <div className="hidden md:flex space-x-8">
//                  <a href="#features" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 transition-colors">Features</a>
//                  <a href="#templates" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 transition-colors">Templates</a>
//                  <a href="#about" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 transition-colors">About Us</a>
//                  <a href="#contact" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 transition-colors">Contact</a>
//                </div>

//                <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-700 pl-4">

//                   <Link to={'/login?state=login'} className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors px-4 py-2 hidden sm:block">
//                       Sign In
//                   </Link>
//                   {/* <Link to={'/app'} className="inline-flex items-center justify-center px-4 md:px-6 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] transition-all active:scale-[0.98]">
//                       Dashboard
//                   </Link> */}
//                </div>
//              </div>
//            </div>
//         </nav>
//     );
// };
 
// export default Navbar


import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass border-b border-white/40 dark:border-slate-700/40">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex items-center justify-between h-20">
               <div className="flex-shrink-0 flex items-center gap-2">
                 <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 </div>
                 <span className="font-extrabold text-2xl tracking-tight text-slate-800 dark:text-white">
                    ResumeForge<span className="text-pink-500">.</span>
                 </span>
               </div>
               
               <div className="hidden md:flex space-x-8">
                 <a href="#features" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 transition-colors">Features</a>
                 <a href="#templates" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 transition-colors">Templates</a>
                 <a href="#about" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 transition-colors">About Us</a>
                 <a href="#contact" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 transition-colors">Contact</a>
               </div>
               <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-700 pl-4">
                  <Link to={'/login?state=login'} className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors px-4 py-2 hidden sm:block">
                      Sign In
                  </Link>
                  {/* <Link to={'/app'} className="inline-flex items-center justify-center px-4 md:px-6 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] transition-all active:scale-[0.98]">
                      Dashboard
                  </Link> */}
               </div>
             </div>
           </div>
        </nav>
    );
};
 
export default Navbar
