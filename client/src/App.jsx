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
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Builder from './pages/Builder';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/builder" element={<Builder/>} />
      </Routes>
    </Router>
  )
}

export default App

