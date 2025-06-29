import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

interface MyTokenPayload {
  user_id: number;
  exp: number;
  iat: number;
}

interface AuthContextType {
  userId: number | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  isAuthenticated: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies(["token"]);
  const [authState, setAuthState] = useState<AuthContextType>({
    userId: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const token = cookies.token;

    if (!token) {
      setAuthState({
        userId: null,
        isAuthenticated: false,
        loading: false,
      });
      return;
    }

    try {
      const decoded = jwtDecode<MyTokenPayload>(token);

      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        // Token expired
        setAuthState({
          userId: null,
          isAuthenticated: false,
          loading: false,
        });
      } else {
        // Valid token
        setAuthState({
          userId: decoded.user_id,
          isAuthenticated: true,
          loading: false,
        });
      }
    } catch (err) {
      console.error("Token error", err);
      setAuthState({
        userId: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  }, [cookies.token]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
