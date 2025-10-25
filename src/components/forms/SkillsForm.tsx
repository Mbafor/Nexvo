import { Plus, Trash2 } from 'lucide-react';
import { Skill } from '../../types/cv';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'intermediate',
    };
    onChange([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange(
      data.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          No skills yet. Click "Add Skill" to get started.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((skill, index) => (
          <div key={skill.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <label className="block text-sm font-medium text-slate-700">Skill</label>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                name={index === 0 ? "skill" : undefined}
                id={index === 0 ? "skill" : undefined}
                data-field={index === 0 ? "skills.0.name" : undefined}
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="JavaScript, Project Management, etc."
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Proficiency Level
                </label>
                <select
                  value={skill.level}
                  onChange={(e) =>
                    updateSkill(skill.id, 'level', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addSkill}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>Add Skill</span>
      </button>
    </div>
  );
}