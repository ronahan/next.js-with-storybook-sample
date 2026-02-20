'use client';

import type { ReactNode, CSSProperties } from 'react';
import styles from './Table.module.css';

/* =========================================================
 * 타입 정의
 * =======================================================*/

export interface TableProps {
  children: ReactNode;
  className?: string;
  /** 스크롤 모드 (sticky header + overflow scroll) */
  scroll?: boolean;
  /** 스크롤 컨테이너 최대 높이 (scroll=true 시 사용) */
  height?: number | string;
  layout?: 'auto' | 'fixed';
}

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: ReactNode;
  /** 행 선택 가능 (hover 강조 + cursor: pointer) */
  selectable?: boolean;
  /** 선택 상태 배경색 */
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface TableCellProps {
  children?: ReactNode;
  /** true → <th scope="col">, default → <td> */
  header?: boolean;
  /** 텍스트 정렬 @default 'left' */
  align?: 'left' | 'center' | 'right';
  /** 셀 너비 (CSS custom property로 적용) */
  width?: string;
  className?: string;
  colSpan?: number;
  ellipsis?: boolean; // 말줄임 , width 와 함께 사용
}

/* =========================================================
 * Sub-components
 * =======================================================*/

function TableRoot({ children, className, scroll, height, layout="auto" }: TableProps) {
  const tableClass = [styles.table, className].filter(Boolean).join(' ');


  const wrapperStyle = scroll ? { maxHeight: height } : undefined;
  const wrapperClass = scroll ? styles.scrollWrapper : undefined;

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <table
        className={tableClass}
        style={{ tableLayout: layout }}
      >
        {children}
      </table>
    </div>
  );
}

TableRoot.displayName = 'Table';

function Head({ children, className }: TableHeadProps) {
  const classNames = [styles.head, className].filter(Boolean).join(' ');

  return <thead className={classNames}>{children}</thead>;
}
Head.displayName = 'Table.Head';

function Body({ children, className }: TableBodyProps) {
  const classNames = [styles.body, className].filter(Boolean).join(' ');

  return <tbody className={classNames}>{children}</tbody>;
}
Body.displayName = 'Table.Body';

function Row({ children, selectable = false, selected = false, onClick, className }: TableRowProps) {
  const classNames = [
    styles.row,
    selectable && styles.selectable,
    selected && styles.selected,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr className={classNames} onClick={onClick}>
      {children}
    </tr>
  );
}
Row.displayName = 'Table.Row';

function Cell({ children, header = false, align, width, className, colSpan }: TableCellProps) {
  const classNames = [
    styles.cell,
    header && styles.headerCell,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cssVars: CSSProperties | undefined =
    align || width
      ? ({
          ...(width && { '--cell-w': width }),
          ...(align && { '--cell-align': align }),
        } as CSSProperties)
      : undefined;

  if (header) {
    return (
      <th scope="col" className={classNames} style={cssVars} colSpan={colSpan}>
        {children}
      </th>
    );
  }

  return (
    <td className={classNames} style={cssVars} colSpan={colSpan}>
      {children}
    </td>
  );
}
Cell.displayName = 'Table.Cell';

/* =========================================================
 * Compound Component Export
 * =======================================================*/

export const Table = Object.assign(TableRoot, {
  Head,
  Body,
  Row,
  Cell,
});
