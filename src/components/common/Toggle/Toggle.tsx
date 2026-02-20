'use client';

import { useId } from 'react';
import styles from './Toggle.module.css';

/* =========================================================
 * 타입 정의
 * =======================================================*/

/** Toggle Props */
export interface ToggleProps {
  /** input 요소 id (label 연결에 사용) */
  id?: string;

  /** 라벨 텍스트 */
  label?: string;

  /** 라벨 위치 @default 'right' */
  labelPosition?: 'left' | 'right';

  /** 현재 ON/OFF 상태 */
  checked: boolean;

  /** 상태 변경 핸들러 */
  onChange: (checked: boolean) => void;

  /** 크기 @default 'md' */
  size?: 'sm' | 'md';

  /** 비활성화 */
  disabled?: boolean;

  /** 접근성 라벨 (label prop 없을 때 필수 — 스크린리더용) */
  ariaLabel?: string;

  /** 추가 CSS 클래스 */
  className?: string;
}

/* =========================================================
 * 컴포넌트
 * =======================================================*/

export function Toggle({
  id,
  label,
  labelPosition = 'right',
  checked,
  onChange,
  size = 'md',
  disabled = false,
  ariaLabel,
  className,
}: ToggleProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  const wrapperClassNames = [
    styles.wrapper,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trackClassNames = [
    styles.track,
    styles[size],
    checked && styles.checked,
  ]
    .filter(Boolean)
    .join(' ');

  const toggle = (
    <label className={styles.toggleControl}>
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-label={!label ? ariaLabel : undefined}
        className={styles.input}
      />
      <span className={trackClassNames}>
        <span className={styles.thumb} />
      </span>
    </label>
  );

  if (!label) {
    return (
      <div className={wrapperClassNames}>
        {toggle}
      </div>
    );
  }

  return (
    <div className={wrapperClassNames}>
      {labelPosition === 'left' && (
        <label htmlFor={inputId} className={styles.label}>{label}</label>
      )}
      {toggle}
      {labelPosition === 'right' && (
        <label htmlFor={inputId} className={styles.label}>{label}</label>
      )}
    </div>
  );
}
