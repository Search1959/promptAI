import { CategoryConfig, CategoryId } from '../types/prompt';

export type OutputFormat = 'standard' | 'system' | 'markdown' | 'midjourney_raw';

export function assemblePrompt(
  category: CategoryConfig,
  fieldValues: Record<string, string>,
  activeModifierIds: string[],
  outputFormat: OutputFormat = 'standard'
): string {
  const targetAi = fieldValues.target_ai || 'ChatGPT / Claude';
  const activeModifiers = category.powerModifiers.filter((m) =>
    activeModifierIds.includes(m.id)
  );

  // Special handler for Midjourney / Image raw format
  if (category.id === 'image' && outputFormat === 'midjourney_raw') {
    const parts: string[] = [];
    if (fieldValues.subject) parts.push(fieldValues.subject.trim());
    if (fieldValues.medium) parts.push(fieldValues.medium.trim());
    if (fieldValues.lighting) parts.push(fieldValues.lighting.trim());
    if (fieldValues.camera_lens) parts.push(fieldValues.camera_lens.trim());
    if (fieldValues.aesthetic_style) parts.push(fieldValues.aesthetic_style.trim());

    let raw = parts.join(', ');
    if (fieldValues.aspect_ratio) {
      raw += ` --ar ${fieldValues.aspect_ratio}`;
    }
    if (fieldValues.negative_constraints) {
      // Clean negative prompt for --no flag
      const cleanNeg = fieldValues.negative_constraints
        .replace(/no\s+/gi, '')
        .split(/[,;\n]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .join(', ');
      if (cleanNeg) {
        raw += ` --no ${cleanNeg}`;
      }
    }
    raw += ' --v 6.1 --style raw';
    return raw;
  }

  // System Prompt format
  if (outputFormat === 'system') {
    return assembleSystemPrompt(category, fieldValues, activeModifiers, targetAi);
  }

  // Standard / Markdown format
  return assembleStandardPrompt(category, fieldValues, activeModifiers, targetAi);
}

function assembleStandardPrompt(
  category: CategoryConfig,
  fieldValues: Record<string, string>,
  activeModifiers: { id: string; label: string; text: string }[],
  targetAi: string
): string {
  const sections: string[] = [];

  // Section 1: Role & Persona
  const roleName = getDomainRole(category.id);
  sections.push(`## Role & Directive
Act as an expert ${roleName} targeting ${targetAi}. Execute the following specification with uncompromising quality, professional best practices, and production readiness.`);

  // Section 2: Core Objective / Scope
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
    'Provide comprehensive assistance based on the detailed specifications below.';

  sections.push(`## Core Objective
${mainObjective}`);

  // Section 3: Technical / Domain Specifications
  const specs: string[] = [];
  category.fields.forEach((field) => {
    // Skip objective & negative constraints as they have dedicated sections
    if (
      [
        'objective',
        'subject',
        'scene_description',
        'topic',
        'product_service',
        'seed_keyword',
        'company_overview',
        'problem_description',
        'current_experience',
        'negative_constraints',
        'target_ai'
      ].includes(field.id)
    ) {
      return;
    }

    const val = fieldValues[field.id];
    if (val && val.trim()) {
      specs.push(`- **${field.label}**: ${val.trim()}`);
    }
  });

  if (specs.length > 0) {
    sections.push(`## Technical & Domain Specifications\n${specs.join('\n')}`);
  }

  // Section 4: Target AI Execution Instructions
  sections.push(`## Target Execution Environment: ${targetAi}
${getTargetAiInstructions(targetAi, category.id)}`);

  // Section 5: Power Invariants & Modifiers
  if (activeModifiers.length > 0) {
    const modifierTexts = activeModifiers.map((m) => `- **${m.label}**: ${m.text}`);
    sections.push(`## Quality Invariants & Protocols\n${modifierTexts.join('\n')}`);
  }

  // Section 6: Negative Constraints / What to Avoid
  const neg = fieldValues.negative_constraints;
  if (neg && neg.trim()) {
    sections.push(`## Negative Constraints & Exclusions
${neg
  .trim()
  .split('\n')
  .map((line) => (line.startsWith('-') ? line : `- ${line}`))
  .join('\n')}`);
  }

  return sections.join('\n\n');
}

function assembleSystemPrompt(
  category: CategoryConfig,
  fieldValues: Record<string, string>,
  activeModifiers: { id: string; label: string; text: string }[],
  targetAi: string
): string {
  const standard = assembleStandardPrompt(category, fieldValues, activeModifiers, targetAi);
  return `[SYSTEM INSTRUCTIONS]
You are an autonomous domain-specialized AI assistant.
Your instructions are defined below. Follow all protocols strictly without exception.

${standard}

[END SYSTEM INSTRUCTIONS]`;
}

function getDomainRole(categoryId: CategoryId): string {
  const map: Record<CategoryId, string> = {
    'website-app': 'Staff Full-Stack Software Engineer & Solutions Architect',
    image: 'World-Class Visual Art Director & Commercial Cinematographer',
    video: 'Award-Winning Hollywood Film Director & VFX Cinematographer',
    content: 'Elite Investigative Journalist & B2B Editorial Director',
    social: 'Head of Viral Growth & Multi-Platform Audience Strategist',
    ads: 'Direct-Response Copywriting Legend & Performance Marketer',
    seo: 'Principal Search Architect & Entity Topical Authority Specialist',
    email: 'High-Converting B2B Cold Outreach & Lifecycle Marketing Strategist',
    design: 'Executive Creative Director & Design Systems Architect',
    'business-docs': 'Senior Strategy Partner & Venture Investment Analyst',
    education: 'Master Socratic Professor & Cognitive Pedagogy Specialist',
    coding: 'Principal Staff Debugger & Distributed Systems Optimizer',
    career: 'Executive Tech Recruiter & Google Talent Evaluation Specialist',
    agents: 'Principal Agentic Systems Architect & Prompt Safety Engineer'
  };
  return map[categoryId] || 'Senior Subject Matter Expert';
}

function getTargetAiInstructions(targetAi: string, categoryId: CategoryId): string {
  if (targetAi.includes('Claude') || targetAi.includes('Cursor')) {
    return `- Structure the response with clear hierarchical headings and code blocks.
- Provide full, non-truncated file implementations with exact file paths (e.g. \`# /src/...\`).
- Do not use lazy placeholders like "// ... rest of code here".`;
  }
  if (targetAi.includes('Midjourney')) {
    return `- Format prompt as a rich descriptive comma-separated visual description followed by explicit flags (--ar, --v 6.1, --style raw).
- Focus heavily on lighting, camera optics, medium, and atmosphere.`;
  }
  if (targetAi.includes('Lovable') || targetAi.includes('Bolt')) {
    return `- Deliver a complete, interactive single-pass solution with comprehensive mock data.
- Ensure all navigation buttons, tabs, and interactive elements are completely wired up without dead stubs.`;
  }
  if (targetAi.includes('ChatGPT') || targetAi.includes('o3')) {
    return `- Formulate solution systematically with step-by-step reasoning where complex trade-offs are involved.
- Enforce strict typing, clean error handling, and direct actionable output.`;
  }
  return `- Provide exhaustive, actionable deliverables tailored for ${targetAi} with zero fluff or conversational filler.`;
}
