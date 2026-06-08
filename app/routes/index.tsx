import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

const codeExamples = {
  typescript: `import { saaa } from 'saaa'

export const greet = saaa.fn(
  async (name: string) => \`Hello, \${name}!\`
)
// → POST https://your-app.saaa.dev/greet`,
  python: `from saaa import fn

@fn
async def greet(name: str) -> str:
    return f"Hello, {name}!"

# → POST https://your-app.saaa.dev/greet`,
  rust: `use saaa::fn_handler;

#[fn_handler]
async fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}
// → POST https://your-app.saaa.dev/greet`,
}

type CodeTab = keyof typeof codeExamples

const steps = [
  {
    number: '01',
    title: 'Define a function',
    body: 'Write a regular async function in any language. No special framework, no annotations.',
  },
  {
    number: '02',
    title: 'Expose it',
    body: 'saaa wraps it in a type-safe HTTP endpoint. Schema is inferred automatically.',
  },
  {
    number: '03',
    title: 'Call it anywhere',
    body: 'Invoke from any language, any runtime. Curl, fetch, SDK. It just works.',
  },
]

const features = [
  {
    title: 'Instant endpoints',
    content: (
      <div>
        <div className="feature-stat">{'< 50ms'}</div>
        <p className="feature-note">from deploy to callable API</p>
      </div>
    ),
  },
  {
    title: 'Type-safe schemas',
    content: <code className="feature-code">z.object({'{ name: z.string() }'})</code>,
  },
  {
    title: 'Zero infra',
    content: (
      <p className="feature-copy">
        Bring your code, we host the runtime, scale the functions, and keep an eye on every invocation.
      </p>
    ),
  },
  {
    title: 'Any language',
    content: <p className="feature-tags">Python · Node · Rust · Go</p>,
  },
  {
    title: 'Pay per call',
    content: (
      <div>
        <div className="feature-stat">$0.0001</div>
        <p className="feature-note">per call</p>
      </div>
    ),
  },
  {
    title: 'Composable',
    content: <p className="feature-copy">Chain functions, pass context, and orchestrate workflows without glue code.</p>,
  },
]

const pricing = [
  {
    tier: 'Free',
    price: '$0/mo',
    bullets: ['Up to 10k calls/mo', '1 function', 'Community support'],
    cta: 'Get started free',
    accentBorder: false,
  },
  {
    tier: 'Builder',
    price: '$29/mo',
    bullets: ['Up to 1M calls/mo', 'Unlimited functions', 'Email support', 'Custom domains'],
    cta: 'Start building',
    accentBorder: true,
  },
  {
    tier: 'Scale',
    price: 'Custom',
    bullets: ['Unlimited', 'SLA', 'Dedicated support', 'On-prem option'],
    cta: 'Talk to us',
    accentBorder: false,
  },
]

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const [activeTab, setActiveTab] = useState<CodeTab>('typescript')

  return (
    <div className="page" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <SiteNav />
      <main className="page-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <Hero />
        <HowItWorks />
        <Features />
        <CodeShowcase activeTab={activeTab} onChange={setActiveTab} />
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteNav() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: '1.5rem',
            color: 'var(--accent)',
            textDecoration: 'none',
          }}
        >
          飒
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {[
            { label: 'Docs', href: '/docs' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'GitHub', href: 'https://github.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ color: 'var(--text-soft)', textDecoration: 'none', fontSize: '0.95rem' }}
            >
              {link.label}
            </a>
          ))}
          <button
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '6px',
              padding: '0.65rem 1.3rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Get started
          </button>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  const fadeBase = {
    animation: 'fadeUp 800ms ease forwards',
    opacity: 0,
  }

  return (
    <section
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        paddingTop: '3rem',
      }}
    >
      <div style={{ flex: 0.55 }}>
        <p
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontSize: '0.75rem',
            color: 'var(--text-soft)',
            ...fadeBase,
            animationDelay: '50ms',
          }}
        >
          Software as an API
        </p>
        <h1
          style={{
            fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            marginTop: '1rem',
            color: 'var(--text)',
            ...fadeBase,
            animationDelay: '150ms',
          }}
        >
          Your software,
          <br />
          callable from
          <br />
          anywhere.
        </h1>
        <p
          style={{
            maxWidth: '480px',
            marginTop: '1.5rem',
            fontSize: '1.1rem',
            color: 'var(--text-soft)',
            ...fadeBase,
            animationDelay: '250ms',
          }}
        >
          Turn any codebase into a clean HTTP API. Ship an endpoint in minutes, skip the infrastructure.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '6px',
              padding: '0.9rem 1.6rem',
              fontWeight: 600,
              cursor: 'pointer',
              ...fadeBase,
              animationDelay: '350ms',
            }}
          >
            Start building →
          </button>
          <button
            style={{
              background: 'transparent',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '0.9rem 1.6rem',
              fontWeight: 600,
              cursor: 'pointer',
              ...fadeBase,
              animationDelay: '450ms',
            }}
          >
            Read the docs
          </button>
        </div>
      </div>
      <div
        style={{
          flex: 0.45,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '0.85rem',
          ...fadeBase,
          animationDelay: '550ms',
        }}
      >
        <pre style={{ margin: 0, overflowX: 'auto', lineHeight: 1.6 }}><code>
{`const fn = `}<span style={{ color: 'var(--code-blue)' }}>saaa</span>{`.fn(`}<span style={{ color: 'var(--code-blue)' }}>async</span>{` (`}<span style={{ color: 'var(--code-amber)' }}>name</span>{`: `}<span style={{ color: 'var(--code-green)' }}>string</span>{`) => {`}
{`\n  `}<span style={{ color: 'var(--code-blue)' }}>return</span>{` { greeting: `}<span style={{ color: 'var(--code-amber)' }}>{`\`Hello, \${name}!\``}</span>{` }`}
{`\n})\n`}
<span style={{ color: 'var(--text-soft)' }}>{`// Instantly callable via HTTP:`}</span>
{`\n`}<span style={{ color: 'var(--text-soft)' }}>{`// POST https://saaa.dev/fn/hello`}</span>
{`\n`}<span style={{ color: 'var(--text-soft)' }}>{`// { "args": ["world"] }`}</span>
        </code></pre>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <p
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: '0.75rem',
          color: 'var(--text-soft)',
        }}
      >
        How it works
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        {steps.map((step) => (
          <div key={step.number}>
            <div
              style={{
                fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: '2.5rem',
                color: 'var(--accent)',
              }}
            >
              {step.number}
            </div>
            <h3 style={{ marginTop: '0.5rem' }}>{step.title}</h3>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-soft)', fontSize: '0.95rem' }}>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section style={{ padding: '4rem 0' }}>
      <h2
        style={{
          fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
          fontSize: '2.25rem',
          fontWeight: 600,
          marginBottom: '2rem',
        }}
      >
        Everything you need, nothing you don't
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '1.5rem',
              minHeight: '180px',
            }}
          >
            <p
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.75rem',
                color: 'var(--text-soft)',
              }}
            >
              {feature.title}
            </p>
            <div style={{ marginTop: '1rem' }}>{feature.content}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CodeShowcase({
  activeTab,
  onChange,
}: {
  activeTab: CodeTab
  onChange: (tab: CodeTab) => void
}) {
  const tabs: CodeTab[] = ['typescript', 'python', 'rust']

  return (
    <section
      style={{
        padding: '4rem 0',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
      }}
    >
      <h2
        style={{
          fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
          fontSize: '2rem',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        From function to API in 3 lines
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '16px',
              border: activeTab === tab ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: activeTab === tab ? 'var(--accent)' : 'transparent',
              color: activeTab === tab ? 'var(--bg)' : 'var(--text)',
              textTransform: 'capitalize',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        style={{
          marginTop: '2rem',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem 2rem',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '0.9rem',
          overflowX: 'auto',
        }}
      >
        <pre>
          <code>{codeExamples[activeTab]}</code>
        </pre>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <h2
        style={{
          fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
          fontSize: '2.25rem',
          fontWeight: 600,
          marginBottom: '2rem',
        }}
      >
        Simple pricing
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {pricing.map((plan) => (
          <div
            key={plan.tier}
            style={{
              background: 'var(--surface)',
              border: plan.accentBorder ? '2px solid var(--accent)' : '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
            }}
          >
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-soft)' }}>{plan.tier}</p>
            <div
              style={{
                fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
                fontSize: '2.5rem',
                fontWeight: 800,
                margin: '1rem 0',
              }}
            >
              {plan.price}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-soft)' }}>
              {plan.bullets.map((item) => (
                <li key={item} style={{ marginBottom: '0.5rem' }}>
                  {item}
                </li>
              ))}
            </ul>
            <button
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '0.9rem',
                borderRadius: '6px',
                border: plan.accentBorder ? 'none' : '1px solid var(--border)',
                background: plan.accentBorder ? 'var(--accent)' : 'transparent',
                color: plan.accentBorder ? 'var(--bg)' : 'var(--text)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: '4rem', padding: '2rem 0' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontWeight: 700 }}>
          飒 <span style={{ color: 'var(--text-soft)' }}>saaa.dev</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-soft)', fontSize: '0.95rem' }}>
          {['Docs', 'Status', 'GitHub', 'Twitter'].map((link) => (
            <a key={link} href={`/${link.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {link}
            </a>
          ))}
        </div>
      </div>
      <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-soft)', fontSize: '0.85rem' }}>© 2025 saaa.dev</p>
    </footer>
  )
}
