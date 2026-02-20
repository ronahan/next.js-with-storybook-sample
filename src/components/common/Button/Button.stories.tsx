import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

/* 스토리용 예시 아이콘 (인라인 SVG) */
const PlusIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ArrowRightIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TrashIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
  </svg>
);

const SettingsIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ---- 기존 스토리 ---- */

export const Primary: Story = {
  args: {
    children: '확인',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: '취소',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: '삭제',
    variant: 'danger',
  },
};

export const Small: Story = {
  args: {
    children: '작은 버튼',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: '큰 버튼',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  args: {
    children: '로그인',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '버튼 비활성화',
    disabled: true,
  },
};

/* ---- Icon 스토리 ---- */

export const WithStartIcon: Story = {
  args: {
    children: '추가',
    startIcon: PlusIcon,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: '다음',
    endIcon: ArrowRightIcon,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: '검색',
    startIcon: SearchIcon,
    endIcon: ArrowRightIcon,
  },
};

/* ---- Loading 스토리 ---- */

export const Loading: Story = {
  args: {
    children: '저장 중',
    loading: true,
  },
};

export const LoadingSecondary: Story = {
  args: {
    children: '불러오는 중',
    variant: 'secondary',
    loading: true,
  },
};

/* ---- IconOnly 스토리 ---- */

export const IconOnly: Story = {
  args: {
    startIcon: PlusIcon,
    iconOnly: true,
  },
};

export const IconOnlyDanger: Story = {
  args: {
    startIcon: TrashIcon,
    variant: 'danger',
    iconOnly: true,
  },
};

/* ---- Ghost 스토리 ---- */

export const Ghost: Story = {
  args: {
    children: '설정',
    variant: 'ghost',
  },
};

export const GhostWithIcon: Story = {
  args: {
    children: '설정',
    variant: 'ghost',
    startIcon: SettingsIcon,
  },
};

export const GhostIconOnly: Story = {
  args: {
    startIcon: SettingsIcon,
    variant: 'ghost',
    iconOnly: true,
  },
};
