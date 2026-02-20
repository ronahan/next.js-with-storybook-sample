import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

/* ---- Variant × Tone 매트릭스 ---- */

/** Soft (기본 톤) — 6가지 variant */
export const SoftVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="normal">normal</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

/** Solid 톤 — 6가지 variant */
export const SolidVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="primary" tone="solid">Primary</Badge>
      <Badge variant="normal" tone="solid">normal</Badge>
      <Badge variant="success" tone="solid">Success</Badge>
      <Badge variant="warning" tone="solid">Warning</Badge>
      <Badge variant="danger" tone="solid">Danger</Badge>
      <Badge variant="neutral" tone="solid">Neutral</Badge>
    </div>
  ),
};

/** 상태 점 (dot) */
export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="success" dot>정상</Badge>
      <Badge variant="normal" dot>운영중</Badge>
      <Badge variant="warning" dot>점검중</Badge>
      <Badge variant="danger" dot>장애</Badge>
      <Badge variant="neutral" dot>미확인</Badge>
    </div>
  ),
};

/** 상태 점 (dot) + Solid */
export const DotSolid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="success" tone="solid" dot>정상</Badge>
      <Badge variant="normal" tone="solid" dot>운영중</Badge>
      <Badge variant="warning" tone="solid" dot>점검중</Badge>
      <Badge variant="danger" tone="solid" dot>장애</Badge>
      <Badge variant="neutral" tone="solid" dot>미확인</Badge>
    </div>
  ),
};

/** 사이즈 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="primary" size="sm">sm</Badge>
      <Badge variant="primary" size="md">md</Badge>
      <Badge variant="normal" size="sm">sm</Badge>
      <Badge variant="normal" size="md">md</Badge>
    </div>
  ),
};

/** 라운딩 비교 */
export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="primary" rounded="md">rounded-md</Badge>
      <Badge variant="primary" rounded="full">rounded-full</Badge>
      <Badge variant="normal" rounded="md">rounded-md</Badge>
      <Badge variant="normal" rounded="full">rounded-full</Badge>
    </div>
  ),
};

/** startIcon */
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge
        variant="danger"
        startIcon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        }
      >
        Critical
      </Badge>
      <Badge
        variant="success"
        tone="solid"
        startIcon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m5 12 5 5L20 7" />
          </svg>
        }
      >
        완료
      </Badge>
      <Badge
        variant="normal"
        startIcon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        }
      >
        모니터링
      </Badge>
    </div>
  ),
};

/** Clickable */
export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="primary" clickable onClick={() => alert('clicked!')}>
        클릭 가능
      </Badge>
      <Badge variant="normal" clickable onClick={() => alert('normal!')}>
        필터 태그
      </Badge>
      <Badge variant="danger" tone="solid" clickable onClick={() => alert('delete')}>
        삭제 태그
      </Badge>
      <Badge variant="neutral" clickable disabled>
        비활성화
      </Badge>
    </div>
  ),
};

/** 실무 예시 — 관제 상태 */
export const SecurityStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#94a3b8', width: 80 }}>이벤트:</span>
        <Badge variant="danger" dot>Critical</Badge>
        <Badge variant="warning" dot>Warning</Badge>
        <Badge variant="normal" dot>Info</Badge>
        <Badge variant="success" dot>Normal</Badge>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#94a3b8', width: 80 }}>장비 상태:</span>
        <Badge variant="success" tone="solid" size="sm" rounded="full">Online</Badge>
        <Badge variant="danger" tone="solid" size="sm" rounded="full">Offline</Badge>
        <Badge variant="neutral" tone="solid" size="sm" rounded="full">Unknown</Badge>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#94a3b8', width: 80 }}>태그:</span>
        <Badge variant="normal" rounded="full">IDS</Badge>
        <Badge variant="normal" rounded="full">방화벽</Badge>
        <Badge variant="primary" rounded="full">SIEM</Badge>
        <Badge variant="neutral" rounded="full">기타</Badge>
      </div>
    </div>
  ),
};
