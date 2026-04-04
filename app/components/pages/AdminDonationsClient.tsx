'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertCircle, ExternalLink } from 'lucide-react'
import { IOrder } from '@/types/entities/order'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'one-time' | 'recurring'
type SortField = 'createdAt' | 'totalAmount' | 'customerName'
type SortDir = 'asc' | 'desc'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

const fmtDate = (d: Date | string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const statusClass: Record<string, string> = {
  PENDING: 'text-yellow-700 dark:text-yellow-400',
  PROCESSING: 'text-indigo-700 dark:text-indigo-400',
  CONFIRMED: 'text-green-700 dark:text-green-400',
  CANCELLED: 'text-text-light/40 dark:text-text-dark/35',
  REFUNDED: 'text-secondary-light dark:text-secondary-dark',
  FAILED: 'text-red-600 dark:text-red-400'
}

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

const Row = ({ order }: { order: IOrder }) => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="border-b border-border-subtle dark:border-border-dark hover:bg-accent dark:hover:bg-accent-dark transition-colors duration-100 group"
  >
    <td className="px-4 py-3">
      <p className="font-mono text-xs text-text-light dark:text-text-dark">{order.customerName}</p>
      <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">{order.customerEmail}</p>
    </td>
    <td className="px-4 py-3 font-mono text-xs text-text-light dark:text-text-dark">{fmt(order.totalAmount)}</td>
    <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider">
      <span className={statusClass[order.status] ?? 'text-text-light/50'}>{order.status.toLowerCase()}</span>
    </td>
    {order.type === 'RECURRING_DONATION' && (
      <td className="px-4 py-3 font-mono text-[10px] text-text-light/50 dark:text-text-dark/40 capitalize">
        {order.recurringFrequency ?? '—'}
      </td>
    )}
    <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">
      {fmtDate(order.createdAt)}
    </td>
    {order.type === 'RECURRING_DONATION' && (
      <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">
        {order.nextBillingDate ? fmtDate(order.nextBillingDate) : '—'}
      </td>
    )}
    {order.type !== 'RECURRING_DONATION' && order.status === 'FAILED' && (
      <td className="px-4 py-3">
        <span className="flex items-center gap-1 font-mono text-[10px] text-red-500">
          <AlertCircle className="w-3 h-3" />
          {order.failureCode ?? 'unknown'}
        </span>
      </td>
    )}
    <td className="px-4 py-3">
      {order.paymentIntentId ? (
        <a
          href={`https://dashboard.stripe.com/payments/${order.paymentIntentId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 hover:text-[#635BFF] dark:hover:text-[#635BFF] transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          View
        </a>
      ) : order.stripeSubscriptionId ? (
        <a
          href={`https://dashboard.stripe.com/subscriptions/${order.stripeSubscriptionId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 hover:text-[#635BFF] dark:hover:text-[#635BFF] transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          View
        </a>
      ) : (
        <span className="font-mono text-[10px] text-text-light/20 dark:text-text-dark/20">—</span>
      )}
    </td>
  </motion.tr>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDonationsClient({ orders }: { orders: IOrder[] }) {
  const [tab, setTab] = useState<Tab>('one-time')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortField>('createdAt')
  const [dir, setDir] = useState<SortDir>('desc')

  const oneTime = orders.filter((o) => o.type === 'ONE_TIME_DONATION')
  const recurring = orders.filter((o) => o.type === 'RECURRING_DONATION')
  const active = tab === 'one-time' ? oneTime : recurring

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return active
      .filter((o) => !q || o.customerName.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q))
      .sort((a, b) => {
        let av: number | string = a[sort] as number | string
        let bv: number | string = b[sort] as number | string
        if (sort === 'createdAt') {
          av = new Date(av).getTime()
          bv = new Date(bv).getTime()
        }
        return dir === 'asc' ? (av > bv ? 1 : -1) : av < bv ? 1 : -1
      })
  }, [active, search, sort, dir])

  const toggleSort = (f: SortField) => {
    if (sort === f) setDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSort(f)
      setDir('desc')
    }
  }

  // Stats
  const totalRevenue = oneTime.filter((o) => o.status === 'CONFIRMED').reduce((s, o) => s + o.totalAmount, 0)
  const activeRecurring = recurring.filter((o) => o.status === 'CONFIRMED').length
  const mrr = recurring
    .filter((o) => o.status === 'CONFIRMED' && o.recurringFrequency === 'monthly')
    .reduce((s, o) => s + o.totalAmount, 0)
  const avgDonation = oneTime.length ? totalRevenue / oneTime.filter((o) => o.status === 'CONFIRMED').length : 0

  const thClass =
    'px-4 py-3 font-mono text-[9px] tracking-[0.15em] uppercase text-text-light/35 dark:text-text-dark/30 text-left select-none'
  const thSortClass = (f: SortField) =>
    `${thClass} cursor-pointer hover:text-text-light dark:hover:text-text-dark transition-colors ${sort === f ? 'text-text-light dark:text-text-dark' : ''}`

  return (
    <div className="p-6 xs:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-border-subtle dark:border-border-dark pb-6">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-2">
          {'// donations'}
        </p>
        <h1 className="font-mono text-2xl font-bold text-text-light dark:text-text-dark">Donations</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle dark:bg-border-dark">
        <StatCard label="Total Revenue" value={fmt(totalRevenue)} sub={`${oneTime.length} one-time`} />
        <StatCard label="Active Recurring" value={String(activeRecurring)} sub={`${recurring.length} total`} />
        <StatCard label="MRR" value={fmt(mrr)} sub="monthly recurring" />
        <StatCard label="Avg Donation" value={fmt(avgDonation)} sub="one-time" />
      </div>

      {/* Tabs + Toolbar */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
        <div className="flex border border-border-subtle dark:border-border-dark">
          {(['one-time', 'recurring'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-150 ${
                tab === t
                  ? 'bg-primary-light dark:bg-primary-dark text-black'
                  : 'text-text-light/50 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              {t} <span className="ml-1.5 opacity-60">{t === 'one-time' ? oneTime.length : recurring.length}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 border border-border-subtle dark:border-border-dark px-3 py-2 w-full xs:w-64">
          <Search className="w-3.5 h-3.5 text-text-light/30 dark:text-text-dark/30 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="bg-transparent font-mono text-xs text-text-light dark:text-text-dark placeholder-text-light/25 dark:placeholder-text-dark/25 outline-none w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-border-subtle dark:border-border-dark overflow-x-auto">
        <table className="w-full min-w-160">
          <thead className="border-b border-border-subtle dark:border-border-dark bg-accent dark:bg-accent-dark">
            <tr>
              <th className={thSortClass('customerName')} onClick={() => toggleSort('customerName')}>
                Donor {sort === 'customerName' ? (dir === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className={thSortClass('totalAmount')} onClick={() => toggleSort('totalAmount')}>
                Amount {sort === 'totalAmount' ? (dir === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className={thClass}>Status</th>
              {tab === 'recurring' && <th className={thClass}>Frequency</th>}

              <th className={thSortClass('createdAt')} onClick={() => toggleSort('createdAt')}>
                Date {sort === 'createdAt' ? (dir === 'asc' ? '↑' : '↓') : ''}
              </th>
              {tab === 'recurring' && <th className={thClass}>Next Billing</th>}

              <th className={thClass}>Stripe</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center font-mono text-xs text-text-light/30 dark:text-text-dark/25"
                >
                  {` // no donations found`}
                </td>
              </tr>
            ) : (
              filtered.map((order) => <Row key={order.id} order={order} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <p className="font-mono text-[10px] text-text-light/30 dark:text-text-dark/25">
        {`// showing ${filtered.length} of ${active.length} ${tab} donations`}
      </p>
    </div>
  )
}
