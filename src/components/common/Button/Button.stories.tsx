import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
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
    children: '로그인',
    type: 'button',
  },
};

export const Submit: Story = {
  args: {
    children: '제출하기',
    type: 'submit',
  },
};

export const Disabled: Story = {
  args: {
    children: '버튼 비활성화',
    disabled: true,
  },
};
