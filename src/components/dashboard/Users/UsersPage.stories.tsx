import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { Users } from './UsersPage';
import { AuthProvider } from '@/contexts/AuthContext';

// Storybook에서 AuthProvider를 감싸는 데코레이터
const withAuthProvider = (Story: () => ReactNode) => (
  <AuthProvider>
    <Story />
  </AuthProvider>
);

const meta: Meta<typeof Users> = {
  title: 'Users/Home',
  component: Users,
  decorators: [withAuthProvider],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Users>;

export const Default: Story = {};
