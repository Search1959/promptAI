import React, { useState } from 'react';
import { QualityAnalysis } from '../types/prompt';
import { OutputFormat } from '../utils/promptAssembler';
import {
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Bookmark,
  Download,
  Shuffle,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PromptOutputPanelProps {
  assembledPrompt: string;
  enhancedPrompt: string | null;
  outputFormat: OutputFormat;
  onChangeOutputFormat: (format: OutputFormat) => void;
  qualityAnalysis: QualityAnalysis;
  onApplyTip: (fieldId?: string, value?: string) => void;
  onEnhanceWithAi: () => Promise<void>;
  isEnhancing: boolean;
  onOpenAskQuestions: () => void;
  onSavePrompt: () => void;
  isSaved: boolean;
  onOpenExport: () => void;
  onRandomize: () => void;
  onReset: () => void;
}

export const PromptOutputPanel: React.FC<PromptOutputPanelProps> = ({
  assembledPrompt,
  enhancedPrompt,
  outputFormat,
  onChangeOutputFormat,
  qualityAnalysis,
  onApplyTip,
  onEnhanceWithAi,
  isEnhancing,
  onOpenAskQuestions,
  onSavePrompt,
  isSaved,
  onOpenExport,
  onRandomize,
  onReset
}) => {
  const [copied, setCopied] = useState(false);
  const [showScoreDetails, setShowScoreDetails] = useState(false);

  // Active displayed prompt text
  const currentPromptText =
    outputFormat === 'standard' && enhancedPrompt
      ? enhancedPrompt
      : assembledPrompt;

  const wordCount = currentPromptText.trim()
    ? currentPromptText.trim().split(/\s+/).length
    : 0;
  const charCount = currentPromptText.length;
  const estimatedTokens = Math.round(charCount / 4);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPromptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Score color
  const score = qualityAnalysis.score;
  const scoreColor =
    score >= 85
      ? 'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40'
      : score >= 60
      ? 'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40'
      : 'text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40';

  const progressBg =
    score >= 85
      ? 'bg-emerald-500'
      : score >= 60
      ? 'bg-amber-500'
      : 'bg-rose-500';

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Header & Tab Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-medium">
          <button
            onClick={() => onChangeOutputFormat('standard')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              outputFormat === 'standard'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Standard Prompt
          </button>
          <button
            onClick={() => onChangeOutputFormat('system')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              outputFormat === 'system'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            System Prompt
          </button>
          <button
            onClick={() => onChangeOutputFormat('midjourney_raw')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              outputFormat === 'midjourney_raw'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Direct / Flags
          </button>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono tabular-nums">
          <span>{wordCount} words</span>
          <span>·</span>
          <span>~{estimatedTokens} tokens</span>
        </div>
      </div>

      {/* Main Textarea Display */}
      <div className="relative flex-1 min-h-[360px] flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] shadow-2xs overflow-hidden">
        {enhancedPrompt && outputFormat === 'standard' && (
          <div className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-medium flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              AI Enhanced Prompt Active
            </span>
            <button
              onClick={() => onChangeOutputFormat('standard')}
              className="text-[10px] underline opacity-90 hover:opacity-100"
            >
              Reset to Base
            </button>
          </div>
        )}

        <textarea
          readOnly
          value={currentPromptText}
          className="flex-1 w-full p-4 text-xs font-mono leading-relaxed bg-transparent text-slate-800 dark:text-slate-200 resize-none focus:outline-none selection:bg-indigo-500/20"
          placeholder="Complete prompt will assemble here in real-time as you pick options and suggestions..."
        />
      </div>

      {/* Prompt Quality Audit Card */}
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className={`px-2 py-0.5 rounded-md border text-xs font-bold font-mono ${scoreColor}`}
            >
              {score}/100
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Prompt Quality Score
            </span>
            <span className="text-xs text-slate-500 font-medium">
              — {qualityAnalysis.grade}
            </span>
          </div>

          <button
            onClick={() => setShowScoreDetails(!showScoreDetails)}
            className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sliders className="w-3 h-3" />
            {showScoreDetails ? 'Hide breakdown' : 'Score breakdown'}
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2.5">
          <div
            className={`h-full transition-all duration-300 ${progressBg}`}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Dimension Breakdown Accordion */}
        {showScoreDetails && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
            <div className="p-2 rounded bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-400 block">Persona & Role</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {qualityAnalysis.breakdown.roleScore}/15
              </span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-400 block">Core Objective</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {qualityAnalysis.breakdown.objectiveScore}/25
              </span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-400 block">Context & Specs</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {qualityAnalysis.breakdown.contextScore}/25
              </span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-400 block">Constraints</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {qualityAnalysis.breakdown.constraintsScore}/25
              </span>
            </div>
          </div>
        )}

        {/* Interactive Click-to-Fix Tips */}
        {qualityAnalysis.tips.length > 0 && (
          <div className="space-y-1.5">
            {qualityAnalysis.tips.map((tip) => (
              <div
                key={tip.id}
                className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 gap-2"
              >
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{tip.text}</span>
                </div>
                {tip.actionField && (
                  <button
                    onClick={() => onApplyTip(tip.actionField, tip.actionValue)}
                    className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline shrink-0 cursor-pointer"
                  >
                    + Quick Fix
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={handleCopy}
          className={`px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Prompt</span>
            </>
          )}
        </button>

        <button
          onClick={onEnhanceWithAi}
          disabled={isEnhancing}
          className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : ''}`} />
          <span>{isEnhancing ? 'Enhancing...' : 'Enhance with AI'}</span>
        </button>

        <button
          onClick={onOpenAskQuestions}
          className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Ask 3 Questions</span>
        </button>

        <button
          onClick={onSavePrompt}
          className={`px-3 py-2.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            isSaved
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{isSaved ? 'Saved in Library' : 'Save Prompt'}</span>
        </button>
      </div>

      {/* Secondary Utility Controls */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onOpenExport}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export (TXT, MD, JSON, PDF)</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onRandomize}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
            title="Randomize / Remix Inputs"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Remix</span>
          </button>
          <button
            onClick={onReset}
            className="text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer"
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
