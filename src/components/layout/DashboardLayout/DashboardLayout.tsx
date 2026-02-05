'use client';

import { type ReactNode } from 'react';
import { LayoutProvider, useLayout } from '@/contexts/LayoutContext';
import { AuthGuard } from '@/components/auth/AuthGuard/AuthGuard';
import { Header } from '@/components/layout/Header/Header';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import '@/styles/layout.css';


type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayoutInner({ children }: DashboardLayoutProps) {
  const { isSidebarCollapsed } = useLayout();

  return (
    <div className="dashboard-layout">
      {/* 스킵 링크 - 웹 접근성 */}
      <a href="#main-content" className="skip-link">
        본문으로 바로가기
      </a>

      <Header />
      <Sidebar />

      <main
        id="main-content"
        className="main-content"
        data-sidebar-collapsed={isSidebarCollapsed}
        role="main"
        aria-label="메인 콘텐츠"
      >
        {children}
      </main>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <LayoutProvider>
        <DashboardLayoutInner>{children}</DashboardLayoutInner>
      </LayoutProvider>
    </AuthGuard>
  );
}
