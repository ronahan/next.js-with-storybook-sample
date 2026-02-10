'use client';

import { useState } from 'react';
// import { Table } from '@/components/common/Table/Table';
import { SelectBox } from '@/components/common/SelectBox/SelectBox';

const columns = [
  { key: 'action', label: '활동' },
  { key: 'user', label: '사용자' },
  { key: 'time', label: '시간' },
];

const data = [
  { id: '1', action: '새 사용자 가입', user: 'user123@email.com', time: '10분 전' },
  { id: '2', action: '상품 등록', user: '관리자', time: '1시간 전' },
  { id: '3', action: '문의 답변 완료', user: '관리자', time: '3시간 전' },
];

/** 리포트 상태 필터 옵션 */
const STATUS_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '진행중', value: 'progress' },
  { label: '완료', value: 'done' },
];

export function Report() {
  /** 테이블 선택 상태 */
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  /** 리포트 상태 필터 값 */
  const [statusFilter, setStatusFilter] = useState<string | null>('all');

  return (
    <section>
      <h1 style={{ marginBottom: 8 }}>Report</h1>

      <h2>최근 활동</h2>

      {/* <Table
        columns={columns}
        data={data}
        rowKey="id"
        selectable
        selectedKeys={selectedRows}
        onSelectChange={setSelectedRows}
      /> */}

      {/* 🔽 공통 SelectBox 사용 예시 */}
      <div style={{ margin: '16px 0', width: 200 }}>
        <SelectBox
          value={statusFilter}
          options={STATUS_OPTIONS}
          placeholder="상태 필터"
          onChange={(value) => {
            setStatusFilter(value);
            // TODO: API 필터링 연결
          }}
        />
      </div>
    </section>
  );
}
