import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { PresetBlueprint, CategoryId } from '../types/prompt';
import { Sparkles, ArrowRight, Search, Cpu } from 'lucide-react';

interface PresetGalleryViewProps {
  onSelectPreset: (categoryId: CategoryId, preset: PresetBlueprint) => void;
}

export const PresetGalleryView: React.FC<PresetGalleryViewProps> = ({
  onSelectPreset
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const allPresetsWithCategory = CATEGORIES.flatMap((c) =>
    c.presets.map((p) => ({ ...p, categoryId: c.id, categoryName: c.name, categoryIcon: c.icon }))
  );

  const filtered = allPresetsWithCategory.filter((item) => {
    const matchesSearch =
      !search.trim() ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tagline.toLowerCase().includes(search.toLowerCase()) ||
      item.targetAi.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'all' || item.categoryId === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Hero Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Master Prompt Blueprint Library
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Battle-tested, production-ready prompt architectures engineered for Claude 3.7, ChatGPT o3, Cursor, Midjourney, and top models. Load directly into the studio with one click.
        </p>

        {/* Filter Strip */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter blueprints by name, model, stack..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedCat === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Domains
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCat === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((blueprint) => (
          <div
            key={blueprint.id}
            onClick={() => onSelectPreset(blueprint.categoryId, blueprint)}
            className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5">
                  <span>{blueprint.categoryIcon}</span>
                  <span>{blueprint.categoryName}</span>
                </span>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                  {blueprint.targetAi}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                {blueprint.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {blueprint.tagline}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                {blueprint.powerModifiers?.length || 0} Power Modifiers
              </span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Load Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
