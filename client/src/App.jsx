// import { useEffect,useState } from "react";

// function App(){
//   const [user, setUser]=useState(null);

//   const getUser = async()=>{
//     try{
//       const res=await fetch("http://localhost:5000/auth/me",
//         {
//           credentials:"include",
//         });
//         const data = await res.json();
//         setUser(data.user);
//     }catch(err){
//       console.error(err);
//     }
//   };
//   useEffect(()=>{
//     getUser();
//   },[]);

//   const loginWithGoogle =()=>{
//     window.location.href="http://localhost:5000/auth/google";
//   };

//   return(
//     <div style={{padding:"40px",fontFamily:"Arial"}}>
//       <h1>AI Resume Builder</h1>
       

//         {!user ? (
//         <button onClick={loginWithGoogle}>
//           Login with Google
//         </button>
//       ) : (
//         <div>
//           <p>Welcome, {user.name}</p>
//           <p>{user.email}</p>
//           <img src={user.image} width="100" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;













import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Builder from './pages/Builder.jsx';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard.jsx';
import Preview from './pages/Preview.jsx';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoutes.jsx';



function App() {
  return (
    <>
      <Routes>
       <Route path="/" element={<Home/>} />

       <Route 
       path="/app"
       element={
         <ProtectedRoute>
           <Layout/>
          </ProtectedRoute>
        }>


         <Route index element={<Dashboard/>}/>
         <Route path='builder/:resumeId' element={<Builder/>}/>
       </Route>

         <Route path="view/:resumeId" element={<Preview/>} />
         <Route path="login" element={<Login/>} />
      </Routes>
    </>
  )
}

export default App

