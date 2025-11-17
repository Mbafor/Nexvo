import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Skill } from '../../types/cv';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const { t } = useTranslation();

  const skillsData: Skill[] = (data || []).map((s) => ({ ...s, type: s.type || 'technical' }));

  const addSkill = (type: 'technical' | 'soft') => {
    const newSkill: Skill = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? (crypto as any).randomUUID() : `skill_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      name: '',
      level: 'intermediate',
      type,
    };
    onChange([...skillsData, newSkill]);
  };

  const removeSkill = (id: string) => onChange(skillsData.filter((s) => s.id !== id));

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange(skillsData.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const technicalSkills = skillsData.filter((s) => s.type === 'technical');
  const softSkills = skillsData.filter((s) => s.type === 'soft');

  const renderSkillCard = (skill: Skill, index: number) => (
    <div key={skill.id} className="border border-slate-200 rounded-lg p-6 relative bg-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {skill.type === 'technical' ? `${t('skills.technicalSkill')} ${index + 1}` : `${t('skills.softSkill')} ${index + 1}`}
        </h3>
        <button type="button" onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700 transition-colors">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t('skills.name')}</label>
          <input
            type="text"
            value={skill.name}
            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={skill.type === 'technical' ? t('skills.placeholders.technical') : t('skills.placeholders.soft')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t('skills.level')}</label>
          <select
            value={skill.level}
            onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="beginner">{t('skills.levels.beginner')}</option>
            <option value="intermediate">{t('skills.levels.intermediate')}</option>
            <option value="advanced">{t('skills.levels.advanced')}</option>
            <option value="expert">{t('skills.levels.expert')}</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {skillsData.length === 0 && (
        <p className="text-slate-500 text-center py-4">{t('skills.noSkills')}</p>
      )}

      <div className="space-y-4">
        {technicalSkills.map((s, i) => renderSkillCard(s, i))}
        {softSkills.map((s, i) => renderSkillCard(s, i))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => addSkill('technical')}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-slate-700 font-medium"
        >
          <Plus className="h-5 w-5" />
          <span>{t('skills.addTechnical')}</span>
        </button>

        <button
          type="button"
          onClick={() => addSkill('soft')}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-slate-700 font-medium"
        >
          <Plus className="h-5 w-5" />
          <span>{t('skills.addSoft')}</span>
        </button>
      </div>
    </div>
  );
}
