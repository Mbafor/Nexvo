import { Plus, Trash2 } from 'lucide-react';
import { Reference } from '../../types/cv';

interface ReferencesFormProps {
  data: Reference[];
  onChange: (data: Reference[]) => void;
}

export default function ReferencesForm({ data, onChange }: ReferencesFormProps) {
  const addReference = () => {
    const newReference: Reference = {
      id: crypto.randomUUID(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
    };
    onChange([...data, newReference]);
  };

  const removeReference = (id: string) => {
    onChange(data.filter((ref) => ref.id !== id));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    onChange(
      data.map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          No references yet. Click "Add Reference" to get started.
        </p>
      )}

      {data.map((ref, index) => (
        <div key={ref.id} className="border border-slate-200 rounded-lg p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Reference {index + 1}</h3>
            <button
              onClick={() => removeReference(ref.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={ref.name}
                  onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="Reference Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                <input
                  type="text"
                  value={ref.position}
                  onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="Senior Manager"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
              <input
                type="text"
                value={ref.company}
                onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Company Name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={ref.email}
                  onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="reference@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={ref.phone}
                  onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addReference}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>Add Reference</span>
      </button>
    </div>
  );
}