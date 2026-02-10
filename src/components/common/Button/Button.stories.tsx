import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
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
