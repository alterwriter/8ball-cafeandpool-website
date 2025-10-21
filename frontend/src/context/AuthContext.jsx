import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = '8ball-member-session';

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Invalid session payload', error);
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!session) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  const value = useMemo(
    () => ({
      token: session?.token ?? null,
      profile: session?.profile ?? null,
      isAuthenticated: Boolean(session?.token),
      updateSession: setSession,
      clearSession: () => setSession(null),
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus dipakai dalam AuthProvider');
  }
  return context;
}
