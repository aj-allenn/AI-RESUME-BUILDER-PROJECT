import { Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const Summary = ({data,onChange,resumeData}) => {
  const [enhancing, setEnhancing] = useState(false);

  const enhanceWithAI = async () => {
    setEnhancing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch('http://localhost:5000/api/ai/enhance-summary', 
        {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        
        body: JSON.stringify({
          currentSummary: data,
          experience: resumeData?.experience || [],
          skills: resumeData?.skills || [],
        }),
      });

      if (res.ok) {
        const result = await res.json();
        onChange(result.enhancedSummary);
      } else {
        let errorMessage = "Failed to enhance summary";
        try {
          const errorData = await res.json();
          if (errorData?.details) {
            errorMessage = errorData.details;
          } else if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // Keep default message when non-JSON response is returned.
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error enhancing summary:", error);
      alert('Error enhancing summary');
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex item-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                <p className='text-sm text-gray-500'>Add summary for your resume here</p>
            </div>
            <button
              onClick={enhanceWithAI}
              disabled={enhancing}
              className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'
            >
                <Sparkles className='size-4 text-purple-600 '/>
                {enhancing ? 'Enhancing...' : 'AI Enhance'}
            </button>
        </div>

        <div className='mt-6'>
            <textarea value={data || ""}
             onChange={(e) => onChange(e.target.value)}
             className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg
             focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'/>
             <p>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
        </div>
      
    </div>
  )
}

export default Summary
