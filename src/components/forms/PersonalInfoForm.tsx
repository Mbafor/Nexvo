import { PersonalInfo } from '../../types/cv';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Full Name & Photo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            data-field="personalInfo.fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
          <div className="w-24 h-24 mb-1 relative">
            {data.photo ? (
              <>
                <img
                  src={data.photo}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full border border-slate-300"
                />
                <button
                  type="button"
                  onClick={() => onChange({ ...data, photo: '' })}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                  title="Remove photo"
                >
                  ×
                </button>
              </>
            ) : (
              <div className="w-24 h-24 bg-slate-200 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 text-xs">
                No Photo
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                onChange({ ...data, photo: reader.result as string });
              };
              reader.readAsDataURL(file);
            }}
            className="text-xs"
          />
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            data-field="personalInfo.email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            data-field="personalInfo.phone"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Location & LinkedIn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            data-field="personalInfo.location"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="City, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            data-field="personalInfo.linkedin"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
        <input
          type="url"
          name="website"
          id="website"
          data-field="personalInfo.website"
          value={data.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          placeholder="johndoe.com"
        />
      </div>

      {/* Professional Summary */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Professional Summary
        </label>
        <textarea
          name="summary"
          id="summary"
          data-field="personalInfo.summary"
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          rows={4}
          placeholder="Brief overview of your professional background and career goals..."
        />
      </div>
    </div>
  );
}
