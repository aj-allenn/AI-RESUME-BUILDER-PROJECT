import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  
    const user={name:"Allen"};

    const navigate = useNavigate()

    const logoutUser= ()=>{
        navigate ('/')
    }
    
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Top bar / Navbar */}
      <div className="h-14 bg-indigo-900 text-white flex justify-between items-center px-6">
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
