import { CategoryConfig, QualityAnalysis } from '../types/prompt';

export function calculateQualityScore(
  category: CategoryConfig,
  fieldValues: Record<string, string>,
  activeModifierIds: string[]
): QualityAnalysis {
  let roleScore = 15; // default domain role is provided
  let objectiveScore = 0;
  let contextScore = 0;
  let constraintsScore = 0;
  let formatScore = 10;

  const tips: QualityAnalysis['tips'] = [];

  // 1. Objective analysis
  const mainObjective =
    fieldValues.objective ||
    fieldValues.subject ||
    fieldValues.scene_description ||
    fieldValues.topic ||
    fieldValues.product_service ||
    fieldValues.seed_keyword ||
    fieldValues.company_overview ||
    fieldValues.problem_description ||
    fieldValues.current_experience ||
    fieldValues.project_type ||
    '';

  const trimmedObj = mainObjective.trim();
  if (trimmedObj.length > 80) {
    objectiveScore = 25;
  } else if (trimmedObj.length > 25) {
    objectiveScore = 18;
    tips.push({
      id: 'expand-objective',
      text: 'Add more specific requirements or business context to your core objective (+7 pts)'
    });
  } else if (trimmedObj.length > 0) {
    objectiveScore = 8;
    tips.push({
      id: 'short-objective',
      text: 'Objective is quite brief. Detail key features or desired outcomes (+17 pts)'
    });
  } else {
    objectiveScore = 0;
    tips.push({
      id: 'missing-objective',
      text: 'Specify the primary objective or subject to build (+25 pts)'
    });
  }

  // 2. Context & Domain Fields (Framework, Medium, Lighting, etc.)
  let filledFieldsCount = 0;
  let totalInspectableFields = 0;

  category.fields.forEach((f) => {
    if (!['objective', 'subject', 'scene_description', 'topic', 'product_service', 'seed_keyword', 'company_overview', 'problem_description', 'current_experience', 'negative_constraints', 'target_ai'].includes(f.id)) {
      totalInspectableFields++;
      if (fieldValues[f.id] && fieldValues[f.id].trim()) {
        filledFieldsCount++;
      }
    }
  });

  const fieldRatio = totalInspectableFields > 0 ? filledFieldsCount / totalInspectableFields : 1;
  if (fieldRatio >= 0.75) {
    contextScore = 25;
  } else if (fieldRatio >= 0.4) {
    contextScore = 18;
    tips.push({
      id: 'fill-more-fields',
      text: 'Fill out remaining specifications or select suggestions below (+7 pts)'
    });
  } else if (fieldRatio > 0) {
    contextScore = 10;
    tips.push({
      id: 'fill-context',
      text: 'Specify tech stack, styling, or audience details to guide the AI (+15 pts)'
    });
  } else {
    contextScore = 0;
    tips.push({
      id: 'missing-context',
      text: 'Choose options from the dropdowns or suggestion boxes (+25 pts)'
    });
  }

  // 3. Constraints & Negative Prompts
  const negConstraints = fieldValues.negative_constraints?.trim() || '';
  if (negConstraints.length > 30) {
    constraintsScore = 25;
  } else if (negConstraints.length > 0) {
    constraintsScore = 15;
    tips.push({
      id: 'strengthen-negatives',
      text: 'Strengthen negative constraints to prevent generic AI clichés (+10 pts)',
      actionField: 'negative_constraints',
      actionValue: 'Avoid placeholder comments, generic buzzwords, and unhandled errors.'
    });
  } else {
    constraintsScore = 0;
    tips.push({
      id: 'add-negatives',
      text: 'Add negative constraints (what to avoid) to prevent hallucinations (+25 pts)',
      actionField: 'negative_constraints',
      actionValue: 'Never truncate code or use placeholders. Avoid buzzwords and unverified packages.'
    });
  }

  // 4. Target AI Alignment & Power Modifiers
  if (fieldValues.target_ai && fieldValues.target_ai.trim()) {
    formatScore += 5;
  } else {
    tips.push({
      id: 'set-target-ai',
      text: 'Select your target AI model (e.g. Claude 3.7, ChatGPT o3, Cursor) (+5 pts)',
      actionField: 'target_ai',
      actionValue: 'Claude 3.7 Sonnet / Cursor Agent'
    });
  }

  if (activeModifierIds.length >= 2) {
    formatScore += 10;
  } else if (activeModifierIds.length === 1) {
    formatScore += 5;
    tips.push({
      id: 'add-modifier',
      text: 'Activate a power modifier (e.g., Chain-of-Thought or Strict Schema) (+5 pts)'
    });
  } else {
    tips.push({
      id: 'add-modifier',
      text: 'Activate at least one Power Invariant below (+10 pts)'
    });
  }

  // Cap scores
  roleScore = Math.min(15, roleScore);
  objectiveScore = Math.min(25, objectiveScore);
  contextScore = Math.min(25, contextScore);
  constraintsScore = Math.min(25, constraintsScore);
  formatScore = Math.min(10, formatScore);

  const totalScore = Math.min(100, roleScore + objectiveScore + contextScore + constraintsScore + formatScore);

  let grade = 'Needs Work';
  if (totalScore >= 90) grade = 'Masterclass 🏆';
  else if (totalScore >= 75) grade = 'Production Ready 🚀';
  else if (totalScore >= 55) grade = 'Solid Foundation 👍';
  else if (totalScore >= 35) grade = 'Drafting ✍️';

  return {
    score: totalScore,
    grade,
    breakdown: {
      roleScore,
      objectiveScore,
      contextScore,
      constraintsScore,
      formatScore
    },
    tips: tips.slice(0, 3) // Return top 3 most impactful tips
  };
}
