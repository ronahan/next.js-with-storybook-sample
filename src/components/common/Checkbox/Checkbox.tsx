'use client';

import { useEffect, useId, useRef } from 'react';
import styles from './Checkbox.module.css';

/* =========================================================
 * 타입 정의
 * =======================================================*/

/** Checkbox Props */
export interface CheckboxProps {
  /** input 요소 id (label 연결에 사용) */
  id?: string;

  /** 라벨 텍스트 */
  label?: string;

  /** 현재 체크 상태 */
  checked: boolean;

  /** 상태 변경 핸들러 */
  onChange: (checked: boolean) => void;

  /** 불확정 상태 (시각적으로 checked보다 우선) */
  indeterminate?: boolean;

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

export function Checkbox({
  id,
  label,
  checked,
  onChange,
  indeterminate = false,
  size = 'md',
  disabled = false,
  ariaLabel,
  className,
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);

  /* indeterminate는 HTML attribute가 아닌 DOM property */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClassNames = [
    styles.wrapper,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const boxClassNames = [
    styles.box,
    styles[size],
    checked && styles.active,
    indeterminate && styles.indeterminate,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={wrapperClassNames}>
      <input
        ref={inputRef}
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-label={!label ? ariaLabel : undefined}
        className={styles.input}
      />
      <span className={boxClassNames}>
        {indeterminate ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
          </svg>
        ) : checked ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        ) : null}
      </span>
      {label && <span className={styles.text}>{label}</span>}
    </label>
  );
}
