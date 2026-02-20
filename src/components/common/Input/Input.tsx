'use client';

import styles from './Input.module.css';

/* =========================================================
 * 기본 아이콘 (inline SVG — 외부 파일 의존 없음)
 * =======================================================*/

const DefaultSearchIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const DefaultCloseIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

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

  /** 입력 변형 — 'search' 시 검색 아이콘 + 지우기 버튼 + Enter 검색 자동 적용 */
  variant?: 'default' | 'search';

  /** 현재 값 */
  value?: string;

  /** 값 변경 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** 키 입력 핸들러 */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  /** Enter 검색 핸들러 (variant="search" 시 사용) */
  onSearch?: (value: string) => void;

  /** 에러 메시지 (있으면 에러 스타일 적용 + 메시지 표시) */
  error?: string;

  /** HTML autocomplete 속성 */
  autoComplete?: string;

  /** 필수 입력 여부 (라벨 옆 * 표시) */
  required?: boolean;

  /** 비활성화 */
  disabled?: boolean;

  /** 읽기 전용 — 선택·복사는 가능하지만 수정 불가 */
  readOnly?: boolean;

  /** 왼쪽 아이콘 */
  startIcon?: React.ReactNode;

  /** 오른쪽 아이콘 (클릭 가능) */
  endIcon?: React.ReactNode;

  /** 오른쪽 아이콘 클릭 핸들러 */
  onEndIconClick?: () => void;

  /** search variant 지우기 버튼 접근성 라벨 @default 'Clear' */
  clearLabel?: string;

  /** 오른쪽 아이콘 버튼 접근성 라벨 (variant="default" 시 사용) */
  endIconLabel?: string;

  /** 추가 CSS 클래스 (input 요소에 적용) */
  className?: string;

  /** ARIA: combobox 등 역할 지정 */
  role?: string;

  /** ARIA: 드롭다운 열림 상태 */
  'aria-expanded'?: boolean;

  /** ARIA: 제어 대상 요소 id */
  'aria-controls'?: string;

  /** ARIA: 키보드 포커스된 옵션 id */
  'aria-activedescendant'?: string;

  /** ARIA: 자동완성 타입 */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
}

/* =========================================================
 * 컴포넌트
 * =======================================================*/

export function Input({
  id,
  label,
  placeholder,
  type = 'text',
  variant = 'default',
  value,
  onChange,
  onKeyDown,
  onSearch,
  error,
  autoComplete,
  required,
  disabled,
  readOnly,
  startIcon,
  endIcon,
  onEndIconClick,
  clearLabel = 'Clear',
  endIconLabel,
  className,
  role,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'aria-activedescendant': ariaActiveDescendant,
  'aria-autocomplete': ariaAutoComplete,
}: InputProps) {
  const isSearch = variant === 'search';

  /* search variant일 때 아이콘 자동 적용 */
  const resolvedStartIcon = isSearch
    ? DefaultSearchIcon
    : startIcon;

  const resolvedEndIcon = isSearch
    ? (value ? DefaultCloseIcon : undefined)
    : endIcon;

  const resolvedEndIconClick = isSearch
    ? () => {
        if (onChange) {
          const nativeEvent = new Event('input', { bubbles: true });
          const syntheticEvent = {
            target: { value: '' },
            currentTarget: { value: '' },
            nativeEvent,
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    : onEndIconClick;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSearch && e.key === 'Enter' && onSearch) {
      onSearch(value ?? '');
    }
    onKeyDown?.(e);
  };

  /** error 메시지 id — id가 없으면 undefined로 안전 처리 */
  const errorId = id ? `${id}-error` : undefined;

  const inputClassNames = [
    styles.input,
    error && styles.inputError,
    readOnly && styles.readOnly,
    resolvedStartIcon && styles.hasStartIcon,
    resolvedEndIcon && styles.hasEndIcon,
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

      <div className={styles.inputWrapper}>
        {resolvedStartIcon && (
          <span className={styles.startIcon} aria-hidden="true">
            {resolvedStartIcon}
          </span>
        )}

        <input
          id={id}
          type={isSearch ? 'search' : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          role={role}
          aria-expanded={ariaExpanded}
          aria-controls={ariaControls}
          aria-activedescendant={ariaActiveDescendant}
          aria-autocomplete={ariaAutoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error && errorId ? errorId : undefined}
          className={inputClassNames}
        />

        {resolvedEndIcon && (
          <button
            type="button"
            className={styles.endIcon}
            onClick={resolvedEndIconClick}
            tabIndex={-1}
            aria-label={isSearch ? clearLabel : endIconLabel}
          >
            {resolvedEndIcon}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
