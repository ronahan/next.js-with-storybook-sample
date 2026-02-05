import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { LayoutProvider } from '@/contexts/LayoutContext';
import '@/styles/layout.css';


const withProviders = (Story: () => ReactNode) => (
  <LayoutProvider>
    <div style={{ marginTop: 60 }}>
      <Story />
    </div>
  </LayoutProvider>
);

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  decorators: [withProviders],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
