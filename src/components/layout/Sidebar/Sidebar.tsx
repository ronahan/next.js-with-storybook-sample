'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayout, gnbMenus, type GnbMenu } from '@/contexts/LayoutContext';

export function Sidebar() {
  const pathname = usePathname();
  const {
    isSidebarOpen,
    isSidebarCollapsed,
    activeGnb,
    currentMenuItems,
    setActiveGnb,
    closeSidebar,
  } = useLayout();

  const currentGnbLabel = gnbMenus.find((m) => m.id === activeGnb)?.label || '';
  // const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update(); // 초기 계산
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <>
      {/* 오버레이 (모바일) */}
      <div
        className="sidebar__overlay"
        data-visible={isMobile && isSidebarOpen}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        id="sidebar"
        className="sidebar"
        data-open={isSidebarOpen}
        data-collapsed={isSidebarCollapsed}
        aria-label="사이드바 메뉴"
      >
        {/* 모바일 GNB */}
        <div className="sidebar__gnb">
          <ul className="sidebar__gnb-list" role="menubar" aria-label="대메뉴">
            {gnbMenus.map((menu) => (
              <li key={menu.id} role="none">
                <button
                  type="button"
                  className="sidebar__gnb-button"
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

        {/* 사이드바 네비게이션 */}
        <nav className="sidebar__nav" aria-label={`${currentGnbLabel} 메뉴`}>
          {!isSidebarCollapsed && (
            <h2 className="sidebar__title">{currentGnbLabel}</h2>
          )}
          <ul className="sidebar__list" role="menu">
            {currentMenuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.id} className="sidebar__item" role="none">
                  <Link
                    href={item.href}
                    className="sidebar__link"
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => {
                      // 모바일에서 메뉴 클릭 시 사이드바 닫기
                      if (window.innerWidth < 768) {
                        closeSidebar();
                      }
                    }}
                  >
                    <MenuIcon id={item.id} />
                    <span className="sidebar__link-text">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

// 간단한 아이콘 컴포넌트
function MenuIcon({ id }: { id: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    overview: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    analytics: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    reports: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    default: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  };

  return <span className="sidebar__icon">{iconMap[id] || iconMap.default}</span>;
}
