import { useState, useEffect, createContext, useContext } from "react";

const ADMIN_KEY = "goarpita_admin_auth";
const ADMIN_EMAIL = "admin@goarpita.com";
const ADMIN_PASSWORD = "GoArpita@2024";

interface AdminAuthContextType {
  isAdmin: boolean;
  loading: boolean;
  email: string | null;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  loading: true,
  email: null,
  signIn: () => false,
  signOut: () => {},
});

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.email === ADMIN_EMAIL && parsed.ts && Date.now() - parsed.ts < 3600000) {
          setIsAdmin(true);
          setEmail(parsed.email);
        } else {
          sessionStorage.removeItem(ADMIN_KEY);
        }
      } catch {
        sessionStorage.removeItem(ADMIN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const signIn = (inputEmail: string, inputPassword: string): boolean => {
    if (inputEmail === ADMIN_EMAIL && inputPassword === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_KEY, JSON.stringify({ email: inputEmail, ts: Date.now() }));
      setIsAdmin(true);
      setEmail(inputEmail);
      return true;
    }
    return false;
  };

  const signOut = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setIsAdmin(false);
    setEmail(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loading, email, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
