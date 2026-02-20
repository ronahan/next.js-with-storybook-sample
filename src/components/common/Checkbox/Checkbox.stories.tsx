import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** 기본 — 라벨 없음 */
export const Default: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return <Checkbox id="default" checked={checked} onChange={setChecked} ariaLabel="동의" />;
  },
};

/** 라벨 포함 */
export const WithLabel: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true);

    return (
      <Checkbox
        id="with-label"
        label="이용약관에 동의합니다"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

/** Indeterminate 상태 */
export const Indeterminate: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox
          id="ind"
          label="Indeterminate (클릭하면 checked로 전환)"
          checked={checked}
          onChange={setChecked}
          indeterminate
        />
        <Checkbox
          id="ind-checked"
          label="Indeterminate + checked=true"
          checked={true}
          onChange={() => {}}
          indeterminate
        />
      </div>
    );
  },
};

/** 사이즈 비교 */
export const Sizes: Story = {
  render: function Render() {
    const [sm, setSm] = useState(true);
    const [md, setMd] = useState(true);

    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Checkbox id="size-sm" label="sm" size="sm" checked={sm} onChange={setSm} />
        <Checkbox id="size-md" label="md" size="md" checked={md} onChange={setMd} />
      </div>
    );
  },
};

/** 비활성화 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Checkbox id="dis-off" label="미체크 비활성" checked={false} onChange={() => {}} disabled />
      <Checkbox id="dis-on" label="체크 비활성" checked={true} onChange={() => {}} disabled />
      <Checkbox
        id="dis-ind"
        label="Indeterminate 비활성"
        checked={false}
        onChange={() => {}}
        indeterminate
        disabled
      />
    </div>
  ),
};

/** 실무 예시 — 전체 선택 + 개별 선택 */
export const SelectAllGroup: Story = {
  render: function Render() {
    const items = ['IDS 로그', '방화벽 로그', 'SIEM 이벤트', '접근 제어 로그'];
    const [selected, setSelected] = useState<string[]>(['IDS 로그', 'SIEM 이벤트']);

    const allChecked = selected.length === items.length;
    const indeterminate = selected.length > 0 && !allChecked;

    const handleSelectAll = (checked: boolean) => {
      setSelected(checked ? [...items] : []);
    };

    const handleToggle = (item: string, checked: boolean) => {
      setSelected((prev) =>
        checked ? [...prev, item] : prev.filter((v) => v !== item),
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 260 }}>
        <Checkbox
          id="select-all"
          label="전체 선택"
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={handleSelectAll}
        />
        <div style={{ borderTop: '1px solid #334155', margin: '4px 0' }} />
        {items.map((item) => (
          <div key={item} style={{ paddingLeft: 24 }}>
            <Checkbox
              id={`item-${item}`}
              label={item}
              checked={selected.includes(item)}
              onChange={(checked) => handleToggle(item, checked)}
            />
          </div>
        ))}
      </div>
    );
  },
};
