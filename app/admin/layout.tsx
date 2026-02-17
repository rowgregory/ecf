import { AdminLayoutClient } from '../components/pages/AdminLayoutClient'

export default async function AdminPage({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
