import React from 'react';
import { CategoryConfig } from '../types/prompt';
import { Sparkles, ShieldAlert, Cpu } from 'lucide-react';

interface BuilderFormProps {
  category: CategoryConfig;
  fieldValues: Record<string, string>;
  onChangeField: (fieldId: string, value: string) => void;
  activeModifierIds: string[];
  onToggleModifier: (modifierId: string) => void;
}

export const BuilderForm: React.FC<BuilderFormProps> = ({
  category,
  fieldValues,
  onChangeField,
  activeModifierIds,
  onToggleModifier
}) => {
  return (
    <div className="space-y-5">
      {/* Category Intro */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">{category.icon}</span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {category.name}
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {category.description}
        </p>
      </div>

      {/* Main Dynamic Form Fields */}
      <div className="space-y-4">
        {category.fields.map((field) => {
          const value = fieldValues[field.id] || '';

          return (
            <div
              key={field.id}
              className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f1422] shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`field_${field.id}`}
                  className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                >
                  <span>{field.label}</span>
                  {field.required && (
                    <span className="text-amber-500 text-[11px]">*</span>
                  )}
                </label>
                {field.helpText && (
                  <span className="text-[11px] text-slate-400">{field.helpText}</span>
                )}
              </div>

              {/* Input Renderers */}
              {field.type === 'textarea' ? (
                <textarea
                  id={`field_${field.id}`}
                  rows={field.id === 'objective' || field.id === 'subject' ? 3 : 2}
                  value={value}
                  onChange={(e) => onChangeField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed font-sans"
                />
              ) : field.type === 'select' ? (
                <div className="space-y-1.5">
                  <select
                    id={`field_${field.id}`}
                    value={value}
                    onChange={(e) => onChangeField(field.id, e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans cursor-pointer"
                  >
                    <option value="">— Select an option —</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <input
                  id={`field_${field.id}`}
                  type="text"
                  value={value}
                  onChange={(e) => onChangeField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              )}

              {/* Inline Quick-Pick Suggestion Chips for this field */}
              {field.suggestionChips && field.suggestionChips.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                    Quick picks:
                  </span>
                  {field.suggestionChips.map((chip, idx) => {
                    const isSelected = value === chip.value || (value && value.includes(chip.value));
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onChangeField(field.id, chip.value)}
                        className={`text-[11px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                        }`}
                        title={chip.value}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Power Invariants & Modifiers Section */}
      {category.powerModifiers && category.powerModifiers.length > 0 && (
        <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950/60 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/20 dark:to-[#0f1422]">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-3.5 h-3.5" />
            </span>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Power Modifiers & Execution Protocols
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            Activate high-leverage prompt engineering protocols to enforce rigorous AI outputs:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {category.powerModifiers.map((mod) => {
              const isActive = activeModifierIds.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => onToggleModifier(mod.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-indigo-500 bg-white dark:bg-slate-900 shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {mod.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isActive ? 'ACTIVE' : 'OFF'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug">
                    {mod.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
