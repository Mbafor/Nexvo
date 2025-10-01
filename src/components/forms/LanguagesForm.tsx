import { Plus, Trash2 } from 'lucide-react';
import { Language } from '../../types/cv';

interface LanguagesFormProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

export default function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  const addLanguage = () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: '',
      level: 'Beginner',
    };
    onChange([...data, newLang]);
  };

  const removeLanguage = (id: string) => {
    onChange(data.filter(lang => lang.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange(
      data.map(lang => (lang.id === id ? { ...lang, [field]: value } : lang))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          No languages added yet. Click "Add Language" to get started.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(lang => (
          <div key={lang.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <label className="block text-sm font-medium text-slate-700">Language</label>
              <button
                onClick={() => removeLanguage(lang.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="English, French, Spanish..."
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Proficiency Level
                </label>
                <select
                  value={lang.level}
                  onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Fluent</option>
                  <option>Native</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addLanguage}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>Add Language</span>
      </button>
    </div>
  );
}
