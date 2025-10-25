import { Plus, Trash2 } from 'lucide-react';
import { VolunteerWork } from '../../types/cv';

interface VolunteerFormProps {
  data: VolunteerWork[];
  onChange: (data: VolunteerWork[]) => void;
}

export default function VolunteerForm({ data, onChange }: VolunteerFormProps) {
  const addVolunteer = () => {
    const newVolunteer: VolunteerWork = {
      id: crypto.randomUUID(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newVolunteer]);
  };

  const removeVolunteer = (id: string) => {
    onChange(data.filter((vol) => vol.id !== id));
  };

  const updateVolunteer = (id: string, field: keyof VolunteerWork, value: string | boolean) => {
    onChange(
      data.map((vol) => (vol.id === id ? { ...vol, [field]: value } : vol))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          No volunteer work yet. Click "Add Volunteer Work" to get started.
        </p>
      )}

      {data.map((vol, index) => (
        <div key={vol.id} className="border border-slate-200 rounded-lg p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Volunteer Work {index + 1}</h3>
            <button
              onClick={() => removeVolunteer(vol.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  name={index === 0 ? "volunteerOrganization" : undefined}
                  id={index === 0 ? "volunteerOrganization" : undefined}
                  data-field={index === 0 ? "volunteerWork.0.organization" : undefined}
                  value={vol.organization}
                  onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="Organization Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <input
                  type="text"
                  value={vol.role}
                  onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="Volunteer Position"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={vol.startDate}
                  onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <input
                  type="month"
                  value={vol.endDate}
                  onChange={(e) => updateVolunteer(vol.id, 'endDate', e.target.value)}
                  disabled={vol.current}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent disabled:bg-slate-100"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id={`current-${vol.id}`}
                checked={vol.current}
                onChange={(e) => updateVolunteer(vol.id, 'current', e.target.checked)}
                className="h-4 w-4 text-slate-800 focus:ring-slate-500 border-slate-300 rounded"
              />
              <label htmlFor={`current-${vol.id}`} className="ml-2 text-sm text-slate-700">
                I currently volunteer here
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                value={vol.description}
                onChange={(e) => updateVolunteer(vol.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                rows={4}
                placeholder="What you did and what impact you made..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addVolunteer}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>Add Volunteer Work</span>
      </button>
    </div>
  );
}