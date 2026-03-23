import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx';
import Builder from './pages/Builder.jsx';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard.jsx';
import Preview from './pages/Preview.jsx';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Routes>
       <Route path="/" element={<LandingPage/>} />

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

      <ToastContainer position='top-right' autoClose={3000}/>
    </>
  )
}

export default App

