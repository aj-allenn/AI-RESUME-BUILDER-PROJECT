
import { PlusIcon, Upload, UploadCloudIcon, XIcon, FileText, Trash2, Edit, Eye, LoaderCircleIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// import {useSelector} from 'react-redux';

const Dashboard = () => {

  // const {user,token} = useSelctor(state => state.auth)

  const [showCreateResume,setshowCreateResume]=useState(false)
  const [showUploadResume,setshowUploadResume]=useState(false)
  const [title,setTitle] = useState("")
  const [resume,setResume] = useState(null)
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)


  

  const navigate= useNavigate()

  useEffect(() => {
    loadUser();
    loadResumes();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch('http://localhost:5000/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const loadResumes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch('http://localhost:5000/api/resumes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setResumes(data);
      }
    } catch (error) {
      console.error("Error loading resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const createResume=async (event)=>{
    event.preventDefault()
    if (!title.trim()) {
      alert('Please enter a resume title');
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch('http://localhost:5000/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setshowCreateResume(false);
        setTitle("");
        navigate(`/app/builder/${data._id}`);
      } else {
        toast.error('Failed to create resume');
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      alert('Error creating resume');
    }
  }

  const deleteResume = async (id) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/resumes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        loadResumes();
      } else {
        toast.error('Failed to delete resume');
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert('Error deleting resume');
    }
  };

  const uploadResume = async (event) => {
  event.preventDefault()
  setLoading(true)

  if (!resume) {
    toast.error("Please select a PDF file");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    // const resumeText= await pdfToText(resume)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("resume", resume);

    const res = await fetch("http://localhost:5000/api/resumes/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      toast.success("Resume uploaded successfully!");
      setshowUploadResume(false);
      setTitle("");
      setResume(null);
      loadResumes();
      navigate(`/app/builder/${data._id}`);
    } else {
      toast.error("Upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Error uploading resume");
  }
};

useEffect(()=>{
loadResumes()
},[])


  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium m-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
          Welcome, {user?.name || 'User'}
        </p>

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

        {/* Existing Resumes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Resumes</h2>
          {loading ? (
            <p className="text-gray-500">Loading resumes...</p>
          ) : resumes.length === 0 ? (
            <p className="text-gray-500">No resumes yet. Create your first resume above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="size-5 text-indigo-600" />
                      <h3 className="font-semibold text-gray-800">{resume.title || 'Untitled Resume'}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/app/builder/${resume._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
                    >
                      <Edit className="size-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/view/${resume._id}`)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                    >
                      <Eye className="size-4" />
                    </button>
                    <button
                      onClick={() => deleteResume(resume._id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


       {showCreateResume && (
        <form onSubmit={createResume} onClick={()=>{setshowCreateResume(false)}} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
         
         <div onClick={e=> e.stopPropagation()} className='relative bg-slate-50 border shadoow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Create a resume</h2>
            <input 
              type="text" 
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder='enter resume title' 
              className='w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:border-violet-600 focus:ring-violet-600 outline-none' 
              required 
            />

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

            <button className='w-full py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors'>
              {loading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
            
              Upload Resume
              </button>
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
