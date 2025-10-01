import { Plus, Trash2 } from 'lucide-react';
import { Achievement } from '../../types/cv';

interface AchievementsFormProps {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

export default function AchievementsForm({ data, onChange }: AchievementsFormProps) {
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      date: '',
    };
    onChange([...data, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    onChange(data.filter((ach) => ach.id !== id));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    onChange(
      data.map((ach) => (ach.id === id ? { ...ach, [field]: value } : ach))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          No achievements yet. Click "Add Achievement" to get started.
        </p>
      )}

      {data.map((ach, index) => (
        <div key={ach.id} className="border border-slate-200 rounded-lg p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Achievement {index + 1}</h3>
            <button
              onClick={() => removeAchievement(ach.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input
                type="text"
                value={ach.title}
                onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Employee of the Year, Published Research Paper, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                value={ach.description}
                onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                rows={3}
                placeholder="Details about this achievement..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input
                type="month"
                value={ach.date}
                onChange={(e) => updateAchievement(ach.id, 'date', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addAchievement}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>Add Achievement</span>
      </button>
    </div>
  );
}