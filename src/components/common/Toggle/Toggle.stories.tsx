import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Common/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/** 기본 — 라벨 없음 */
export const Default: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return <Toggle id="default" checked={checked} onChange={setChecked} />;
  },
};

/** 라벨 (오른쪽, 기본) */
export const WithLabel: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true);

    return (
      <Toggle
        id="with-label"
        label="알림 수신"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

/** 라벨 (왼쪽) */
export const LabelLeft: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return (
      <Toggle
        id="label-left"
        label="다크 모드"
        labelPosition="left"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

/** 사이즈 비교 */
export const Sizes: Story = {
  render: function Render() {
    const [sm, setSm] = useState(true);
    const [md, setMd] = useState(true);

    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Toggle id="size-sm" label="sm" size="sm" checked={sm} onChange={setSm} />
        <Toggle id="size-md" label="md" size="md" checked={md} onChange={setMd} />
      </div>
    );
  },
};

/** 비활성화 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Toggle id="dis-off" label="OFF 비활성" checked={false} onChange={() => {}} disabled />
      <Toggle id="dis-on" label="ON 비활성" checked={true} onChange={() => {}} disabled />
    </div>
  ),
};

/** 실무 예시 — 설정 패널 */
export const SettingsPanel: Story = {
  render: function Render() {
    const [notify, setNotify] = useState(true);
    const [sound, setSound] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#f1f5f9' }}>이벤트 알림</span>
          <Toggle id="s-notify" checked={notify} onChange={setNotify} size="sm" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#f1f5f9' }}>알림 소리</span>
          <Toggle id="s-sound" checked={sound} onChange={setSound} size="sm" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#f1f5f9' }}>자동 새로고침</span>
          <Toggle id="s-refresh" checked={autoRefresh} onChange={setAutoRefresh} size="sm" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#f1f5f9' }}>다크 모드</span>
          <Toggle id="s-dark" checked={darkMode} onChange={setDarkMode} size="sm" />
        </div>
      </div>
    );
  },
};
