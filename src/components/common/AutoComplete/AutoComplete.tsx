'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Input } from '../Input/Input';
import styles from './AutoComplete.module.css';

/* =========================================================
 * 타입 정의
 * =======================================================*/

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  /** input 요소 id */
  id?: string;

  /** 라벨 텍스트 */
  label?: string;

  /** 필수 입력 여부 */
  required?: boolean;

  /** placeholder 텍스트 */
  placeholder?: string;

  /** 비활성화 */
  disabled?: boolean;

  /** 드롭다운에 표시할 옵션 목록 (외부에서 전달) */
  options: AutoCompleteOption[];

  /** 싱글/멀티 모드 @default 'single' */
  mode?: 'single' | 'multi';

  /** 싱글: 선택된 값 */
  value?: string | null;

  /** 멀티: 선택된 값 배열 */
  values?: string[];

  /** 싱글 선택 핸들러 */
  onChange?: (value: string | null) => void;

  /** 멀티 선택 핸들러 */
  onMultiChange?: (values: string[]) => void;

  /** 검색어 변경 핸들러 (API 호출용) */
  onSearch: (keyword: string) => void;

  /** 검색 최소 글자 수 @default 2 */
  minSearchLength?: number;

  /** 로딩 상태 */
  loading?: boolean;

  /** 로딩 중 메시지 @default 'Loading...' */
  loadingMessage?: string;

  /** 결과 없을 때 메시지 @default 'No results found' */
  emptyMessage?: string;

  /** 멀티 모드 — 선택된 옵션의 label 표시용 (초기값 태그 표시에 필요) */
  selectedOptions?: AutoCompleteOption[];

  /** 추가 CSS 클래스 */
  className?: string;
}

/* =========================================================
 * 컴포넌트
 * =======================================================*/

export function AutoComplete({
  id,
  label,
  required,
  placeholder,
  disabled = false,
  options,
  mode = 'single',
  value,
  values = [],
  onChange,
  onMultiChange,
  onSearch,
  minSearchLength = 2,
  loading = false,
  loadingMessage = 'Loading...',
  emptyMessage = 'No results found',
  selectedOptions = [],
  className,
}: AutoCompleteProps) {
  const [keyword, setKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const isMulti = mode === 'multi';
  const meetsMinLength = keyword.length >= minSearchLength;
  const showDropdown = open && meetsMinLength;

  const listboxId = id ? `${id}-listbox` : undefined;
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
   * 검색어 변경
   * -----------------------------------------------------*/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setKeyword(next);
    setFocusedIndex(-1);

    if (next.length >= minSearchLength) {
      onSearch(next);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  /* -------------------------------------------------------
   * 싱글 선택
   * -----------------------------------------------------*/
  const selectSingle = (option: AutoCompleteOption) => {
    onChange?.(option.value);
    setKeyword(option.label);
    setOpen(false);
    setFocusedIndex(-1);
  };

  /* -------------------------------------------------------
   * 멀티 토글
   * -----------------------------------------------------*/
  const toggleMulti = (option: AutoCompleteOption) => {
    const isSelected = values.includes(option.value);
    const next = isSelected
      ? values.filter((v) => v !== option.value)
      : [...values, option.value];
    onMultiChange?.(next);
  };

  /* -------------------------------------------------------
   * 멀티 태그 제거
   * -----------------------------------------------------*/
  const removeTag = (targetValue: string) => {
    onMultiChange?.(values.filter((v) => v !== targetValue));
  };

  /* -------------------------------------------------------
   * 옵션 클릭
   * -----------------------------------------------------*/
  const handleOptionClick = (option: AutoCompleteOption) => {
    if (isMulti) {
      toggleMulti(option);
    } else {
      selectSingle(option);
    }
  };

  /* -------------------------------------------------------
   * 키보드 내비게이션
   * -----------------------------------------------------*/
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
        break;

      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleOptionClick(options[focusedIndex]);
        }
        break;

      case 'Escape':
        setOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  /* -------------------------------------------------------
   * 싱글 모드: 지우기
   * -----------------------------------------------------*/
  const handleClear = () => {
    setKeyword('');
    setOpen(false);
    if (!isMulti) {
      onChange?.(null);
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

  /* -------------------------------------------------------
   * 포커스 아웃 시 닫기 (Tab 등)
   * -----------------------------------------------------*/
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className={wrapperClassNames} onBlur={handleBlur}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* 멀티: 선택된 태그 */}
      {isMulti && values.length > 0 && (
        <div className={styles.tags}>
          {values.map((v) => {
            const opt = options.find((o) => o.value === v)
              ?? selectedOptions.find((o) => o.value === v);
            return (
              <span key={v} className={styles.tag}>
                {opt?.label ?? v}
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={() => removeTag(v)}
                  aria-label={`Remove ${opt?.label ?? v}`}
                >
                  ✕
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Input */}
      <Input
        id={id}
        variant="search"
        placeholder={placeholder}
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onSearch={() => {}}
        disabled={disabled}
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={showDropdown ? listboxId : undefined}
        aria-activedescendant={
          showDropdown && focusedIndex >= 0
            ? getOptionId(focusedIndex)
            : undefined
        }
        aria-autocomplete="list"
      />

      {/* 드롭다운 */}
      {showDropdown && (
        <ul
          id={listboxId}
          className={styles.dropdown}
          role="listbox"
          aria-multiselectable={isMulti || undefined}
        >
          {loading ? (
            <li className={styles.message} role="status" aria-live="polite">{loadingMessage}</li>
          ) : options.length === 0 ? (
            <li className={styles.message} role="status" aria-live="polite">{emptyMessage}</li>
          ) : (
            options.map((option, index) => {
              const isSelected = isMulti
                ? values.includes(option.value)
                : option.value === value;

              return (
                <li
                  key={option.value}
                  id={getOptionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    styles.option,
                    isSelected && styles.selected,
                    index === focusedIndex && styles.focused,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleOptionClick(option);
                  }}
                >
                  {isMulti && (
                    <span
                      className={[
                        styles.checkbox,
                        isSelected && styles.checkboxChecked,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m5 12 5 5L20 7" />
                        </svg>
                      )}
                    </span>
                  )}
                  {option.label}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
