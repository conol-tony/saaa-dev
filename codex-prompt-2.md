# Task: Complete the saaa.dev (飒) landing page project

## Context
We have a partial TanStack Start scaffold. The `src/` directory exists with `routes/`, `components/`, `router.tsx`, `routeTree.gen.ts`, `styles.css`. The `node_modules/` is installed. But there is NO `package.json`, no `vite.config.ts`, no `tsconfig.json`, no `wrangler.toml` at the project root.

## Step 1: Create missing root config files

Create these files:

### package.json
```json
{
  "name": "saaa-dev",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "deploy": "npm run build && wrangler deploy"
  },
  "dependencies": {
    "@tanstack/react-start": "^1.73.3",
    "@tanstack/react-router": "^1.73.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "wrangler": "^4.0.0",
    "vinxi": "^0.5.3"
  }
}
```

### app.config.ts (TanStack Start uses this, not vite.config.ts)
```ts
import { defineConfig } from '@tanstack/react-start/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    preset: 'cloudflare-pages',
  },
})
```

### tsconfig.json
```json
{
  "include": ["**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "target": "ES2022",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

### wrangler.toml
```toml
name = "saaa-dev"
compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".output/public"
```

### .gitignore
```
node_modules
.output
.vinxi
dist
```

## Step 2: Detect actual project structure

Run `ls src/` and `cat src/router.tsx` to understand the current structure. Then check `cat src/routes/__root.tsx`.

## Step 3: Rewrite the landing page

Replace `src/routes/index.tsx` with the full saaa.dev (飒 — Software as an API) landing page.

### Brand context
- Product name: **飒** (Chinese, pronounced "sà"), romanized: **saaa** 
- Domain: saaa.dev
- Tagline: "Your software, callable from anywhere."
- Chinese sub-identity: 飒 means "swift, spirited, heroic" in Chinese

### Design spec

**Palette (CSS custom properties, set in :root):**
```css
--bg: oklch(0.10 0.008 70);
--surface: oklch(0.14 0.008 70);
--border: oklch(0.22 0.01 70);
--accent: oklch(0.72 0.16 70);
--accent-dim: oklch(0.55 0.12 70);
--text: oklch(0.94 0.008 70);
--text-soft: oklch(0.60 0.01 70);
--code-green: oklch(0.72 0.14 145);
--code-blue: oklch(0.70 0.14 230);
--code-amber: oklch(0.72 0.16 70);
--code-purple: oklch(0.72 0.14 305);
```

**Fonts (load via @import in CSS):**
- Display: Bricolage Grotesque (Google Fonts, weights 400 600 800)
- Body: Geist (Google Fonts, weights 400 500)

**Design rules (MUST follow):**
- NO gradient text (no background-clip:text)
- NO glassmorphism
- NO identical icon+heading+text card grids
- NO side-stripe borders (no colored border-left as decoration)
- NO rounded icon boxes above every heading
- Left-aligned hero, NOT centered stack
- Amber accent used decisively

### Full page content

The component should be a single default export React component with these sections:

#### 1. Nav
- Left: "飒" logo in accent amber, font-size 1.5rem, font-weight 800, link to "/"
- Right: links "Docs" "Pricing" "GitHub", then a button "Get started" — amber background (var(--accent)), dark text (var(--bg)), no border-radius > 6px
- Sticky, background var(--bg), bottom border 1px var(--border)
- Max-width 1200px centered, padding 0 2rem

#### 2. Hero (min-height: 92vh, display flex, align items center)
- Left column (~55% width)
- Small label above heading: "Software as an API" — uppercase, tracked, var(--text-soft), font-size 0.75rem, letter-spacing 0.15em
- Main heading: "Your software,\ncallable from\nanywhere." — Bricolage Grotesque, font-size clamp(3rem, 6vw, 5.5rem), font-weight 800, line-height 1.0, color var(--text), NO gradient, tight tracking -0.03em
- Subhead: "Turn any codebase into a clean HTTP API. Ship an endpoint in minutes, skip the infrastructure." — font-size 1.1rem, var(--text-soft), max-width 480px, margin-top 1.5rem
- Two buttons: "Start building →" (amber bg, dark text) and "Read the docs" (transparent bg, border 1px var(--border), var(--text))
- Right column (~45% width): A realistic code block showing:
```
const fn = saaa.fn(async (name: string) => {
  return { greeting: \`Hello, \${name}!\` }
})

// Instantly callable via HTTP:
// POST https://saaa.dev/fn/hello
// { "args": ["world"] }
```
  Style: background var(--surface), border 1px var(--border), border-radius 8px, padding 1.5rem, font-family monospace, font-size 0.85rem
  Syntax highlight with spans: keywords (const, async, return) in var(--code-blue), strings in var(--code-amber), comments in var(--text-soft)

- Staggered fade-in animation on hero elements: `@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }` each element delayed 100ms apart

#### 3. How it works (padding 5rem 0)
- Section label: "How it works"
- Three columns, NO cards, just numbered steps
- Large number: "01" "02" "03" in var(--accent), font-size 2.5rem, font-weight 800, Bricolage Grotesque
- Step title below number: bold, var(--text)
- Step body: var(--text-soft), font-size 0.95rem
- Steps:
  1. "01 / Define a function" — "Write a regular async function in any language. No special framework, no annotations."
  2. "02 / Expose it" — "saaa wraps it in a type-safe HTTP endpoint. Schema is inferred automatically."
  3. "03 / Call it anywhere" — "Invoke from any language, any runtime. Curl, fetch, SDK. It just works."

#### 4. Features (padding 4rem 0)
- Section heading: "Everything you need, nothing you don't"
- 3×2 grid (repeat(3, 1fr) on desktop, 1 col on mobile)
- Each cell: border 1px var(--border), border-radius 6px, padding 1.5rem
- DO NOT use identical icon+heading+text layout for all. Vary:
  - Cell 1 "Instant endpoints": big stat "< 50ms" in var(--accent), label below
  - Cell 2 "Type-safe schemas": short code snippet `z.object({ name: z.string() })`
  - Cell 3 "Zero infra": plain heading + 2 sentences
  - Cell 4 "Any language": list of tags: Python · Node · Rust · Go
  - Cell 5 "Pay per call": pricing callout "$0.0001 / call"
  - Cell 6 "Composable": plain heading + 1 sentence

#### 5. Code showcase (padding 4rem 0, background var(--surface))
- Heading: "From function to API in 3 lines"
- Tabbed code block (tabs: TypeScript, Python, Rust) — tab switching via React state
- TypeScript tab:
```typescript
import { saaa } from 'saaa'

export const greet = saaa.fn(
  async (name: string) => `Hello, ${name}!`
)
// → POST https://your-app.saaa.dev/greet
```
- Python tab:
```python
from saaa import fn

@fn
async def greet(name: str) -> str:
    return f"Hello, {name}!"

# → POST https://your-app.saaa.dev/greet
```
- Rust tab:
```rust
use saaa::fn_handler;

#[fn_handler]
async fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}
// → POST https://your-app.saaa.dev/greet
```
- Code block: background var(--bg), border 1px var(--border), border-radius 8px, padding 1.5rem 2rem, monospace, syntax highlighted with spans

#### 6. Pricing (padding 5rem 0)
- Heading: "Simple pricing"
- Three columns: Free | Builder | Scale
- Free: $0/mo, "Up to 10k calls/mo", "1 function", "Community support", CTA "Get started free"
- Builder: $29/mo, "Up to 1M calls/mo", "Unlimited functions", "Email support", "Custom domains", CTA "Start building" — THIS card has border 2px var(--accent), NOT background change
- Scale: "Custom", "Unlimited", "SLA", "Dedicated support", "On-prem option", CTA "Talk to us"
- Card style: background var(--surface), border 1px var(--border) (except Builder), border-radius 8px, padding 2rem
- Price: font-size 2.5rem, font-weight 800, Bricolage Grotesque, var(--text)
- CTA buttons: amber for Builder, outline for others

#### 7. Footer (border-top 1px var(--border), padding 2rem 0)
- Left: "飒 saaa.dev" — logo + domain
- Right: links "Docs" "Status" "GitHub" "Twitter"  
- Bottom row: "© 2025 saaa.dev" in var(--text-soft)

### CSS in src/styles.css

Replace the entire file with:
```css
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Geist:wght@400;500&display=swap");

:root {
  --bg: oklch(0.10 0.008 70);
  --surface: oklch(0.14 0.008 70);
  --border: oklch(0.22 0.01 70);
  --accent: oklch(0.72 0.16 70);
  --accent-dim: oklch(0.55 0.12 70);
  --text: oklch(0.94 0.008 70);
  --text-soft: oklch(0.60 0.01 70);
  --code-green: oklch(0.72 0.14 145);
  --code-blue: oklch(0.70 0.14 230);
  --code-amber: oklch(0.72 0.16 70);
  --code-purple: oklch(0.72 0.14 305);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { background: var(--bg); color: var(--text); font-family: 'Geist', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }

body { background: var(--bg); min-height: 100vh; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

## Step 4: Verify the build works

After writing all files, run:
```
npm install
npm run build
```

If build fails, read the error and fix it. Iterate until the build succeeds.

## Step 5: Make a git commit

Once build succeeds:
```bash
git add -A
git commit -m "feat: saaa.dev (飒) landing page — TanStack Start + Cloudflare"
git push origin main
```

That's the complete task. Focus on correctness and a successful build.
