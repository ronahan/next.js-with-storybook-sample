import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { AutoComplete } from './AutoComplete';
import type { AutoCompleteOption } from './AutoComplete';

/** 예시 데이터 */
const MOCK_IPS: AutoCompleteOption[] = [
  { label: '192.168.1.1', value: '192.168.1.1' },
  { label: '192.168.1.10', value: '192.168.1.10' },
  { label: '192.168.1.100', value: '192.168.1.100' },
  { label: '192.168.1.101', value: '192.168.1.101' },
  { label: '10.0.0.1', value: '10.0.0.1' },
  { label: '10.0.0.12', value: '10.0.0.12' },
  { label: '10.0.0.123', value: '10.0.0.123' },
  { label: '172.16.0.1', value: '172.16.0.1' },
  { label: '172.16.0.50', value: '172.16.0.50' },
];

const MOCK_USERS: AutoCompleteOption[] = [
  { label: 'admin@company.com', value: 'admin' },
  { label: 'analyst01@company.com', value: 'analyst01' },
  { label: 'analyst02@company.com', value: 'analyst02' },
  { label: 'manager@company.com', value: 'manager' },
  { label: 'monitor01@company.com', value: 'monitor01' },
  { label: 'monitor02@company.com', value: 'monitor02' },
  { label: 'security@company.com', value: 'security' },
];

const meta: Meta<typeof AutoComplete> = {
  title: 'Common/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

/** 싱글 — IP 검색 후 하나 선택 */
export const SingleSelect: Story = {
  render: function Render() {
    const [options, setOptions] = useState<AutoCompleteOption[]>([]);
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div style={{ width: 300 }}>
        <AutoComplete
          id="single-ip"
          label="출발지 IP"
          placeholder="예: 192 또는 10.0"
          options={options}
          value={selected}
          onChange={setSelected}
          onSearch={(keyword) => {
            setOptions(MOCK_IPS.filter((ip) => ip.label.includes(keyword)));
          }}
        />
      </div>
    );
  },
};

/** 멀티 — 담당자 다중 선택 + 태그 칩 */
export const MultiSelect: Story = {
  render: function Render() {
    const [options, setOptions] = useState<AutoCompleteOption[]>([]);
    const [selected, setSelected] = useState<string[]>(['admin', 'analyst01']);

    return (
      <div style={{ width: 300 }}>
        <AutoComplete
          id="multi-user"
          label="담당자 지정"
          placeholder="예: admin 또는 monitor"
          mode="multi"
          options={options}
          values={selected}
          selectedOptions={MOCK_USERS}
          onMultiChange={setSelected}
          onSearch={(keyword) => {
            setOptions(MOCK_USERS.filter((u) => u.label.includes(keyword)));
          }}
        />
      </div>
    );
  },
};

/** 멀티 — IP 차단 목록 + 태그 칩 */
export const MultiSelectIP: Story = {
  render: function Render() {
    const [options, setOptions] = useState<AutoCompleteOption[]>([]);
    const [selected, setSelected] = useState<string[]>([
      '192.168.1.1',
      '10.0.0.1',
      '172.16.0.1',
    ]);

    return (
      <div style={{ width: 300 }}>
        <AutoComplete
          id="multi-ip"
          label="차단 IP 목록"
          placeholder="예: 192 또는 10.0"
          mode="multi"
          options={options}
          values={selected}
          selectedOptions={MOCK_IPS}
          onMultiChange={setSelected}
          onSearch={(keyword) => {
            setOptions(MOCK_IPS.filter((ip) => ip.label.includes(keyword)));
          }}
        />
      </div>
    );
  },
};

/** 로딩 상태 */
export const Loading: Story = {
  render: function Render() {
    const [keyword, setKeyword] = useState('19');

    return (
      <div style={{ width: 300 }}>
        <AutoComplete
          id="loading"
          label="로딩 예시"
          placeholder="검색어를 입력하세요"
          options={[]}
          loading={true}
          onSearch={setKeyword}
        />
      </div>
    );
  },
};

/** 결과 없음 */
export const EmptyResult: Story = {
  render: function Render() {
    const [options, setOptions] = useState<AutoCompleteOption[]>([]);

    return (
      <div style={{ width: 300 }}>
        <AutoComplete
          id="empty"
          label="결과 없음 예시"
          placeholder="예: 999 입력"
          options={options}
          onSearch={(keyword) => {
            setOptions(MOCK_IPS.filter((ip) => ip.label.includes(keyword)));
          }}
          emptyMessage="일치하는 IP가 없습니다"
        />
      </div>
    );
  },
};

/** 라벨 + 필수 표시 */
export const WithLabelRequired: Story = {
  render: function Render() {
    const [options, setOptions] = useState<AutoCompleteOption[]>([]);
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div style={{ width: 300 }}>
        <AutoComplete
          id="with-label"
          label="목적지 IP"
          required
          placeholder="IP 주소를 입력하세요"
          options={options}
          value={selected}
          onChange={setSelected}
          onSearch={(keyword) => {
            setOptions(MOCK_IPS.filter((ip) => ip.label.includes(keyword)));
          }}
        />
      </div>
    );
  },
};
