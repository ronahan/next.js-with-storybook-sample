import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { AuthProvider } from '@/contexts/AuthContext';

const withAuth = (Story: () => ReactNode) => (
  <AuthProvider>
    <Story />
  </AuthProvider>
);

const meta: Meta<typeof DashboardLayout> = {
  title: 'Layout/DashboardLayout',
  component: DashboardLayout,
  decorators: [withAuth],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h1>대시보드 콘텐츠</h1>
        <p>메인 콘텐츠 영역입니다.</p>
      </div>
    ),
  },
};
