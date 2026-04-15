'use client'

import { setOpenCreateAdminModal } from '@/app/lib/store/slices/uiSlice'
import { store } from '@/app/lib/store/store'
import { IContactSubmission } from '@/types/entities/contact-submission'
import { IOrder } from '@/types/entities/order'
import { TUser } from '@/types/entities/user'
import { useMemo, useState } from 'react'
import CreateAdminModal from '../modals/CreateAdminModal'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

type Props = {
  donations: IOrder[]
  users: TUser[]
  contactSubmissions: IContactSubmission[]
  role: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(dollars: number) {
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

function fmtDate(d: string | Date | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function fullName(first?: string | null, last?: string | null, fallback = '') {
  const n = `${first ?? ''} ${last ?? ''}`.trim()
  return n || fallback
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">{children}</span>
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="border border-border-light dark:border-border-dark p-4 flex flex-col gap-1">
      <Label>{label}</Label>
      <p className="text-2xl font-bold leading-none">{value}</p>
      {sub && <p className="text-xs opacity-40">{sub}</p>}
    </div>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">{children}</span>
      <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardClient({ donations, users, contactSubmissions, role }: Props) {
  const [donationFilter, setDonationFilter] = useState<'ALL' | 'RECURRING' | 'ONE_TIME'>('ALL')

  const paidDonations = useMemo(() => donations.filter((d) => d.status === 'CONFIRMED'), [donations])

  const totalRevenue = useMemo(() => paidDonations.reduce((s, d) => s + d.totalAmount, 0), [paidDonations])

  const recurringDonations = donations.filter((d) => d.isRecurring)
  const oneTimeDonations = donations.filter((d) => !d.isRecurring)

  const mrr = recurringDonations.filter((d) => d.status === 'CONFIRMED').reduce((s, d) => s + d.totalAmount, 0)

  const newMessages = contactSubmissions.filter((c) => c.status === 'NEW').length

  const filteredDonations =
    donationFilter === 'ALL' ? donations : donationFilter === 'RECURRING' ? recurringDonations : oneTimeDonations

  return (
    <>
      <CreateAdminModal />
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
        {/* Top bar */}
        <div className="border-b border-border-light dark:border-border-dark px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">
              Education Comes First — Admin
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Label>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Label>
            {role === 'SUPERUSER' && (
              <Link
                href="/super"
                className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors"
              >
                Super
              </Link>
            )}
            <Link
              href="/member/portal"
              className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors"
            >
              My Portal
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8 max-w-337.5 mx-auto">
          {/* ── Stat strip ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-light dark:bg-border-dark border border-border-light dark:border-border-dark">
            <StatCard label="Total Revenue" value={fmt(totalRevenue)} sub={`${paidDonations.length} paid orders`} />
            <StatCard label="MRR" value={fmt(mrr)} sub={`${recurringDonations.length} recurring`} />
            <StatCard
              label="One-Time"
              value={fmt(
                oneTimeDonations.filter((d) => d.status === 'CONFIRMED').reduce((s, d) => s + d.totalAmount, 0)
              )}
              sub={`${oneTimeDonations.length} orders`}
            />
            <StatCard
              label="Users"
              value={users.length}
              sub={`${newMessages} new message${newMessages !== 1 ? 's' : ''}`}
            />
          </div>

          {/* ── Three-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_320px] gap-6 items-start">
            {/* ── Donations ── */}
            <div>
              <SectionHeader>Donations</SectionHeader>

              {/* Filter tabs */}
              <div className="flex gap-px mb-3 border border-border-light dark:border-border-dark w-fit">
                {(['ALL', 'ONE_TIME', 'RECURRING'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setDonationFilter(f)}
                    className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 transition-colors cursor-pointer ${
                      donationFilter === f
                        ? 'bg-primary-light dark:bg-primary-dark text-black'
                        : 'bg-transparent hover:bg-border-light dark:hover:bg-border-dark'
                    }`}
                  >
                    {f === 'ONE_TIME' ? 'One-Time' : f === 'RECURRING' ? 'Recurring' : 'All'}
                  </button>
                ))}
              </div>

              <div className="border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark">
                <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2 bg-border-subtle dark:bg-border-dark">
                  <Label>Donor</Label>
                  <Label>Type</Label>
                  <Label>Amount</Label>
                </div>

                {filteredDonations.length === 0 && (
                  <div className="px-3 py-6 text-center opacity-30">
                    <Label>No donations</Label>
                  </div>
                )}

                {filteredDonations.slice(0, 20).map((d) => (
                  <div
                    key={d.id}
                    className="grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2.5 items-center text-sm hover:bg-border-subtle dark:hover:bg-border-dark transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{d.customerName}</p>
                      <p className="text-xs opacity-40 truncate">{d.customerEmail}</p>
                    </div>
                    <span
                      className={`font-mono text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 whitespace-nowrap ${
                        d.isRecurring
                          ? 'bg-primary-light dark:bg-primary-dark text-black'
                          : 'border border-border-light dark:border-border-dark'
                      }`}
                    >
                      {d.isRecurring ? (d.recurringFrequency ?? 'Recur') : 'Once'}
                    </span>
                    <span className="font-mono text-sm font-semibold">{fmt(d.totalAmount)}</span>
                  </div>
                ))}

                {filteredDonations.length > 20 && (
                  <div className="px-3 py-2 text-center">
                    <Label>+{filteredDonations.length - 20} more</Label>
                  </div>
                )}
              </div>
            </div>

            {/* ── Users ── */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">Users</span>
                <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
                <button
                  onClick={() => store.dispatch(setOpenCreateAdminModal())}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 bg-primary-light dark:bg-primary-dark text-black hover:opacity-80 transition-opacity cursor-pointer"
                >
                  + Add Admin
                </button>
              </div>

              <div className="border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark">
                <div className="grid grid-cols-[1fr_auto] gap-3 px-3 py-2 bg-border-subtle dark:bg-border-dark">
                  <Label>User</Label>
                  <Label>Joined</Label>
                </div>

                {users.length === 0 && (
                  <div className="px-3 py-6 text-center opacity-30">
                    <Label>No users</Label>
                  </div>
                )}

                {users.slice(0, 20).map((u) => (
                  <div
                    key={u.id}
                    className="grid grid-cols-[1fr_auto] gap-3 px-3 py-2.5 items-center text-sm hover:bg-border-subtle dark:hover:bg-border-dark transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{fullName(u.firstName, u.lastName, u.email)}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs opacity-40 truncate">{u.email}</p>
                        <span className="font-mono text-[9px] tracking-[0.15em] uppercase opacity-50 shrink-0">
                          {u.role}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono text-[10px] opacity-40 whitespace-nowrap">{fmtDate(u.createdAt)}</p>
                      {u.lastLoginAt && (
                        <p className="font-mono text-[9px] opacity-30 whitespace-nowrap">↩ {fmtDate(u.lastLoginAt)}</p>
                      )}
                    </div>
                  </div>
                ))}

                {users.length > 20 && (
                  <div className="px-3 py-2 text-center">
                    <Label>+{users.length - 20} more</Label>
                  </div>
                )}
              </div>
            </div>

            {/* ── Contact Submissions ── */}
            <div>
              <SectionHeader>Contact{newMessages > 0 && ` · ${newMessages} new`}</SectionHeader>

              <div className="border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark">
                {contactSubmissions.length === 0 && (
                  <div className="px-3 py-6 text-center opacity-30">
                    <Label>No submissions</Label>
                  </div>
                )}

                {contactSubmissions.slice(0, 15).map((c) => (
                  <div
                    key={c.id}
                    className={`px-3 py-3 text-sm hover:bg-border-subtle dark:hover:bg-border-dark transition-colors ${
                      c.status === 'NEW' ? 'border-l-2 border-secondary-light dark:border-secondary-dark' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-medium truncate">{fullName(c.firstName, c.lastName)}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[9px] tracking-widest uppercase opacity-40">{c.type}</span>
                        <span className="font-mono text-[9px] opacity-40 whitespace-nowrap">
                          {fmtDate(c.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs opacity-50 truncate mb-1">{c.email}</p>
                    <p className="text-xs opacity-60 line-clamp-2 leading-relaxed">{c.message}</p>
                  </div>
                ))}

                {contactSubmissions.length > 15 && (
                  <div className="px-3 py-2 text-center">
                    <Label>+{contactSubmissions.length - 15} more</Label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
