import React from 'react';
import RegistrationForm from './Component/RegistrationForm'; // ✅ Updated path since it's directly in src

// Use an environment variable for your Zapier webhook (recommended).
// For Vite, create a .env file with: VITE_ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxx/yyyy
const ZAPIER_WEBHOOK_URL = import.meta.env.VITE_ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/25351507/u8zfnm8/';

export default function App() {
  return (
    <div>
      <header className="site-header">
        <div className="container header-inner">
          <h1 className="logo">
            Beyond Age Tech<span className="dot">.</span>
          </h1>
          <nav>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h2>Build better workflows — faster</h2>
            <p className="lead">
              Launch a simple landing page quickly. Perfect for testing ideas or demoing concepts.
            </p>

            <div className="cta-row">
              {/* RegistrationForm renders the 'Get Started — It's Free' button and modal */}
              <RegistrationForm webhookUrl={ZAPIER_WEBHOOK_URL} />

              <a href="#features" className="btn ghost">
                See Features
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="features container">
          <h3>Features</h3>
          <div className="grid">
            <div className="card">
              <div className="icon">⚡</div>
              <h4>Fast to set up</h4>
              <p>Vite + React means instant dev server and hot reload.</p>
            </div>
            <div className="card">
              <div className="icon">🔧</div>
              <h4>Customizable</h4>
              <p>Change styles, add images or extend with components.</p>
            </div>
            <div className="card">
              <div className="icon">🚀</div>
              <h4>Deploy easily</h4>
              <p>Deploy to Vercel, Netlify, or GitHub Pages in minutes.</p>
            </div>
          </div>
        </section>

        <section id="signup" className="signup">
          <div className="container">
            <h3>Ready to try?</h3>
            <p>Enter your email to be notified (this demo doesn't send emails).</p>

            <form onSubmit={(e) => e.preventDefault()} className="signup-form">
              <input type="email" placeholder="you@example.com" aria-label="Email" />
              <button className="btn primary">Notify me</button>
            </form>
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Beyond-Age Tech Solution</p>
        </div>
      </footer>
    </div>
  );
}
