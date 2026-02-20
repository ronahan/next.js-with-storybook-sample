'use client';

import styles from './Badge.module.css';

/* =========================================================
 * 타입 정의
 * =======================================================*/

/** Badge Props */
export interface BadgeProps {
  /** 뱃지 내부 콘텐츠 */
  children: React.ReactNode;

  /** 색상 변형 @default 'neutral' */
  variant?: 'primary' | 'normal' | 'success' | 'warning' | 'danger' | 'neutral';

  /** 색상 톤 @default 'soft' */
  tone?: 'solid' | 'soft';

  /** 크기 @default 'md' */
  size?: 'sm' | 'md';

  /** 모서리 라운딩 @default 'md' */
  rounded?: 'md' | 'full';

  /** 왼쪽 상태 점 표시 @default false */
  dot?: boolean;

  /** 텍스트 앞 아이콘 */
  startIcon?: React.ReactNode;

  /** true 시 <button>으로 렌더링 @default false */
  clickable?: boolean;

  /** 클릭 핸들러 (clickable일 때만 의미 있음) */
  onClick?: () => void;

  /** 비활성화 (clickable일 때만 의미 있음) */
  disabled?: boolean;

  /** 추가 CSS 클래스 */
  className?: string;
}

/* =========================================================
 * 컴포넌트
 * =======================================================*/

export function Badge({
  children,
  variant = 'neutral',
  tone = 'soft',
  size = 'md',
  rounded = 'md',
  dot = false,
  startIcon,
  clickable = false,
  onClick,
  disabled = false,
  className,
}: BadgeProps) {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[tone],
    styles[`size-${size}`],
    styles[`rounded-${rounded}`],
    clickable && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {startIcon && <span className={styles.icon} aria-hidden="true">{startIcon}</span>}
      {children}
    </>
  );

  if (clickable) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled || undefined}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={classNames} role={dot ? 'status' : undefined}>
      {content}
    </span>
  );
}
