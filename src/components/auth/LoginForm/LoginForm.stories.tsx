import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { LoginForm } from './LoginForm';
import { AuthProvider } from '@/contexts/AuthContext';

// Storybook에서 AuthProvider를 감싸는 데코레이터
const withAuthProvider = (Story: () => ReactNode) => (
  <AuthProvider>
    <div style={{ maxWidth: 360, margin: '0 auto', padding: 24 }}>
      <Story />
    </div>
  </AuthProvider>
);

const meta: Meta<typeof LoginForm> = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  decorators: [withAuthProvider],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
