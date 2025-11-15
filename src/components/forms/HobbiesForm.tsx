import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HobbiesFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function HobbiesForm({ data, onChange }: HobbiesFormProps) {
  const { t } = useTranslation();

  const addHobby = () => {
    onChange([...data, ""]);
  };

  const removeHobby = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateHobby = (index: number, value: string) => {
    const updated = data.map((hobby, i) => (i === index ? value : hobby));
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-slate-500 text-center py-4">
          {t("hobbies.noHobbies")}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((hobby, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <label className="block text-sm font-medium text-slate-700">
                {t("hobbies.hobby")}
              </label>

              <button
                onClick={() => removeHobby(idx)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <input
              type="text"
              value={hobby}
              onChange={(e) => updateHobby(idx, e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder={t("hobbies.placeholders.name")}
            />
          </div>
        ))}
      </div>

      <button
        onClick={addHobby}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 
                   border-2 border-dashed border-slate-300 rounded-lg
                   hover:border-slate-400 hover:bg-slate-50 transition-colors 
                   text-slate-600 font-medium"
      >
        <Plus className="h-5 w-5" />
        <span>{t("hobbies.addHobby")}</span>
      </button>
    </div>
  );
}
