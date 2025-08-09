import { User } from "@/types/auth";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const storedUser = await AsyncStorage.getItem("user");        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError("");
      const user: User = {
        email,
        fullName: email.split("@")[0],
      };

      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      setError("Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (newUser: User) => {
    try {
      setLoading(true);
      setError("");
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      setError("Registration failed");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      setError("Logout failed");
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const values = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};