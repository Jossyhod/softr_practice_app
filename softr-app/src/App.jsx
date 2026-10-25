import { useState } from 'react';
import { ArrowRight, Rocket, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';
import RegistrationForm from './Component/RegistrationForm';

// Set in softr-app/.env (not committed) — see .env.example.
const ZAPIER_WEBHOOK_URL = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;

const FEATURES = [
  { icon: <Zap size={22} />, title: 'Fast to set up', body: 'Vite + React means instant dev server and hot reload.' },
  { icon: <SlidersHorizontal size={22} />, title: 'Customizable', body: 'Change styles, add images or extend with components.' },
  { icon: <Rocket size={22} />, title: 'Deploy easily', body: 'Deploy to Vercel, Netlify, or GitHub Pages in minutes.' },
];

function Brand() {
  return (
    <a href="#top" className="brand" aria-label="Beyond Age Tech home">
      <span className="brand-mark" aria-hidden="true">B</span>
      <span>
        Beyond Age Tech<span className="dot">.</span>
      </span>
    </a>
  );
}

export default function App() {
  const [signup, setSignup] = useState({ open: false, email: '' });

  const openSignup = (email = '') => setSignup({ open: true, email });
  const closeSignup = () => setSignup((s) => ({ ...s, open: false }));

  // The email capture hands off to the real registration modal, pre-filled.
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    openSignup(new FormData(e.currentTarget).get('email'));
  };

  return (
    <div id="top">
      <a href="#main" className="skip-link">Skip to content</a>

      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="site-nav" aria-label="Primary">
            <a href="#features" className="nav-link">Features</a>
            <a href="#signup" className="nav-link">Sign up</a>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => openSignup()}>
              Get started
            </button>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="container">
            <span className="eyebrow">
              <span className="eyebrow-icon" aria-hidden="true">
                <Sparkles size={13} strokeWidth={2.5} />
              </span>
              Free to get started
            </span>

            <h1>
              Build better workflows&nbsp;— <span className="highlight">faster</span>
            </h1>
            <p className="lead">
              Launch a simple landing page quickly. Perfect for testing ideas or demoing concepts.
            </p>

            <div className="cta-row">
              <button type="button" className="btn btn-primary" onClick={() => openSignup()}>
                Get started free
                <ArrowRight className="btn-arrow" size={18} aria-hidden="true" />
              </button>
              <a href="#features" className="btn btn-secondary">
                See features
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="section features" aria-labelledby="features-title">
          <div className="container">
            <div className="section-head">
              <p className="section-eyebrow">Features</p>
              <h2 id="features-title">Everything you need to ship</h2>
              <p>Go from idea to live page without the setup headaches.</p>
            </div>

            <ul className="feature-grid">
              {FEATURES.map(({ icon, title, body }) => (
                <li key={title} className="feature-card">
                  <span className="feature-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="signup" className="signup" aria-labelledby="signup-title">
          <div className="container">
            <div className="cta-panel">
              <h2 id="signup-title">Ready to try?</h2>
              <p>Enter your email and we&rsquo;ll take you straight to sign-up. It&rsquo;s free.</p>

              <form onSubmit={handleEmailSubmit} className="cta-form">
                <label htmlFor="cta-email" className="sr-only">Email address</label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Get started
                  <ArrowRight className="btn-arrow" size={18} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand />
          <p className="footer-copy">© {new Date().getFullYear()} Beyond-Age Tech Solution</p>
        </div>
      </footer>

      <RegistrationForm
        open={signup.open}
        initialEmail={signup.email}
        onClose={closeSignup}
        webhookUrl={ZAPIER_WEBHOOK_URL}
      />
    </div>
  );
}
