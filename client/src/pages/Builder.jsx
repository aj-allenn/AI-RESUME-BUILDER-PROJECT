
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/home/Navbar";
import { ArrowLeftIcon, Briefcase, FolderIcon, GraduationCap, User, FileText, Sparkles, ChevronLeft, ChevronRight, Save, Download } from "lucide-react";
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
// import html2pdf from "html2pdf.js";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Builder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [isDirty, setIsDirty] = useState(false);

  const [resumeData, setResumeData] = useState(
    {
      _id: '',
      title: '',
      personal_info: {},
      professional_summary: '',
      experience: [],
      education: [],
      projects: [],
      skills: [],
      template: 'classic',
      public: false,
      accent_color: '#038079'

    }
  );

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);


  const updateField = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };


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

        setIsDirty(false);
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please log in again.');
        navigate('/login');
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

        setIsDirty(false);

        toast.success('Resume saved successfully!');
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to save resume');
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error('Error saving resume');
    } finally {
      setSaving(false);
    }
  };

  // Normalizes OKLCH colors to RGB so html2canvas can parse them.
  // Uses a resolver element to get a computed rgb()/rgba() serialization.
  const normalizeOKLCHColors = (rootElement, doc = document, getComputedStyleFn = window.getComputedStyle) => {
    if (!rootElement) return;

    const cvs = doc.createElement("canvas");
    cvs.width = 1;
    cvs.height = 1;
    const ctx = cvs.getContext("2d", { willReadFrequently: true });

    const colorToRgba = (colorStr) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillStyle = colorStr;
      ctx.fillRect(0, 0, 1, 1);
      const data = ctx.getImageData(0, 0, 1, 1).data;
      return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    };

    const resolveToRgb = (value) => {
      if (!value || typeof value !== "string") return value;
      if (!value.includes("oklch(")) return value;
      return value.replace(/oklch\([^)]+\)/g, (match) => {
        return colorToRgba(match);
      });
    };

    const allNodes = rootElement.querySelectorAll("*");
    const nodes = [rootElement, ...allNodes];

    nodes.forEach((node) => {
      const computed = getComputedStyleFn(node);
      if (!computed) return;

      const props = [];
      for (let i = 0; i < computed.length; i++) {
        props.push(computed[i]);
      }

      props.forEach((prop) => {
        const current = computed.getPropertyValue(prop);
        if (current && current.includes("oklch(")) {
          const converted = resolveToRgb(current);
          if (converted && converted !== current) {
            node.style.setProperty(prop, converted, "important");
          }
        }
      });
    });
  };

  const exportToPDF = async () => {
    const element = document.getElementById("resume-preview");

    if (!element) {
      console.error("Resume preview not found");
      toast.error("Resume preview not found.");
      return;
    }
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true
        ,
        scrollX: 0,
        scrollY: -window.scrollY,
        removeContainer: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("resume-preview");
          if (!clonedElement) return;

          // Ensure a solid white background in the cloned document
          clonedElement.style.background = "#ffffff";

          // Normalize OKLCH colors inside the ENTIRE cloned iframe (html2canvas parses body/root backgrounds)
          const view = clonedDoc.defaultView;
          const getStyle = view ? view.getComputedStyle.bind(view) : window.getComputedStyle;
          normalizeOKLCHColors(clonedDoc.documentElement, clonedDoc, getStyle);
        }
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm

      let imgWidth = pageWidth;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If image is taller than page, scale it down to fit height
      if (imgHeight > pageHeight) {
        const scale = pageHeight / imgHeight;
        imgWidth = imgWidth * scale;
        imgHeight = pageHeight;
      }

      const marginX = (pageWidth - imgWidth) / 2;
      const marginY = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", marginX, marginY, imgWidth, imgHeight);

      pdf.save("resume.pdf");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error(`PDF export failed: ${error?.message || "Unknown error"}`);
    }
  };
  



  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "education", name: "Education", icon: GraduationCap },
  ]


  const activeSection = sections[activeSectionIndex]


  if (loading && resumeId && resumeId !== "new") {
    return (
      <div className="min-h-screen bg-mesh-light flex justify-center pt-32">
        <div className="flex flex-col items-center gap-4 bg-white/60 glass rounded-3xl p-10">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-semibold text-lg animate-pulse">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Decorative Workspace Elements */}
      <div className="fixed top-0 inset-x-0 h-40 from-indigo-500 to-transparent pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 relative z-10">
        <Link to={'/app'} className="inline-flex gap-2 items-center px-4 py-2 bg-white/50 hover:bg-white text-indigo-600 hover:text-indigo-700 font-semibold rounded-xl backdrop-blur-sm border border-slate-200/50 shadow-sm transition-all hover:shadow">
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>




      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* left panel */}

          <div className="relative lg:col-span-5 xl:col-span-4 rounded-[2rem] overflow-visible z-20 sticky top-6">
            <div className=" bg-white/80 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60 p-6 pt-5">

              {/* progress bar using activeSectionIndex */}
              <div className="absolute top-0 left-6 right-6 h-1.5 bg-violet-400 rounded-b-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-full transition-all duration-700 ease-out"
                  style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}% ` }} />
              </div>

              {/* section nav */}

              <div className="flex flex-col gap-4 mb-6 mt-4">
                {/* Top Controls */}
                <div className="flex flex-col gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-700">
                  <div className="w-full"><TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => updateField("template", template)} /></div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-500">Accent Color</span>
                    <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => updateField("accent_color", color)} />
                  </div>
                </div>


                {/* Navigation */}
                <div className="flex items-center justify-between border-b border-slate-500 pb-5 pt-2">
                  <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className="flex items-center gap-1.5 p-2 bg-white rounded-xl text-sm font-bold text-slate-700 shadow-sm border border-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-500/50 hover:shadow-md transition-all disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 disabled:hover:shadow-sm" disabled={activeSectionIndex === 0}>
                    <ChevronLeft className="size-4" /> Prev
                  </button>

                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{sections[activeSectionIndex].name}</span>

                  <button onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))} className="flex items-center gap-1.5 p-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:hover:bg-indigo-600 disabled:hover:shadow-[0_4px_14px_0_rgb(79,70,229,0.39)]" disabled={activeSectionIndex === sections.length - 1}>
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>

              </div>
              {/* form content */}

              <div className="space-y-6 pt-2">
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => updateField("personal_info", data)} removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground} />
                )}

                {activeSection.id === 'summary' && (
                  <Summary data={resumeData.professional_summary} onChange={(data) => updateField("professional_summary", data)} resumeData={resumeData} />
                )}

                {activeSection.id === 'skills' && (
                  <Skills data={resumeData.skills} onChange={(data) => updateField("skills", data)} />
                )}

                {activeSection.id === 'experience' && (
                  <Experience data={resumeData.experience} onChange={(data) => updateField("experience", data)} />
                )}


                {activeSection.id === 'projects' && (
                  <Projects data={resumeData.projects} onChange={(data) => updateField("projects", data)} />
                )}

                {activeSection.id === 'education' && (
                  <Education data={resumeData.education} onChange={(data) => updateField("education", data)} />
                )}

              </div>

            </div>

          </div>

          {/* right */}


          <div className="lg:col-span-7 xl:col-span-8 max-lg:mt-6 z-10">
            <div className="mb-6 flex justify-end gap-3 sticky top-6 z-30">
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-slate-200 font-bold rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:bg-indigo-500 transition-all active:scale-[0.98]"
              >
                <Download className="size-5 text-slate-200" />
                Export PDF
              </button>

              <button
                onClick={saveResume}
                disabled={saving || loading}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:bg-indigo-700 transition-all active:scale-[0.98] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* <Save className="size-4" />
              {saving ? 'Saving...' : 'Save Resume'} */}
                <Save className="size-5" />
                {saving ? 'Saving...'
                  : resumeData._id && isDirty
                    ? 'Save Changes'
                    : 'Save Resume'}
              </button>
            </div>

            <div id="resume-preview"
              style={{ background: "#ffffff" }}
               className="p-6 md:p-12 rounded-[2rem] shadow-xl border border-white max-w-5xl mx-auto">
              <ResumePreview 
               data={resumeData} 
               template={resumeData.template} 
               accentColor={resumeData.accent_color} 
               />
            </div>
          </div>

        </div>

      </div>

    </div>

  )
};

export default Builder;
