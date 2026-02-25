
import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/home/Navbar";
import { ArrowLeftIcon,Briefcase,FolderIcon,GraduationCap,User,FileText,Sparkles, ChevronLeft, ChevronRight, Save, Download } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import Summary from "../components/Summary";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

const Builder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

   const [resumeData,setResumeData]=useState(
    {
      _id:'',
      title:'',
      personal_info:{},
      professional_summary:'',
      experience:[],
      education:[],
      projects:[],
      skills:[],
      template:'modern',
      public:false,
      accent_color:'#038079'

  }
   );

   const [activeSectionIndex, setActiveSectionIndex]= useState(0)
   const [removeBackground,setRemoveBackground]=useState(false);

   const loadResume = useCallback(async () => {
     setLoading(true);
     try {
       const token = localStorage.getItem("token");
       const res = await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       if (res.ok) {
         const data = await res.json();
         setResumeData({
           _id: data._id,
           title: data.title || '',
           personal_info: data.personal_info || {},
           professional_summary: data.professional_summary || '',
           experience: data.experience || [],
           education: data.education || [],
           projects: data.projects || [],
           skills: data.skills || [],
           template: data.template || 'modern',
           public: data.public || false,
           accent_color: data.accent_color || '#038079',
         });
       }
     } catch (error) {
       console.error("Error loading resume:", error);
     } finally {
       setLoading(false);
     }
   }, [resumeId]);

   // Load resume data on mount
   useEffect(() => {
     if (resumeId && resumeId !== 'new') {
       loadResume();
     }
   }, [resumeId, loadResume]);

   const saveResume = async () => {
     setSaving(true);
     try {
       const token = localStorage.getItem("token");
       const url = resumeData._id 
         ? `http://localhost:5000/api/resumes/${resumeData._id}`
         : 'http://localhost:5000/api/resumes';
       
       const method = resumeData._id ? 'PUT' : 'POST';
       
       const res = await fetch(url, {
         method,
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(resumeData),
       });

       if (res.ok) {
         const data = await res.json();
         if (!resumeData._id) {
           navigate(`/app/builder/${data._id}`);
           setResumeData(prev => ({ ...prev, _id: data._id }));
         }
         alert('Resume saved successfully!');
       } else {
         alert('Failed to save resume');
       }
     } catch (error) {
       console.error("Error saving resume:", error);
       alert('Error saving resume');
     } finally {
       setSaving(false);
     }
   };

   const exportToPDF = () => {
     window.print();
   };

   const sections=[
    {id:"personal",name:"Personal Info", icon:User },
    {id:"summary",name:"Summary", icon:FileText },
    {id:"experience",name:"Experience", icon:Briefcase },
    {id:"education",name:"Education", icon:GraduationCap },
    {id:"projects",name:"Projects", icon:FolderIcon },
    {id:"skills",name:"Skills", icon:Sparkles },
   ]


   const activeSection = sections[activeSectionIndex]


  return (
   <div>
   
     <div className="max-w-7xl mx-auto px-2 py-2">
      <Link to={'/app'} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
      <ArrowLeftIcon className="size-4"/>
         Back to Dashboard
      </Link>
     </div>




     <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="grid lg:grid-cols-12 gap-8">

        {/* left panel */}

        <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 ">

            {/* progress bar using activeSectionIndex */}
            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />

            <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-600 border-none transition-all duration-2000"
            style={{width:`${activeSectionIndex * 100 / (sections.length -1 )}
            % `}}/>

            {/* section nav */}

            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
              {/* left-left */}

              <div className="flex items-center gap-2">
                 <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=> setResumeData(prev=> ({...prev,template}))}/>
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev =>({...prev,accent_color:color}))}/>
              </div>





              {/* left-right */}
              <div className="flex items-center">
                {activeSectionIndex !== 0 &&(
                  <button onClick={()=>setActiveSectionIndex((prevIndex)=>Math.max(prevIndex-1 ,0))} className="flex item-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600
                   hover:bg-gray-50 transition-all" disabled={activeSectionIndex === 0 }>
                    <ChevronLeft className="size-4"/> Previous
                  </button>
                )}

                 <button onClick={()=>setActiveSectionIndex((prevIndex)=>Math.min(prevIndex + 1 ,sections.length -1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length-1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length-1 }>
                    Next
                    <ChevronRight className="size-4"/> 
                  </button>
              </div>

            </div>
           {/* form content */}

            <div className="space-y-6">
              {activeSection.id === 'personal' && (
                <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev => ({...prev, personal_info:data}))} removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}/>
              )}

              {activeSection.id === 'summary' && (
                <Summary data={resumeData.professional_summary} onChange={(data)=> setResumeData(prev=>({...prev, professional_summary: data}))} resumeData={resumeData}/>
              )}
              
              {activeSection.id === 'experience' && (
                <Experience data={resumeData.experience} onChange={(data)=> setResumeData(prev=>({...prev, experience: data}))}/>
              )}

              {activeSection.id === 'education' && (
                <Education data={resumeData.education} onChange={(data)=> setResumeData(prev=>({...prev, education: data}))}/>
              )}

              {activeSection.id === 'projects' && (
                <Projects data={resumeData.projects} onChange={(data)=> setResumeData(prev=>({...prev, projects: data}))}/>
              )}

              {activeSection.id === 'skills' && (
                <Skills data={resumeData.skills} onChange={(data)=> setResumeData(prev=>({...prev, skills: data}))}/>
              )}

            </div>

          </div>
           
        </div>

        {/* right */}


        <div className="lg:col-span-7 max-lg:mt-6">
          <div className="mb-4 flex justify-end gap-2">
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="size-4" />
              Export PDF
            </button>
            <button
              onClick={saveResume}
              disabled={saving || loading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="size-4" />
              {saving ? 'Saving...' : 'Save Resume'}
            </button>
          </div>

         <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
        </div>

      </div>

     </div>

   </div>
    
  )
};

export default Builder;
