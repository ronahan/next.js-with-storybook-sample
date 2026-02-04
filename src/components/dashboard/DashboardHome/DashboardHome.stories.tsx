import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { DashboardHome } from './DashboardHome';
import { AuthProvider } from '@/contexts/AuthContext';

// Storybook에서 AuthProvider를 감싸는 데코레이터
const withAuthProvider = (Story: () => ReactNode) => (
  <AuthProvider>
    <Story />
  </AuthProvider>
);

const meta: Meta<typeof DashboardHome> = {
  title: 'Dashboard/Home',
  component: DashboardHome,
  decorators: [withAuthProvider],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardHome>;

export const Default: Story = {};
