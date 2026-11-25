import { useState } from "react";

function Login({ onLogin, onSwitchToSignup, initialError = "" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await onLogin(email.trim(), password);
    if (result?.error) setError(result.error);
    setIsSubmitting(false);
  }

  return (
    <AuthCard
      eyebrow="WELCOME BACK"
      title="Sign in to TaskFlow"
      subtitle="Pick up where you left off and keep your day on track."
      footer={
        <>
          New to TaskFlow?{" "}
          <button type="button" className="auth-link" onClick={onSwitchToSignup}>
            Create an account
          </button>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />
        <button className="primary-button auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthCard>
  );
}

export function AuthCard({ eyebrow, title, subtitle, footer, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <a className="brand auth-brand" href="/" aria-label="TaskFlow home">
          <span className="brand-mark" aria-hidden="true">
            ✓
          </span>
          <span>TaskFlow</span>
        </a>
        <span className="auth-eyebrow">{eyebrow}</span>
        <h1 id="auth-title">{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>
        {children}
        <p className="auth-footer">{footer}</p>
      </section>
      <p className="auth-page-note">A little progress, every day.</p>
    </main>
  );
}

export default Login;
