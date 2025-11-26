import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Education } from "../../types/cv";
import BulletPointTextarea from "../common/BulletPointTextarea";
import AIRewriteButton from "../common/AIRewriteButton";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const { t } = useTranslation();

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string | boolean
  ) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          {t("education.noEntries")}
        </p>
      )}

      {data.map((edu, index) => (
        <div
          key={edu.id}
          className="border border-slate-200 rounded-lg p-6 relative bg-white"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {t("education.title")} {index + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Institution & Degree */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("education.institution")}
                </label>

                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, "institution", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("education.placeholders.institution")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("education.degree")}
                </label>

                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, "degree", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("education.placeholders.degree")}
                />
              </div>
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t("education.field")}
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) =>
                  updateEducation(edu.id, "field", e.target.value)
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t("education.placeholders.field")}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("education.startDate")}
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "startDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t("education.endDate")}
                </label>
                <input
                  type="month"
                  value={edu.endDate}
                  disabled={edu.current}
                  onChange={(e) =>
                    updateEducation(edu.id, "endDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Current Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`current-${edu.id}`}
                checked={edu.current}
                onChange={(e) =>
                  updateEducation(edu.id, "current", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />

              <label
                htmlFor={`current-${edu.id}`}
                className="ml-2 text-sm text-slate-700"
              >
                {t("education.current")}
              </label>
            </div>

            {/* Description */}
            <BulletPointTextarea
              label={t("education.description")}
              value={edu.description || ""}
              onChange={(value) =>
                updateEducation(edu.id, "description", value)
              }
              placeholder={t("education.placeholders.description")}
              rows={3}
            />

            {/* AI Rewrite Button */}
            <AIRewriteButton
              text={edu.description || ""}
              onRewrite={(rewrittenText: string) =>
                updateEducation(edu.id, "description", rewrittenText)
              }
              context="education description"
            />
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        type="button"
        onClick={addEducation}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-slate-700 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>{t("education.addEducation")}</span>
      </button>
    </div>
  );
}
