import { Briefcase,Plus,Trash2,Sparkles } from 'lucide-react';
import React from 'react'


const API = import.meta.env.VITE_API_URL;
const Experience = ({data,onChange}) => {

    const addExperience = () =>{
        const newExperience= {
            company :"",
            position : "",
            end_date: "",
            description : "",
            is_current: false
        };
        onChange([...data, newExperience])
    }

       const removeExperience = (index)=>{
            const updated = data.filter((_, i)=> i !== index); 
            onChange(updated)
       }

        const updateExperience = (index,field,value)=>{
            const updated = [...data]; 
            updated[index]= {...updated[index],[field] : value}
            onChange(updated)
       }


  return (
       <div className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex item-center gap-2 text-lg font-semibold text-gray-900 '>Experience</h3>
                <p className='text-sm text-gray-500'>Add your experience</p>
            </div>
            <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors'>
                <Plus className='size-4 text-purple-600'/>
                Add Experience
            </button>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-8 text-slate-500'>
                <Briefcase className='w-12 h-12 mx-auto mb-3 text-slate-300'/>
                <p>No work experience added yet.</p>
                <p className='text-sm'>Click "Add Experience" to get started</p>
            </div>
        ):(
            <div className='space-y-4'>
              {data.map((experience,index)=>(
                <div key={index} className='p-4 border border-gray-400 rounded-lg space-y-3'>
                    <div className='flex justify-between items-start'>
                        <h4 className="text-slate-600">Experience #{index + 1}</h4>
                        <button onClick={()=> removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'> 
                          <Trash2 className="size-4"/>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-3'>
                        <input value={experience.company || ""} onChange={(e)=>updateExperience(index,"company", e.target.value)}
                         type="text" placeholder='Company Name' className='px-3 py-2 text-sm border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none'/>

                          <input value={experience.position || ""} onChange={(e)=>updateExperience(index,"position", e.target.value)}
                          type="text" placeholder='Job Position' className='px-3 py-2 text-sm border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none'/>

                          <input value={experience.start_date || ""} onChange={(e)=>updateExperience(index,"start_date", e.target.value)}
                          type="month" placeholder='Start Date' className='px-3 py-2 text-sm border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none'/>

                          <input value={experience.end_date || ""} onChange={(e)=>updateExperience(index,"end_date", e.target.value)}
                          type="month" disabled={experience.is_current} placeholder='End Date' className='px-3 py-2 text-sm border border-gray-300 bg-white text-gray-900 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none'/>
                    </div>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={experience.is_current || false }onChange={(e)=>{updateExperience(index, "is_current", e.target.checked ? true : false);}}
                        className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                        <span className='text-sm text-gray-500'>Currently working here</span>
                    </label>


                    <div className='space-y-2'>
                         <div className='flex items-center justify-between'>
                             <label className='text-sm font-medium text-gray-700'>Job Description</label>
                            <button
                              onClick={async () => {
                                try {
                                  const token = localStorage.getItem("token");
                                  const res = await fetch(`${API}/api/ai/enhance-experience`, {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({
                                      currentDescription: experience.description,
                                      company: experience.company,
                                      position: experience.position,
                                    }),
                                  });

                                  if (res.ok) {
                                    const result = await res.json();
                                    updateExperience(index, "description", result.enhancedDescription);
                                  } else {
                                    alert('Failed to enhance description');
                                  }
                                } catch (error) {
                                  console.error("Error enhancing experience:", error);
                                  alert('Error enhancing description');
                                }
                              }}
                              className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-200 text-purple-700 rounded hover:bg-purple-300 transition-colors disabled:opacity-50'
                            >
                                <Sparkles className="w-3 h-3"/>
                                Enhance with AI
                            </button>
                         </div>


                         <textarea value={experience.description || ""} onChange={(e)=>updateExperience(index,"description", e.target.value)} rows={4} className='w-full text-sm px-3 py-2 border border-gray-300 bg-white text-slate-900 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none' placeholder='Describe your key responsibilities and achievements...'/>
                    </div>

                </div>
              ))}
            </div>
        )}
            
        </div>
      
    
  )
}

export default Experience
