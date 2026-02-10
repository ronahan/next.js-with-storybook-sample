import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SelectBox } from './SelectBox';

const meta: Meta<typeof SelectBox> = {
  title: 'Common/SelectBox',
  component: SelectBox,
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

const SAMPLE_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

export const Default: Story = {
  args: {
    value: null,
    options: SAMPLE_OPTIONS,
    placeholder: '상태 선택',
  },
};

export const WithValue: Story = {
  args: {
    value: 'active',
    options: SAMPLE_OPTIONS,
  },
};

export const Disabled: Story = {
  args: {
    value: 'active',
    options: SAMPLE_OPTIONS,
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    value: null,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive', disabled: true },
      { label: 'Pending', value: 'pending' },
    ],
    placeholder: '상태 선택',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div style={{ width: 240 }}>
        <SelectBox
          value={value}
          options={SAMPLE_OPTIONS}
          placeholder="상태 선택"
          onChange={setValue}
        />
        <p style={{ marginTop: 8, fontSize: 13, color: 'var(--color-text-secondary)' }}>
          선택된 값: {value ?? '없음'}
        </p>
      </div>
    );
  },
};
