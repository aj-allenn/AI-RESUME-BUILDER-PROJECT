
import { PlusIcon, Upload, UploadCloudIcon, XIcon, FileText, Trash2, Edit, Eye, LoaderCircleIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// import {useSelector} from 'react-redux';

const Dashboard = () => {

  // const {user,token} = useSelctor(state => state.auth)

  const [showCreateResume, setshowCreateResume] = useState(false)
  const [showUploadResume, setshowUploadResume] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)




  const navigate = useNavigate()

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
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
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
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error("Error loading resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (event) => {
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

  useEffect(() => {
    loadResumes()
  }, [])


  return (
    <div className="min-h-screen bg-mesh flex p-4 gap-4 pb-4">

      {/* SIDEBAR */}
      <div className="hidden md:flex w-64 glass rounded-3xl flex-col p-6 shadow-sm border border-white/60 relative overflow-hidden">
        {/* Subtle glow behind sidebar content */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 mb-10 tracking-tight">
            ResumeForge<span className="text-pink-500">.</span>
          </h1>

          <div className="space-y-6">
            <div className="p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-white/50 dark:border-slate-700/50 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-1">Total Resumes</p>
              <p className="text-3xl font-bold text-slate-700 dark:text-slate-200">{resumes.length}</p>
            </div>

            <div className="p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-white/50 dark:border-slate-700/50 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-1">Account</p>
              <p className="text-base font-medium text-slate-700 dark:text-slate-200 truncate">{user?.name || "User"}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto relative z-10 text-xs text-slate-400 font-medium">
          © 2026 Resume Builder
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="glass rounded-3xl flex-1 p-8 md:p-10 overflow-y-auto border border-white/60 shadow-sm relative">

          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Welcome back, {user?.name || "User"} 👋
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base mt-2 font-medium">
              Create, manage, and download your resumes.
            </p>
          </div>

          {/* ACTION BAR */}
          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => setshowCreateResume(true)}
              className="group flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-semibold shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] transition-all hover:bg-indigo-700 active:scale-[0.98] active:shadow-none"
            >
              <PlusIcon className="size-5 transition-transform group-hover:rotate-90" />
              Create New Resume
            </button>

            <button
              onClick={() => setshowUploadResume(true)}
              className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
            >
              <UploadCloudIcon className="size-5 text-indigo-500 dark:text-indigo-400" />
              Upload PDF
            </button>
          </div>

          {/* RESUME GRID */}
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <LoaderCircleIcon className="size-8 text-indigo-500 animate-spin" />
            </div>
          ) : resumes.length === 0 ? (
            <div className="bg-white/40 dark:bg-slate-800/40 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 rounded-3xl p-16 text-center shadow-sm">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="size-10 text-indigo-400 dark:text-indigo-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">No resumes found</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
                You haven't created any resumes yet. Start by creating a new one or upload an existing PDF.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 relative z-10">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl border border-white/80 dark:border-slate-700/50 p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <FileText className="size-6 text-indigo-600 dark:text-indigo-400" />
                  </div>

                  <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1 truncate">
                    {resume.title || "Untitled Resume"}
                  </h3>

                  <p className="text-sm text-slate-400 dark:text-slate-500 font-medium mb-8">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={() => navigate(`/app/builder/${resume._id}`)}
                      className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Edit className="size-4" />
                      Edit
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/view/${resume._id}`)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all"
                        title="Preview"
                      >
                        <Eye className="size-4" />
                      </button>

                      <button
                        onClick={() => deleteResume(resume._id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* CREATE MODAL */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setshowCreateResume(false)}
            className="fixed inset-0 bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-[2rem] w-full max-w-md p-8 shadow-2xl transform transition-all border border-transparent dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Create Resume
                </h2>
                <button type="button" onClick={() => setshowCreateResume(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Resume Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Software Engineer Role"
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 font-medium"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setshowCreateResume(false)} className="flex-1 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  Cancel
                </button>
                <button className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-md border border-indigo-600 hover:bg-indigo-700 transition-all">
                  Create
                </button>
              </div>
            </div>
          </form>
        )}

        {/* UPLOAD MODAL */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setshowUploadResume(false)}
            className="fixed inset-0 bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-[2rem] w-full max-w-md p-8 shadow-2xl transform transition-all border border-transparent dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Upload Resume
                </h2>
                <button type="button" onClick={() => setshowUploadResume(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Resume Title</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="e.g. Uploaded Frontend Resume"
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 font-medium"
                  required
                />
              </div>

              <label htmlFor="resume-input" className="block mb-8 group cursor-pointer">
                <div className="border-2 border-dashed border-indigo-200 dark:border-indigo-500/40 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-2xl p-10 text-center transition-all group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:border-indigo-400 dark:group-hover:border-indigo-400">
                  <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloudIcon className="size-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  {resume ? (
                    <p className="font-semibold text-indigo-700 dark:text-indigo-300 truncate px-4">{resume.name}</p>
                  ) : (
                    <div>
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Click to upload PDF</p>
                      <p className="text-xs text-slate-500 font-medium">Max file size 5MB</p>
                    </div>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />

              <div className="flex gap-3">
                <button type="button" onClick={() => setshowUploadResume(false)} className="flex-1 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  Cancel
                </button>
                <button disabled={loading} className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-indigo-700 disabled:opacity-70 transition-all">
                  {loading && <LoaderCircleIcon className='animate-spin size-5' />}
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard
