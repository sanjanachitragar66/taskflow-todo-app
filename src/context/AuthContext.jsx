import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase.js";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }
  return context;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!supabase) {
      setAuthError(
        "Authentication is not configured. Check the Supabase environment variables and restart the app.",
      );
      setLoading(false);
      return undefined;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      setAuthError("");
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email, password) {
    if (!supabase) {
      return { error: "Supabase authentication is not configured." };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error?.message ?? null };
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  }

  async function signUp(fullName, email, password) {
    if (!supabase) {
      return { error: "Supabase authentication is not configured." };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      return {
        error: error?.message ?? null,
        needsEmailConfirmation: !error && !data.session,
      };
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  }

  async function signOut() {
    if (!supabase) return;

    try {
      const { error } = await supabase.auth.signOut();
      if (error) setAuthError(error.message);
    } catch (error) {
      setAuthError(getErrorMessage(error));
    }
  }

  const value = {
    user,
    loading,
    authError,
    clearAuthError: () => setAuthError(""),
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function getErrorMessage(error) {
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

export default AuthProvider;
