import { type ReactNode } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
