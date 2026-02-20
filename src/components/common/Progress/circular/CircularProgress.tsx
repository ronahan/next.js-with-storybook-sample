'use client';

import { useState , useEffect } from 'react';
import type { BaseProgressProps } from '../base/types';
import { useProgressValue } from '../base/useProgressValue';
import styles from './CircularProgress.module.css';

const SIZES = {
  sm: { size: 48, strokeWidth: 4 },
  md: { size: 64, strokeWidth: 5 },
  lg: { size: 80, strokeWidth: 6 },
} as const;

const LABEL_CLASS: Record<string, string> = {
  sm: 'labelSm',
  md: 'labelMd',
  lg: 'labelLg',
};

const defaultRenderLabel = (value: number) => `${value}%`;

export function CircularProgress({
  value,
  tone = 'info',
  size = 'md',
  renderLabel = defaultRenderLabel,
  className,
}: BaseProgressProps) {
  const clamped = useProgressValue(value);

  const { size: svgSize, strokeWidth } = SIZES[size];
  const r = (svgSize - strokeWidth) / 2;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const circumference = 2 * Math.PI * r;

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDisplayValue(clamped);
    });
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  const offset =  circumference - (displayValue / 100) * circumference;
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
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <circle
          className={styles.track}
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={strokeWidth}
        />
        <circle
          className={fillClass}
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
      {label != null && <span className={labelClass}>{label}</span>}
    </div>
  );
}

CircularProgress.displayName = 'CircularProgress';
