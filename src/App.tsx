import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from './data/categories';
import { CategoryId, PresetBlueprint, SavedPrompt } from './types/prompt';
import { assemblePrompt, OutputFormat } from './utils/promptAssembler';
import { calculateQualityScore } from './utils/qualityScore';
import { Sidebar } from './components/Sidebar';
import { PresetBlueprintsBox } from './components/PresetBlueprintsBox';
import { InteractiveSuggestionBoxes } from './components/InteractiveSuggestionBoxes';
import { BuilderForm } from './components/BuilderForm';
import { PromptOutputPanel } from './components/PromptOutputPanel';
import { AskThreeQuestionsModal } from './components/AskThreeQuestionsModal';
import { ExportModal } from './components/ExportModal';
import { SavedPromptsModal } from './components/SavedPromptsModal';
import { PresetGalleryView } from './components/PresetGalleryView';

const STORAGE_SAVED_PROMPTS_KEY = 'prompt_architect_saved_prompts_v1';
const STORAGE_THEME_KEY = 'prompt_architect_theme_v1';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Nav tab state: 'builder' | 'presets' | 'library'
  const [activeTab, setActiveTab] = useState<'builder' | 'presets' | 'library'>('builder');

  // Category selection
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>('website-app');
  const activeCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0];
  }, [selectedCategoryId]);

  // Form field values
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (CATEGORIES[0].presets[0]) {
      return { ...CATEGORIES[0].presets[0].fieldValues };
    }
    return initial;
  });

  // Active Preset ID
  const [activePresetId, setActivePresetId] = useState<string | undefined>(
    CATEGORIES[0].presets[0]?.id
  );

  // Active power modifiers
  const [activeModifierIds, setActiveModifierIds] = useState<string[]>(
    CATEGORIES[0].presets[0]?.powerModifiers || ['cot', 'strict-schema']
  );

  // Output format ('standard' | 'system' | 'midjourney_raw')
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('standard');

  // AI Enhanced prompt text
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Modals state
  const [isAskQuestionsOpen, setIsAskQuestionsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopiedGlobal, setIsCopiedGlobal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Saved Prompts Library
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SAVED_PROMPTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse saved prompts', e);
    }
    return [
      {
        id: 'sample-1',
        title: 'Full-Stack SaaS MVP with Auth & Stripe',
        category: 'website-app',
        targetAi: 'Claude 3.7 Sonnet / Cursor',
        content: `## Role & Directive\nAct as an expert Staff Full-Stack Software Engineer & Solutions Architect targeting Claude 3.7 Sonnet / Cursor Agent. Execute the following specification with uncompromising quality.\n\n## Core Objective\nBuild a production-grade multi-tenant team dashboard where users can invite workspace members, manage subscription plans via Stripe webhooks, and track usage metrics in real time.`,
        qualityScore: 94,
        tags: ['saas', 'nextjs', 'stripe'],
        createdAt: Date.now() - 86400000,
        isFavorite: true
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_SAVED_PROMPTS_KEY, JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  // Handle Category Change
  const handleSelectCategory = (id: CategoryId) => {
    setSelectedCategoryId(id);
    const cat = CATEGORIES.find((c) => c.id === id);
    if (cat) {
      if (cat.presets.length > 0) {
        setFieldValues({ ...cat.presets[0].fieldValues });
        setActivePresetId(cat.presets[0].id);
        setActiveModifierIds(cat.presets[0].powerModifiers || []);
      } else {
        setFieldValues({});
        setActivePresetId(undefined);
        setActiveModifierIds([]);
      }
    }
    setEnhancedPrompt(null);
  };

  // Apply Blueprint Preset
  const handleApplyPreset = (preset: PresetBlueprint) => {
    setFieldValues({ ...preset.fieldValues });
    setActivePresetId(preset.id);
    setActiveModifierIds(preset.powerModifiers || []);
    setEnhancedPrompt(null);
    showToast(`Loaded blueprint: ${preset.title}`);
  };

  // Field change
  const handleChangeField = (fieldId: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [fieldId]: value }));
    setEnhancedPrompt(null);
  };

  // Apply Suggestion from Suggestion Boxes
  const handleApplySuggestion = (
    fieldId: string,
    value: string,
    mode: 'replace' | 'append' = 'append'
  ) => {
    setFieldValues((prev) => {
      const current = prev[fieldId] || '';
      if (mode === 'replace') {
        return { ...prev, [fieldId]: value };
      }
      if (!current) {
        return { ...prev, [fieldId]: value };
      }
      if (current.includes(value)) {
        return prev;
      }
      return { ...prev, [fieldId]: `${current}; ${value}` };
    });
    setEnhancedPrompt(null);
    showToast('Applied suggestion to prompt');
  };

  // Toggle power modifier
  const handleToggleModifier = (modifierId: string) => {
    setActiveModifierIds((prev) =>
      prev.includes(modifierId)
        ? prev.filter((id) => id !== modifierId)
        : [...prev, modifierId]
    );
    setEnhancedPrompt(null);
  };

  // Assembled Prompt string
  const assembledPrompt = useMemo(() => {
    return assemblePrompt(activeCategory, fieldValues, activeModifierIds, outputFormat);
  }, [activeCategory, fieldValues, activeModifierIds, outputFormat]);

  // Current active prompt text
  const currentPromptText = enhancedPrompt || assembledPrompt;

  // Quality score analysis
  const qualityAnalysis = useMemo(() => {
    return calculateQualityScore(activeCategory, fieldValues, activeModifierIds);
  }, [activeCategory, fieldValues, activeModifierIds]);

  // Apply quick-fix tip from quality score card
  const handleApplyTip = (fieldId?: string, value?: string) => {
    if (fieldId && value) {
      handleChangeField(fieldId, value);
      showToast('Quick fix applied!');
    }
  };

  // Copy Prompt Global Handler
  const handleCopyGlobal = async () => {
    try {
      await navigator.clipboard.writeText(currentPromptText);
      setIsCopiedGlobal(true);
      showToast('Prompt copied to clipboard!');
      setTimeout(() => setIsCopiedGlobal(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // AI Prompt Enhancement
  const handleEnhanceWithAi = async () => {
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: activeCategory.id,
          prompt: assembledPrompt,
          targetAi: fieldValues.target_ai || 'ChatGPT / Claude',
          detailLevel: fieldValues.detail_level || 'detailed',
          powerModifiers: activeModifierIds
        })
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setEnhancedPrompt(data.enhancedPrompt);
        showToast('Prompt enhanced with AI!');
      }
    } catch (err) {
      console.error('Enhance prompt failed', err);
      showToast('Enhancement failed. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  // Infuse answers from 3 questions modal
  const handleApplyClarifyingAnswers = async (
    qaPairs: { question: string; answer: string }[]
  ) => {
    try {
      const res = await fetch('/api/apply-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalPrompt: enhancedPrompt || assembledPrompt,
          qaPairs
        })
      });
      const data = await res.json();
      if (data.refinedPrompt) {
        setEnhancedPrompt(data.refinedPrompt);
        showToast('Answers woven into your prompt!');
      }
    } catch (err) {
      console.error('Failed to apply answers', err);
    }
  };

  // Save prompt to library
  const handleSavePrompt = () => {
    const title =
      fieldValues.objective?.slice(0, 40) ||
      fieldValues.subject?.slice(0, 40) ||
      `${activeCategory.name} Specification`;

    const newPrompt: SavedPrompt = {
      id: `prompt-${Date.now()}`,
      title,
      category: activeCategory.id,
      targetAi: fieldValues.target_ai || 'ChatGPT / Claude',
      content: currentPromptText,
      enhancedContent: enhancedPrompt || undefined,
      qualityScore: qualityAnalysis.score,
      tags: [activeCategory.id],
      createdAt: Date.now(),
      isFavorite: false
    };

    setSavedPrompts((prev) => [newPrompt, ...prev]);
    showToast('Saved to your Prompt Library!');
  };

  const isCurrentSaved = useMemo(() => {
    return savedPrompts.some((p) => p.content === currentPromptText);
  }, [savedPrompts, currentPromptText]);

  // Delete saved prompt
  const handleDeleteSavedPrompt = (id: string) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
    showToast('Prompt deleted from library');
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setSavedPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  // Load saved prompt back into builder
  const handleLoadSavedPrompt = (item: SavedPrompt) => {
    setSelectedCategoryId(item.category);
    setEnhancedPrompt(item.enhancedContent || item.content);
    showToast(`Loaded "${item.title}" into studio`);
  };

  // Remix / Randomize inputs
  const handleRandomize = () => {
    const newVals: Record<string, string> = {};
    activeCategory.fields.forEach((f) => {
      if (f.suggestionChips && f.suggestionChips.length > 0) {
        const rand =
          f.suggestionChips[Math.floor(Math.random() * f.suggestionChips.length)];
        newVals[f.id] = rand.value;
      } else if (f.options && f.options.length > 0) {
        const rand = f.options[Math.floor(Math.random() * f.options.length)];
        newVals[f.id] = rand.value;
      }
    });
    setFieldValues(newVals);
    setActivePresetId(undefined);
    setEnhancedPrompt(null);
    showToast('Remixed inputs with creative suggestions!');
  };

  // Reset to empty
  const handleReset = () => {
    setFieldValues({});
    setActivePresetId(undefined);
    setEnhancedPrompt(null);
    showToast('Reset form inputs');
  };

  // New prompt action
  const handleNewPrompt = () => {
    setActiveTab('builder');
    handleReset();
  };

  // Handle selecting preset from PresetGalleryView
  const handleSelectPresetFromGallery = (
    categoryId: CategoryId,
    preset: PresetBlueprint
  ) => {
    setSelectedCategoryId(categoryId);
    setFieldValues({ ...preset.fieldValues });
    setActivePresetId(preset.id);
    setActiveModifierIds(preset.powerModifiers || []);
    setEnhancedPrompt(null);
    setActiveTab('builder');
    showToast(`Loaded blueprint: ${preset.title}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-xl flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Pane: Sidebar Menu */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'library') {
            setIsLibraryOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleSelectCategory}
        savedCount={savedPrompts.length}
        onNewPrompt={handleNewPrompt}
        onOpenExport={() => setIsExportOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Viewport Content */}
        {activeTab === 'presets' ? (
          <PresetGalleryView onSelectPreset={handleSelectPresetFromGallery} />
        ) : (
          <main className="flex-1 p-4 md:p-6 max-w-[1560px] w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Center Column: Preset Blueprints + Suggestion Boxes + Builder Form (7 cols) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                {/* Ready-to-Use Blueprint Starters Suggestion Box */}
                <PresetBlueprintsBox
                  presets={activeCategory.presets}
                  onApplyPreset={handleApplyPreset}
                  activePresetId={activePresetId}
                />

                {/* Dedicated High-Impact Suggestion Boxes for this Category */}
                <InteractiveSuggestionBoxes
                  suggestionBoxes={activeCategory.suggestionBoxes}
                  onApplySuggestion={handleApplySuggestion}
                  currentValues={fieldValues}
                />

                {/* Dynamic Builder Form with Inline Suggestion Chips */}
                <BuilderForm
                  category={activeCategory}
                  fieldValues={fieldValues}
                  onChangeField={handleChangeField}
                  activeModifierIds={activeModifierIds}
                  onToggleModifier={handleToggleModifier}
                />
              </div>

              {/* Right Column: Live Output Cockpit + Score Auditor + AI Enhancement (5 cols sticky) */}
              <div className="lg:col-span-5 lg:sticky lg:top-20">
                <PromptOutputPanel
                  assembledPrompt={assembledPrompt}
                  enhancedPrompt={enhancedPrompt}
                  outputFormat={outputFormat}
                  onChangeOutputFormat={setOutputFormat}
                  qualityAnalysis={qualityAnalysis}
                  onApplyTip={handleApplyTip}
                  onEnhanceWithAi={handleEnhanceWithAi}
                  isEnhancing={isEnhancing}
                  onOpenAskQuestions={() => setIsAskQuestionsOpen(true)}
                  onSavePrompt={handleSavePrompt}
                  isSaved={isCurrentSaved}
                  onOpenExport={() => setIsExportOpen(true)}
                  onRandomize={handleRandomize}
                  onReset={handleReset}
                />
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Modals */}
      <AskThreeQuestionsModal
        isOpen={isAskQuestionsOpen}
        onClose={() => setIsAskQuestionsOpen(false)}
        category={activeCategory.id}
        currentPrompt={enhancedPrompt || assembledPrompt}
        onApplyAnswers={handleApplyClarifyingAnswers}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        promptText={currentPromptText}
        categoryName={activeCategory.name}
        targetAi={fieldValues.target_ai || 'Claude / ChatGPT'}
      />

      <SavedPromptsModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        savedPrompts={savedPrompts}
        onLoadPrompt={handleLoadSavedPrompt}
        onDeletePrompt={handleDeleteSavedPrompt}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
