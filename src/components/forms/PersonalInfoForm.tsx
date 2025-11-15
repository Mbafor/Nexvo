import { useTranslation } from 'react-i18next';
import { PersonalInfo } from '../../types/cv';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const { t } = useTranslation();

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChange({ ...data, photo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Full Name & Photo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("personalInfo.fullName")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder={t("personalInfo.placeholders.fullName")}
            required
          />
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("personalInfo.photo", "Profile Photo")}
          </label>

          <div className="w-24 h-24 mb-1 relative">
            {data.photo ? (
              <>
                <img
                  src={data.photo}
                  alt={t("personalInfo.photoAlt", "Profile Photo")}
                  className="w-24 h-24 object-cover rounded-full border border-slate-300"
                />
                <button
                  type="button"
                  onClick={() => onChange({ ...data, photo: '' })}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-medium transition-colors"
                  title={t("personalInfo.removePhoto", "Remove photo")}
                >
                  ×
                </button>
              </>
            ) : (
              <div className="w-24 h-24 bg-slate-200 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 text-xs">
                {t("personalInfo.noPhoto", "No Photo")}
              </div>
            )}
          </div>

          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs" />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("personalInfo.email")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder={t("personalInfo.placeholders.email")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("personalInfo.phone")}
          </label>
          <input
            type="tel"
            value={data.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder={t("personalInfo.placeholders.phone")}
          />
        </div>
      </div>

      {/* Location & LinkedIn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("personalInfo.location")}
          </label>
          <input
            type="text"
            value={data.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder={t("personalInfo.placeholders.location")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("personalInfo.linkedin")}
          </label>
          <input
            type="url"
            value={data.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder={t("personalInfo.placeholders.linkedin")}
          />
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t("personalInfo.website")}
        </label>
        <input
          type="url"
          value={data.website || ""}
          onChange={(e) => handleChange("website", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          placeholder={t("personalInfo.placeholders.website")}
        />
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t("personalInfo.summary")}
        </label>
        <textarea
          value={data.summary || ""}
          onChange={(e) => handleChange("summary", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          rows={4}
          placeholder={t("personalInfo.placeholders.summary")}
        />
      </div>
    </div>
  );
}
