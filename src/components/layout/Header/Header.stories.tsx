import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { Header } from './Header';
import { LayoutProvider } from '@/contexts/LayoutContext';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/layout.css';


const withProviders = (Story: () => ReactNode) => (
  <AuthProvider>
    <LayoutProvider>
      <Story />
    </LayoutProvider>
  </AuthProvider>
);

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  decorators: [withProviders],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
