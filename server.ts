import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

// Initialize Gemini SDK if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI();
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
  }
}

// 1. Endpoint: Enhance Prompt with AI
app.post('/api/enhance-prompt', async (req, res) => {
  try {
    const {
      category = 'general',
      prompt = '',
      targetAi = 'ChatGPT / Claude',
      detailLevel = 'detailed',
      powerModifiers = [],
    } = req.body;

    if (!prompt.trim()) {
      return res.status(400).json({ error: 'Prompt text is required' });
    }

    if (aiClient) {
      const systemInstruction = `You are a world-class AI prompt engineering expert and prompt architect.
Your job is to elevate the provided prompt for the "${category}" domain targeting "${targetAi}".
Rules for your enhanced prompt:
1. Make it immediately actionable, precise, and unambiguous.
2. Structure it cleanly with clear headers (Role & Objective, Context & Inputs, Technical/Domain Constraints, Step-by-Step Execution, Expected Output Format, Negative Constraints / What to Avoid).
3. Integrate any requested power modifiers: ${powerModifiers.join(', ') || 'standard best practices'}.
4. Target AI specifics: Optimize syntax and instructions specifically for ${targetAi} (e.g. Midjourney parameter flags, Cursor file creation directives, Claude XML tags, or ChatGPT markdown guidelines).
5. Output ONLY the improved, production-ready prompt text. Do not wrap in conversational chatter or apologies.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: `Here is the draft prompt to enhance:\n\n${prompt}` }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.4,
        }
      });

      const enhancedText = response.text?.trim();
      if (enhancedText) {
        return res.json({ enhancedPrompt: enhancedText });
      }
    }

    // Heuristic Fallback if Gemini key is missing or failed
    const heuristicEnhanced = generateHeuristicEnhancement(prompt, category, targetAi, powerModifiers);
    return res.json({ enhancedPrompt: heuristicEnhanced });
  } catch (error: any) {
    console.error('Enhancement error:', error);
    // Graceful fallback to heuristic
    const fallback = generateHeuristicEnhancement(
      req.body.prompt || '',
      req.body.category || 'general',
      req.body.targetAi || 'ChatGPT',
      req.body.powerModifiers || []
    );
    return res.json({ enhancedPrompt: fallback });
  }
});

// 2. Endpoint: Ask 3 Clarifying Questions
app.post('/api/ask-questions', async (req, res) => {
  try {
    const { category = 'website-app', prompt = '' } = req.body;

    if (aiClient && prompt.trim()) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Analyze this draft prompt for the category "${category}":
"""
${prompt}
"""
Generate exactly 3 concise, high-impact clarifying questions that would eliminate the most critical ambiguities, along with 3-4 suggested quick-pick options for each question.
Respond in valid JSON with format:
{
  "questions": [
    {
      "id": "q1",
      "question": "Clear single-sentence question?",
      "options": ["Option A", "Option B", "Option C"]
    },
    {
      "id": "q2",
      "question": "Clear single-sentence question?",
      "options": ["Option A", "Option B", "Option C"]
    },
    {
      "id": "q3",
      "question": "Clear single-sentence question?",
      "options": ["Option A", "Option B", "Option C"]
    }
  ]
}`
              }
            ]
          }
        ],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.questions && parsed.questions.length >= 3) {
        return res.json({ questions: parsed.questions.slice(0, 3) });
      }
    }

    // Dynamic Heuristic Questions fallback based on category
    const questions = getCategoryHeuristicQuestions(category);
    return res.json({ questions });
  } catch (err) {
    console.error('Ask questions error:', err);
    return res.json({ questions: getCategoryHeuristicQuestions(req.body.category) });
  }
});

// 3. Endpoint: Synthesize Answers into Refined Prompt
app.post('/api/apply-answers', async (req, res) => {
  try {
    const { originalPrompt, qaPairs } = req.body;

    if (aiClient && originalPrompt && qaPairs?.length) {
      const qaContext = qaPairs.map((qa: any) => `Q: ${qa.question}\nA: ${qa.answer}`).join('\n\n');
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Here is the current prompt:
"""
${originalPrompt}
"""

The user provided these specific clarifications:
${qaContext}

Seamlessly weave these clarifications into the prompt. Keep the professional prompt structure, resolve any ambiguities, and output ONLY the updated ready-to-run prompt.`
              }
            ]
          }
        ],
        config: {
          temperature: 0.3,
        }
      });

      const refined = response.text?.trim();
      if (refined) {
        return res.json({ refinedPrompt: refined });
      }
    }

    // Fallback: append structured clarifications
    let addition = '\n\n### Additional Specific Requirements & Clarifications\n';
    (qaPairs || []).forEach((qa: any) => {
      addition += `- **${qa.question}**: ${qa.answer}\n`;
    });
    return res.json({ refinedPrompt: (originalPrompt || '') + addition });
  } catch (err) {
    console.error('Apply answers error:', err);
    return res.json({ refinedPrompt: req.body.originalPrompt || '' });
  }
});

// Heuristic Generator Helper
function generateHeuristicEnhancement(rawPrompt: string, category: string, targetAi: string, powerModifiers: string[] = []): string {
  const parts: string[] = [];

  parts.push(`## Role & Directive
Act as an elite domain authority in ${category.replace('-', ' ')} with decades of production experience. Execute the following specification with uncompromising quality, production-readiness, and zero filler.`);

  parts.push(`## Objective
${rawPrompt.trim()}`);

  parts.push(`## Target Execution Environment: ${targetAi}
- Tailor all conventions, code architectures, style tokens, and syntax directly for ${targetAi}.
- Provide full, non-truncated deliverables with exact file paths, schemas, or complete text without placeholder gaps.`);

  if (powerModifiers.length > 0) {
    parts.push(`## Quality Invariants & Protocols\n${powerModifiers.map(m => `- ${m}`).join('\n')}`);
  } else {
    parts.push(`## Quality Invariants & Protocols
- Think step-by-step through technical and domain constraints before writing the final output.
- Enforce strict typing, comprehensive error boundaries, and defensive validation.
- Address edge cases, failure states, and accessibility standards.`);
  }

  parts.push(`## Negative Constraints
- NEVER omit implementation details with phrases like "rest of code here" or "etc".
- Avoid generic filler adjectives, corporate buzzwords, and redundant boilerplate.
- Do not invent unverified dependencies or hallucinated APIs.`);

  return parts.join('\n\n');
}

function getCategoryHeuristicQuestions(category: string) {
  const map: Record<string, any[]> = {
    'website-app': [
      {
        id: 'q1',
        question: 'What is the primary architectural stack and database preference?',
        options: ['Next.js 15 (App Router) + Supabase + Tailwind', 'React + Vite SPA + Express API + PostgreSQL', 'Full-stack TypeScript + SQLite (Single container)', 'Python FastAPI + React + Redis']
      },
      {
        id: 'q2',
        question: 'What authentication & authorization model is required?',
        options: ['Role-Based Access Control (Admin, Member, Viewer)', 'Simple email/password + JWT session tokens', 'OAuth only (Google / GitHub) + magic link', 'No auth required (Public tool / MVP)']
      },
      {
        id: 'q3',
        question: 'What is the highest priority business rule or core workflow?',
        options: ['Real-time live updates & collaborative presence', 'Automated background processing & asynchronous queues', 'Complex data visualization & CSV/PDF export', 'Strict payment gateway & subscription billing lifecycle']
      }
    ],
    'image': [
      {
        id: 'q1',
        question: 'What exact visual aesthetic and medium should dominate?',
        options: ['Cinematic 35mm film photography with natural grain', 'Hyper-clean studio product photography on neutral stone', 'Editorial isometric 3D render with soft rim lighting', 'Vibrant graphic novel digital illustration']
      },
      {
        id: 'q2',
        question: 'What is the lighting direction and atmosphere?',
        options: ['Dramatic golden hour rim light with volumetric haze', 'High-key diffused daylight with soft ambient shadows', 'Moody chiaroscuro with dark cinematic background', 'Subtle neon backlighting with cool cyan tones']
      },
      {
        id: 'q3',
        question: 'Which camera lens, framing, and aspect ratio is desired?',
        options: ['85mm portrait lens, shallow depth of field, 16:9', '24mm wide-angle architectural shot, deep focus, 16:9', 'Macro probe lens, crisp extreme close-up, 1:1', '50mm eye-level standard lens, balanced framing, 4:5']
      }
    ],
    'video': [
      {
        id: 'q1',
        question: 'What is the primary camera movement and framing style?',
        options: ['Slow continuous cinematic drone orbit shot', 'Smooth handheld tracking shot following subject', 'Static tripod hero shot with slow zoom-in', 'Dynamic FPV fly-through with motion blur']
      },
      {
        id: 'q2',
        question: 'What is the scene pacing and temporal transition?',
        options: ['Slow-motion 60fps dreamlike flow', 'Fast-paced rhythmic commercial pacing (1-2s cuts)', 'Continuous unedited single-take master sequence', 'Time-lapse transition from dusk to night']
      },
      {
        id: 'q3',
        question: 'What soundscape or audio ambiance accompanies the visuals?',
        options: ['Subtle ambient room tone and atmospheric wind', 'Punchy cinematic bass hits with modern soundtrack', 'Direct crisp voiceover with minimal background pads', 'Natural foley footsteps and environmental textures']
      }
    ],
    'ads': [
      {
        id: 'q1',
        question: 'What is the core offer hook or value proposition?',
        options: ['Urgent limited-time pricing discount / bundle', 'Pain-point callout: "Tired of wasting hours on X?"', 'Social proof: "How 10,000+ teams solved Y"', 'Curiosity gap: "The 1 thing top performers do differently"']
      },
      {
        id: 'q2',
        question: 'Which platform and ad format is this targeted for?',
        options: ['Meta Feed / Instagram Story (Visual + short copy)', 'Google Search Ads (High intent headlines + descriptions)', 'YouTube Pre-Roll 30s video ad script', 'LinkedIn Sponsored Content (B2B professional)']
      },
      {
        id: 'q3',
        question: 'What is the primary call to action (CTA)?',
        options: ['"Start Free 14-Day Trial — No Credit Card"', '"Claim Your Exclusive 50% Off Code"', '"Book a 15-Minute Strategy Call"', '"Download the Free 2026 Industry Report"']
      }
    ]
  };

  return map[category] || [
    {
      id: 'q1',
      question: 'Who is the exact primary audience or end user for this output?',
      options: ['Busy C-Suite executives & decision makers', 'Technical engineers & domain practitioners', 'General consumer / retail buyers', 'Students & beginner learners']
    },
    {
      id: 'q2',
      question: 'What tone of voice and writing style should be enforced?',
      options: ['Authoritative, crisp, and data-backed', 'Conversational, warm, and highly engaging', 'Concise, direct, and zero fluff', 'Persuasive and high-converting']
    },
    {
      id: 'q3',
      question: 'What specific output structure works best for your workflow?',
      options: ['Clean Markdown with section headers & bullet lists', 'Production-ready code files with explanatory walkthrough', 'Standard JSON payload matching a strict schema', 'Step-by-step implementation roadmap']
    }
  ];
}

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PromptArchitect server running at http://localhost:${PORT}`);
  });
}

startServer();
