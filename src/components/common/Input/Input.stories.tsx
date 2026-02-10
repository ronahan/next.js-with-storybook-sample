import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: 'input-default',
    placeholder: '입력하세요',
  },
};

export const WithLabel: Story = {
  args: {
    id: 'input-email',
    label: '이메일',
    placeholder: 'email@example.com',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    id: 'input-required',
    label: '필수 입력',
    placeholder: '필수 항목입니다',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    id: 'input-error',
    label: '이메일',
    value: 'invalid-email',
    error: '올바른 이메일 형식이 아닙니다.',
  },
};

export const Password: Story = {
  args: {
    id: 'input-password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'input-disabled',
    label: '비활성화',
    value: '수정 불가',
    disabled: true,
  },
};
