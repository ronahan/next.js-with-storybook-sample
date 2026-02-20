import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SelectBox } from './SelectBox';

const meta: Meta<typeof SelectBox> = {
  title: 'Common/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

const SAMPLE_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

/** 기본 — placeholder 표시 */
export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div style={{ width: 240 }}>
        <SelectBox
          id="default"
          value={value}
          options={SAMPLE_OPTIONS}
          placeholder="상태 선택"
          onChange={setValue}
        />
      </div>
    );
  },
};

/** 라벨 + 필수 표시 */
export const WithLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div style={{ width: 240 }}>
        <SelectBox
          id="with-label"
          label="리포트 상태"
          required
          value={value}
          options={SAMPLE_OPTIONS}
          placeholder="상태를 선택하세요"
          onChange={setValue}
        />
      </div>
    );
  },
};

/** 값 선택됨 */
export const WithValue: Story = {
  args: {
    id: 'with-value',
    value: 'active',
    options: SAMPLE_OPTIONS,
  },
};

/** 에러 상태 */
export const WithError: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div style={{ width: 240 }}>
        <SelectBox
          id="error"
          label="상태"
          required
          value={value}
          options={SAMPLE_OPTIONS}
          placeholder="상태 선택"
          onChange={setValue}
          error="필수 선택 항목입니다"
        />
      </div>
    );
  },
};

/** 사이즈: sm */
export const SizeSm: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>('active');

    return (
      <div style={{ width: 200 }}>
        <SelectBox
          id="size-sm"
          label="필터"
          value={value}
          options={SAMPLE_OPTIONS}
          onChange={setValue}
          size="sm"
        />
      </div>
    );
  },
};

/** 비활성화 */
export const Disabled: Story = {
  args: {
    id: 'disabled',
    label: '상태',
    value: 'active',
    options: SAMPLE_OPTIONS,
    disabled: true,
  },
};

/** 개별 옵션 비활성화 */
export const WithDisabledOption: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div style={{ width: 240 }}>
        <SelectBox
          id="disabled-option"
          label="상태"
          value={value}
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive (사용 불가)', value: 'inactive', disabled: true },
            { label: 'Pending', value: 'pending' },
          ]}
          placeholder="상태 선택"
          onChange={setValue}
        />
      </div>
    );
  },
};

/** 인터랙티브 — 선택 값 실시간 표시 */
export const Interactive: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div style={{ width: 240 }}>
        <SelectBox
          id="interactive"
          label="상태 필터"
          value={value}
          options={SAMPLE_OPTIONS}
          placeholder="상태 선택"
          onChange={setValue}
        />
        <p style={{ marginTop: 8, fontSize: 13, color: 'var(--color-text-secondary, #cbd5e1)' }}>
          선택된 값: {value ?? '없음'}
        </p>
      </div>
    );
  },
};
