import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { Report } from './ReportPage';
import { AuthProvider } from '@/contexts/AuthContext';

// Storybook에서 AuthProvider를 감싸는 데코레이터
const withAuthProvider = (Story: () => ReactNode) => (
  <AuthProvider>
    <Story />
  </AuthProvider>
);

const meta: Meta<typeof Report> = {
  title: 'Report/Home',
  component: Report,
  decorators: [withAuthProvider],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Report>;

export const Default: Story = {};
