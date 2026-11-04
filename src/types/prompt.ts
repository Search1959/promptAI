export type CategoryId =
  | 'website-app'
  | 'image'
  | 'video'
  | 'content'
  | 'social'
  | 'ads'
  | 'seo'
  | 'email'
  | 'design'
  | 'business-docs'
  | 'education'
  | 'coding'
  | 'career'
  | 'agents';

export interface SuggestionChip {
  label: string;
  value: string;
  description?: string;
}

export interface SuggestionBox {
  id: string;
  title: string;
  description?: string;
  fieldTarget: string; // which form field this updates or appends to
  mode?: 'replace' | 'append';
  suggestions: SuggestionChip[];
}

export interface PresetBlueprint {
  id: string;
  title: string;
  tagline: string;
  targetAi: string;
  fieldValues: Record<string, string>;
  powerModifiers: string[];
}

export interface CategoryFormField {
  id: string;
  label: string;
  type: 'select' | 'text' | 'textarea';
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string; promptText?: string }[];
  suggestionChips?: SuggestionChip[];
}

export interface CategoryConfig {
  id: CategoryId;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  presets: PresetBlueprint[];
  fields: CategoryFormField[];
  suggestionBoxes: SuggestionBox[];
  powerModifiers: { id: string; label: string; text: string; description: string }[];
}

export interface SavedPrompt {
  id: string;
  title: string;
  category: CategoryId;
  targetAi: string;
  content: string;
  enhancedContent?: string;
  qualityScore: number;
  tags: string[];
  createdAt: number;
  isFavorite: boolean;
}

export interface QualityAnalysis {
  score: number;
  grade: string;
  breakdown: {
    roleScore: number;
    objectiveScore: number;
    contextScore: number;
    constraintsScore: number;
    formatScore: number;
  };
  tips: { id: string; text: string; actionField?: string; actionValue?: string }[];
}

export interface ClarifyingQuestion {
  id: string;
  question: string;
  options: string[];
  selectedAnswer?: string;
}
