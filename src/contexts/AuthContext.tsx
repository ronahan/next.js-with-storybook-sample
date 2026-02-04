'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

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

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로드 시 세션 확인
  useEffect(() => {
    const checkAuth = () => {
      const authCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='));

      if (authCookie) {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      // 실제 환경에서는 API 호출로 대체
      // 데모용 하드코딩된 자격증명 (프로덕션에서는 제거 필요)
      if (email === 'admin@example.com' && password === 'Admin123!') {
        const userData: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin',
        };

        // 세션 쿠키 설정 (HttpOnly는 서버에서만 설정 가능)
        document.cookie = 'auth-token=demo-token; path=/; max-age=86400; SameSite=Strict';
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        return { success: true };
      }

      return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    },
    []
  );

  const logout = useCallback(() => {
    document.cookie = 'auth-token=; path=/; max-age=0';
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
