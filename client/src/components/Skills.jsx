import { Sparkles, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

const Skills = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Skills</h3>
          <p className="text-sm text-gray-500">Add your technical and soft skills</p>
        </div>
        <button
          onClick={addSkill}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4 text-purple-600" />
          Add
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a skill and press Enter"
            className="flex-1 px-3 py-2 text-sm border text-slate-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No skills added yet.</p>
            <p className="text-sm">Add your skills above</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-purple-700 hover:text-purple-900 transition-colors"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Include both technical skills (programming languages, tools, frameworks) and soft skills (communication, leadership, problem-solving).
        </p>
      </div>
    </div>
  );
};

export default Skills;

