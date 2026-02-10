'use client';

import styles from './Button.module.css';

/* =========================================================
 * 타입 정의
 * =======================================================*/

/** Button Props */
export interface ButtonProps {
  /** 버튼 내부 콘텐츠 (필수) */
  children: React.ReactNode;

  /** 클릭 핸들러 */
  onClick?: () => void;

  /** HTML button type @default 'button' */
  type?: 'button' | 'submit' | 'reset';

  /** 비활성화 */
  disabled?: boolean;

  /** 스타일 변형 @default 'primary' */
  variant?: 'primary' | 'secondary' | 'danger';

  /** 버튼 크기 @default 'md' */
  size?: 'sm' | 'md' | 'lg';

  /** true 시 width: 100% @default false */
  fullWidth?: boolean;

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
  className,
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames}
    >
      {children}
    </button>
  );
}
