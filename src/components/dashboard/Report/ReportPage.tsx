'use client';

import { useState } from 'react';
import { Table } from '@/components/common/Table/Table';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { SelectBox } from '@/components/common/SelectBox/SelectBox';
import { AutoComplete } from '@/components/common/AutoComplete/AutoComplete';
import type { AutoCompleteOption } from '@/components/common/AutoComplete/AutoComplete';
import { Badge } from '@/components/common/Badge/Badge';
import { Toggle } from '@/components/common/Toggle/Toggle';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';
import { LinearProgress, CircularProgress, HalfGaugeProgress } from '@/components/common/Progress';
import settingIcon from '@/assets/icons/icon_setting.svg';

const ACTIVITY_DATA = [
  { id: '1', action: '새 사용자 가입', user: 'user123@email.com', time: '10분 전' },
  { id: '2', action: '상품 등록', user: '관리자', time: '1시간 전' },
  { id: '3', action: '문의 답변 완료', user: '관리자', time: '3시간 전' },
];

const LOG_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  time: `2025-01-${String(15 + (i % 16)).padStart(2, '0')} ${String(9 + (i % 12)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
  source: ['192.168.1.10', '10.0.0.5', '172.16.0.22', '192.168.2.100'][i % 4],
  event: ['Login Success', 'Login Failed', 'Port Scan Detected', 'Firewall Block', 'Session Timeout'][i % 5],
  severity: ['Low', 'Medium', 'High', 'Critical'][i % 4],
}));

/** AutoComplete 예시용 Mock IP 데이터 */
const MOCK_IPS: AutoCompleteOption[] = [
  { label: '192.168.1.1', value: '192.168.1.1' },
  { label: '192.168.1.10', value: '192.168.1.10' },
  { label: '192.168.1.100', value: '192.168.1.100' },
  { label: '10.0.0.1', value: '10.0.0.1' },
  { label: '10.0.0.12', value: '10.0.0.12' },
  { label: '172.16.0.1', value: '172.16.0.1' },
  { label: '172.16.0.50', value: '172.16.0.50' },
];

/** 리포트 상태 필터 옵션 */
const STATUS_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '진행중', value: 'progress' },
  { label: '완료', value: 'done' },
];

/** 심각도 옵션 */
const SEVERITY_OPTIONS = [
  { label: 'Critical', value: 'critical' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
  { label: 'Info (비활성)', value: 'info', disabled: true },
];

/** 기간 옵션 */
const PERIOD_OPTIONS = [
  { label: '최근 1시간', value: '1h' },
  { label: '최근 24시간', value: '24h' },
  { label: '최근 7일', value: '7d' },
  { label: '최근 30일', value: '30d' },
];

export function Report() {
  /** 테이블 선택 상태 */
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  /** 리포트 상태 필터 값 */
  const [statusFilter, setStatusFilter] = useState<string | null>('all');

  /** 검색어 */
  const [searchKeyword, setSearchKeyword] = useState('');

  /** 리포트 제목 */
  const [reportTitle, setReportTitle] = useState('');

  /** AutoComplete: 싱글 */
  const [ipOptions, setIpOptions] = useState<AutoCompleteOption[]>([]);
  const [selectedIp, setSelectedIp] = useState<string | null>(null);

  /** AutoComplete: 멀티 */
  const [multiIpOptions, setMultiIpOptions] = useState<AutoCompleteOption[]>([]);
  const [selectedIps, setSelectedIps] = useState<string[]>(['192.168.1.1', '10.0.0.1']);

  /** SelectBox 예시 */
  const [severity, setSeverity] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>('24h');
  const [errorDemo, setErrorDemo] = useState<string | null>(null);

  /** Toggle 예시 */
  const [notify, setNotify] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  /** Checkbox 예시 */
  const [agree, setAgree] = useState(false);
  const LOG_TYPES = ['IDS 로그', '방화벽 로그', 'SIEM 이벤트', '접근 제어 로그'];
  const [selectedLogs, setSelectedLogs] = useState<string[]>(['IDS 로그', 'SIEM 이벤트']);

  return (
    <section>
      <h1 style={{ marginBottom: 8 }}>Report</h1>

      {/* ── Progress 예시 ── */}
      <h2 style={{ marginTop: 32, marginBottom: 12 }}>Progress 예시</h2>

      {/* Linear */}
      <h3 style={{ marginBottom: 8 }}>LinearProgress</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360, marginBottom: 24 }}>
        <LinearProgress value={85} tone="success" />
        <LinearProgress value={62} tone="warning" size="lg" />
        <LinearProgress value={40} tone="danger" />
        <LinearProgress value={73} tone="info" renderLabel={(v) => `${v}/100`} />
      </div>

      {/* Circular */}
      <h3 style={{ marginBottom: 8 }}>CircularProgress</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24 }}>
        <CircularProgress value={92} tone="success" size="sm" />
        <CircularProgress value={68} tone="warning" />
        <CircularProgress value={35} tone="danger" size="lg" />
        <CircularProgress value={78} tone="info" size="lg"  />
      </div>

      {/* Half Gauge */}
      <h3 style={{ marginBottom: 8 }}>HalfGaugeProgress</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', marginBottom: 24 }}>
        <HalfGaugeProgress value={88} tone="success" size="sm" />
        <HalfGaugeProgress value={55} tone="warning" />
        <HalfGaugeProgress
          value={92}
          tone="info"
          size="lg"
          renderLabel={(v) => (
            <span>
              <strong style={{ fontSize: 24 }}>{v}</strong>
              <span style={{ fontSize: 12, opacity: 0.7 }}> / 100</span>
            </span>
          )}
        />
        <HalfGaugeProgress value={25} tone="danger" size="lg"  />
      </div>
      {/* 검색 Input */}
      <div style={{ margin: '16px 0', width: 300 }}>
        <Input
          id="report-search"
          variant="search"
          placeholder="활동 내용을 검색하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onSearch={(v) => {
            // TODO: 검색 API 연결
            console.log('검색:', v);
          }}
        />
      </div>

      {/* Label 있는 Input */}
      <div style={{ margin: '16px 0', width: 300 }}>
        <Input
          id="report-title"
          label="리포트 제목"
          required
          placeholder="리포트 제목을 입력하세요"
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
        />
      </div>

      {/* AutoComplete: 싱글 */}
      <div style={{ margin: '16px 0', width: 300 }}>
        <AutoComplete
          id="ip-single"
          label="출발지 IP"
          placeholder="IP 주소를 입력하세요"
          options={ipOptions}
          value={selectedIp}
          onChange={setSelectedIp}
          onSearch={(keyword) => {
            setIpOptions(MOCK_IPS.filter((ip) => ip.label.includes(keyword)));
          }}
        />
      </div>

      {/* AutoComplete: 멀티 */}
      <div style={{ margin: '16px 0', width: 300 }}>
        <AutoComplete
          id="ip-multi"
          label="차단 IP 목록"
          placeholder="IP 주소를 입력하세요"
          mode="multi"
          options={multiIpOptions}
          values={selectedIps}
          selectedOptions={MOCK_IPS}
          onMultiChange={setSelectedIps}
          onSearch={(keyword) => {
            setMultiIpOptions(MOCK_IPS.filter((ip) => ip.label.includes(keyword)));
          }}
        />
      </div>

      <h2>최근 활동</h2>
      <Button
        startIcon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        }
      >
        등록
      </Button>
      <Button
        variant="secondary"
        startIcon={<img src={settingIcon.src} alt="" />}
      >
        설정
      </Button>
      <div style={{ marginTop: 16 }}>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell header width="48px" align="center">
                <Checkbox
                  checked={selectedRows.length === ACTIVITY_DATA.length}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < ACTIVITY_DATA.length}
                  onChange={(checked) =>
                    setSelectedRows(checked ? ACTIVITY_DATA.map((r) => r.id) : [])
                  }
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
            {ACTIVITY_DATA.map((row) => (
              <Table.Row
                key={row.id}
                selectable
                selected={selectedRows.includes(row.id)}
                onClick={() =>
                  setSelectedRows((prev) =>
                    prev.includes(row.id)
                      ? prev.filter((v) => v !== row.id)
                      : [...prev, row.id],
                  )
                }
              >
                <Table.Cell width="48px" align="center">
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() =>
                      setSelectedRows((prev) =>
                        prev.includes(row.id)
                          ? prev.filter((v) => v !== row.id)
                          : [...prev, row.id],
                      )
                    }
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
      </div>

      {/* ── Scroll Table 예시 ── */}
      <h2 style={{ marginTop: 32, marginBottom: 12 }}>Scroll Table (Sticky Header)</h2>
      <Table scroll height={300}>
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
          {LOG_DATA.map((log) => (
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

      {/* ── SelectBox 예시 ── */}
      <h2 style={{ marginTop: 32, marginBottom: 12 }}>SelectBox 예시</h2>

      {/* 필터바 — 가로 배치 (sm) */}
      <h3 style={{ marginBottom: 8 }}>필터바 (sm, label 없음)</h3>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 160 }}>
          <SelectBox
            id="filter-status"
            value={statusFilter}
            options={STATUS_OPTIONS}
            placeholder="상태"
            size="sm"
            onChange={setStatusFilter}
          />
        </div>
        <div style={{ width: 160 }}>
          <SelectBox
            id="filter-severity"
            value={severity}
            options={SEVERITY_OPTIONS}
            placeholder="심각도"
            size="sm"
            onChange={setSeverity}
          />
        </div>
        <div style={{ width: 160 }}>
          <SelectBox
            id="filter-period"
            value={period}
            options={PERIOD_OPTIONS}
            placeholder="기간"
            size="sm"
            onChange={setPeriod}
          />
        </div>
      </div>

      {/* 폼 필드 — label + required (md) */}
      <h3 style={{ marginBottom: 8 }}>폼 필드 (md, label + required)</h3>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ width: 240 }}>
          <SelectBox
            id="form-status"
            label="리포트 상태"
            required
            value={statusFilter}
            options={STATUS_OPTIONS}
            placeholder="상태를 선택하세요"
            onChange={setStatusFilter}
          />
        </div>
        <div style={{ width: 240 }}>
          <SelectBox
            id="form-severity"
            label="심각도"
            required
            value={severity}
            options={SEVERITY_OPTIONS}
            placeholder="심각도를 선택하세요"
            onChange={setSeverity}
          />
        </div>
      </div>

      {/* 에러 상태 — 선택하면 에러 사라짐 */}
      <h3 style={{ marginBottom: 8 }}>에러 상태</h3>
      <div style={{ width: 240, marginBottom: 24 }}>
        <SelectBox
          id="form-error"
          label="담당자 그룹"
          required
          value={errorDemo}
          options={STATUS_OPTIONS}
          placeholder="선택하세요"
          onChange={setErrorDemo}
          error={errorDemo === null ? '필수 선택 항목입니다' : undefined}
        />
      </div>

      {/* 비활성화 */}
      <h3 style={{ marginBottom: 8 }}>비활성화</h3>
      <div style={{ width: 240, marginBottom: 24 }}>
        <SelectBox
          id="form-disabled"
          label="권한 레벨"
          value="high"
          options={SEVERITY_OPTIONS}
          disabled
          onChange={() => {}}
        />
      </div>

      {/* id 없이 사용 (aria-label fallback 확인) */}
      <h3 style={{ marginBottom: 8 }}>id 없이 사용 (placeholder fallback)</h3>
      <div style={{ width: 200, marginBottom: 24 }}>
        <SelectBox
          value={period}
          options={PERIOD_OPTIONS}
          placeholder="조회 기간"
          size="sm"
          onChange={setPeriod}
        />
      </div>

      {/* ── Badge 예시 ── */}
      <h2 style={{ marginTop: 32, marginBottom: 12 }}>Badge 예시</h2>

      {/* Soft 톤 */}
      <h3 style={{ marginBottom: 8 }}>Soft (기본)</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="normal">Normal</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="neutral">Neutral</Badge>
      </div>

      {/* Solid 톤 */}
      <h3 style={{ marginBottom: 8 }}>Solid</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Badge variant="primary" tone="solid">Primary</Badge>
        <Badge variant="normal" tone="solid">Normal</Badge>
        <Badge variant="success" tone="solid">Success</Badge>
        <Badge variant="warning" tone="solid">Warning</Badge>
        <Badge variant="danger" tone="solid">Danger</Badge>
        <Badge variant="neutral" tone="solid">Neutral</Badge>
      </div>

      {/* 상태 점 (dot) */}
      <h3 style={{ marginBottom: 8 }}>상태 표시 (dot)</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Badge variant="success" dot>정상</Badge>
        <Badge variant="normal" dot>운영중</Badge>
        <Badge variant="warning" dot>점검중</Badge>
        <Badge variant="danger" dot>장애</Badge>
        <Badge variant="neutral" dot>미확인</Badge>
      </div>

      {/* 사이즈 + 라운딩 */}
      <h3 style={{ marginBottom: 8 }}>사이즈 / 라운딩</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
        <Badge variant="primary" size="sm">sm</Badge>
        <Badge variant="primary" size="md">md</Badge>
        <Badge variant="normal" rounded="full">IDS</Badge>
        <Badge variant="success" tone="solid" size="sm" rounded="full">Online</Badge>
        <Badge variant="danger" tone="solid" size="sm" rounded="full">Offline</Badge>
      </div>

      {/* 아이콘 + 클릭 가능 */}
      <h3 style={{ marginBottom: 8 }}>아이콘 / 클릭 가능</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
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
        <Badge variant="normal" clickable onClick={() => alert('clicked!')}>
          필터 태그
        </Badge>
        <Badge variant="primary" clickable onClick={() => alert('clicked!')}>
          클릭 가능
        </Badge>
        <Badge variant="neutral" clickable disabled>
          비활성화
        </Badge>
      </div>

      {/* ── Toggle 예시 ── */}
      <h2 style={{ marginTop: 32, marginBottom: 12 }}>Toggle 예시</h2>

      {/* 기본 + 라벨 */}
      <h3 style={{ marginBottom: 8 }}>기본 / 라벨</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
        <Toggle id="t-notify" label="이벤트 알림" checked={notify} onChange={setNotify} />
        <Toggle id="t-refresh" label="자동 새로고침" labelPosition="left" checked={autoRefresh} onChange={setAutoRefresh} />
      </div>

      {/* 사이즈 비교 */}
      <h3 style={{ marginBottom: 8 }}>사이즈 (sm / md)</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
        <Toggle id="t-sm" label="sm" size="sm" checked={darkMode} onChange={setDarkMode} />
        <Toggle id="t-md" label="md" size="md" checked={darkMode} onChange={setDarkMode} />
      </div>

      {/* 비활성화 */}
      <h3 style={{ marginBottom: 8 }}>비활성화</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
        <Toggle id="t-dis-off" label="OFF 비활성" checked={false} onChange={() => {}} disabled />
        <Toggle id="t-dis-on" label="ON 비활성" checked={true} onChange={() => {}} disabled />
      </div>

      {/* 설정 패널 예시 */}
      <h3 style={{ marginBottom: 8 }}>설정 패널 (실무 예시)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#f1f5f9' }}>이벤트 알림</span>
          <Toggle id="s-notify" checked={notify} onChange={setNotify} size="sm" />
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

      {/* ── Checkbox 예시 ── */}
      <h2 style={{ marginTop: 32, marginBottom: 12 }}>Checkbox 예시</h2>

      {/* 기본 */}
      <h3 style={{ marginBottom: 8 }}>기본 / 라벨</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
        <Checkbox id="cb-agree" label="이용약관에 동의합니다" checked={agree} onChange={setAgree} />
        <Checkbox id="cb-sm" label="sm 사이즈" size="sm" checked={agree} onChange={setAgree} />
      </div>

      {/* 비활성화 */}
      <h3 style={{ marginBottom: 8 }}>비활성화</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
        <Checkbox id="cb-dis-off" label="미체크" checked={false} onChange={() => {}} disabled />
        <Checkbox id="cb-dis-on" label="체크" checked={true} onChange={() => {}} disabled />
        <Checkbox id="cb-dis-ind" label="Indeterminate" checked={false} onChange={() => {}} indeterminate disabled />
      </div>

      {/* 전체 선택 + Indeterminate */}
      <h3 style={{ marginBottom: 8 }}>전체 선택 + Indeterminate (실무 예시)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 260, marginBottom: 16 }}>
        <Checkbox
          id="cb-all"
          label="전체 선택"
          checked={selectedLogs.length === LOG_TYPES.length}
          indeterminate={selectedLogs.length > 0 && selectedLogs.length < LOG_TYPES.length}
          onChange={(checked) => setSelectedLogs(checked ? [...LOG_TYPES] : [])}
        />
        <div style={{ borderTop: '1px solid #334155', margin: '4px 0' }} />
        {LOG_TYPES.map((logType) => (
          <div key={logType} style={{ paddingLeft: 24 }}>
            <Checkbox
              id={`cb-${logType}`}
              label={logType}
              checked={selectedLogs.includes(logType)}
              onChange={(checked) =>
                setSelectedLogs((prev) =>
                  checked ? [...prev, logType] : prev.filter((v) => v !== logType),
                )
              }
            />
          </div>
        ))}
      </div>

    </section>
  );
}
