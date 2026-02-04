'use client';

import { createContext, useContext, type ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const MockAuthContext = createContext<AuthContextType | null>(null);

type MockAuthProviderProps = {
  children: ReactNode;
  user?: User | null;
  isLoading?: boolean;
};

export function MockAuthProvider({
  children,
  user = { id: '1', email: 'admin@example.com', name: 'Admin' },
  isLoading = false,
}: MockAuthProviderProps) {
  const mockLogin = async () => ({ success: true });
  const mockLogout = () => console.log('Logout called');

  return (
    <MockAuthContext.Provider
      value={{ user, isLoading, login: mockLogin, logout: mockLogout }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

// Re-export useAuth to work with mock
export function useAuth() {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a MockAuthProvider');
  }
  return context;
}
