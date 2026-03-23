// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Hexagon } from 'lucide-react';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = React.useState(false);
//   React.useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);


//   const navLinks = [
//     { name: 'Features', href: '#features' },
//     { name: 'Templates', href: '#templates' },
//     { name: 'Careers', href: '#careers' },
//     { name: 'Contact', href: '#contact' },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
//           ? 'glass py-3 shadow-md'
//           : 'bg-transparent py-5'
//         }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-aqua-500 text-white shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all">
//               <Hexagon className="w-6 h-6 absolute" />
//               <div className="w-2 h-2 bg-white rounded-full relative z-10"></div>
//             </div>
//             <span className="text-xl font-bold text-slate-900 dark:text-primary-600 tracking-tight">
//               AI Resume <span className="text-primary-600">Builder</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation Links */}
//           <nav className="hidden md:flex items-center gap-8 ">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="text-sm font-semibold text-primary-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </nav>

//           {/* Right Section: Auth */}
//           <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4 ml-2">

//             <Link
//               to="/login"
//               className="text-sm font-semibold text-slate-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors hidden sm:block"
//             >
//               Sign In
//             </Link>
//             <Link
//               to="/login"
//               className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-500 rounded-lg shadow-sm transition-all"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'glass py-3 shadow-md'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-aqua-500 text-white shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all">
              <Hexagon className="w-6 h-6 absolute" />
              <div className="w-2 h-2 bg-white rounded-full relative z-10"></div>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-primary-600 tracking-tight">
              AI Resume <span className="text-primary-600">Builder</span>
            </span>
          </Link>
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 ">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-primary-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          {/* Right Section: Auth */}
          <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4 ml-2">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-500 rounded-lg shadow-sm transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
