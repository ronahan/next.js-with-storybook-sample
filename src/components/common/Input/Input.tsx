'use client';

import styles from './Input.module.css';

/* =========================================================
 * 타입 정의
 * =======================================================*/

/** Input Props */
export interface InputProps {
  /** input 요소 id (label 연결·에러 메시지 연결에 사용) */
  id?: string;

  /** 라벨 텍스트 (없으면 라벨 미렌더링) */
  label?: string;

  /** placeholder 텍스트 */
  placeholder?: string;

  /** input 타입 @default 'text' */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url';

  /** 현재 값 */
  value?: string;

  /** 값 변경 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** 에러 메시지 (있으면 에러 스타일 적용 + 메시지 표시) */
  error?: string;

  /** HTML autocomplete 속성 */
  autoComplete?: string;

  /** 필수 입력 여부 (라벨 옆 * 표시) */
  required?: boolean;

  /** 비활성화 */
  disabled?: boolean;

  /** 추가 CSS 클래스 (input 요소에 적용) */
  className?: string;
}

/* =========================================================
 * 컴포넌트
 * =======================================================*/

export function Input({
  id,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  required,
  disabled,
  className,
}: InputProps) {
  const inputClassNames = [
    styles.input,
    error && styles.inputError,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClassNames}
      />

      {error && (
        <p id={`${id}-error`} role="alert" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
