import { GraduationCap, Plus, Trash2, Sparkles } from 'lucide-react';
import React from 'react';

const Education = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Education</h3>
          <p className="text-sm text-gray-500">Add your educational background</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4 text-purple-600" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4>Education #{index + 1}</h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={education.degree || ""}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  type="text"
                  placeholder="Degree (e.g., Bachelor of Science)"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />

                <input
                  value={education.institution || ""}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  type="text"
                  placeholder="Institution Name"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />

                <input
                  value={education.start_date || ""}
                  onChange={(e) => updateEducation(index, "start_date", e.target.value)}
                  type="month"
                  placeholder="Start Date"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />

                <input
                  value={education.end_date || ""}
                  onChange={(e) => updateEducation(index, "end_date", e.target.value)}
                  type="month"
                  disabled={education.is_current}
                  placeholder="End Date"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={education.is_current || false}
                  onChange={(e) => {
                    updateEducation(index, "is_current", e.target.checked);
                  }}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Currently studying here</span>
              </label>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Additional Details</label>
                <textarea
                  value={education.description || ""}
                  onChange={(e) => updateEducation(index, "description", e.target.value)}
                  rows={3}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Relevant coursework, achievements, GPA, etc."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Education;

