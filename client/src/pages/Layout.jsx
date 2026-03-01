import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

const Layout = () => {
  
    const user={name:"allen"};

    const navigate = useNavigate()

    const logoutUser= ()=>{
      localStorage.removeItem("token");
      toast.success("Logged out successfully ");

      setTimeout(() => {
      navigate("/");
      }, 1000);


    };
    
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Top bar / Navbar */}
      <div className="h-14 bg-indigo-500 text-white flex justify-between items-center px-6">
        <h1 className="text-lg font-semibold">AI Resume Builder</h1>

      <div>
        <p>Hi, {user?.name}</p>
      </div>

      <button onClick={logoutUser} className=" w-20 bg-white text-black rounded hover:bg-gray-300">
        Logout
      </button>
      </div>


      {/* Main content */}
      <div className="p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default Layout;
