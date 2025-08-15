import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { storeAuthData, clearAuthData, isAuthenticated, getUser, type AuthTokens, type User as ApiUser } from '@/lib/api';

export interface User extends ApiUser {
  profile?: {
    date_of_birth?: string;
    gender?: string;
    alternate_phone?: string;
    village?: string;
    state?: string;
    district?: string;
    pincode?: string;
    current_class?: string;
    student_id?: string;
    profile_image?: string;
  };
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const initializeAuth = () => {
      try {
        if (isAuthenticated()) {
          const storedUser = getUser();
          if (storedUser) {
            setUser(storedUser);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid auth data
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (user: User, tokens: AuthTokens) => {
    storeAuthData(tokens, user);
    setUser(user);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    // Optionally redirect to home page
    window.location.href = '/';
  };

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
