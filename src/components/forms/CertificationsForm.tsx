import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CertificationsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const { t } = useTranslation();

  const addCert = () => {
    onChange([...data, ""]);
  };

  const removeCert = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCert = (index: number, value: string) => {
    onChange(
      data.map((cert, i) => (i === index ? value : cert))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          {t("certifications.noCertifications")}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((cert, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-slate-700">
                {t("certifications.certification")} {idx + 1}
              </label>

              <button
                onClick={() => removeCert(idx)}
                aria-label={t("certifications.removeCertification")}
                className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <input
              type="text"
              value={cert}
              onChange={(e) => updateCert(idx, e.target.value)}
              placeholder={t("certifications.placeholders.name")}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>

      <button
        onClick={addCert}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition text-slate-700 font-medium"
      >
        <Plus className="h-5 w-5" />
        {t("certifications.addCertification")}
      </button>
    </div>
  );
}
