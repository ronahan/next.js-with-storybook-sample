'use client';

import styles from './Button.module.css';

/* =========================================================
 * 타입 정의
 * =======================================================*/

/** Button Props */
export interface ButtonProps {
  /** 버튼 내부 콘텐츠 */
  children?: React.ReactNode;

  /** 클릭 핸들러 */
  onClick?: () => void;

  /** HTML button type @default 'button' */
  type?: 'button' | 'submit' | 'reset';

  /** 비활성화 */
  disabled?: boolean;

  /** 스타일 변형 @default 'primary' */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';

  /** 버튼 크기 @default 'md' */
  size?: 'sm' | 'md' | 'lg';

  /** true 시 width: 100% @default false */
  fullWidth?: boolean;

  /** 텍스트 앞 아이콘 */
  startIcon?: React.ReactNode;

  /** 텍스트 뒤 아이콘 */
  endIcon?: React.ReactNode;

  /** 로딩 상태 — spinner 표시 + 클릭 차단 @default false */
  loading?: boolean;

  /** 아이콘 전용 버튼 (정사각형) @default false */
  iconOnly?: boolean;

  /** 추가 CSS 클래스 */
  className?: string;
}

/* =========================================================
 * 컴포넌트
 * =======================================================*/

export function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  startIcon,
  endIcon,
  loading = false,
  iconOnly = false,
  className,
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    iconOnly && styles.iconOnly,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames}
      aria-busy={loading || undefined}
    >
      {loading && (
        <span className={styles.spinnerWrapper}>
          <span className={styles.spinner} />
        </span>
      )}
      <span className={[styles.content, loading && styles.loadingContent].filter(Boolean).join(' ')}>
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.icon}>{endIcon}</span>}
      </span>
    </button>
  );
}
