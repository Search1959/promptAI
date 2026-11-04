import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types/prompt';
import {
  Sparkles,
  Bookmark,
  Layers,
  Plus,
  Moon,
  Sun,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Cloud
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'builder' | 'presets' | 'library';
  onSelectTab: (tab: 'builder' | 'presets' | 'library') => void;
  selectedCategoryId: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  savedCount: number;
  onNewPrompt: () => void;
  onOpenExport?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  selectedCategoryId,
  onSelectCategory,
  savedCount,
  onNewPrompt,
  onOpenExport,
  theme,
  onToggleTheme
}) => {
  const [categorySearch, setCategorySearch] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const filteredCategories = CATEGORIES.filter((c) => {
    if (!categorySearch.trim()) return true;
    const q = categorySearch.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q);
  });

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c101c] transition-all duration-300 z-30 shrink-0 ${
        collapsed ? 'w-18' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800 h-16">
        {!collapsed ? (
          <a
            href="#studio"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('builder');
            }}
            className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold tracking-tight text-sm whitespace-nowrap"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
            <span>PromptArchitect</span>
          </a>
        ) : (
          <div className="mx-auto">
            <span className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400 block" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Workspace Navigation Links */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-1">
        <button
          onClick={() => onSelectTab('builder')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'builder'
              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
          }`}
          title="Prompt Studio"
        >
          <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
          {!collapsed && <span>Prompt Studio</span>}
        </button>

        <button
          onClick={() => onSelectTab('presets')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
          }`}
          title="Preset Blueprints"
        >
          <Layers className="w-4 h-4 text-purple-500 shrink-0" />
          {!collapsed && <span>Preset Blueprints</span>}
        </button>

        <button
          onClick={() => onSelectTab('library')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'library'
              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
          }`}
          title="Saved Prompts"
        >
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-amber-500 shrink-0" />
            {!collapsed && (
              <span className="flex items-center gap-1.5">
                <span>Saved Prompts</span>
                <span title="Cloud Firestore Synced">
                  <Cloud className="w-3 h-3 text-emerald-500" />
                </span>
              </span>
            )}
          </div>
          {!collapsed && savedCount > 0 && (
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              {savedCount}
            </span>
          )}
        </button>
      </div>

      {/* Category Section in Left Pane */}
      <div className="flex-1 flex flex-col min-h-0">
        {!collapsed ? (
          <div className="p-3 pb-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Categories (14)
              </span>
            </div>
            {/* Search Input */}
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Filter categories..."
                className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-md text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        ) : (
          <div className="pt-3 text-center text-[10px] uppercase font-bold text-slate-400">
            Cats
          </div>
        )}

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5 scrollbar-thin">
          {filteredCategories.map((cat) => {
            const isSelected = cat.id === selectedCategoryId && activeTab === 'builder';
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (activeTab !== 'builder') {
                    onSelectTab('builder');
                  }
                }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={cat.name}
              >
                <span className="text-sm shrink-0">{cat.icon}</span>
                {!collapsed && (
                  <span className="truncate flex-1">{cat.name}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-[#0a0d17]/50">
        <button
          onClick={onNewPrompt}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
          title="New Prompt"
        >
          <Plus className="w-3.5 h-3.5" />
          {!collapsed && <span>New Prompt</span>}
        </button>

        <div className="flex items-center justify-between gap-1.5 pt-1">
          {onOpenExport && (
            <button
              onClick={onOpenExport}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Export deliverable"
            >
              <Download className="w-3.5 h-3.5" />
              {!collapsed && <span>Export</span>}
            </button>
          )}

          <button
            onClick={onToggleTheme}
            className={`p-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
              !onOpenExport ? 'flex-1 flex items-center justify-center gap-1.5' : ''
            }`}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {!collapsed && !onOpenExport && <span>Theme</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
