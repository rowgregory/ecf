'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, ShieldCheck, Shield, User } from 'lucide-react'
import { TUser } from '@/types/entities/user'
import { store } from '@/app/lib/store/store'
import { setOpenUpdateAdminModal } from '@/app/lib/store/slices/uiSlice'

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = 'createdAt' | 'email' | 'lastLoginAt' | 'role'
type SortDir = 'asc' | 'desc'
type TabRole = 'ALL' | 'SUPERUSER' | 'ADMIN' | 'USER'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtDate = (d: Date | string | null | undefined) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

const fmtDateTime = (d: Date | string | null | undefined) =>
  d
    ? new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    : 'Never'

const roleIcon = (role: string) => {
  if (role === 'SUPERUSER') return <ShieldCheck className="w-3 h-3" />
  if (role === 'ADMIN') return <Shield className="w-3 h-3" />
  return <User className="w-3 h-3" />
}

const roleClass: Record<string, string> = {
  SUPERUSER: 'text-secondary-light dark:text-secondary-dark',
  ADMIN: 'text-primary-light dark:text-primary-dark',
  USER: 'text-text-light/50 dark:text-text-dark/40'
}

const TABS: TabRole[] = ['ALL', 'SUPERUSER', 'ADMIN', 'USER']

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="bg-bg-light dark:bg-bg-dark border border-border-subtle dark:border-border-dark p-5">
    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-2">
      {label}
    </p>
    <p className="font-mono text-xl font-bold text-text-light dark:text-text-dark">{value}</p>
    {sub && <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 mt-1">{sub}</p>}
  </div>
)

// ─── Row ─────────────────────────────────────────────────────────────────────

const UserRow = ({ user }: { user: TUser }) => (
  <motion.tr
    onClick={() => store.dispatch(setOpenUpdateAdminModal(user))}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="border-b border-border-subtle dark:border-border-dark hover:bg-accent dark:hover:bg-accent-dark transition-colors duration-100 group cursor-pointer"
  >
    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-accent dark:bg-accent-dark border border-border-subtle dark:border-border-dark flex items-center justify-center shrink-0">
          <span className="font-mono text-[9px] font-bold text-text-light/50 dark:text-text-dark/40">
            {(user.firstName?.[0] ?? user.email[0]).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-mono text-xs text-text-light dark:text-text-dark">
            {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : '—'}
          </p>
          <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">{user.email}</p>
        </div>
      </div>
    </td>
    <td className="px-4 py-3">
      <span
        className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider ${roleClass[user.role] ?? 'text-text-light/50'}`}
      >
        {roleIcon(user.role)}
        {user.role.toLowerCase()}
      </span>
    </td>
    <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">
      {user.emailVerified ? (
        <span className="text-green-600 dark:text-green-400">{`verified`}</span>
      ) : (
        <span className="text-text-light/30 dark:text-text-dark/25">{`unverified`}</span>
      )}
    </td>
    <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">{user.phone ?? '—'}</td>
    <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">
      {fmtDateTime(user.lastLoginAt)}
    </td>
    <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">
      {fmtDate(user.createdAt)}
    </td>
  </motion.tr>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminUsersClient({ users }: { users: TUser[] }) {
  const [tab, setTab] = useState<TabRole>('ALL')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortField>('createdAt')
  const [dir, setDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return users
      .filter((u) => tab === 'ALL' || u.role === tab)
      .filter(
        (u) =>
          !q ||
          u.email.toLowerCase().includes(q) ||
          `${u.firstName ?? ''} ${u.lastName ?? ''}`.toLowerCase().includes(q) ||
          (u.phone ?? '').includes(q)
      )
      .sort((a, b) => {
        let av: number | string = (a[sort] ?? '') as number | string
        let bv: number | string = (b[sort] ?? '') as number | string
        if (sort === 'createdAt' || sort === 'lastLoginAt') {
          av = av ? new Date(av).getTime() : 0
          bv = bv ? new Date(bv).getTime() : 0
        }
        return dir === 'asc' ? (av > bv ? 1 : -1) : av < bv ? 1 : -1
      })
  }, [users, tab, search, sort, dir])

  const toggleSort = (f: SortField) => {
    if (sort === f) setDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSort(f)
      setDir('desc')
    }
  }

  // Stats
  const total = users.length
  const admins = users.filter((u) => u.role === 'ADMIN' || u.role === 'SUPERUSER').length
  const verified = users.filter((u) => u.emailVerified).length
  const recentDays = 30
  const recent = users.filter((u) => {
    const d = new Date(u.createdAt)
    // eslint-disable-next-line react-hooks/purity
    return (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24) <= recentDays
  }).length

  const thClass =
    'px-4 py-3 font-mono text-[9px] tracking-[0.15em] uppercase text-text-light/35 dark:text-text-dark/30 text-left select-none'
  const thSortClass = (f: SortField) =>
    `${thClass} cursor-pointer hover:text-text-light dark:hover:text-text-dark transition-colors ${sort === f ? 'text-text-light dark:text-text-dark' : ''}`
  const sortIndicator = (f: SortField) => (sort === f ? (dir === 'asc' ? ' ↑' : ' ↓') : '')

  return (
    <div className="p-6 xs:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-border-subtle dark:border-border-dark pb-6">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2">
          {`// users`}
        </p>
        <h1 className="font-mono text-2xl font-bold text-text-light dark:text-text-dark">Users</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle dark:bg-border-dark">
        <StatCard label="Total Users" value={String(total)} sub="all time" />
        <StatCard label="Admins" value={String(admins)} sub="admin + superuser" />
        <StatCard label="Verified" value={String(verified)} sub="email verified" />
        <StatCard label="New (30d)" value={String(recent)} sub="recently joined" />
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
        <div className="flex border border-border-subtle dark:border-border-dark overflow-x-auto">
          {TABS.map((t) => {
            const count = t === 'ALL' ? users.length : users.filter((u) => u.role === t).length
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap transition-colors duration-150 ${
                  tab === t
                    ? 'bg-primary-light dark:bg-primary-dark text-black'
                    : 'text-text-light/50 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                {t.toLowerCase()} <span className="ml-1 opacity-60">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 border border-border-subtle dark:border-border-dark px-3 py-2 w-full xs:w-64">
          <Search className="w-3.5 h-3.5 text-text-light/30 dark:text-text-dark/30 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone..."
            className="bg-transparent font-mono text-xs text-text-light dark:text-text-dark placeholder-text-light/25 dark:placeholder-text-dark/25 outline-none w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-border-subtle dark:border-border-dark overflow-x-auto">
        <table className="w-full min-w-200">
          <thead className="border-b border-border-subtle dark:border-border-dark bg-accent dark:bg-accent-dark">
            <tr>
              <th className={thSortClass('email')} onClick={() => toggleSort('email')}>
                {`User${sortIndicator('email')}`}
              </th>
              <th className={thSortClass('role')} onClick={() => toggleSort('role')}>
                {`Role${sortIndicator('role')}`}
              </th>
              <th className={thClass}>Verified</th>
              <th className={thClass}>Phone</th>
              <th className={thSortClass('lastLoginAt')} onClick={() => toggleSort('lastLoginAt')}>
                {`Last Login${sortIndicator('lastLoginAt')}`}
              </th>
              <th className={thSortClass('createdAt')} onClick={() => toggleSort('createdAt')}>
                {`Joined${sortIndicator('createdAt')}`}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center font-mono text-xs text-text-light/30 dark:text-text-dark/25"
                >
                  {`// no users found`}
                </td>
              </tr>
            ) : (
              filtered.map((u) => <UserRow key={u.id} user={u} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="font-mono text-[10px] text-text-light/30 dark:text-text-dark/25">
        {`// showing ${filtered.length} of ${users.length} users`}
      </p>
    </div>
  )
}
