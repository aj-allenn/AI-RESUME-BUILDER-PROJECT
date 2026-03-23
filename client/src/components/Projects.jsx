import { FolderIcon, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const Projects = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      description: "",
      technologies: "",
      link: "",
      start_date: "",
      end_date: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">Projects</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add your projects and portfolio work</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors"
        >
          <Plus className="size-4 text-purple-600 dark:text-purple-400" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <FolderIcon className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="dark:text-gray-200">Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  type="text"
                  placeholder="Project Name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />

                <textarea
                  value={project.description || ""}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  rows={3}
                  className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Describe your project, key features, and your role..."
                />

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={project.technologies || ""}
                    onChange={(e) => updateProject(index, "technologies", e.target.value)}
                    type="text"
                    placeholder="Technologies Used (e.g., React, Node.js)"
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />

                  <input
                    value={project.link || ""}
                    onChange={(e) => updateProject(index, "link", e.target.value)}
                    type="url"
                    placeholder="Project Link (GitHub, Live Demo, etc.)"
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={project.start_date || ""}
                    onChange={(e) => updateProject(index, "start_date", e.target.value)}
                    type="month"
                    placeholder="Start Date"
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />

                  <input
                    value={project.end_date || ""}
                    onChange={(e) => updateProject(index, "end_date", e.target.value)}
                    type="month"
                    placeholder="End Date (optional)"
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;

