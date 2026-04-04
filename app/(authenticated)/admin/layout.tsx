import { AdminLayoutClient } from '@/app/components/pages/AdminLayoutClient'

export default async function AdminLayout({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return <AdminLayoutClient sidebar={sidebar}>{children}</AdminLayoutClient>
}
