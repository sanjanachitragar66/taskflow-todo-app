import { useState } from "react";
import { AuthCard } from "./Login.jsx";

function Signup({ onSignup, onSwitchToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("Please complete every field.");
      return;
    }
    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await onSignup(trimmedName, trimmedEmail, password);
    if (result?.error) {
      setError(result.error);
    } else if (result?.needsEmailConfirmation) {
      setSuccessMessage(
        "Account created. Check your email for a confirmation link, then sign in.",
      );
    }
    setIsSubmitting(false);
  }

  return (
    <AuthCard
      eyebrow="GET STARTED"
      title="Create your account"
      subtitle="Set up your space and make a little progress every day."
      footer={
        <>
          Already have an account?{" "}
          <button type="button" className="auth-link" onClick={onSwitchToLogin}>
            Sign in
          </button>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p className="auth-error" role="alert">{error}</p>}
        {successMessage && (
          <p className="auth-success" role="status">
            {successMessage}
          </p>
        )}
        <label htmlFor="signup-name">Full name</label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Your name"
          maxLength={100}
          required
        />
        <label htmlFor="signup-email">Email address</label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
          minLength={6}
          required
        />
        <label htmlFor="signup-confirm-password">Confirm password</label>
        <input
          id="signup-confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Enter your password again"
          minLength={6}
          required
        />
        <button className="primary-button auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthCard>
  );
}

export default Signup;
