import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./Auth.css";

function Auth() {
  const [showSignup, setShowSignup] = useState(false);
  const { signIn, signUp, authError, clearAuthError } = useAuth();

  function switchToSignup() {
    clearAuthError();
    setShowSignup(true);
  }

  function switchToLogin() {
    clearAuthError();
    setShowSignup(false);
  }

  if (showSignup) {
    return (
      <Signup onSignup={signUp} onSwitchToLogin={switchToLogin} />
    );
  }

  return (
    <Login
      onLogin={signIn}
      onSwitchToSignup={switchToSignup}
      initialError={authError}
    />
  );
}

export default Auth;
