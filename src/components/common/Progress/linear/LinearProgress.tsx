'use client';
import { useState , useEffect } from 'react';
import type { BaseProgressProps } from '../base/types';
import { useProgressValue } from '../base/useProgressValue';
import styles from './LinearProgress.module.css';

const defaultRenderLabel = (value: number) => `${value}%`;

export function LinearProgress({
  value,
  tone = 'info',
  size = 'md',
  renderLabel = defaultRenderLabel,
  className,
}: BaseProgressProps) {
  const clamped = useProgressValue(value);

  //mount + value 변경 애니메이션용 상태
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDisplayValue(clamped);
    });
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(' ');
  const trackClass = [styles.track, styles[size]].filter(Boolean).join(' ');
  const barClass = [styles.bar,styles[tone]].filter(Boolean).join(' ');

  const label = renderLabel(clamped);

  return (
    <div className={wrapperClass}>
      <div
        className={trackClass}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={barClass} style={{ width: `${displayValue}%` }} />
      </div>
      {label != null && <span className={styles.label}>{label}</span>}
    </div>
  );
}

LinearProgress.displayName = 'LinearProgress';
