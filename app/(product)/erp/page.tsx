import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { generatePageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata({
  title: 'Dashboard',
  description: 'Overview of the ERP system with analytics, reports, and notifications.',
  keywords: ['ERP', 'Dashboard', 'Analytics', 'Reports', 'Notifications'],
  baseTitle: 'ERP System',
})


export default function Home() {
  return <DashboardPage />
}
