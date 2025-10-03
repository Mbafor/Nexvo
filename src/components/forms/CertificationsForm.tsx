import { Plus, Trash2 } from 'lucide-react';

interface CertificationsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCert = () => {
    onChange([...data, '']);
  };

  const removeCert = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCert = (index: number, value: string) => {
    const updated = data.map((cert, i) => (i === index ? value : cert));
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          No certifications yet. Click "Add Certification" to get started.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((cert, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <label className="block text-sm font-medium text-slate-700">Certification</label>
              <button
                onClick={() => removeCert(idx)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <input
              type="text"
              value={cert}
              onChange={(e) => updateCert(idx, e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="AWS Certified Solutions Architect, PMP, etc."
            />
          </div>
        ))}
      </div>

      <button
        onClick={addCert}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>Add Certification</span>
      </button>
    </div>
  );
}
