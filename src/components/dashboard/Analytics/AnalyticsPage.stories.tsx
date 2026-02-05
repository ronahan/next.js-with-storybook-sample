import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { Analytics } from './AnalyticsPage';
import { AuthProvider } from '@/contexts/AuthContext';

// Storybook에서 AuthProvider를 감싸는 데코레이터
const withAuthProvider = (Story: () => ReactNode) => (
  <AuthProvider>
    <Story />
  </AuthProvider>
);

const meta: Meta<typeof Analytics> = {
  title: 'Analytics/Home',
  component: Analytics,
  decorators: [withAuthProvider],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Analytics>;

export const Default: Story = {};
