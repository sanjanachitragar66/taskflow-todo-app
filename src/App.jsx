import AuthProvider, { useAuth } from "./context/AuthContext.jsx";
import TaskProvider from "./context/TaskContext.jsx";
import Auth from "./components/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./App.css";

function AppContent() {
  const { user, loading } = useAuth();
  const isDashboard = window.location.pathname === "/";

  if (loading) {
    return (
      <main className="auth-loading" role="status" aria-live="polite">
        <span className="loading-mark" aria-hidden="true">
          ✓
        </span>
        <p>Checking your session...</p>
      </main>
    );
  }

  if (!user) return <Auth />;
  if (!isDashboard) return <NotFound />;

  return (
    <TaskProvider key={user.id} userId={user.id}>
      <Dashboard />
    </TaskProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
