import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Skill } from '../../types/cv';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const { t } = useTranslation();
  const migrateSkills = (skills: Skill[]): Skill[] => {
    return skills.map(skill => ({
      ...skill,
      type: skill.type || 'technical',
    }));
  };

  const skillsData = migrateSkills(data || []);

  const addSkill = (type: 'technical' | 'soft') => {
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
      type,
    };

    onChange([...skillsData, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(skillsData.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange(
      skillsData.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const technicalSkills = skillsData.filter(s => s.type === 'technical');
  const softSkills = skillsData.filter(s => s.type === 'soft');

  // SECTION LAYOUT (Mimics LanguagesForm)
  const renderSkillSection = (
    skills: Skill[],
    type: 'technical' | 'soft',
    title: string
  ) => (
    <div className="space-y-6">
      {/* Section Title + Add button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-slate-700">{title}</h3>

        <button
          onClick={() => addSkill(type)}
          className="flex items-center space-x-2 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>{type === 'technical' ? t('skills.addTechnical') : t('skills.addSoft')}</span>
        </button>
      </div>

      {/* Empty message */}
      {skills.length === 0 && (
        <p className="text-slate-500 text-center py-4 border border-slate-200 rounded-lg bg-slate-50">
          {type === 'technical' ? t('skills.noTechnical') : t('skills.noSoft')}
        </p>
      )}

      {/* Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map(skill => (
          <div
            key={skill.id}
            className="border border-slate-200 rounded-lg p-4"
          >
            {/* Card top */}
            <div className="flex justify-between items-start mb-3">
              <label className="text-sm font-medium text-slate-700">
                {type === 'technical' ? t('skills.technicalSkill') : t('skills.softSkill')}
              </label>

              <button
                onClick={() => removeSkill(skill.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <input
                type="text"
                value={skill.name}
                onChange={e => updateSkill(skill.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder={type === 'technical' ? t('skills.placeholders.technical') : t('skills.placeholders.soft')}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t('skills.level')}
                </label>
                <select
                  value={skill.level}
                  onChange={e => updateSkill(skill.id, 'level', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="beginner">{t('skills.levels.beginner')}</option>
                  <option value="intermediate">{t('skills.levels.intermediate')}</option>
                  <option value="advanced">{t('skills.levels.advanced')}</option>
                  <option value="expert">{t('skills.levels.expert')}</option>
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
      {/* Initial state message */}
      {skillsData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500 mb-4">
            {t('skills.noSkills')}
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => addSkill('technical')}
              className="px-4 py-2 flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg"
            >
              <Plus className="h-4 w-4" />
              <span>{t('skills.addTechnical')}</span>
            </button>

            <button
              onClick={() => addSkill('soft')}
              className="px-4 py-2 flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              <Plus className="h-4 w-4" />
              <span>{t('skills.addSoft')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Sections */}
      {(technicalSkills.length > 0 || softSkills.length > 0) && (
        <>
          {renderSkillSection(technicalSkills, 'technical', t('skills.technicalSkills'))}
          {renderSkillSection(softSkills, 'soft', t('skills.softSkills'))}
        </>
      )}
    </div>
  );
}
