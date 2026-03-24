// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import {toast} from 'react-toastify';
// import { LogOut } from 'lucide-react';

// const Layout = () => {
//     const user={name:"allen"};
//     const navigate = useNavigate()


//     const logoutUser= ()=>{
//       localStorage.removeItem("token");
//       toast.success("Logged out successfully ");

//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     };
    
//   return (
//     <div className="min-h-screen bg-gray-50 bg-mesh-light selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300 dark:bg-slate-900 dark:bg-none">
//       {/* Top bar / Navbar */}
//       <nav className="h-16 glass border-b border-white/40 dark:border-slate-700/40 flex justify-between items-center px-4 sm:px-6 sticky top-0 z-[100] transition-colors duration-300 dark:bg-slate-900/80">
//         <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 tracking-tight">ResumeForge<span className="text-pink-500">.</span></h1>

//         <div className="flex items-center gap-4">
//           <p className="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-300">Hi, {user?.name}</p>
          
//           <button onClick={logoutUser} className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
//             <LogOut className="w-4 h-4" />
//             <span className="hidden sm:inline">Logout</span>
//           </button>
//         </div>
//       </nav>

//       {/* Main content */}
//       <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto transition-colors duration-300">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { LogOut } from 'lucide-react';
const Layout = () => {
    const user={name:""};
    const navigate = useNavigate()
    const logoutUser= ()=>{
      localStorage.removeItem("token");
      toast.success("Logged out successfully ");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    };
    
  return (
    <div className="min-h-screen bg-gray-50 bg-mesh-light selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300 dark:bg-slate-900 dark:bg-none">
      {/* Top bar / Navbar */}
      <nav className="h-16 glass border-b border-white/40 dark:border-slate-700/40 flex justify-between items-center px-4 sm:px-6 sticky top-0 z-[100] transition-colors duration-300 dark:bg-slate-900/80">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 tracking-tight">ResumeForge<span className="text-pink-500">.</span></h1>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-300">Hi, {user?.name}</p>
          
          <button onClick={logoutUser} className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
      {/* Main content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto transition-colors duration-300">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;