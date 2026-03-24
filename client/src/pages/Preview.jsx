import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import ResumePreview from '../components/ResumePreview'

const Preview = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
   const API = import.meta.env.VITE_API_URL;
  const loadResume = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/resumes/public/${resumeId}`)
      
      if (res.ok) {
        const data = await res.json()
        setResumeData({
          _id: data._id,
          title: data.title || '',
          personal_info: data.personal_info || {},
          professional_summary: data.professional_summary || '',
          skills: data.skills || [],
          experience: data.experience || [],
          projects: data.projects || [],
          education: data.education || [],
          template: data.template || 'modern',
          accent_color: data.accent_color || '#038079',
        })
      } else {
        setError('Resume not found or not public')
      }
    } catch (err) {
      console.error("Error loading resume:", err)
      setError('Failed to load resume')
    } finally {
      setLoading(false)
    }
  }, [resumeId])

  useEffect(() => {
    loadResume()
  }, [loadResume])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading resume...</p>
      </div>
    )
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Resume not found'}</p>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/" className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all mb-4">
          <ArrowLeftIcon className="size-4"/>
          Back to Home
        </Link>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <ResumePreview 
            data={resumeData} 
            template={resumeData.template} 
            accentColor={resumeData.accent_color}
          />
        </div>
      </div>
    </div>
  )
}

export default Preview
