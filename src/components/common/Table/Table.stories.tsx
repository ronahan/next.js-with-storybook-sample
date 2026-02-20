import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Table } from './Table';
import { Checkbox } from '../Checkbox/Checkbox';

const meta: Meta<typeof Table> = {
  title: 'Common/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

/** 기본 테이블 */
export const Default: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell header>활동</Table.Cell>
          <Table.Cell header>사용자</Table.Cell>
          <Table.Cell header>시간</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>새 사용자 가입</Table.Cell>
          <Table.Cell>user123@email.com</Table.Cell>
          <Table.Cell>10분 전</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>상품 등록</Table.Cell>
          <Table.Cell>관리자</Table.Cell>
          <Table.Cell>1시간 전</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>문의 답변 완료</Table.Cell>
          <Table.Cell>관리자</Table.Cell>
          <Table.Cell>3시간 전</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

/** align, width 사용 */
export const WithAlignment: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell header width="200px">이름</Table.Cell>
          <Table.Cell header align="center" width="120px">상태</Table.Cell>
          <Table.Cell header align="right" width="160px">금액</Table.Cell>
          <Table.Cell header>설명</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell width="200px">IDS 센서 A</Table.Cell>
          <Table.Cell align="center" width="120px">정상</Table.Cell>
          <Table.Cell align="right" width="160px">₩1,200,000</Table.Cell>
          <Table.Cell>네트워크 모니터링 장비</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="200px">방화벽 B</Table.Cell>
          <Table.Cell align="center" width="120px">점검중</Table.Cell>
          <Table.Cell align="right" width="160px">₩3,500,000</Table.Cell>
          <Table.Cell>외부 트래픽 제어</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width="200px">SIEM 서버</Table.Cell>
          <Table.Cell align="center" width="120px">장애</Table.Cell>
          <Table.Cell align="right" width="160px">₩8,000,000</Table.Cell>
          <Table.Cell>통합 보안 이벤트 관리</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

/** Checkbox + selectable Row */
export const SelectableRows: Story = {
  render: function Render() {
    const rows = [
      { id: '1', action: '새 사용자 가입', user: 'user123@email.com', time: '10분 전' },
      { id: '2', action: '상품 등록', user: '관리자', time: '1시간 전' },
      { id: '3', action: '문의 답변 완료', user: '관리자', time: '3시간 전' },
    ];

    const [selected, setSelected] = useState<string[]>([]);
    const allChecked = selected.length === rows.length;
    const indeterminate = selected.length > 0 && !allChecked;

    const toggleAll = (checked: boolean) => {
      setSelected(checked ? rows.map((r) => r.id) : []);
    };

    const toggleRow = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
      );
    };

    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell header width="48px" align="center">
              <Checkbox
                checked={allChecked}
                indeterminate={indeterminate}
                onChange={toggleAll}
                size="sm"
                ariaLabel="전체 선택"
              />
            </Table.Cell>
            <Table.Cell header>활동</Table.Cell>
            <Table.Cell header>사용자</Table.Cell>
            <Table.Cell header width="120px">시간</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row
              key={row.id}
              selectable
              selected={selected.includes(row.id)}
              onClick={() => toggleRow(row.id)}
            >
              <Table.Cell width="48px" align="center">
                <Checkbox
                  checked={selected.includes(row.id)}
                  onChange={() => toggleRow(row.id)}
                  size="sm"
                  ariaLabel={`${row.action} 선택`}
                />
              </Table.Cell>
              <Table.Cell>{row.action}</Table.Cell>
              <Table.Cell>{row.user}</Table.Cell>
              <Table.Cell width="120px">{row.time}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

/** Scroll Table (sticky header) */
export const ScrollTable: Story = {
  render: function Render() {
    const logs = Array.from({ length: 30 }, (_, i) => ({
      id: String(i + 1),
      time: `2025-01-${String(15 + (i % 16)).padStart(2, '0')} ${String(9 + (i % 12)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      source: ['192.168.1.10', '10.0.0.5', '172.16.0.22', '192.168.2.100'][i % 4],
      event: ['Login Success', 'Login Failed', 'Port Scan Detected', 'Firewall Block', 'Session Timeout'][i % 5],
      severity: ['Low', 'Medium', 'High', 'Critical'][i % 4],
    }));

    return (
      <Table scroll height={360}>
        <Table.Head>
          <Table.Row>
            <Table.Cell header width="60px" align="center">#</Table.Cell>
            <Table.Cell header width="180px">시간</Table.Cell>
            <Table.Cell header width="150px">출발지 IP</Table.Cell>
            <Table.Cell header>이벤트</Table.Cell>
            <Table.Cell header width="100px" align="center">심각도</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {logs.map((log) => (
            <Table.Row key={log.id}>
              <Table.Cell width="60px" align="center">{log.id}</Table.Cell>
              <Table.Cell width="180px">{log.time}</Table.Cell>
              <Table.Cell width="150px">{log.source}</Table.Cell>
              <Table.Cell>{log.event}</Table.Cell>
              <Table.Cell width="100px" align="center">{log.severity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

/** 데이터 없음 */
export const Empty: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell header>활동</Table.Cell>
          <Table.Cell header>사용자</Table.Cell>
          <Table.Cell header>시간</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={3} align="center">
            데이터가 없습니다.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};
