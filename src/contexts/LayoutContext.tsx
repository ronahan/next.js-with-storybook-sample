'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

// GNB 메뉴 타입
export type GnbMenu = 'dashboard' | 'users' | 'products' | 'settings';

// 사이드바 메뉴 아이템 타입
export type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon?: string;
};

// GNB별 사이드바 메뉴 정의
export const sidebarMenus: Record<GnbMenu, MenuItem[]> = {
  dashboard: [
    { id: 'overview', label: '대시보드 홈', href: '/dashboard' },
    { id: 'analytics', label: '통계', href: '/dashboard/analytics' },
    { id: 'reports', label: '리포트', href: '/dashboard/reports' },
  ],
  users: [
    { id: 'user-list', label: '사용자 목록', href: '/dashboard/users' },
    { id: 'user-roles', label: '권한 관리', href: '/dashboard/users/roles' },
    { id: 'user-activity', label: '활동 로그', href: '/dashboard/users/activity' },
  ],
  products: [
    { id: 'product-list', label: '상품 목록', href: '/dashboard/products' },
    { id: 'product-add', label: '상품 등록', href: '/dashboard/products/add' },
    { id: 'categories', label: '카테고리 관리', href: '/dashboard/products/categories' },
    { id: 'inventory', label: '재고 관리', href: '/dashboard/products/inventory' },
  ],
  settings: [
    { id: 'general', label: '일반 설정', href: '/dashboard/settings' },
    { id: 'security', label: '보안 설정', href: '/dashboard/settings/security' },
    { id: 'notifications', label: '알림 설정', href: '/dashboard/settings/notifications' },
  ],
};

// GNB 메뉴 정보
export const gnbMenus: { id: GnbMenu; label: string }[] = [
  { id: 'dashboard', label: '복원력' },
  { id: 'users', label: '1depth' },
  { id: 'products', label: '1depth' },
  { id: 'settings', label: '1depth' },
];

type LayoutContextType = {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  activeGnb: GnbMenu;
  currentMenuItems: MenuItem[];
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  setActiveGnb: (menu: GnbMenu) => void;
  closeSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 모바일용
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // 데스크톱 접기
  const [activeGnb, setActiveGnbState] = useState<GnbMenu>('dashboard');

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const setActiveGnb = useCallback((menu: GnbMenu) => {
    setActiveGnbState(menu);
    // 모바일에서 GNB 선택 시 사이드바 열기
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const currentMenuItems = sidebarMenus[activeGnb];

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        isSidebarCollapsed,
        activeGnb,
        currentMenuItems,
        toggleSidebar,
        toggleSidebarCollapse,
        setActiveGnb,
        closeSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
