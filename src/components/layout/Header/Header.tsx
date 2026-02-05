'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLayout, gnbMenus, type GnbMenu } from '@/contexts/LayoutContext';
import { ThemeToggle } from '@/components/common/ThemeToggle/ThemeToggle';

export function Header() {
  const { user, logout } = useAuth();
  const { activeGnb, setActiveGnb, toggleSidebarCollapse, toggleSidebar, isSidebarCollapsed } = useLayout();
  const [searchQuery, setSearchQuery] = useState('');
  const searchId = useId();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 기능 구현
    console.log('Search:', searchQuery);
  };

  return (
    <header className="header" role="banner">
      <div className="header__left">
        <Link href="/dashboard" className="header__logo" aria-label="관리자 대시보드 홈">
          Admin
        </Link>

        {/* 데스크톱: 사이드바 접기/펼치기 */}
        <button
          type="button"
          className="header__toggle"
          onClick={toggleSidebarCollapse}
          aria-expanded={!isSidebarCollapsed}
          aria-label={isSidebarCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
          aria-controls="sidebar"
        >
          {isSidebarCollapsed ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          )}
        </button>

        {/* 모바일: 햄버거 메뉴 */}
        <button
          type="button"
          className="header__toggle header__toggle--mobile"
          onClick={toggleSidebar}
          aria-label="메뉴 열기"
          aria-controls="sidebar"
          // style={{ display: 'none' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* GNB - 데스크톱 */}
      <nav className="header__center" aria-label="주 메뉴">
        <div className="gnb">
          <ul className="gnb__list" role="menubar">
            {gnbMenus.map((menu) => (
              <li key={menu.id} className="gnb__item" role="none">
                <button
                  type="button"
                  className="gnb__button"
                  role="menuitem"
                  aria-current={activeGnb === menu.id ? 'true' : undefined}
                  onClick={() => setActiveGnb(menu.id as GnbMenu)}
                >
                  {menu.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="header__right">
        {/* 테마 토글 */}
        <ThemeToggle />

        {/* 검색 */}
        <form className="header__search" onSubmit={handleSearch} role="search">
          <label htmlFor={searchId} className="visually-hidden">
            검색
          </label>
          <svg className="header__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            id={searchId}
            type="search"
            className="header__search-input"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* 사용자 정보 */}
        <div className="user-info">
          {user && <span className="user-info__name">{user.name}님</span>}
          <button
            type="button"
            className="user-info__logout"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
