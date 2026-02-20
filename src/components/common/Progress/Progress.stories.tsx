import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useEffect } from 'react';
import { LinearProgress } from './linear';
import { CircularProgress } from './circular';
import { HalfGaugeProgress } from './gauge';

/* =========================================================
 * Meta
 * =======================================================*/
const meta: Meta = {
  title: 'Common/Progress',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/* =========================================================
 * LinearProgress
 * =======================================================*/

/** Linear — 톤별 비교 */
export const LinearTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      <LinearProgress value={85} tone="success" />
      <LinearProgress value={62} tone="warning" />
      <LinearProgress value={40} tone="danger" />
      <LinearProgress value={73} tone="info" />
    </div>
  ),
};

/** Linear — 사이즈 비교 */
export const LinearSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      <LinearProgress value={70} size="sm" tone="info" />
      <LinearProgress value={70} size="md" tone="info" />
      <LinearProgress value={70} size="lg" tone="info" />
    </div>
  ),
};

/** Linear — 커스텀 라벨 */
export const LinearCustomLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      <LinearProgress value={72} tone="info" renderLabel={(v) => `${v}/100`} />
      <LinearProgress value={50} tone="warning" renderLabel={(v) => `진행 중 (${v}%)`} />
      <LinearProgress value={30} tone="danger" renderLabel={() => null} />
    </div>
  ),
};

/* =========================================================
 * CircularProgress
 * =======================================================*/

/** Circular — 톤별 비교 */
export const CircularTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <CircularProgress value={85} tone="success" />
      <CircularProgress value={62} tone="warning" />
      <CircularProgress value={40} tone="danger" />
      <CircularProgress value={73} tone="info" />
    </div>
  ),
};

/** Circular — 사이즈 비교 */
export const CircularSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <CircularProgress value={75} size="sm" tone="info" />
      <CircularProgress value={75} size="md" tone="info" />
      <CircularProgress value={75} size="lg" tone="info" />
    </div>
  ),
};

/** Circular — 애니메이션 */
export const CircularAnimated: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <CircularProgress value={60} tone="info"/>
      <CircularProgress value={80} tone="success" size="lg" />
    </div>
  ),
};

/* =========================================================
 * HalfGaugeProgress
 * =======================================================*/

/** HalfGauge — 톤별 비교 */
export const GaugeTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <HalfGaugeProgress value={85} tone="success" />
      <HalfGaugeProgress value={62} tone="warning" />
      <HalfGaugeProgress value={40} tone="danger" />
      <HalfGaugeProgress value={73} tone="info" />
    </div>
  ),
};

/** HalfGauge — 사이즈 비교 */
export const GaugeSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <HalfGaugeProgress value={75} size="sm" tone="info" />
      <HalfGaugeProgress value={75} size="md" tone="info" />
      <HalfGaugeProgress value={75} size="lg" tone="info" />
    </div>
  ),
};

/** HalfGauge — 커스텀 라벨 */
export const GaugeCustomLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <HalfGaugeProgress
        value={92}
        tone="success"
        size="lg"
        renderLabel={(v) => (
          <span>
            <strong style={{ fontSize: 24 }}>{v}</strong>
            <span style={{ fontSize: 12, opacity: 0.7 }}> / 100</span>
          </span>
        )}
      />
      <HalfGaugeProgress
        value={38}
        tone="danger"
        size="lg"
        renderLabel={(v) => (
          <span style={{ fontSize: 12 }}>위험 {v}%</span>
        )}
      />
    </div>
  ),
};

/* =========================================================
 * 인터랙티브 데모
 * =======================================================*/

/** 실시간 업데이트 데모 */
export const InteractiveDemo: Story = {
  render: function Render() {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 80);
      return () => clearInterval(timer);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 400 }}>
        <div>
          <h4 style={{ marginBottom: 8, color: '#cbd5e1', fontSize: 13 }}>Linear</h4>
          <LinearProgress value={value} tone="info" />
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: 8, color: '#cbd5e1', fontSize: 13 }}>Circular</h4>
            <CircularProgress value={value} tone="success" size="lg" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: 8, color: '#cbd5e1', fontSize: 13 }}>Half Gauge</h4>
            <HalfGaugeProgress value={value} tone="warning" size="lg" />
          </div>
        </div>
      </div>
    );
  },
};
