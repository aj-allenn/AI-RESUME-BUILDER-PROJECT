
import { PlusIcon, Upload, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react';
import {useNavigate } from "react-router-dom"

const Dashboard = () => {

  const [showCreateResume,setshowCreateResume]=useState(false)
  const [showUploadResume,setshowUploadResume]=useState(false)
  const [title,setTitle] = useState("")
  const [resume,setResume] = useState(null)
  const [editResumeId,setResumeId]=useState("")

  const navigate= useNavigate()




const createResume=async (event)=>{
  event.preventDefault()
  setshowCreateResume(false)
  navigate(`/app//builder/resume123`)
}

const uploadResume = async (event)=>{
  event.preventDefault()
  setshowUploadResume(false)
  navigate(`/app/builder/resume123`)
}


  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium m-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Allen</p>

        <div className='flex gap-4'>

            {/* button-1*/}
            <button onClick={()=>setshowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2
             text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all
              duration-300 cursor-pointer'>
                <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full'/>
                <p className='text-sm group-hover:text-indigo-600
                 transition-all duration-300'>Create Resume</p>
            </button>


             <button onClick={()=>setshowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2
             text-slate-600 border border-dashed border-slate-300 group hover:border-violet-500 hover:shadow-lg transition-all
              duration-300 cursor-pointer'>
                <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-violet-700 text-white rounded-full'/>
                <p className='text-sm group-hover:text-violet-600
                 transition-all duration-300'>Upload Existing</p>
            </button>
        </div>



        <hr className='border-slate-500 my-6 sm:w-[305px]'/>


       {showCreateResume && (
        <form onSubmit={createResume} onClick={()=>{setshowCreateResume(false)}} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
         
         <div onClick={e=> e.stopPropagation()} className='relative bg-slate-50 border shadoow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Create a resume</h2>
            <input type="text" placeholder='enter resume title' className='w-full px-4 py-2 mb-4 focus:border-violet-600 ring-violet-600' required />

            <button className='w-full py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors'>Create Resume</button>

            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
            onClick={()=>{
              setshowCreateResume(false); setTitle('')
            }}/>
         </div>
        </form>
       )

       }


       {showUploadResume && (

        <form onSubmit={uploadResume} onClick={()=>{setshowUploadResume(false)}} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
         
         <div onClick={e=> e.stopPropagation()} className='relative bg-slate-50 border shadoow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Upload resume</h2>
            <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='enter resume title' className='w-full px-4 py-2 mb-4 focus:border-violet-600 ring-violet-600' required />



            <div>
              <label htmlFor="resume-input" className='block text-sm
               text-slate-700'> 
               Select resume file
               <div className='flex flex-col items-center justify-center gap-2 
               border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:text-violet-700 cursor-pointer transition-colors'>

                { resume ? (
                  <p className='text-indigo-700'>{resume.name}</p>
                ):(
                  <>
                  <UploadCloudIcon className='size-14 stroke-1' />
                  <p>Upload resume</p>
                    </>
                )}

               </div>
              </label>

              {/* resume-input */}

              <input type="file" id='resume-input' accept='.pdf'hidden
              onChange={(e)=>setResume(e.target.files[0])}  />
            

            </div>

            <button className='w-full py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors'>Upload Resume</button>
            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
            onClick={()=>{
              setshowUploadResume(false); setTitle('')
            }}/>

            </div>
            </form>
       )

       }

        </div>
    </div>
  )
}

export default Dashboard
