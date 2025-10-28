import { Plus, Trash2 } from 'lucide-react';
import { Project } from '../../types/cv';
import BulletPointTextarea from '../common/BulletPointTextarea';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter((proj) => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((proj) => (proj.id === id ? { 
        ...proj, 
        [field]: field === 'technologies' ? value : value // Ensure technologies is always a string in forms
      } : proj))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          No projects yet. Click "Add Project" to get started.
        </p>
      )}

      {data.map((proj, index) => (
        <div key={proj.id} className="border border-slate-200 rounded-lg p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Project {index + 1}</h3>
            <button
              onClick={() => removeProject(proj.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                name={index === 0 ? "projectName" : undefined}
                id={index === 0 ? "projectName" : undefined}
                data-field={index === 0 ? "projects.0.name" : undefined}
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="E-commerce Platform"
              />
            </div>

            <BulletPointTextarea
              label="Description"
              value={proj.description}
              onChange={(value) => updateProject(proj.id, 'description', value)}
              placeholder="• Brief description of the project and your role...
• Developed full-stack web application
• Implemented responsive design
• Collaborated with team of 4 developers"
              rows={3}
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Technologies Used
              </label>
              <input
                type="text"
                value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Project Link (Optional)
              </label>
              <input
                type="url"
                value={proj.link || ''}
                onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={proj.startDate}
                  onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <input
                  type="month"
                  value={proj.endDate}
                  onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>Add Project</span>
      </button>
    </div>
  );
}