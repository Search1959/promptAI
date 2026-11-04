import React, { useState, useEffect } from 'react';
import { ClarifyingQuestion } from '../types/prompt';
import { HelpCircle, X, Sparkles, Check, Loader2 } from 'lucide-react';

interface AskThreeQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  currentPrompt: string;
  onApplyAnswers: (qaPairs: { question: string; answer: string }[]) => Promise<void>;
}

export const AskThreeQuestionsModal: React.FC<AskThreeQuestionsModalProps> = ({
  isOpen,
  onClose,
  category,
  currentPrompt,
  onApplyAnswers
}) => {
  const [questions, setQuestions] = useState<ClarifyingQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen, category]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ask-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, prompt: currentPrompt })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        const initialAns: Record<string, string> = {};
        data.questions.forEach((q: ClarifyingQuestion) => {
          if (q.options && q.options.length > 0) {
            initialAns[q.id] = q.options[0]; // pick first option by default
          }
        });
        setAnswers(initialAns);
      }
    } catch (err) {
      console.error('Failed to fetch clarifying questions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleCustomAnswer = (qId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: text }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const qaPairs = questions.map((q) => ({
        question: q.question,
        answer: answers[q.id] || 'Not specified'
      }));
      await onApplyAnswers(qaPairs);
      onClose();
    } catch (err) {
      console.error('Failed to submit answers', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Sharpen Your Prompt: 3 Key Clarifying Questions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI analyzes your draft and asks the 3 questions that eliminate ambiguity
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
              <p className="text-xs">Analyzing prompt and generating target questions...</p>
            </div>
          ) : (
            questions.map((q, idx) => {
              const currentAns = answers[q.id] || '';
              return (
                <div
                  key={q.id || idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                >
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      0{idx + 1}.
                    </span>
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {q.question}
                    </h4>
                  </div>

                  {/* Option Chips */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options?.map((opt, oIdx) => {
                        const isSelected = currentAns === opt;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(q.id, opt)}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${
                              isSelected
                                ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-medium'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Or Custom input */}
                    <input
                      type="text"
                      placeholder="Or type a custom specification..."
                      value={q.options?.includes(currentAns) ? '' : currentAns}
                      onChange={(e) => handleCustomAnswer(q.id, e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || submitting}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Infusing Answers...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sharpen & Update Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
