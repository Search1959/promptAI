import { CategoryConfig } from '../types/prompt';

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'website-app',
    name: 'Website / App',
    icon: '💻',
    tagline: 'Full-stack apps, SaaS MVPs, APIs, landing pages, databases, and microservices',
    description: 'Construct bulletproof architectural prompts for Next.js, React, Node.js, Python, Supabase, Tailwind, and full-stack software development.',
    presets: [
      {
        id: 'saas-mvp',
        title: 'Full-Stack SaaS MVP with Auth & Stripe',
        tagline: 'Multi-tenant dashboard with authentication, database schema, and billing',
        targetAi: 'Claude 3.7 Sonnet / Cursor',
        fieldValues: {
          app_type: 'Multi-tenant SaaS subscription platform',
          framework: 'Next.js 15 (App Router) + TypeScript + Tailwind CSS',
          database: 'Supabase PostgreSQL with Row Level Security (RLS)',
          auth_model: 'Supabase Auth (Magic link + Google OAuth)',
          styling: 'Tailwind CSS with clean modern dark/light system and Radix primitives',
          detail_level: 'Comprehensive with full production-ready code files and zero omitted blocks',
          target_ai: 'Claude 3.7 Sonnet / Cursor Agent',
          objective: 'Build a production-grade multi-tenant team dashboard where users can invite workspace members, manage subscription plans via Stripe webhooks, and track usage metrics in real time.',
          negative_constraints: 'Never output placeholder comments like "// rest of code here". Avoid complex unverified third-party libraries; use standard idiomatic patterns. Ensure all inputs are validated with Zod schemas.'
        },
        powerModifiers: ['cot', 'strict-schema', 'edge-case-audit']
      },
      {
        id: 'ecom-store',
        title: 'Headless E-Commerce with Cart & Checkout',
        tagline: 'Modern storefront with inventory filtering, persistent cart, and responsive layout',
        targetAi: 'ChatGPT-4o / o3-mini',
        fieldValues: {
          app_type: 'Headless E-Commerce storefront',
          framework: 'React 19 + Vite + TypeScript + Tailwind CSS',
          database: 'PostgreSQL with Drizzle ORM',
          auth_model: 'Session-based JWT authentication with role authorization (Admin vs Customer)',
          styling: 'Minimalist luxury aesthetic, neutral palette, crisp typography, 60-30-10 color balance',
          detail_level: 'Step-by-step phased build with schema first, then business logic, then UI',
          target_ai: 'ChatGPT-4o / o3-mini',
          objective: 'Create a high-converting boutique storefront featuring instantaneous faceted search, price range filtering, optimistic cart updates, and mock Stripe checkout orchestration.',
          negative_constraints: 'No bloated external UI component kits. No raw SQL queries without parameterized validation. Prevent double submissions on cart actions.'
        },
        powerModifiers: ['strict-schema', 'few-shot']
      },
      {
        id: 'fastapi-microservice',
        title: 'Python FastAPI Microservice with Docker',
        tagline: 'Async REST API with Pydantic v2, PostgreSQL, Redis caching, and health probes',
        targetAi: 'Claude 3.7 Sonnet / Cursor',
        fieldValues: {
          app_type: 'High-throughput async REST API microservice',
          framework: 'Python 3.12 + FastAPI + Pydantic v2',
          database: 'PostgreSQL with SQLAlchemy 2.0 (asyncio) + Redis for caching',
          auth_model: 'OAuth2 with JWT bearer tokens and API key middleware',
          styling: 'Automated OpenAPI / Swagger interactive documentation with examples',
          detail_level: 'Comprehensive with unit tests, Dockerfile, and docker-compose.yml',
          target_ai: 'Claude 3.7 Sonnet / Cursor Agent',
          objective: 'Design a resilient async microservice handling batch data ingestion, background job processing with Celery/Redis, and rate limiting with health check telemetry.',
          negative_constraints: 'No synchronous blocking calls inside async routes. Avoid deprecated SQLAlchemy 1.x syntax. Must include structured JSON logging.'
        },
        powerModifiers: ['cot', 'edge-case-audit']
      },
      {
        id: 'realtime-collab',
        title: 'Real-Time Collaborative Canvas App',
        tagline: 'Multiplayer interactive board with WebSockets, presence indicators, and undo/redo',
        targetAi: 'Cursor / Lovable',
        fieldValues: {
          app_type: 'Real-time collaborative whiteboard / planning tool',
          framework: 'React 19 + TypeScript + HTML5 Canvas / Konva',
          database: 'PostgreSQL + Redis Pub/Sub for WebSockets',
          auth_model: 'Guest session with shareable room tokens + User accounts',
          styling: 'Ultra-clean canvas UI with floating minimalist tool docks and cursor badges',
          detail_level: 'Comprehensive with client-side state machine and conflict resolution',
          target_ai: 'Cursor / Lovable',
          objective: 'Implement a live multi-user canvas where participants can draw shapes, drop sticky notes, see real-time cursor positions of other users, and export boards to high-res PNG/SVG.',
          negative_constraints: 'Do not re-render the entire canvas on single cursor moves. Avoid memory leaks with event listeners. Ensure proper WebSocket reconnection backoff.'
        },
        powerModifiers: ['cot', 'strict-schema']
      }
    ],
    fields: [
      {
        id: 'objective',
        label: 'Core Objective / What to Build',
        type: 'textarea',
        required: true,
        placeholder: 'e.g. Build an AI-driven invoice generator that scans receipts, calculates tax breakdowns, and generates branded PDF invoices with download & email sending...',
        suggestionChips: [
          { label: 'SaaS CRM Dashboard', value: 'Build a multi-user CRM dashboard for sales pipelines with drag-and-drop deal stages, activity timeline, and CSV export.' },
          { label: 'AI Document Analyzer', value: 'Create a PDF & document analysis app that extracts key clauses, identifies contractual risks, and outputs structured JSON summaries.' },
          { label: 'Real-time Booking Engine', value: 'Develop an appointment scheduling engine with timezone conversion, calendar syncing, availability slots, and SMS reminders.' },
          { label: 'Inventory & Barcode Tracker', value: 'Build a warehouse inventory tracking web app with camera barcode scanning, low-stock reorder thresholds, and audit trails.' },
          { label: 'Community Forum & Q&A', value: 'Create a fast, responsive technical community forum with threaded replies, markdown editor, voting, and tag taxonomies.' }
        ]
      },
      {
        id: 'app_type',
        label: 'Application Category / Architecture',
        type: 'select',
        options: [
          { value: 'SaaS Web Application', label: 'SaaS Web Application (Multi-tenant)' },
          { value: 'Single Page Application (SPA)', label: 'Single Page Application (SPA / React / Vite)' },
          { value: 'REST API Microservice', label: 'REST API Microservice (Node/Python/Go)' },
          { value: 'Mobile-first PWA', label: 'Mobile-first Progressive Web App (PWA)' },
          { value: 'High-Converting Landing Page', label: 'High-Converting Landing Page / Marketing' },
          { value: 'Internal Operations Tool / Admin Panel', label: 'Internal Operations Tool / Admin Panel' },
          { value: 'Developer CLI / Automation Script', label: 'Developer CLI / Automation Script' }
        ],
        suggestionChips: [
          { label: 'Full SaaS App', value: 'Multi-tenant SaaS platform with billing and role permissions' },
          { label: 'REST Microservice', value: 'High-performance async REST API with automated OpenAPI docs' },
          { label: 'Admin Portal', value: 'Internal operations back-office dashboard with data tables and batch actions' },
          { label: 'Mobile PWA', value: 'Offline-capable progressive web application with smooth touch gestures' }
        ]
      },
      {
        id: 'framework',
        label: 'Tech Stack & Framework',
        type: 'select',
        options: [
          { value: 'Next.js 15 (App Router) + TypeScript + Tailwind CSS', label: 'Next.js 15 (App Router) + TypeScript + Tailwind CSS' },
          { value: 'React 19 + Vite + TypeScript + Tailwind CSS', label: 'React 19 + Vite + TypeScript + Tailwind CSS' },
          { value: 'Node.js + Express + TypeScript', label: 'Node.js + Express + TypeScript' },
          { value: 'Python 3.12 + FastAPI + Pydantic v2', label: 'Python 3.12 + FastAPI + Pydantic v2' },
          { value: 'Vue 3 + Nuxt 3 + Pinia + Tailwind', label: 'Vue 3 + Nuxt 3 + Pinia + Tailwind' },
          { value: 'Full-Stack SvelteKit + TypeScript', label: 'Full-Stack SvelteKit + TypeScript' },
          { value: 'Go (Golang) + Gin / Echo + HTMX', label: 'Go (Golang) + Gin / Echo + HTMX' }
        ],
        suggestionChips: [
          { label: 'Next.js 15 + Tailwind', value: 'Next.js 15 (App Router) + TypeScript + Tailwind CSS' },
          { label: 'React 19 + Vite', value: 'React 19 + Vite + TypeScript + Tailwind CSS' },
          { label: 'FastAPI + Python', value: 'Python 3.12 + FastAPI + Pydantic v2' },
          { label: 'Express + TS', value: 'Node.js + Express + TypeScript + Prisma' }
        ]
      },
      {
        id: 'database',
        label: 'Database & Storage',
        type: 'select',
        options: [
          { value: 'PostgreSQL with Drizzle ORM', label: 'PostgreSQL with Drizzle ORM' },
          { value: 'Supabase PostgreSQL with RLS', label: 'Supabase PostgreSQL with Row Level Security' },
          { value: 'PostgreSQL with Prisma ORM', label: 'PostgreSQL with Prisma ORM' },
          { value: 'MongoDB with Mongoose', label: 'MongoDB with Mongoose' },
          { value: 'SQLite / Cloudflare D1 with Kysely', label: 'SQLite / Cloudflare D1 with Kysely' },
          { value: 'Redis for caching + Postgres', label: 'PostgreSQL + Redis for caching and queues' },
          { value: 'No Database (In-Memory / Client State)', label: 'No Database (In-Memory / Client State)' }
        ],
        suggestionChips: [
          { label: 'Supabase + RLS', value: 'Supabase PostgreSQL with Row Level Security' },
          { label: 'Postgres + Drizzle', value: 'PostgreSQL with Drizzle ORM' },
          { label: 'Prisma + Postgres', value: 'PostgreSQL with Prisma ORM' },
          { label: 'Redis + Postgres', value: 'PostgreSQL + Redis for caching and queues' }
        ]
      },
      {
        id: 'auth_model',
        label: 'Authentication & Security',
        type: 'select',
        options: [
          { value: 'Role-Based Access Control (Admin, Member, Viewer)', label: 'Role-Based Access Control (RBAC)' },
          { value: 'Supabase Auth / NextAuth with Social OAuth (Google/GitHub)', label: 'OAuth (Google / GitHub) + Magic Link' },
          { value: 'JWT Bearer Tokens with Refresh Rotation', label: 'JWT Bearer Tokens with Refresh Rotation' },
          { value: 'Clerk / Auth0 managed authentication', label: 'Clerk / Auth0 managed authentication' },
          { value: 'API Key authentication with rate-limiting headers', label: 'API Key authentication with rate-limiting' },
          { value: 'No Authentication (Open Public MVP)', label: 'No Authentication (Open Public MVP)' }
        ],
        suggestionChips: [
          { label: 'RBAC (Admin/Member)', value: 'Role-Based Access Control (Admin, Member, Viewer)' },
          { label: 'Google + GitHub OAuth', value: 'Supabase Auth / NextAuth with Social OAuth (Google/GitHub)' },
          { label: 'JWT Tokens', value: 'JWT Bearer Tokens with Refresh Rotation' },
          { label: 'API Key Auth', value: 'API Key authentication with rate-limiting headers' }
        ]
      },
      {
        id: 'target_ai',
        label: 'Target AI Tool / Coding Assistant',
        type: 'select',
        options: [
          { value: 'Claude 3.7 Sonnet / Cursor Agent', label: 'Claude 3.7 Sonnet / Cursor Agent' },
          { value: 'ChatGPT-4o / o3-mini', label: 'ChatGPT-4o / o3-mini' },
          { value: 'Google AI Studio / Gemini 2.5 Pro', label: 'Google AI Studio / Gemini 2.5 Pro' },
          { value: 'Lovable.dev / Bolt.new / v0', label: 'Lovable.dev / Bolt.new / v0' },
          { value: 'Claude Code (Terminal Agent)', label: 'Claude Code (Terminal CLI Agent)' },
          { value: 'Windsurf / Cascade', label: 'Windsurf / Cascade IDE' }
        ],
        suggestionChips: [
          { label: 'Cursor / Claude 3.7', value: 'Claude 3.7 Sonnet / Cursor Agent' },
          { label: 'ChatGPT o3-mini', value: 'ChatGPT-4o / o3-mini' },
          { label: 'Lovable / Bolt', value: 'Lovable.dev / Bolt.new / v0' },
          { label: 'Gemini Pro', value: 'Google AI Studio / Gemini 2.5 Pro' }
        ]
      },
      {
        id: 'detail_level',
        label: 'Prompt Detail Level',
        type: 'select',
        options: [
          { value: 'Comprehensive with full production-ready code files and zero omitted blocks', label: 'Comprehensive (Production-ready, full files)' },
          { value: 'Step-by-step phased build with schema first, then business logic, then UI', label: 'Step-by-Step (Phased architecture)' },
          { value: 'Compact quick prototype delivering working MVP code with minimal prose', label: 'Compact (Quick MVP, speed focused)' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints & What to Avoid',
        type: 'textarea',
        placeholder: 'e.g. Do not truncate code blocks with "// ...", no deprecated dependencies, no inline styles...',
        suggestionChips: [
          { label: 'No Truncation', value: 'Never use placeholder comments like "// rest of code here". Provide complete, copy-pasteable files.' },
          { label: 'Zero Slop / Pill Discipline', value: 'Avoid generic purple gradients and floating pill badges. Enforce crisp semantic Tailwind UI.' },
          { label: 'Strict Type Safety', value: 'No TypeScript "any" types. All API payloads and database models must have explicit types.' },
          { label: 'Defensive Error Handling', value: 'Never silently fail. Every async operation must feature explicit try/catch, toast feedback, and fallback UI.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'app-architecture-sparks',
        title: '⚡ High-Impact App Architecture Sparks',
        description: 'Click any architecture pattern to insert into your objective:',
        fieldTarget: 'objective',
        mode: 'append',
        suggestions: [
          { label: 'Audit Trail & Event Log', value: 'Include immutable event logging table with timestamp, actor_id, IP address, and payload diff.' },
          { label: 'Optimistic UI Updates', value: 'Implement optimistic client updates with instant rollback on API error.' },
          { label: 'CSV / Excel Data Exporter', value: 'Add streaming CSV export with customized column headers and batch row processing.' },
          { label: 'Granular Feature Flags', value: 'Integrate feature flag gate checks per organization tier (Free, Pro, Enterprise).' },
          { label: 'Stripe Webhook Signature Verification', value: 'Handle raw body parsing for Stripe webhook signature verification and idempotency keys.' }
        ]
      },
      {
        id: 'target-ai-rules',
        title: '🎯 Target Assistant Execution Rules',
        description: 'Optimized instructions tailored for specific coding assistants:',
        fieldTarget: 'negative_constraints',
        mode: 'append',
        suggestions: [
          { label: 'Cursor Rules Header', value: 'You are working as an autonomous coding agent. Inspect directory structure, write to exact relative file paths, and run syntax verification.' },
          { label: 'Claude Tagged Output', value: 'Structure output using XML tags: <schema>, <backend>, <frontend>, and <verification_steps>.' },
          { label: 'Bolt / Lovable One-Shot', value: 'Generate fully operational sample seed data so the application is instantly interactive with no blank screens on initial load.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'cot', label: '🧠 Chain-of-Thought', text: 'Analyze technical tradeoffs and write step-by-step reasoning before providing the final code.', description: 'Forces the AI to reason through architectural decisions first.' },
      { id: 'strict-schema', label: '📐 Strict TypeScript Schemas', text: 'Define full Zod and TypeScript schemas for all entities before writing implementation logic.', description: 'Ensures data models are rock-solid with zero runtime ambiguities.' },
      { id: 'edge-case-audit', label: '🛡️ Edge-Case & Failure Audit', text: 'Explicitly identify 3 edge cases (network failure, race condition, invalid payload) and implement defenses.', description: 'Produces bulletproof production code that handles real-world failures.' },
      { id: 'few-shot', label: '🧪 Few-Shot Examples', text: 'Provide 2 concrete input/output examples demonstrating exact desired behavior.', description: 'Guides the model with tangible before/after expectations.' }
    ]
  },
  {
    id: 'image',
    name: 'Image Generation',
    icon: '🖼️',
    tagline: 'Photorealistic, cinematic, 3D render, fashion, concept art, and product shots',
    description: 'Precision visual prompt engineering for Midjourney v6.1, Flux.1, DALL·E 3, Stable Diffusion XL, and Google Imagen.',
    presets: [
      {
        id: 'cinematic-portrait',
        title: 'Cinematic 35mm Character Portrait',
        tagline: 'High-contrast documentary editorial photo with natural window lighting',
        targetAi: 'Midjourney v6.1',
        fieldValues: {
          subject: 'Weathered veteran watchmaker inspecting intricate tourbillon gears with a jeweler loupe',
          medium: 'Cinematic 35mm film photography',
          lighting: 'Dramatic chiaroscuro window light, subtle dust motes in sunbeams, deep warm shadow tones',
          camera_lens: '85mm f/1.4 prime lens, razor-sharp focus on subject eyes, creamy bokeh background',
          aesthetic_style: 'Editorial documentary photography, Leica M11 aesthetic, Kodak Portra 400 color science',
          aspect_ratio: '16:9',
          target_ai: 'Midjourney v6.1',
          negative_constraints: 'No oversaturated neon, no airbrushed plastic skin, no extra fingers, no distorted hands, no watermark, no digital CGI artifacts'
        },
        powerModifiers: ['camera-specs', 'color-grading']
      },
      {
        id: 'luxury-product',
        title: 'Minimalist Luxury Product Commercial',
        tagline: 'Studio product photography on raw travertine stone with soft diffused shadows',
        targetAi: 'Flux.1 / Midjourney',
        fieldValues: {
          subject: 'Matte obsidian glass fragrance bottle with brass cap resting on a chiselled natural travertine slab',
          medium: 'High-end studio commercial product photography',
          lighting: 'Soft diffused side lighting from a large octabox, delicate rim reflections on glass bevels',
          camera_lens: '100mm macro lens, f/8 aperture, deep depth of field capturing micro-textures',
          aesthetic_style: 'Scandinavian architectural minimalism, Kinfolk magazine aesthetic, warm neutral palette',
          aspect_ratio: '4:5',
          target_ai: 'Flux.1 (Dev / Schnell)',
          negative_constraints: 'No cheap reflections, no cluttered props, no blurry focus, no plastic textures, no distorted text labels'
        },
        powerModifiers: ['lighting-nuance', 'color-grading']
      },
      {
        id: 'isometric-3d',
        title: 'Stylized 3D Isometric Cyber Tech Room',
        tagline: 'Octane render isometric miniature diorama with glowing volumetric lighting',
        targetAi: 'Midjourney v6.1',
        fieldValues: {
          subject: 'Miniature isometric cutaway diorama of a futuristic cyberpunk server laboratory with micro-workstations and holographic monitors',
          medium: '3D isometric digital render (Octane Render / Cinema 4D)',
          lighting: 'Volumetric cyan and amber rim lighting, soft ambient occlusion, glowing OLED screens',
          camera_lens: 'Orthographic isometric camera angle, tilt-shift miniature depth effect',
          aesthetic_style: 'Clean sci-fi hard-surface modeling, subtle metallic sheen, matte clay surfaces',
          aspect_ratio: '1:1',
          target_ai: 'Midjourney v6.1',
          negative_constraints: 'No messy perspective distortion, no low-poly jagged artifacts, no noisy bloom glare, no chaotic clutter'
        },
        powerModifiers: ['render-engine']
      }
    ],
    fields: [
      {
        id: 'subject',
        label: 'Main Subject & Scene Composition',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the main subject, setting, actions, and key focal points in detail...',
        suggestionChips: [
          { label: 'Cyberpunk Street Vendor', value: 'Cyberpunk street ramen chef serving noodles under neon signs in rainy Tokyo alleyway' },
          { label: 'Nordic Architecture', value: 'Brutalist concrete villa nestled into Nordic pine forest with floor-to-ceiling glass windows at twilight' },
          { label: 'Solarpunk Bio-lab', value: 'Botanist tending to glowing bioluminescent orchids in a sunlit curved glass atrium greenhouse' },
          { label: 'Luxury Mechanical Watch', value: 'Skeleton dial automatic mechanical watch floating with exploded view of titanium gear train components' }
        ]
      },
      {
        id: 'medium',
        label: 'Medium & Art Technique',
        type: 'select',
        options: [
          { value: '35mm Film Photography', label: '35mm Film Photography (Authentic Grain)' },
          { value: 'Studio Commercial Product Photography', label: 'Studio Commercial Product Photography' },
          { value: '3D Octane / Unreal Engine 5 Render', label: '3D Octane / Unreal Engine 5 Render' },
          { value: 'Editorial Fashion Portrait', label: 'Editorial Fashion Portrait (Vogue / Harper\'s)' },
          { value: 'Matte Concept Art / Digital Painting', label: 'Matte Concept Art / Digital Painting' },
          { value: 'Vintage Risograph Print', label: 'Vintage Risograph Print' },
          { value: 'Watercolor & Ink Architectural Sketch', label: 'Watercolor & Ink Architectural Sketch' }
        ],
        suggestionChips: [
          { label: '35mm Film', value: '35mm Film Photography with fine organic grain and natural color tones' },
          { label: 'Studio Commercial', value: 'Commercial studio product photography on clean textured stone' },
          { label: 'Unreal Engine 5', value: 'Unreal Engine 5 architectural visualization with ray-traced global illumination' }
        ]
      },
      {
        id: 'lighting',
        label: 'Lighting & Atmospheric Mood',
        type: 'select',
        options: [
          { value: 'Golden hour warm sunlight with volumetric rays', label: 'Golden Hour / Sunbeams' },
          { value: 'Dramatic chiaroscuro with deep moody shadows', label: 'Chiaroscuro / High Contrast' },
          { value: 'Soft diffused natural overcast daylight', label: 'Soft Diffused Overcast Daylight' },
          { value: 'Studio rim lighting with soft dual-tone fill', label: 'Studio Dual Rim Lighting' },
          { value: 'Moody twilight / blue hour ambiance', label: 'Blue Hour / Twilight' },
          { value: 'Bioluminescent ambient glow in darkness', label: 'Bioluminescent Ambient Glow' }
        ],
        suggestionChips: [
          { label: 'Chiaroscuro', value: 'Dramatic chiaroscuro with deep moody shadows and selective illumination' },
          { label: 'Golden Hour', value: 'Warm low-angle golden hour light with gentle volumetric sun haze' },
          { label: 'Studio Softbox', value: 'Large diffused studio softbox lighting with subtle specular highlights' }
        ]
      },
      {
        id: 'camera_lens',
        label: 'Camera Angle, Lens & Framing',
        type: 'select',
        options: [
          { value: '85mm f/1.4 portrait lens, shallow depth of field, creamy bokeh', label: '85mm f/1.4 Portrait (Shallow DoF)' },
          { value: '24mm wide-angle lens, cinematic low angle, deep perspective', label: '24mm Wide-Angle (Cinematic Low Angle)' },
          { value: '50mm eye-level documentary lens, balanced natural perspective', label: '50mm Eye-Level (Documentary / Natural)' },
          { value: '100mm macro probe lens, extreme micro-detail close-up', label: '100mm Macro Close-Up (Micro Textures)' },
          { value: 'Aerial top-down drone photograph, geometric pattern', label: 'Aerial Top-Down Drone View' }
        ],
        suggestionChips: [
          { label: '85mm f/1.4 Bokeh', value: '85mm f/1.4 portrait lens, shallow depth of field, creamy bokeh' },
          { label: '24mm Wide Cinematic', value: '24mm wide-angle lens, cinematic low angle, deep perspective' },
          { label: '100mm Macro', value: '100mm macro probe lens, extreme micro-detail close-up' }
        ]
      },
      {
        id: 'aspect_ratio',
        label: 'Aspect Ratio',
        type: 'select',
        options: [
          { value: '16:9', label: '16:9 (Cinematic Landscape / Wallpaper / Hero)' },
          { value: '4:5', label: '4:5 (Instagram Portrait / Feed)' },
          { value: '9:16', label: '9:16 (Story / Reel / Mobile Wallpaper)' },
          { value: '1:1', label: '1:1 (Square / Avatar / Icon)' },
          { value: '21:9', label: '21:9 (Ultrawide Anamorphic Cinema)' },
          { value: '3:4', label: '3:4 (Editorial Print / Poster)' }
        ]
      },
      {
        id: 'target_ai',
        label: 'Target Image Generator',
        type: 'select',
        options: [
          { value: 'Midjourney v6.1', label: 'Midjourney v6.1 (Includes --ar, --v, --style raw)' },
          { value: 'Flux.1 (Dev / Schnell)', label: 'Flux.1 (Natural language + high prompt adherence)' },
          { value: 'DALL-E 3 (ChatGPT)', label: 'DALL-E 3 (Detailed prose description)' },
          { value: 'Stable Diffusion XL / SD3', label: 'Stable Diffusion XL (Positive + Negative Prompts)' },
          { value: 'Google Imagen / Gemini', label: 'Google Imagen / Gemini' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Prompt / Exclusions',
        type: 'textarea',
        placeholder: 'What to eliminate: blur, plastic skin, distorted anatomy, bad hands, watermarks...',
        suggestionChips: [
          { label: 'Anti-CGI Plastic', value: 'airbrushed skin, plastic wax texture, CGI oversaturation, 3d render look, cartoonish' },
          { label: 'Anti-Anatomy Glitches', value: 'bad anatomy, missing fingers, extra limbs, fused fingers, distorted face, cross-eyed' },
          { label: 'Clean Cleanliness', value: 'watermark, logo, text, subtitles, signature, cropped, low quality, jpeg artifacts' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'lighting-presets',
        title: '💡 Cinematic Lighting & Atmosphere Suggestion Box',
        description: 'Tap any lighting recipe to append to your lighting setting:',
        fieldTarget: 'lighting',
        mode: 'append',
        suggestions: [
          { label: 'Volumetric God Rays', value: 'piercing volumetric light rays filtering through haze' },
          { label: 'Rembrandt Triangle', value: 'Rembrandt studio lighting with signature cheek triangle highlight' },
          { label: 'Subtle Rim Light', value: 'subtle silver rim lighting delineating subject contours' },
          { label: 'Dappled Sunlight', value: 'dappled sunlight through tree canopies onto subject' }
        ]
      },
      {
        id: 'camera-flair',
        title: '📸 Camera & Lens Nuance Suggestion Box',
        description: 'Append professional optics terminology:',
        fieldTarget: 'camera_lens',
        mode: 'append',
        suggestions: [
          { label: 'Anamorphic Lens Flare', value: 'vintage anamorphic lens with subtle horizontal blue flare' },
          { label: 'Kodak Portra 400', value: 'Kodak Portra 400 color science, natural skin tones, warm grain' },
          { label: 'Hasselblad Medium Format', value: 'shot on Hasselblad H6D-100c medium format camera, hyper-detailed 100MP clarity' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'camera-specs', label: '📷 Exact Optical Specs', text: 'Specify exact camera sensor, aperture (f/1.4), focal length (85mm), and shutter speed.', description: 'Eliminates generic image AI defaults by enforcing real-world optical characteristics.' },
      { id: 'color-grading', label: '🎨 Film Stock Color Grading', text: 'Color graded like Kodak Portra 400 with muted highlights, deep organic blacks, and authentic film grain.', description: 'Provides rich analog warmth.' },
      { id: 'lighting-nuance', label: '💡 Volumetric Lighting Nuance', text: 'Include subtle light scattering, rayleigh atmosphere, and realistic specular highlights.', description: 'Creates true three-dimensional depth.' },
      { id: 'render-engine', label: '⚡ Octane Raytrace Flags', text: 'Rendered in Octane with path tracing, sub-surface scattering (SSS), and physically-based materials (PBR).', description: 'Maximum material realism for 3D/objects.' }
    ]
  },
  {
    id: 'video',
    name: 'Video Generation',
    icon: '🎬',
    tagline: 'Sora, Veo 2, Runway Gen-3, Kling, shot lists, and camera choreography',
    description: 'Direct motion, temporal transitions, camera pans, framerate, and cinematography for cutting-edge AI video models.',
    presets: [
      {
        id: 'cinematic-tracking',
        title: 'Continuous Tracking Shot for Sora / Veo 2',
        tagline: 'Single-take tracking camera through an atmospheric rain-slicked neon street',
        targetAi: 'OpenAI Sora / Google Veo 2',
        fieldValues: {
          scene_description: 'A futuristic courier in a water-repellent jacket walking briskly through a narrow alley in a rainy neo-Seoul night market.',
          camera_movement: 'Continuous low-angle tracking steadicam moving backwards ahead of the subject, smoothly panning to reveal steam rising from street food stalls',
          pacing_duration: '8 seconds, cinematic 24fps motion cadence, steady gradual pace with zero camera jitter',
          lighting_environment: 'Neon reflections shimmering on wet asphalt puddles, soft cyan and magenta backlighting, warm tungsten glow from vendor awnings',
          temporal_transition: 'Smooth temporal continuity throughout the 8-second clip with realistic physics of dripping rain and blowing steam',
          target_ai: 'OpenAI Sora / Google Veo 2',
          negative_constraints: 'No sudden morphing or object flickering. No distorted walking gait. No unnatural speed ramps or frame drops.'
        },
        powerModifiers: ['camera-choreography', 'physics-continuity']
      },
      {
        id: 'commercial-product-reveal',
        title: '360° Commercial Product Spin & Reveal',
        tagline: 'Sleek luxury product hero video with slow-motion dynamic lighting sweep',
        targetAi: 'Runway Gen-3 Alpha',
        fieldValues: {
          scene_description: 'An aerospace-grade titanium smartwatch rotating slowly on a suspended magnetic pedestal against a seamless dark gradient background.',
          camera_movement: 'Slow 180-degree orbit around the watch while gently pulling back from an extreme close-up of the sapphire bezel to a medium hero shot',
          pacing_duration: '5 seconds, hyper-smooth 60fps slow-motion feel, fluid rotation',
          lighting_environment: 'Moving streak of crisp white studio light sweeping diagonally across the brushed metal bevels, revealing micro-machined textures',
          temporal_transition: 'Consistent geometry, zero deformation of watch hands or dials during rotation',
          target_ai: 'Runway Gen-3 Alpha',
          negative_constraints: 'No warpage of cylindrical geometry. No jitter in the reflection lines. No random background shifts.'
        },
        powerModifiers: ['physics-continuity']
      }
    ],
    fields: [
      {
        id: 'scene_description',
        label: 'Scene & Subject Action',
        type: 'textarea',
        required: true,
        placeholder: 'What is happening in the scene? Detail characters, environment, actions, and key movements...',
        suggestionChips: [
          { label: 'Drone Mountain Fly-through', value: 'FPV drone soaring down a sunlit snow-capped alpine valley, skimming just above turquoise glacier river' },
          { label: 'Cyberpunk Alley Walk', value: 'Cyberpunk investigator walking into a smoky underground noodle stall as holographic advertisements flicker above' },
          { label: 'Coffee Pouring Slow-Mo', value: 'Close-up of hot espresso dripping into a glass cup with golden crema swirling in slow motion' }
        ]
      },
      {
        id: 'camera_movement',
        label: 'Camera Choreography & Movement',
        type: 'select',
        options: [
          { value: 'Smooth backward tracking steadicam following subject at eye level', label: 'Tracking Steadicam (Backward follow)' },
          { value: 'Slow 180° cinematic orbital pan around subject', label: 'Cinematic 180° Orbit' },
          { value: 'FPV dynamic dive skimming terrain with gentle horizon bank', label: 'FPV Dynamic Fly-through' },
          { value: 'Static locked-off tripod shot with subtle subject push-in', label: 'Locked Tripod with Slow Zoom-in' },
          { value: 'High-angle crane shot descending into a close-up', label: 'Crane / Jib Descending Shot' }
        ],
        suggestionChips: [
          { label: 'Steadicam Follow', value: 'Smooth backward tracking steadicam following subject at eye level' },
          { label: 'Orbital Pan', value: 'Slow 180° cinematic orbital pan around subject' },
          { label: 'FPV Fly-through', value: 'FPV dynamic dive skimming terrain with gentle horizon bank' }
        ]
      },
      {
        id: 'pacing_duration',
        label: 'Pacing & Framerate',
        type: 'select',
        options: [
          { value: '5 seconds, cinematic 24fps motion blur, realistic temporal cadence', label: '5s / 24fps (Cinematic film motion)' },
          { value: '10 seconds, 60fps ultra-fluid slow-motion presentation', label: '10s / 60fps (Fluid slow-motion)' },
          { value: 'Time-lapse with clouds racing across the sky over 5 seconds', label: 'Time-lapse (Dynamic passage of time)' }
        ]
      },
      {
        id: 'target_ai',
        label: 'Target Video Model',
        type: 'select',
        options: [
          { value: 'OpenAI Sora / Google Veo 2', label: 'OpenAI Sora / Google Veo 2' },
          { value: 'Runway Gen-3 Alpha', label: 'Runway Gen-3 Alpha' },
          { value: 'Kling AI / Hailuo Minimax', label: 'Kling AI / Hailuo Minimax' },
          { value: 'Luma Dream Machine / Pika', label: 'Luma Dream Machine / Pika' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'e.g. No morphing limbs, no sudden teleportation, no stuttering motion...',
        suggestionChips: [
          { label: 'Anti-Morphing', value: 'No morphing objects, no hallucinated limbs, no flickering backgrounds, no sudden shape shifting' },
          { label: 'Smooth Motion', value: 'No jerky camera movements, no frame tearing, no stuttering or low framerate judder' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'camera-directions',
        title: '🎬 Hollywood Camera Move Suggestion Box',
        fieldTarget: 'camera_movement',
        mode: 'append',
        suggestions: [
          { label: 'Whip Pan Transition', value: 'rapid whip pan transition revealing new perspective' },
          { label: 'Dolly Zoom (Vertigo Effect)', value: 'subtle Hitchcock dolly zoom creating disorientation' },
          { label: 'Low Angle Hero Dutch Tilt', value: 'slight Dutch tilt angle emphasizing power and scale' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'camera-choreography', label: '🎥 Director Shot List Syntax', text: 'Format as an explicit director shot list: [Lens: 35mm] [Movement: Dolly In] [Lighting: Rim Light] [Speed: 24fps].', description: 'Enforces precise cinematic terminology.' },
      { id: 'physics-continuity', label: '🌊 Realistic Physics Continuity', text: 'Enforce real-world mass, momentum, fluid dynamics, and cloth physics across all video frames.', description: 'Stops AI video from looking weightless or rubbery.' }
    ]
  },
  {
    id: 'content',
    name: 'Content Writing',
    icon: '✍️',
    tagline: 'Deep research articles, SEO pillar posts, newsletters, and thought leadership',
    description: 'Craft comprehensive, deeply engaging long-form written content with authoritative voice and structured formatting.',
    presets: [
      {
        id: 'thought-leadership',
        title: 'B2B Founder Thought Leadership Essay',
        tagline: 'Contrarian, evidence-backed narrative on industry shifts for Substack / Medium',
        targetAi: 'Claude 3.7 Sonnet',
        fieldValues: {
          topic: 'Why the era of bloated SaaS seats is dead and outcome-based pricing is the only survival strategy in 2026',
          content_type: 'Thought leadership essay / deep-dive article',
          target_audience: 'Tech founders, venture capitalists, and enterprise VP-level executives',
          tone: 'Authoritative, analytical, crisp, contrarian, yet deeply respectful of data and fundamentals',
          word_count: '1,800 to 2,200 words with clear section subheadings and pull quotes',
          target_ai: 'Claude 3.7 Sonnet',
          structure: '1. The Uncomfortable Truth (Hook), 2. Anatomy of the Shift, 3. The Unit Economics breakdown, 4. Three Playbooks for the Transition, 5. The 2027 Horizon',
          negative_constraints: 'Zero generic clichés (e.g. "In today\'s fast-paced digital world", "Game changer", "Synergy", "Tapestry"). No fluff paragraphs. Every major claim must include concrete operational reasoning.'
        },
        powerModifiers: ['anti-cliche', 'contrarian-angle']
      },
      {
        id: 'seo-pillar',
        title: 'Complete 3,000-Word Comprehensive Guide',
        tagline: 'Definitive guide with actionable tables, FAQ schema, and step-by-step instructions',
        targetAi: 'ChatGPT-4o',
        fieldValues: {
          topic: 'The Ultimate Guide to Modern Database Sharding & Partitioning Strategies for Distributed Systems',
          content_type: 'Technical pillar guide / comprehensive handbook',
          target_audience: 'Staff backend engineers, database administrators, and software architects',
          tone: 'Pragmatic, technical, rigorous, and instruction-driven with code snippets and architecture diagrams in ascii/markdown',
          word_count: '2,500 to 3,000 words',
          target_ai: 'ChatGPT-4o / o3-mini',
          structure: 'Executive Summary -> Core Concepts -> Comparative Matrix -> Step-by-Step Implementation -> Failure Scenarios & Recovery -> FAQ',
          negative_constraints: 'No hand-waving explanations. Provide explicit configuration examples and performance benchmarks. Avoid superficial summaries.'
        },
        powerModifiers: ['data-backed', 'anti-cliche']
      }
    ],
    fields: [
      {
        id: 'topic',
        label: 'Topic & Core Angle',
        type: 'textarea',
        required: true,
        placeholder: 'What is the subject, key thesis, or narrative angle of this piece?',
        suggestionChips: [
          { label: 'AI Agent Economics', value: 'The unit economics of autonomous AI agents vs human operational teams in 2026' },
          { label: 'Distributed Systems', value: 'Zero-downtime database migrations: A practical playbook for engineering teams' },
          { label: 'E-commerce Retention', value: 'Why discounting is destroying modern DTC brands and how cohort retention fixes it' }
        ]
      },
      {
        id: 'content_type',
        label: 'Content Format',
        type: 'select',
        options: [
          { value: 'Thought leadership essay / deep-dive article', label: 'Thought Leadership Essay' },
          { value: 'Comprehensive 2,500+ word SEO pillar guide', label: 'Comprehensive SEO Pillar Guide' },
          { value: 'Engaging email newsletter issue', label: 'Email Newsletter Issue' },
          { value: 'Technical whitepaper / case study', label: 'Technical Case Study / Whitepaper' },
          { value: 'Product comparison & buyer guide', label: 'Product Comparison & Buyer Guide' }
        ]
      },
      {
        id: 'tone',
        label: 'Tone of Voice',
        type: 'select',
        options: [
          { value: 'Authoritative, analytical, crisp, and data-backed', label: 'Authoritative & Analytical (Executive)' },
          { value: 'Conversational, warm, candid, and story-driven', label: 'Conversational & Candid (Substack / Creator)' },
          { value: 'Deeply technical, pragmatic, and code-literate', label: 'Technical & Rigorous (Engineering)' },
          { value: 'Punchy, provocative, and contrarian', label: 'Punchy & Contrarian (Viral / Editorial)' }
        ],
        suggestionChips: [
          { label: 'Executive Tone', value: 'Authoritative, analytical, crisp, and data-backed' },
          { label: 'Engineering Tone', value: 'Deeply technical, pragmatic, and code-literate' },
          { label: 'Punchy Tone', value: 'Punchy, provocative, and contrarian' }
        ]
      },
      {
        id: 'target_audience',
        label: 'Target Audience',
        type: 'text',
        placeholder: 'e.g. Senior Software Engineers, Seed-Stage Founders, B2B Marketers...',
        suggestionChips: [
          { label: 'C-Suite & Founders', value: 'Founders, CEOs, and Executive Decision Makers' },
          { label: 'Senior Engineers', value: 'Staff Engineers, System Architects, and Technical Leads' },
          { label: 'Growth Marketers', value: 'Performance Marketers, CMOs, and Growth Leads' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'What to Avoid & Anti-Clichés',
        type: 'textarea',
        placeholder: 'Banned buzzwords, passive voice, fluff filler...',
        suggestionChips: [
          { label: 'No Generic AI Slop', value: 'Ban all AI clichés: "In today\'s digital landscape", "testament to", "delve into", "tapestry", "game-changer", "revolutionize".' },
          { label: 'Active Voice Only', value: 'Use active voice exclusively. No passive hedging. Cut unnecessary adverbs.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'hook-styles',
        title: '🪝 Killer Opening Hook Suggestion Box',
        fieldTarget: 'topic',
        mode: 'append',
        suggestions: [
          { label: 'Contrarian Statistic Hook', value: 'Open with a surprising data point that defies common industry consensus.' },
          { label: 'War Story / Micro-Narrative', value: 'Start with an intense 2-sentence battlefield story from a high-stakes outage or turnaround.' },
          { label: 'The Cost of Inaction Hook', value: 'Begin by calculating the hidden annual financial drain caused by continuing the status quo.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'anti-cliche', label: '🚫 Anti-AI Slop Guardrail', text: 'Strictly prohibit generic AI filler phrases: "in today\'s world", "unlock the power", "delve", "tapestry", "revolutionize".', description: 'Removes dead giveaways of robotic writing.' },
      { id: 'contrarian-angle', label: '⚡ Contrarian Perspective', text: 'Challenge at least one widely accepted industry misconception with counter-intuitive proof.', description: 'Makes content memorable and shareable.' },
      { id: 'data-backed', label: '📊 Quantitative Substantiation', text: 'Support each major strategic assertion with concrete metrics, ratios, or structural diagrams.', description: 'Builds instant institutional credibility.' }
    ]
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: '📱',
    tagline: 'Viral LinkedIn carousels, Twitter/X threads, TikTok/Reels hooks, and Instagram scripts',
    description: 'Design scroll-stopping hooks, high-retention slides, and high-engagement social copy engineered for algorithm distribution.',
    presets: [
      {
        id: 'linkedin-carousel',
        title: '10-Slide Viral LinkedIn Carousel Breakdown',
        tagline: 'High-density slide deck breaking down a complex framework with clear visual cues',
        targetAi: 'ChatGPT-4o / Claude',
        fieldValues: {
          platform: 'LinkedIn Carousel / Document PDF',
          objective: 'Teach an actionable 5-step framework for negotiating 6-figure enterprise software contracts with zero discounts',
          hook_style: 'Curiosity + High-value outcome: "Most sales teams lose 40% margin on discounts. Here is the exact negotiation matrix we used to close $2.4M at 100% list price:"',
          slide_count: '10 slides total: Slide 1 (Hook), Slides 2-8 (The 5-step framework + diagrams), Slide 9 (Summary cheat sheet), Slide 10 (Follow & save CTA)',
          target_ai: 'ChatGPT-4o / Claude',
          negative_constraints: 'No walls of text. Maximum 25-35 words per slide. Use bold keywords and visual layout direction for graphic designers.'
        },
        powerModifiers: ['hook-optimization', 'scannability-rules']
      },
      {
        id: 'twitter-thread',
        title: 'High-Engagement 8-Tweet Megathread',
        tagline: 'Fast-paced storytelling thread with strong cliffhangers and value density',
        targetAi: 'Claude 3.7 Sonnet',
        fieldValues: {
          platform: 'Twitter / X Thread',
          objective: 'Deconstruct how a solo bootstrapped developer built a $50k MRR tool in 90 days without spending $1 on ads',
          hook_style: 'Stark contrast + Proof screenshot mention: "90 days ago, Alex had $0 MRR and 42 followers. Today, his micro-SaaS does $52,400/month. The exact 6-step playbook:"',
          slide_count: '8 tweets total, each with a mini-lesson and concise formatting',
          target_ai: 'Claude 3.7 Sonnet',
          negative_constraints: 'No hashtags (#buildinpublic). No generic platitudes like "consistency is key". Every tweet must provide a repeatable tactical action.'
        },
        powerModifiers: ['hook-optimization']
      }
    ],
    fields: [
      {
        id: 'platform',
        label: 'Social Platform & Format',
        type: 'select',
        options: [
          { value: 'LinkedIn Carousel / Document PDF', label: 'LinkedIn Carousel / PDF Deck' },
          { value: 'LinkedIn Text Post (Hook + Story + Takeaway)', label: 'LinkedIn Text Post' },
          { value: 'Twitter / X Thread (6-10 tweets)', label: 'Twitter / X Thread' },
          { value: 'TikTok / Instagram Reel Script (30-60s)', label: 'TikTok / Reel 30-60s Video Script' },
          { value: 'Instagram Carousel Post with visual notes', label: 'Instagram Multi-Slide Carousel' }
        ],
        suggestionChips: [
          { label: 'LinkedIn Carousel', value: 'LinkedIn Carousel / Document PDF' },
          { label: 'X / Twitter Thread', value: 'Twitter / X Thread (6-10 tweets)' },
          { label: 'Short Video Script', value: 'TikTok / Instagram Reel Script (30-60s)' }
        ]
      },
      {
        id: 'objective',
        label: 'Post Topic & Core Message',
        type: 'textarea',
        required: true,
        placeholder: 'What are you teaching or sharing? What is the core takeaway for the viewer?',
        suggestionChips: [
          { label: 'Solo Founder Playbook', value: 'How I scaled a solo SaaS product to $25k MRR using programmatic SEO' },
          { label: 'Design System Rules', value: '7 micro-design mistakes making your website look amateur (and how to fix them)' },
          { label: 'Engineering Architecture', value: 'How Netflix handles millions of concurrent streams without crashing: A visual breakdown' }
        ]
      },
      {
        id: 'hook_style',
        label: 'Hook & Opening Line Strategy',
        type: 'select',
        options: [
          { value: 'Pain point + Dramatic financial / time savings outcome', label: 'Pain Point + Outcome' },
          { value: 'Curiosity gap + Stark before vs after contrast', label: 'Before vs After Contrast' },
          { value: 'Unpopular truth / Contrarian breakdown of a myth', label: 'Contrarian Truth' },
          { value: 'Curated list of high-value swipe file resources', label: 'High-Value Swipe File / Curated Tools' }
        ],
        suggestionChips: [
          { label: 'Contrast Hook', value: 'Stark before vs after contrast hook with exact numbers' },
          { label: 'Contrarian Hook', value: 'Unpopular truth calling out a sacred cow in the industry' },
          { label: 'Swipe File', value: 'Curated toolkit hook: "I spent 120 hours testing X so you don\'t have to"' }
        ]
      },
      {
        id: 'target_ai',
        label: 'Target AI Tool',
        type: 'select',
        options: [
          { value: 'Claude 3.7 Sonnet', label: 'Claude 3.7 Sonnet' },
          { value: 'ChatGPT-4o', label: 'ChatGPT-4o' },
          { value: 'DeepSeek R1 / Reasoning', label: 'DeepSeek R1 / Reasoning' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'No hashtag spam, no fake engagement bait, no generic fluff...',
        suggestionChips: [
          { label: 'No Hashtags', value: 'Zero hashtags. No engagement bait questions like "Thoughts?" at the end.' },
          { label: 'High Scannability', value: 'Use short 1-2 sentence paragraphs, whitespace spacing, and bold focal words.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'viral-hooks',
        title: '🚀 Proven Viral Hook Starters Suggestion Box',
        fieldTarget: 'hook_style',
        mode: 'replace',
        suggestions: [
          { label: 'The 1% Secret', value: '"The top 1% of [Professionals] don\'t do [Common Task]. Instead, they use this 3-minute system:"' },
          { label: 'Costly Mistake', value: '"I reviewed 150+ [Item/Portfolios]. 90% made this exact costly mistake:"' },
          { label: 'Swipe File', value: '"Bookmark this: 7 free tools that save 15 hours of work every week (no one talks about #4):"' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'hook-optimization', label: '🪝 3-Second Hook Optimizer', text: 'Provide 3 alternative opening lines for A/B testing: Curiosity, Pain-Point, and Social-Proof.', description: 'Gives multiple high-performing hook options.' },
      { id: 'scannability-rules', label: '👁️ Strict Mobile Scannability', text: 'Format for frictionless mobile skimming: 1-2 line sentences, bulleted lists, and zero text blocks exceeding 3 lines.', description: 'Maximizes retention and read-through rate.' }
    ]
  },
  {
    id: 'ads',
    name: 'Ads & Marketing',
    icon: '📢',
    tagline: 'Meta Ads, Google Search Ads, YouTube scripts, and high-converting landing copy',
    description: 'Direct-response copywriting prompts engineered with psychological triggers, pain points, hooks, and irresistible offers.',
    presets: [
      {
        id: 'meta-ugc-ad',
        title: 'Meta UGC Video Ad Script (Pain -> Agitate -> Solution)',
        tagline: 'High-converting 30s TikTok/Meta UGC script with visual and audio cues',
        targetAi: 'ChatGPT-4o',
        fieldValues: {
          product_service: 'Ergonomic lumbar support cushion for remote workers with chronic lower back pain',
          target_audience: 'Remote developers, designers, and office workers sitting 8+ hours a day',
          ad_platform: 'Meta (Instagram / Facebook) & TikTok UGC Video',
          core_offer: 'Risk-free 60-day home trial + 25% off bundle with free express shipping',
          framework: 'Hook (0-3s) -> Problem Agitation (3-10s) -> The Pivot & Mechanism (10-20s) -> Proof & Guarantee (20-26s) -> Strong CTA (26-30s)',
          target_ai: 'ChatGPT-4o',
          negative_constraints: 'No robotic sales jargon. Must sound like a genuine recommendation from a real customer talking to a friend on camera. Include split-screen visual directions.'
        },
        powerModifiers: ['direct-response', 'offer-stack']
      },
      {
        id: 'google-search-ads',
        title: 'High-Intent Google Search Ads Matrix',
        tagline: 'Responsive Search Ads with 15 headlines and 4 descriptions matching search intent',
        targetAi: 'ChatGPT-4o / Claude',
        fieldValues: {
          product_service: 'Enterprise SOC 2 Compliance Automation Software',
          target_audience: 'CTOs, CISOs, and Heads of Security preparing for enterprise audits',
          ad_platform: 'Google Search Ads (RSA)',
          core_offer: 'Get audit-ready in 14 days with automated evidence collection + Free audit readiness score',
          framework: 'Intent Match: Group headlines by Problem-Aware, Solution-Aware, Brand Trust, and Direct Urgency',
          target_ai: 'ChatGPT-4o / Claude',
          negative_constraints: 'Every headline strictly within 30 characters. Descriptions strictly within 90 characters. No trademark violations. Highlight dynamic keyword insertion tags.'
        },
        powerModifiers: ['direct-response']
      }
    ],
    fields: [
      {
        id: 'product_service',
        label: 'Product, Service & Offer',
        type: 'textarea',
        required: true,
        placeholder: 'What are you selling, what is the price/offer, and what makes it unique?',
        suggestionChips: [
          { label: 'SaaS Free Trial', value: 'B2B accounting software that automates expense reconciliation with AI: 14-day free trial' },
          { label: 'DTC Physical Product', value: 'Noise-cancelling wireless sleep earbuds with 20-hour battery and ergonomic soft silicone' },
          { label: 'Agency Lead Gen', value: 'Performance marketing agency guaranteeing 50 qualified B2B demos in 90 days or you don\'t pay' }
        ]
      },
      {
        id: 'ad_platform',
        label: 'Ad Channel & Format',
        type: 'select',
        options: [
          { value: 'Meta (Instagram & Facebook) Feed + Story Copy', label: 'Meta (FB/IG) Feed + Story Ad' },
          { value: 'TikTok & Reels UGC Video Script (30-45s)', label: 'TikTok & Reels UGC Video Script' },
          { value: 'Google Responsive Search Ads (15 Headlines + 4 Descriptions)', label: 'Google Search Ads (RSA 15+4)' },
          { value: 'YouTube Pre-Roll 30s Video Ad', label: 'YouTube Pre-Roll 30s Video Ad' },
          { value: 'LinkedIn Sponsored Content (B2B Lead Gen)', label: 'LinkedIn Sponsored Content (B2B)' }
        ]
      },
      {
        id: 'target_audience',
        label: 'Target Audience & Deep Pain Point',
        type: 'textarea',
        placeholder: 'Who is the ideal customer and what frustration keeps them awake at 2 AM?',
        suggestionChips: [
          { label: 'Overwhelmed Founders', value: 'Early-stage founders drowning in manual bookkeeping and worried about tax penalties' },
          { label: 'Frustrated Marketers', value: 'Media buyers losing money on ad platforms due to rising CPMs and low conversion rates' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'No scammy hype, no false promises, no compliance flags...',
        suggestionChips: [
          { label: 'Ad Compliance Safe', value: 'Must comply strictly with Meta & Google advertising policies: No exaggerated earnings claims, no before/after body shaming.' },
          { label: 'No Generic Pitching', value: 'Avoid tired phrases like "Are you ready to take your business to the next level?". Lead with concrete customer symptoms.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'ad-hooks-sparks',
        title: '🎯 Direct-Response Hook Suggestion Box',
        fieldTarget: 'product_service',
        mode: 'append',
        suggestions: [
          { label: 'The Mechanism Hook', value: 'Explain the unique proprietary mechanism that solves the problem where previous attempts failed.' },
          { label: 'Comparison vs Alternative', value: 'Frame directly against the expensive/tedious traditional alternative (e.g. Hiring a $5k agency vs this).' },
          { label: 'Ironclad Guarantee', value: 'Include a 100% money-back guarantee with zero friction returns.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'direct-response', label: '⚡ Direct-Response Principles', text: 'Ground the copy in proven direct-response copywriting principles (Eugene Schwartz awareness levels, Robert Cialdini influence triggers).', description: 'Maximizes click-through and conversion rates.' },
      { id: 'offer-stack', label: '🎁 Irresistible Offer Stack', text: 'Build an Alex Hormozi-style Grand Slam Offer stack with bonuses, urgency driver, and risk reversal.', description: 'Increases perceived value.' }
    ]
  },
  {
    id: 'seo',
    name: 'SEO & Search Strategy',
    icon: '🔍',
    tagline: 'Topical authority clusters, programmatic SEO, schema markup, and content briefs',
    description: 'Dominate organic search with data-backed keyword blueprints, entity mapping, and Google helpful content compliance.',
    presets: [
      {
        id: 'topical-map',
        title: 'Full Topical Authority Cluster Blueprint',
        tagline: 'Pillar-and-cluster architecture map with search intent and internal linking plan',
        targetAi: 'Claude 3.7 Sonnet / ChatGPT-4o',
        fieldValues: {
          seed_keyword: 'Next.js Performance Optimization',
          target_domain: 'Technical engineering blog for a developer tools company',
          deliverable_type: 'Comprehensive Topical Authority Map with 1 Core Pillar + 12 Supporting Cluster Articles',
          search_intent: 'Mix of Informational, Commercial Investigation, and Transactional',
          target_ai: 'Claude 3.7 Sonnet / ChatGPT-4o',
          negative_constraints: 'No keyword cannibalization. Group keywords strictly by search intent. Include target slug, recommended word count, and internal linking directives for each page.'
        },
        powerModifiers: ['schema-markup', 'semantic-entities']
      }
    ],
    fields: [
      {
        id: 'seed_keyword',
        label: 'Seed Keyword or Core Industry Niche',
        type: 'text',
        required: true,
        placeholder: 'e.g. Cloud Cost Optimization, Specialty Coffee Roasting, B2B SaaS Churn...',
        suggestionChips: [
          { label: 'Cloud Optimization', value: 'AWS & Kubernetes cloud cost optimization' },
          { label: 'Remote Work Ergonomics', value: 'Ergonomic home office setup for developers' },
          { label: 'Private Wealth Management', value: 'Tax-efficient wealth preservation strategies' }
        ]
      },
      {
        id: 'deliverable_type',
        label: 'SEO Deliverable Type',
        type: 'select',
        options: [
          { value: 'Topical Authority Map with Pillar & Sub-cluster Articles', label: 'Topical Authority Map & Cluster Matrix' },
          { value: 'Comprehensive Content Brief with H2/H3 outline & Entity terms', label: 'Deep Content Brief (For Writers)' },
          { value: 'Technical SEO Audit & On-Page Checklist', label: 'Technical SEO Audit & Schema Blueprint' },
          { value: 'Programmatic SEO Database Schema & Template Spec', label: 'Programmatic SEO Page Architecture' }
        ]
      },
      {
        id: 'target_ai',
        label: 'Target AI Tool',
        type: 'select',
        options: [
          { value: 'Claude 3.7 Sonnet', label: 'Claude 3.7 Sonnet' },
          { value: 'ChatGPT-4o', label: 'ChatGPT-4o' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'No keyword stuffing, avoid repetitive headings...',
        suggestionChips: [
          { label: 'Zero Keyword Stuffing', value: 'Never recommend unnatural keyword repetition. Focus on semantic entities and answering search intent.' },
          { label: 'Google Helpful Content', value: 'Ensure content satisfies Google Helpful Content System: Unique insights, original analysis, and high authoritativeness.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'seo-boosters',
        title: '🔍 Technical SEO Booster Suggestion Box',
        fieldTarget: 'seed_keyword',
        mode: 'append',
        suggestions: [
          { label: 'JSON-LD Schema Markup', value: 'Provide full valid JSON-LD schema (Article, FAQPage, HowTo, Organization).' },
          { label: 'Search Intent Mapping', value: 'Classify each topic into Navigational, Informational, Commercial, or Transactional intent.' },
          { label: 'Snippet Optimization', value: 'Write explicit 45-word direct answer blocks designed for Google Featured Snippets.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'schema-markup', label: '🏷️ JSON-LD Schema Generator', text: 'Generate complete, copy-pasteable JSON-LD structured data schema (FAQPage / TechArticle / HowTo).', description: 'Enables rich search snippets on Google.' },
      { id: 'semantic-entities', label: '🧠 Semantic Entity Extraction', text: 'Extract and list 15 high-salience semantic entities and LSI terms from Wikidata / Google Knowledge Graph.', description: 'Boosts topical depth and ranking authority.' }
    ]
  },
  {
    id: 'email',
    name: 'Email & Messages',
    icon: '📧',
    tagline: 'High-reply cold outreach, follow-up sequences, newsletters, and WhatsApp messages',
    description: 'Write personalized cold emails that get opened and answered, without tripping spam filters or sounding canned.',
    presets: [
      {
        id: 'cold-b2b-outreach',
        title: '3-Touch Cold B2B Outreach Campaign',
        tagline: 'Concise 60-word cold email sequence with soft interest call-to-action',
        targetAi: 'Claude 3.7 Sonnet / ChatGPT',
        fieldValues: {
          recipient_persona: 'VP of Engineering at Series B-C software companies',
          value_proposition: 'Cut CI/CD pipeline build times by 65% with zero configuration changes',
          sequence_length: '3 emails: Touch 1 (Observation + Value + Soft CTA), Touch 2 (Proof case study), Touch 3 (Permission to close file)',
          target_ai: 'Claude 3.7 Sonnet / ChatGPT',
          negative_constraints: 'Strictly under 75 words per email. No pushy "hop on a quick 15-min call". Use soft interest CTAs like "Worth exploring?". No generic flattery like "Hope this email finds you well".'
        },
        powerModifiers: ['soft-cta', 'anti-spam']
      }
    ],
    fields: [
      {
        id: 'recipient_persona',
        label: 'Recipient Persona & Industry',
        type: 'text',
        required: true,
        placeholder: 'e.g. Chief Marketing Officer at DTC Apparel Brands ($10M-$50M rev)...',
        suggestionChips: [
          { label: 'VP Engineering', value: 'VP of Engineering at mid-sized SaaS companies (50-200 engineers)' },
          { label: 'E-commerce Founder', value: 'Founder / CEO of Shopify Plus lifestyle brand' },
          { label: 'HR Director', value: 'Head of People & Culture at remote-first tech company' }
        ]
      },
      {
        id: 'value_proposition',
        label: 'Core Value Proposition & Angle',
        type: 'textarea',
        required: true,
        placeholder: 'What problem do you solve and what measurable result have you delivered for similar clients?',
        suggestionChips: [
          { label: 'Speed / Efficiency', value: 'We reduced cloud infrastructure spend by 32% for Fintech companies in 30 days.' },
          { label: 'Revenue Growth', value: 'We added $140k in email revenue over 90 days for footwear brands.' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'Banned spam words, length limits...',
        suggestionChips: [
          { label: 'No Corporate Cliches', value: 'Never say "Hope you are doing well", "Quick question", or "Touching base". Lead directly with an observation.' },
          { label: 'Under 80 Words', value: 'Keep every email under 80 words so it fits on a single mobile screen without scrolling.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'cold-email-hooks',
        title: '📬 Cold Email Opener Suggestion Box',
        fieldTarget: 'value_proposition',
        mode: 'append',
        suggestions: [
          { label: 'Trigger Event Opener', value: 'Reference a recent company milestone, funding round, or job opening as the natural context.' },
          { label: 'Specific Observation', value: 'Point out a subtle bug, broken link, or slow page speed on their current public site.' },
          { label: 'Peer Benchmark', value: 'Share an anonymous metric from a competitor in their exact sector.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'soft-cta', label: '🤝 Low-Friction Soft CTA', text: 'End with low-commitment CTA (e.g., "Open to seeing a 2-min breakdown?", "Opposed to taking a look?").', description: 'Doubles reply rates compared to calendar links.' },
      { id: 'anti-spam', label: '🛡️ Spam Filter Audit', text: 'Audit text against 50+ common spam trigger words and ensure clean plain-text deliverability.', description: 'Protects domain reputation and inbox placement.' }
    ]
  },
  {
    id: 'design',
    name: 'Logo / Graphic Design',
    icon: '🎨',
    tagline: 'Brand identities, vector logo specs, color design systems, and visual guidelines',
    description: 'Generate comprehensive creative briefs, typography pairings, color systems, and vector logo specifications.',
    presets: [
      {
        id: 'minimalist-logo-brief',
        title: 'Comprehensive Brand Identity & Logo Specification',
        tagline: 'Complete identity system with logo mark, color tokens, and typography hierarchy',
        targetAi: 'Claude 3.7 Sonnet / ChatGPT',
        fieldValues: {
          brand_name: 'Vanguard Dynamics',
          industry: 'Industrial Robotics & Precision Automation',
          visual_style: 'Neo-brutalist precision, high-contrast, geometric symmetry, Swiss modernism',
          color_system: 'Matte Charcoal (#121316) primary canvas, International Klein Blue (#002FA7) high-intent accent, Cool White (#F8F9FA)',
          deliverables: '1. Primary Logomark (Vector Geometry), 2. Typography Pairing, 3. 60-30-10 Color Tokens, 4. Application Mockups, 5. Usage Rules',
          target_ai: 'Claude 3.7 Sonnet / ChatGPT',
          negative_constraints: 'No generic clipart gears, no robotic hand clichés, no gradient swooshes. Must be reproducible as a clean 1-color vector mark and embroidered on uniforms.'
        },
        powerModifiers: ['design-system-tokens']
      }
    ],
    fields: [
      {
        id: 'brand_name',
        label: 'Brand / Project Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Apex Industrial, Lumina Health, Verve Coffee...'
      },
      {
        id: 'industry',
        label: 'Industry & Mission',
        type: 'text',
        required: true,
        placeholder: 'e.g. High-performance electric hypercars, Sustainable organic skincare...'
      },
      {
        id: 'visual_style',
        label: 'Design Aesthetics & Mood',
        type: 'select',
        options: [
          { value: 'Minimalist luxury, serif elegance, generous negative space', label: 'Minimalist Luxury & Serif Elegance' },
          { value: 'Modern tech neo-grotesque, vibrant contrast, precision geometry', label: 'Modern Tech & Precision Geometry' },
          { value: 'Vintage organic heritage, hand-crafted letterforms, earthy tones', label: 'Vintage Organic Heritage' },
          { value: 'Playful, bold, high-energy pop with chunky rounded shapes', label: 'Playful & High-Energy Pop' }
        ],
        suggestionChips: [
          { label: 'Tech Precision', value: 'Modern tech neo-grotesque, vibrant contrast, precision geometry' },
          { label: 'Luxury Minimalist', value: 'Minimalist luxury, serif elegance, generous negative space' },
          { label: 'Heritage Craft', value: 'Vintage organic heritage, hand-crafted letterforms, earthy tones' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'No generic symbols, no stock graphics...',
        suggestionChips: [
          { label: 'No Generic Logos', value: 'Strictly avoid generic cliché symbols (swooshes, interlocking rings, leaf for eco, lightbulb for idea).' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'color-palette-sparks',
        title: '🎨 Color Harmony Suggestion Box',
        fieldTarget: 'visual_style',
        mode: 'append',
        suggestions: [
          { label: 'Obsidian & Gold', value: 'Deep obsidian black (#0B0D11) with rich brushed gold accents (#D4AF37) and warm cream' },
          { label: 'Nordic Slate & Mint', value: 'Cool slate gray (#1E293B) with crisp mint green (#10B981) and chalk white' },
          { label: 'Cyber Cobalt', value: 'Deep midnight navy (#0A1128) with electric cobalt (#2E5BFF) and crisp silver' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'design-system-tokens', label: '📐 Tailwind / CSS Tokens', text: 'Provide production CSS and Tailwind v4 theme variables for primary, secondary, surface, and text colors.', description: 'Instantly exportable to code.' }
    ]
  },
  {
    id: 'business-docs',
    name: 'Business Documents',
    icon: '📄',
    tagline: 'Investor pitch decks, Product Requirement Docs (PRDs), client proposals, and SOPs',
    description: 'Draft executive-grade business documentation, strategic roadmaps, investor decks, and Standard Operating Procedures.',
    presets: [
      {
        id: 'investor-pitch-deck',
        title: '12-Slide Y Combinator Style Seed Pitch Deck',
        tagline: 'Concise, data-dense pitch deck narrative optimized for institutional investors',
        targetAi: 'Claude 3.7 Sonnet',
        fieldValues: {
          doc_type: 'Investor Pitch Deck (12 Slides)',
          company_overview: 'SaaS platform automating regulatory compliance audits for clinical trials using verified agentic LLMs',
          target_reader: 'Tier 1 Seed & Series A venture capital partners',
          key_sections: '1. Problem, 2. Solution & Demo, 3. Market Size (TAM/SAM/SOM), 4. Proprietary Moat, 5. Traction & Growth Metrics, 6. Business Model, 7. Competitive Matrix, 8. Team, 9. The Ask',
          target_ai: 'Claude 3.7 Sonnet',
          negative_constraints: 'Zero hand-waving buzzwords. Every slide must feature a crisp headline stating the takeaway (not just "The Problem"), with quantifiable metrics and verifiable market data.'
        },
        powerModifiers: ['executive-summary', 'quantitative-metrics']
      },
      {
        id: 'tech-prd',
        title: 'Comprehensive Product Requirement Document (PRD)',
        tagline: 'Engineering-ready PRD with user stories, acceptance criteria, and edge cases',
        targetAi: 'ChatGPT-4o / Claude',
        fieldValues: {
          doc_type: 'Product Requirement Document (PRD)',
          company_overview: 'Real-time collaborative commenting and review system for interactive 3D model CAD viewer',
          target_reader: 'Lead Product Manager, Engineering Architect, and Senior UI/UX Designers',
          key_sections: 'Executive Overview -> User Personas -> User Journeys -> Functional Specifications -> Technical Architecture -> Acceptance Criteria (Gherkin syntax) -> Non-Functional Requirements (P99 latency)',
          target_ai: 'ChatGPT-4o / Claude',
          negative_constraints: 'No vague feature descriptions. Use explicit Gherkin syntax (Given, When, Then) for acceptance criteria.'
        },
        powerModifiers: ['executive-summary']
      }
    ],
    fields: [
      {
        id: 'doc_type',
        label: 'Document Type',
        type: 'select',
        options: [
          { value: 'Investor Pitch Deck (10-12 Slides)', label: 'Investor Pitch Deck' },
          { value: 'Product Requirement Document (PRD)', label: 'Product Requirement Document (PRD)' },
          { value: 'Executive Client Proposal & Scope of Work (SOW)', label: 'Executive Client Proposal / SOW' },
          { value: 'Standard Operating Procedure (SOP) with checklists', label: 'Standard Operating Procedure (SOP)' },
          { value: 'Quarterly Business Review (QBR) Deck', label: 'Quarterly Business Review (QBR)' }
        ]
      },
      {
        id: 'company_overview',
        label: 'Business Context & Core Subject',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the company, the product/service, and the specific initiative being documented...'
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'No vague corporate jargon, must include explicit owners and timelines...',
        suggestionChips: [
          { label: 'Measurable Targets', value: 'All goals must be SMART (Specific, Measurable, Achievable, Relevant, Time-bound).' },
          { label: 'No Generic Fillers', value: 'Avoid passive voice and corporate boilerplate. Keep every bullet point high-signal.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'doc-sections',
        title: '📑 Essential Section Suggestion Box',
        fieldTarget: 'company_overview',
        mode: 'append',
        suggestions: [
          { label: 'Risk Mitigation Matrix', value: 'Include a detailed Risk vs Impact matrix with concrete contingency plans.' },
          { label: 'P&L Unit Economics', value: 'Break down gross margin, customer acquisition cost (CAC), and LTV:CAC payback period.' },
          { label: 'RACI Accountability Chart', value: 'Add a RACI table (Responsible, Accountable, Consulted, Informed) for all milestones.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'executive-summary', label: '📋 BLUF (Bottom Line Up Front)', text: 'Lead with an executive BLUF summary stating the core recommendation, financial impact, and decision deadline.', description: 'Respects executive time.' },
      { id: 'quantitative-metrics', label: '📈 Quantitative Rigor', text: 'Ensure all milestones have explicit KPIs, numerical baselines, and review cadences.', description: 'Eliminates ambiguity.' }
    ]
  },
  {
    id: 'education',
    name: 'Education / Study',
    icon: '🎓',
    tagline: 'Socratic tutoring, interactive lesson plans, conceptual deep dives, and quiz generators',
    description: 'Transform complex academic topics into intuitive, layered explanations with mental models, analogies, and practice problems.',
    presets: [
      {
        id: 'feynman-tutor',
        title: 'Feynman Technique Conceptual Breakdown',
        tagline: 'Explain advanced STEM concepts from first principles using intuitive analogies',
        targetAi: 'Claude 3.7 Sonnet',
        fieldValues: {
          topic: 'Quantum Entanglement and Bell\'s Theorem for curious computer science students',
          level: 'Undergraduate / Advanced Learner',
          methodology: 'Feynman Technique: Start with intuition, build mental model, address common misconceptions, then formalize with math',
          target_ai: 'Claude 3.7 Sonnet',
          negative_constraints: 'No dry jargon without immediate intuitive explanation. Never skip the "why does this matter" transition. Provide 3 check-for-understanding questions at the end.'
        },
        powerModifiers: ['socratic-questions']
      }
    ],
    fields: [
      {
        id: 'topic',
        label: 'Subject & Target Concept',
        type: 'text',
        required: true,
        placeholder: 'e.g. Backpropagation in Neural Networks, Photosynthesis Calvin Cycle, Keynesian vs Austrian Economics...',
        suggestionChips: [
          { label: 'Neural Networks', value: 'How Backpropagation works mathematically with gradient descent' },
          { label: 'Cell Biology', value: 'Mitochondrial ATP synthesis and the electron transport chain' },
          { label: 'Game Theory', value: 'The Nash Equilibrium and the Prisoner\'s Dilemma in real-world economics' }
        ]
      },
      {
        id: 'level',
        label: 'Learner Level',
        type: 'select',
        options: [
          { value: 'High School / Beginner (Accessible analogies)', label: 'High School / Beginner' },
          { value: 'Undergraduate / Intermediate (Rigorous first principles)', label: 'Undergraduate / Intermediate' },
          { value: 'Graduate / Domain Researcher (Mathematical formalisms)', label: 'Graduate / Professional' },
          { value: 'Explain Like I\'m 12 (Intuitive storytelling)', label: 'Explain Like I\'m 12 (ELI12)' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'No rote memorization, no ungrounded equations...',
        suggestionChips: [
          { label: 'Analogies First', value: 'Always ground equations in a physical or intuitive visual analogy before introducing mathematical symbols.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'pedagogy-tools',
        title: '🎓 Pedagogical Tool Suggestion Box',
        fieldTarget: 'topic',
        mode: 'append',
        suggestions: [
          { label: 'Check for Understanding Quiz', value: 'Generate a 5-question multiple choice quiz with detailed answer explanations for why wrong choices fail.' },
          { label: 'Interactive Socratic Dialogue', value: 'Adopt a Socratic role: Ask me one question at a time and guide me to discover the proof myself.' },
          { label: 'Common Pitfalls & Paradoxes', value: 'Highlight the 3 most common misconceptions that trap learners and explain why intuition fails.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'socratic-questions', label: '❓ Socratic Checkpoints', text: 'Include 3 interactive check-for-understanding questions to test conceptual mastery.', description: 'Ensures active learning.' }
    ]
  },
  {
    id: 'coding',
    name: 'Coding & Debugging',
    icon: '🐞',
    tagline: 'Refactoring, bug diagnosis, unit tests, SQL optimization, and architecture audits',
    description: 'Diagnose thorny errors, optimize database queries, perform security audits, and generate production test suites.',
    presets: [
      {
        id: 'bug-diagnosis',
        title: 'Deep Root-Cause Bug Diagnosis & Fix',
        tagline: 'Systematic analysis of stack traces, reproduction steps, and defensive patch',
        targetAi: 'Claude 3.7 Sonnet / Cursor',
        fieldValues: {
          problem_description: 'Intermittent memory leak and unhandled promise rejection in Node.js WebSocket cluster during high-load reconnections',
          language_framework: 'Node.js 22 + TypeScript + ws library + Redis',
          deliverable: '1. Root cause hypothesis, 2. Minimal reproduction script, 3. Production patch with error boundaries, 4. Regression test',
          target_ai: 'Claude 3.7 Sonnet / Cursor',
          negative_constraints: 'Do not just apply a band-aid wrapper. Identify why event listeners are retaining garbage collection references. Deliver complete corrected code.'
        },
        powerModifiers: ['root-cause-analysis', 'unit-tests']
      },
      {
        id: 'sql-query-tune',
        title: 'PostgreSQL Query Optimization & Indexing Plan',
        tagline: 'EXPLAIN ANALYZE breakdown, indexing strategy, and rewritten query',
        targetAi: 'ChatGPT-4o / Claude',
        fieldValues: {
          problem_description: 'Slow reporting query joining orders, users, and audit_events taking 4.2 seconds across 12M rows',
          language_framework: 'PostgreSQL 16 + Drizzle ORM',
          deliverable: 'Query optimization plan with EXPLAIN ANALYZE analysis, compound B-tree/BRIN index creation, and rewritten CTE query',
          target_ai: 'ChatGPT-4o / Claude',
          negative_constraints: 'Avoid full table sequential scans. Ensure all date range filters can leverage index bounds.'
        },
        powerModifiers: ['root-cause-analysis']
      }
    ],
    fields: [
      {
        id: 'problem_description',
        label: 'Bug, Challenge, or Optimization Goal',
        type: 'textarea',
        required: true,
        placeholder: 'Paste the error message, unexpected behavior, slow query, or code snippet to refactor...',
        suggestionChips: [
          { label: 'Race Condition in React', value: 'Fix race condition in useEffect data fetching causing stale state when user rapidly clicks tabs' },
          { label: 'Slow Database Query', value: 'Optimize slow PostgreSQL query joining 3 tables with 5M rows that currently does a sequential scan' },
          { label: 'Docker Multi-Stage Build', value: 'Write an optimized multi-stage Dockerfile for Next.js with minimal image size and cached npm layers' }
        ]
      },
      {
        id: 'language_framework',
        label: 'Language & Ecosystem',
        type: 'text',
        required: true,
        placeholder: 'e.g. TypeScript / React 19, Python / PyTorch, Rust / Tokio, Go / Fiber...',
        suggestionChips: [
          { label: 'TypeScript / React', value: 'TypeScript + React 19 + Tailwind CSS' },
          { label: 'Python / FastAPI', value: 'Python 3.12 + FastAPI + SQLAlchemy' },
          { label: 'Go / Golang', value: 'Go 1.23 + Gin + PostgreSQL' }
        ]
      },
      {
        id: 'target_ai',
        label: 'Target Assistant',
        type: 'select',
        options: [
          { value: 'Claude 3.7 Sonnet / Cursor', label: 'Claude 3.7 Sonnet / Cursor' },
          { value: 'ChatGPT-4o / o3-mini', label: 'ChatGPT-4o / o3-mini' },
          { value: 'Claude Code (Terminal)', label: 'Claude Code (Terminal Agent)' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'No partial code snippets, must follow existing naming conventions...',
        suggestionChips: [
          { label: 'No Placeholders', value: 'Never use placeholder comments like "// rest of logic here". Provide the entire updated function.' },
          { label: 'Preserve Signatures', value: 'Do not break existing public API function signatures or database schemas.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'code-quality-sparks',
        title: '🐞 Code Quality Suggestion Box',
        fieldTarget: 'problem_description',
        mode: 'append',
        suggestions: [
          { label: 'Benchmarking Suite', value: 'Include benchmark test script comparing performance before and after optimization.' },
          { label: 'Defensive Typing', value: 'Add exhaustive TypeScript switch/case checks using never type.' },
          { label: 'Graceful Degradation', value: 'Implement circuit breaker pattern for external service calls.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'root-cause-analysis', label: '🔬 Root Cause Analysis', text: 'Perform a systematic root-cause investigation: explain WHY the bug occurs at the runtime/memory level before writing the fix.', description: 'Prevents shallow recurring bugs.' },
      { id: 'unit-tests', label: '🧪 Comprehensive Unit Tests', text: 'Provide a suite of Vitest/Jest unit tests covering happy path, empty state, and 2 edge cases.', description: 'Guarantees stability.' }
    ]
  },
  {
    id: 'career',
    name: 'Resume / Career',
    icon: '💼',
    tagline: 'High-impact resume bullets, ATS optimization, LinkedIn profiles, and interview prep',
    description: 'Transform mundane job duties into compelling, quantifiable career accomplishments using Google XYZ formula.',
    presets: [
      {
        id: 'xyz-resume-rewrite',
        title: 'Google XYZ Resume Accomplishment Overhaul',
        tagline: 'Rewrite resume bullets using "Accomplished [X] as measured by [Y] by doing [Z]"',
        targetAi: 'Claude 3.7 Sonnet / ChatGPT',
        fieldValues: {
          current_experience: 'Senior Frontend Engineer managing web apps, improved performance, built components, and helped junior devs',
          target_role: 'Staff Software Engineer at high-growth Series B Fintech or Big Tech company',
          formula: 'Google XYZ: Accomplished [X] as measured by [Y] by doing [Z]',
          target_ai: 'Claude 3.7 Sonnet / ChatGPT',
          negative_constraints: 'No passive responsibility statements (e.g. "Responsible for maintaining code"). Every bullet must begin with a strong power verb, cite a concrete metric (%, $, hours), and clearly state the technical mechanism.'
        },
        powerModifiers: ['xyz-formula', 'ats-keywords']
      }
    ],
    fields: [
      {
        id: 'current_experience',
        label: 'Current Experience / Bullet Points to Improve',
        type: 'textarea',
        required: true,
        placeholder: 'Paste your current resume bullets or job duties here...'
      },
      {
        id: 'target_role',
        label: 'Target Job Title & Seniority Level',
        type: 'text',
        required: true,
        placeholder: 'e.g. Principal Product Manager, Senior DevOps Engineer, VP of Growth...',
        suggestionChips: [
          { label: 'Staff Engineer', value: 'Staff Software Engineer (Distributed Systems)' },
          { label: 'Senior Product Manager', value: 'Senior Product Manager (B2B SaaS / Growth)' },
          { label: 'Engineering Manager', value: 'Engineering Manager (Team of 10-15 engineers)' }
        ]
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints',
        type: 'textarea',
        placeholder: 'No clichés like "hard worker", "team player"...',
        suggestionChips: [
          { label: 'Ban Buzzwords', value: 'Strictly ban generic buzzwords: "team player", "hard working", "detail-oriented", "synergized". Focus entirely on business impact.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'career-metrics-sparks',
        title: '💼 Impact Metric Suggestion Box',
        fieldTarget: 'current_experience',
        mode: 'append',
        suggestions: [
          { label: 'Revenue / Cost Impact', value: 'Quantify exact dollar impact: generated $X in revenue or cut $Y in cloud expenses.' },
          { label: 'Latency / Efficiency %', value: 'Quantify speed improvements: reduced P99 latency by X% or slashed deployment time from hours to minutes.' },
          { label: 'Mentorship / Team Scale', value: 'Quantify leadership: mentored X engineers to promotion and grew team from Y to Z.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'xyz-formula', label: '📐 Google XYZ Formula', text: 'Format all experience bullets strictly as: "Accomplished [X], as measured by [Y], by doing [Z]".', description: 'Industry standard for top tech resumes.' },
      { id: 'ats-keywords', label: '🤖 ATS Keyword Alignment', text: 'Extract and integrate essential ATS domain keywords matching the target job specification.', description: 'Passes automated HR screening systems.' }
    ]
  },
  {
    id: 'agents',
    name: 'Autonomous Agents',
    icon: '🤖',
    tagline: 'Cursor .cursorrules, Claude Code CLAUDE.md, and LangChain/LangGraph system prompts',
    description: 'Build authoritative system prompts and workspace rules for autonomous agents that execute accurately without drifting.',
    presets: [
      {
        id: 'cursor-rules',
        title: 'Production .cursorrules / CLAUDE.md Specification',
        tagline: 'Comprehensive agent instructions enforcing code style, testing, and tool use',
        targetAi: 'Cursor / Claude Code',
        fieldValues: {
          project_type: 'Full-stack Next.js 15 + Supabase + Tailwind SaaS application',
          agent_role: 'Senior Staff Software Engineer acting as an autonomous workspace coding agent',
          invariants: '1. Never delete working logic, 2. Run typechecks before finishing, 3. Prefer server components, 4. Always write Zod schemas',
          target_ai: 'Cursor / Claude Code',
          negative_constraints: 'Never output placeholder comments. Never install unvetted packages. Never edit package.json with scripts that break existing dev workflows.'
        },
        powerModifiers: ['strict-invariants', 'agent-safety']
      }
    ],
    fields: [
      {
        id: 'project_type',
        label: 'Project Type & Tech Stack',
        type: 'text',
        required: true,
        placeholder: 'e.g. React 19 + TypeScript + Vite + Tailwind CSS microservice...',
        suggestionChips: [
          { label: 'Next.js + Supabase', value: 'Next.js 15 App Router + Supabase + Tailwind CSS' },
          { label: 'Python + FastAPI', value: 'Python 3.12 + FastAPI + Docker + PostgreSQL' },
          { label: 'React SPA', value: 'React 19 + Vite + TypeScript + Tailwind CSS' }
        ]
      },
      {
        id: 'agent_role',
        label: 'Agent Persona & Autonomy Boundaries',
        type: 'textarea',
        required: true,
        placeholder: 'What is the agent\'s role and what permissions / decisions should it handle autonomously?'
      },
      {
        id: 'invariants',
        label: 'Strict Invariants & Coding Standards',
        type: 'textarea',
        placeholder: 'Non-negotiable architectural rules, formatting standards, directory structures...'
      },
      {
        id: 'negative_constraints',
        label: 'Negative Constraints & Guardrails',
        type: 'textarea',
        placeholder: 'What must the agent NEVER do (e.g. never touch .env, never truncate files)...',
        suggestionChips: [
          { label: 'Zero File Truncation', value: 'Never use placeholders like "// ...rest of file". Always output complete pristine code files.' },
          { label: 'Environment Security', value: 'Never commit, log, or expose API keys, credentials, or secrets in code.' }
        ]
      }
    ],
    suggestionBoxes: [
      {
        id: 'agent-rule-sparks',
        title: '🤖 Agent Directive Suggestion Box',
        fieldTarget: 'invariants',
        mode: 'append',
        suggestions: [
          { label: 'Test-Driven Execution', value: 'Always run unit tests or typechecks before declaring a feature complete.' },
          { label: 'Explicit File Path Headings', value: 'Prepend every code block with its exact relative destination path: # /src/components/MyComponent.tsx.' },
          { label: 'Defensive Fallback', value: 'Ensure every UI interaction features loading skeletons and error boundaries.' }
        ]
      }
    ],
    powerModifiers: [
      { id: 'strict-invariants', label: '🔒 Absolute Invariant Enforcer', text: 'Declare non-negotiable rules under an [INVARIANTS] header that override all other instructions.', description: 'Prevents agent hallucinations and drift.' },
      { id: 'agent-safety', label: '🛡️ Safety & Sandbox Boundaries', text: 'Specify exact boundary limits: restricted directories, allowed commands, and permission confirmation checkpoints.', description: 'Ensures safe agent execution.' }
    ]
  }
];
