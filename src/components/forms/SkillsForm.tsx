import { Plus, Trash2 } from 'lucide-react';
import { Skill } from '../../types/cv';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  // Migrate existing skills that don't have a type field
  const migrateSkills = (skills: Skill[]): Skill[] => {
    return skills.map(skill => ({
      ...skill,
      type: skill.type || 'technical' // Default to technical if no type
    }));
  };

  // Use migrated skills
  const skillsData = migrateSkills(data || []);

  const addSkill = (type: 'technical' | 'soft') => {
    console.log('Adding skill of type:', type);
    console.log('Current skills data:', skillsData);
    
    // Generate a unique ID with fallback
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };
    
    const newSkill: Skill = {
      id: generateId(),
      name: '',
      level: 'intermediate',
      type: type,
    };
    
    const updatedSkills = [...skillsData, newSkill];
    console.log('Updated skills:', updatedSkills);
    onChange(updatedSkills);
  };

  const removeSkill = (id: string) => {
    onChange(skillsData.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange(
      skillsData.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill))
    );
  };

  const technicalSkills = skillsData.filter(skill => skill.type === 'technical');
  const softSkills = skillsData.filter(skill => skill.type === 'soft');

  const renderSkillSection = (skills: Skill[], type: 'technical' | 'soft', title: string) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-slate-800">{title}</h3>
        <button
          onClick={() => addSkill(type)}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add {type === 'technical' ? 'Technical' : 'Soft'} Skill</span>
        </button>
      </div>

      {skills.length === 0 && (
        <p className="text-slate-500 text-center py-4 bg-slate-50 rounded-lg">
          No {type === 'technical' ? 'technical' : 'soft'} skills yet. Click "Add {type === 'technical' ? 'Technical' : 'Soft'} Skill" to get started.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <label className="block text-sm font-medium text-slate-700">
                {type === 'technical' ? 'Technical Skill' : 'Soft Skill'}
              </label>
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
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder={type === 'technical' ? 'JavaScript, Python, React...' : 'Leadership, Communication, Problem Solving...'}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Proficiency Level
                </label>
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
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
    </div>
  );

  return (
    <div className="space-y-8">
      {skillsData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500 mb-4">No skills yet. Add your technical and soft skills below.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => addSkill('technical')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Technical Skill</span>
            </button>
            <button
              onClick={() => addSkill('soft')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Soft Skill</span>
            </button>
          </div>
        </div>
      )}

      {(technicalSkills.length > 0 || softSkills.length > 0) && (
        <>
          {renderSkillSection(technicalSkills, 'technical', 'Technical Skills')}
          {renderSkillSection(softSkills, 'soft', 'Soft Skills')}
        </>
      )}
    </div>
  );
}