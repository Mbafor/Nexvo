import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Achievement } from "../../types/cv";
import BulletPointTextarea from "../common/BulletPointTextarea";
import AIRewriteButton from "../common/AIRewriteButton";

interface AchievementsFormProps {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

export default function AchievementsForm({ data, onChange }: AchievementsFormProps) {
  const { t } = useTranslation();

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      date: ""
    };
    onChange([...data, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    onChange(data.filter((ach) => ach.id !== id));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    onChange(
      data.map((ach) =>
        ach.id === id ? { ...ach, [field]: value } : ach
      )
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          {t("achievements.noAchievements")}
        </p>
      )}

      {data.map((ach, index) => (
        <div
          key={ach.id}
          className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {t("achievements.title")} {index + 1}
            </h3>

            <button
              onClick={() => removeAchievement(ach.id)}
              aria-label={t("achievements.removeAchievement")}
              className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t("achievements.achievementTitle")}
              </label>
              <input
                type="text"
                value={ach.title}
                onChange={(e) =>
                  updateAchievement(ach.id, "title", e.target.value)
                }
                placeholder={t("achievements.placeholders.title")}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <BulletPointTextarea
              label={t("achievements.description")}
              value={ach.description}
              onChange={(value) =>
                updateAchievement(ach.id, "description", value)
              }
              placeholder={t("achievements.placeholders.description")}
              rows={3}
            />

            {/* AI Rewrite Button */}
            <AIRewriteButton
              text={ach.description}
              onRewrite={(rewrittenText: string) =>
                updateAchievement(ach.id, "description", rewrittenText)
              }
              context="achievement description"
            />

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t("achievements.date")}
              </label>
              <input
                type="month"
                value={ach.date}
                onChange={(e) =>
                  updateAchievement(ach.id, "date", e.target.value)
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Achievement */}
      <button
        onClick={addAchievement}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition font-medium text-slate-700"
      >
        <Plus className="h-5 w-5" />
        {t("achievements.addAchievement")}
      </button>
    </div>
  );
}
