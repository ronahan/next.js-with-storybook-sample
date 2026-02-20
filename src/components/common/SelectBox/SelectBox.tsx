'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './SelectBox.module.css';

/* =========================================================
 * 기본 화살표 아이콘 (inline SVG — 외부 파일 의존 없음)
 * =======================================================*/

const DefaultArrowIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 284.929 284.929"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z" />
  </svg>

);

/* =========================================================
 * 타입 정의
 * =======================================================*/

/** Select 옵션 타입 */
export interface SelectOption {
  /** 화면에 표시될 텍스트 */
  label: string;
  /** 실제 값 */
  value: string;
  /** 개별 옵션 비활성화 */
  disabled?: boolean;
}

/** SelectBox Props */
export interface SelectBoxProps {
  /** 요소 id (label 연결에 사용) */
  id?: string;

  /** 라벨 텍스트 */
  label?: string;

  /** 필수 입력 여부 (라벨 옆 * 표시) */
  required?: boolean;

  /** 현재 선택된 값 — null이면 placeholder 표시 */
  value: string | null;

  /** 옵션 목록 */
  options: SelectOption[];

  /** 값 변경 시 호출 */
  onChange: (value: string) => void;

  /** 선택 전 안내 문구 */
  placeholder?: string;

  /** 전체 비활성화 */
  disabled?: boolean;

  /** 에러 메시지 (있으면 에러 스타일 적용 + 메시지 표시) */
  error?: string;

  /** 사이즈 @default 'md' */
  size?: 'sm' | 'md';

  /** 화살표 아이콘 (외부 주입 가능) @default inline SVG chevron */
  arrowIcon?: React.ReactNode;

  /** 추가 CSS 클래스 (wrapper에 적용) */
  className?: string;
}

/* =========================================================
 * 컴포넌트
 * =======================================================*/

export function SelectBox({
  id,
  label,
  required,
  value,
  options,
  onChange,
  placeholder = '',
  disabled = false,
  error,
  size = 'md',
  arrowIcon = DefaultArrowIcon,
  className,
}: SelectBoxProps) {
  /** 드롭다운 열림 상태 */
  const [open, setOpen] = useState(false);

  /** 키보드 탐색용 포커스 인덱스 */
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /** 현재 선택된 옵션 */
  const selectedOption = options.find((o) => o.value === value) ?? null;

  /** ARIA id — id가 없으면 undefined로 안전 처리 */
  const listboxId = id ? `${id}-listbox` : undefined;
  const errorId = id ? `${id}-error` : undefined;
  const getOptionId = (index: number) =>
    id ? `${id}-option-${index}` : undefined;

  /* -------------------------------------------------------
   * 외부 클릭 시 닫기
   * -----------------------------------------------------*/
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  /* -------------------------------------------------------
   * 포커스 아웃 시 닫기 (Tab 등)
   * -----------------------------------------------------*/
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
      setFocusedIndex(-1);
    }
  };

  /* -------------------------------------------------------
   * 드롭다운 열기 (열리는 시점에 포커스 인덱스 계산)
   * -----------------------------------------------------*/
  const openDropdown = () => {
    const index = options.findIndex((o) => o.value === value);
    setFocusedIndex(index >= 0 ? index : 0);
    setOpen(true);
  };

  /* -------------------------------------------------------
   * 첫 번째 활성 옵션 인덱스
   * -----------------------------------------------------*/
  const findFirstEnabled = () =>
    options.findIndex((o) => !o.disabled);

  /* -------------------------------------------------------
   * 마지막 활성 옵션 인덱스
   * -----------------------------------------------------*/
  const findLastEnabled = () => {
    for (let i = options.length - 1; i >= 0; i--) {
      if (!options[i].disabled) return i;
    }
    return -1;
  };

  /* -------------------------------------------------------
   * 값 변경 커밋
   * -----------------------------------------------------*/
  const commitChange = (nextValue: string) => {
    if (disabled) return;

    onChange(nextValue);
    setOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  /* -------------------------------------------------------
   * 키보드 접근성
   * -----------------------------------------------------*/
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) openDropdown();
        else if (focusedIndex >= 0 && !options[focusedIndex]?.disabled)
          commitChange(options[focusedIndex].value);
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          openDropdown();
        } else {
          setFocusedIndex((i) => {
            let next = i + 1;
            while (next < options.length && options[next].disabled) next++;
            return next < options.length ? next : i;
          });
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!open) {
          openDropdown();
        } else {
          setFocusedIndex((i) => {
            let next = i - 1;
            while (next >= 0 && options[next].disabled) next--;
            return next >= 0 ? next : i;
          });
        }
        break;

      case 'Home': {
        e.preventDefault();
        const first = findFirstEnabled();
        if (first < 0) break;
        if (!open) {
          setOpen(true);
          setFocusedIndex(first);
        } else {
          setFocusedIndex(first);
        }
        break;
      }

      case 'End': {
        e.preventDefault();
        const last = findLastEnabled();
        if (last < 0) break;
        if (!open) {
          setOpen(true);
          setFocusedIndex(last);
        } else {
          setFocusedIndex(last);
        }
        break;
      }

      case 'Escape':
        setOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
    }
  };

  /* -------------------------------------------------------
   * 렌더
   * -----------------------------------------------------*/
  const wrapperClassNames = [
    styles.wrapper,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const triggerClassNames = [
    styles.trigger,
    styles[size],
    error && styles.triggerError,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={wrapperRef} className={wrapperClassNames} onBlur={handleBlur}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={triggerClassNames}
        disabled={disabled}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open && focusedIndex >= 0
            ? getOptionId(focusedIndex)
            : undefined
        }
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && errorId ? errorId : undefined}
        aria-required={required || undefined}
        onClick={() => (open ? setOpen(false) : openDropdown())}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedOption ? styles.value : styles.placeholder}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`} aria-hidden="true">
          {arrowIcon}
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          className={styles.dropdown}
          role="listbox"
          aria-label={label ?? placeholder}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={getOptionId(index)}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled || undefined}
              className={[
                styles.option,
                option.value === value && styles.selected,
                index === focusedIndex && styles.focused,
                option.disabled && styles.optionDisabled,
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() =>
                !option.disabled && setFocusedIndex(index)
              }
              onMouseDown={(e) => {
                e.preventDefault();
                if (!option.disabled) commitChange(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={errorId} role="alert" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
