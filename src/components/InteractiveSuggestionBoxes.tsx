import React from 'react';
import { SuggestionBox, SuggestionChip } from '../types/prompt';
import { Lightbulb, Plus, Check } from 'lucide-react';

interface InteractiveSuggestionBoxesProps {
  suggestionBoxes: SuggestionBox[];
  onApplySuggestion: (fieldId: string, value: string, mode?: 'replace' | 'append') => void;
  currentValues: Record<string, string>;
}

export const InteractiveSuggestionBoxes: React.FC<InteractiveSuggestionBoxesProps> = ({
  suggestionBoxes,
  onApplySuggestion,
  currentValues
}) => {
  if (!suggestionBoxes || suggestionBoxes.length === 0) return null;

  return (
    <div className="space-y-4 my-6">
      {suggestionBoxes.map((box) => (
        <div
          key={box.id}
          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Lightbulb className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {box.title}
              </h4>
            </div>
            {box.description && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {box.description}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {box.suggestions.map((chip, idx) => {
              const currentFieldValue = currentValues[box.fieldTarget] || '';
              const isAlreadyPresent = currentFieldValue.includes(chip.value);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onApplySuggestion(box.fieldTarget, chip.value, box.mode || 'append')}
                  className={`group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                    isAlreadyPresent
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-2xs'
                  }`}
                  title={chip.value}
                >
                  {isAlreadyPresent ? (
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <Plus className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                  )}
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
