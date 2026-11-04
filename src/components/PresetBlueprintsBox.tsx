import React from 'react';
import { PresetBlueprint } from '../types/prompt';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

interface PresetBlueprintsBoxProps {
  presets: PresetBlueprint[];
  onApplyPreset: (preset: PresetBlueprint) => void;
  activePresetId?: string;
}

export const PresetBlueprintsBox: React.FC<PresetBlueprintsBoxProps> = ({
  presets,
  onApplyPreset,
  activePresetId
}) => {
  if (!presets || presets.length === 0) return null;

  return (
    <div className="mb-6 p-4 rounded-xl border border-indigo-100 dark:border-indigo-950/60 bg-gradient-to-r from-indigo-50/50 via-white to-slate-50 dark:from-indigo-950/20 dark:via-[#0e1322] dark:to-[#0f1422]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h3 className="text-xs font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-200">
            One-Click Blueprint Starters
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Load curated architectures with 1 click
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {presets.map((preset) => {
          const isActive = preset.id === activePresetId;
          return (
            <div
              key={preset.id}
              onClick={() => onApplyPreset(preset)}
              className={`group relative p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isActive
                  ? 'border-indigo-500 dark:border-indigo-400 bg-white dark:bg-slate-900 shadow-xs'
                  : 'border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-800/80 hover:bg-white dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {preset.title}
                </span>
                {isActive ? (
                  <span className="text-emerald-500 dark:text-emerald-400 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                {preset.tagline}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <span className="text-indigo-600 dark:text-indigo-400">Target:</span>
                <span>{preset.targetAi}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
