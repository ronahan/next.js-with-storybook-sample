'use client';

import { useAuth } from '@/contexts/AuthContext';

export function DashboardHome() {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ marginBottom: 8, color: 'var(--color-text-primary)' }}>대시보드</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>
        {user?.name}님, 환영합니다!
      </p>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <StatCard title="신규 사용자" value="3명" description="오늘" accent="accent" />
        <StatCard title="문의 접수" value="1건" description="오늘" accent="secondary" />
        <StatCard title="총 매출" value="₩1,234,000" description="이번 달" accent="success" />
        <StatCard title="활성 사용자" value="128명" description="현재" accent="info" />
      </div>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 18, marginBottom: 16, color: 'var(--color-text-primary)' }}>최근 활동</h2>
        <div
          style={{
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <ActivityItem time="10분 전" action="새 사용자 가입" user="user123@email.com" />
            <ActivityItem time="1시간 전" action="상품 등록" user="관리자" />
            <ActivityItem time="3시간 전" action="문의 답변 완료" user="관리자" />
          </ul>
        </div>
      </section>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  accent?: 'accent' | 'secondary' | 'success' | 'info';
};

function StatCard({ title, value, description, accent = 'accent' }: StatCardProps) {
  const accentColors = {
    accent: 'var(--color-accent)',
    secondary: 'var(--color-secondary)',
    success: 'var(--color-success)',
    info: 'var(--color-info)',
  };

  return (
    <div
      style={{
        background: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        padding: 20,
        borderLeft: `4px solid ${accentColors[accent]}`,
      }}
    >
      <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', margin: 0 }}>{title}</p>
      <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', margin: '8px 0' }}>{value}</p>
      <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: 0 }}>{description}</p>
    </div>
  );
}

function ActivityItem({ time, action, user }: { time: string; action: string; user: string }) {
  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div>
        <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{action}</span>
        <span style={{ color: 'var(--color-text-tertiary)', marginLeft: 8 }}>by {user}</span>
      </div>
      <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>{time}</span>
    </li>
  );
}
