import type { ReactNode } from 'react';

export type ProgressTone = 'success' | 'warning' | 'danger' | 'info';

export interface BaseProgressProps {
  /** 진행률 (0~100) — 내부에서 clamp 처리 */
  value: number;
  /** 색상 톤 @default 'info' */
  tone?: ProgressTone;
  /** 크기 @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** 라벨 렌더 함수 — 기본: (v) => `${v}%`, null 반환 시 미표시 */
  renderLabel?: (value: number) => ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}
