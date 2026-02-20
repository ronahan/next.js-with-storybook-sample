'use client';

import { useState , useEffect } from 'react';
import type { BaseProgressProps } from '../base/types';
import { useProgressValue } from '../base/useProgressValue';
import styles from './HalfGaugeProgress.module.css';

const SIZES = {
  sm: { width: 96, strokeWidth: 6 },
  md: { width: 128, strokeWidth: 8 },
  lg: { width: 160, strokeWidth: 10 },
} as const;

const LABEL_CLASS: Record<string, string> = {
  sm: 'labelSm',
  md: 'labelMd',
  lg: 'labelLg',
};

const defaultRenderLabel = (value: number) => `${value}%`;

export function HalfGaugeProgress({
  value,
  tone = 'info',
  size = 'md',
  renderLabel = defaultRenderLabel,
  className,
}: BaseProgressProps) {
  const clamped = useProgressValue(value);
  const { width, strokeWidth } = SIZES[size];
  const r = (width - strokeWidth) / 2;
  const cx = width / 2;
  const cy = width / 2;
  const halfCircumference = Math.PI * r;
  const fullCircumference = 2 * Math.PI * r;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDisplayValue(clamped);
    });
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  const filled = (displayValue / 100) * halfCircumference;

  /* viewBox: 상반원만 표시 (하단 잘라냄) */
  const viewHeight = cy + strokeWidth / 2;

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(' ');
  const fillClass = [
    styles.fill,
    styles[tone],
  ]
    .filter(Boolean)
    .join(' ');

  const label = renderLabel(clamped);
  const labelClass = [
    styles.label,
    styles[LABEL_CLASS[size]],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      <svg
        width={width}
        height={viewHeight}
        viewBox={`0 0 ${width} ${viewHeight}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Track (배경 반원) */}
        <circle
          className={styles.track}
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={`${halfCircumference} ${fullCircumference}`}
          transform={`rotate(180 ${cx} ${cy})`}
        />
        {/* Fill (진행 반원 — 좌→우) */}
        <circle
          className={fillClass}
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={`${filled} ${fullCircumference - filled}`}
          transform={`rotate(180 ${cx} ${cy})`}
        />
      </svg>
      {label != null && <span className={labelClass}>{label}</span>}
    </div>
  );
}

HalfGaugeProgress.displayName = 'HalfGaugeProgress';
