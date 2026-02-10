'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './SelectBox.module.css';

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
  /** 현재 선택된 값 (필수) — null이면 placeholder 표시 */
  value: string | null;

  /** 옵션 목록 (필수) */
  options: SelectOption[];

  /** 값 변경 시 호출 (필수) */
  onChange: (value: string) => void;

  /** 선택 전 안내 문구 */
  placeholder?: string;

  /** 전체 비활성화 */
  disabled?: boolean;

  /** 추가 CSS 클래스 (wrapper에 적용) */
  className?: string;
}

/* =========================================================
 * 컴포넌트
 * =======================================================*/

export function SelectBox({
  value,
  options,
  onChange,
  placeholder = '',
  disabled = false,
  className,
}: SelectBoxProps) {
  /** 드롭다운 열림 상태 */
  const [open, setOpen] = useState(false);

  /** 키보드 탐색용 포커스 인덱스 */
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /** 현재 선택된 옵션 */
  const selectedOption = options.find(o => o.value === value) ?? null;

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
   * 열릴 때 포커스 위치 설정
   * -----------------------------------------------------*/
  useEffect(() => {
    if (!open) return;

    const index = options.findIndex(o => o.value === value);
    setFocusedIndex(index >= 0 ? index : 0);
  }, [open, options, value]);

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
        if (!open) setOpen(true);
        else if (focusedIndex >= 0)
          commitChange(options[focusedIndex].value);
        break;

      case 'ArrowDown':
        e.preventDefault();
        setOpen(true);
        setFocusedIndex(i => Math.min(i + 1, options.length - 1));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(i => Math.max(i - 1, 0));
        break;

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

  return (
    <div ref={wrapperRef} className={wrapperClassNames}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedOption ? styles.value : styles.placeholder}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span className={styles.arrow}>▾</span>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox">
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={[
                styles.option,
                option.value === value && styles.selected,
                index === focusedIndex && styles.focused,
                option.disabled && styles.optionDisabled,
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => setFocusedIndex(index)}
              onClick={() =>
                !option.disabled && commitChange(option.value)
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
