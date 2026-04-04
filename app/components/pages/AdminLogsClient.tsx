'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { TLog } from '@/types/entities/log'

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = 'createdAt' | 'level' | 'message'
type SortDir = 'asc' | 'desc'
type TabLevel = 'ALL' | 'info' | 'warn' | 'error' | 'debug'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtDateTime = (d: Date | string) =>
  new Date(d).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  })

const levelClass: Record<string, string> = {
  info: 'text-secondary-light dark:text-secondary-dark',
  warn: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
  debug: 'text-text-light/40 dark:text-text-dark/35'
}

const levelDotClass: Record<string, string> = {
  info: 'bg-secondary-light dark:bg-secondary-dark',
  warn: 'bg-yellow-500 dark:bg-yellow-400',
  error: 'bg-red-500 dark:bg-red-400',
  debug: 'bg-text-light/20 dark:bg-text-dark/20'
}

const TABS: TabLevel[] = ['ALL', 'info', 'warn', 'error', 'debug']

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

const LogRow = ({ log }: { log: TLog }) => {
  const [expanded, setExpanded] = useState(false)
  const hasMetadata = log.metadata && Object.keys(log.metadata).length > 0

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`border-b border-border-subtle dark:border-border-dark transition-colors duration-100 ${
          hasMetadata ? 'cursor-pointer hover:bg-accent dark:hover:bg-accent-dark' : ''
        }`}
        onClick={() => hasMetadata && setExpanded((v) => !v)}
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${levelDotClass[log.level] ?? 'bg-text-light/20'}`} />
            <span
              className={`font-mono text-[10px] uppercase tracking-wider ${levelClass[log.level] ?? 'text-text-light/50'}`}
            >
              {log.level}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 font-mono text-xs text-text-light/80 dark:text-text-dark/70 max-w-sm">
          <p className="truncate">{log.message}</p>
        </td>
        <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35">
          {log.userId ?? '—'}
        </td>
        <td className="px-4 py-3 font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 whitespace-nowrap">
          {fmtDateTime(log.createdAt)}
        </td>
        <td className="px-4 py-3">
          {hasMetadata && (
            <div className="text-text-light/30 dark:text-text-dark/25">
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          )}
        </td>
      </motion.tr>

      {/* Expanded metadata */}
      {expanded && hasMetadata && (
        <tr className="border-b border-border-subtle dark:border-border-dark bg-accent dark:bg-accent-dark">
          <td colSpan={5} className="px-4 py-4">
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-text-light/30 dark:text-text-dark/25 mb-2">
              {`// metadata`}
            </p>
            <pre className="font-mono text-[10px] text-text-light/60 dark:text-text-dark/50 leading-relaxed overflow-x-auto">
              {JSON.stringify(log.metadata, null, 2)}
            </pre>
          </td>
        </tr>
      )}
    </>
  )
}

const RECENT_HOURS = 24

function getRecentCount(logs: TLog[]) {
  const now = Date.now()
  return logs.filter((l) => (now - new Date(l.createdAt).getTime()) / (1000 * 60 * 60) <= RECENT_HOURS).length
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminLogsClient({ logs }: { logs: TLog[] }) {
  const [tab, setTab] = useState<TabLevel>('ALL')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortField>('createdAt')
  const [dir, setDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return logs
      .filter((l) => tab === 'ALL' || l.level === tab)
      .filter((l) => !q || l.message.toLowerCase().includes(q) || (l.userId ?? '').toLowerCase().includes(q))
      .sort((a, b) => {
        let av: number | string = (a[sort] ?? '') as number | string
        let bv: number | string = (b[sort] ?? '') as number | string
        if (sort === 'createdAt') {
          av = new Date(av).getTime()
          bv = new Date(bv).getTime()
        }
        return dir === 'asc' ? (av > bv ? 1 : -1) : av < bv ? 1 : -1
      })
  }, [logs, tab, search, sort, dir])

  const toggleSort = (f: SortField) => {
    if (sort === f) setDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSort(f)
      setDir('desc')
    }
  }

  // Stats
  const total = logs.length
  const errors = logs.filter((l) => l.level === 'error').length
  const warns = logs.filter((l) => l.level === 'warn').length
  const recent = getRecentCount(logs)

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
          {`// system`}
        </p>
        <h1 className="font-mono text-2xl font-bold text-text-light dark:text-text-dark">Logs</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle dark:bg-border-dark">
        <StatCard label="Total" value={String(total)} sub="all time" />
        <StatCard label="Errors" value={String(errors)} sub="need attention" />
        <StatCard label="Warnings" value={String(warns)} sub="potential issues" />
        <StatCard label="Last 24h" value={String(recent)} sub="recent activity" />
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
        <div className="flex border border-border-subtle dark:border-border-dark overflow-x-auto">
          {TABS.map((t) => {
            const count = t === 'ALL' ? logs.length : logs.filter((l) => l.level === t).length
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
            placeholder="Search message or user..."
            className="bg-transparent font-mono text-xs text-text-light dark:text-text-dark placeholder-text-light/25 dark:placeholder-text-dark/25 outline-none w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-border-subtle dark:border-border-dark overflow-x-auto">
        <table className="w-full min-w-160 table-fixed">
          <colgroup>
            <col className="w-24" />
            <col className="w-auto" />
            <col className="w-36" />
            <col className="w-40" />
            <col className="w-8" />
          </colgroup>
          <thead className="border-b border-border-subtle dark:border-border-dark bg-accent dark:bg-accent-dark">
            <tr>
              <th className={thSortClass('level')} onClick={() => toggleSort('level')}>
                {`Level${sortIndicator('level')}`}
              </th>
              <th className={thSortClass('message')} onClick={() => toggleSort('message')}>
                {`Message${sortIndicator('message')}`}
              </th>
              <th className={thClass}>User</th>
              <th className={thSortClass('createdAt')} onClick={() => toggleSort('createdAt')}>
                {`Time${sortIndicator('createdAt')}`}
              </th>
              <th className={thClass} />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center font-mono text-xs text-text-light/30 dark:text-text-dark/25"
                >
                  {`// no logs found`}
                </td>
              </tr>
            ) : (
              filtered.map((l) => <LogRow key={l.id} log={l} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="font-mono text-[10px] text-text-light/30 dark:text-text-dark/25">
        {`// showing ${filtered.length} of ${logs.length} logs`}
      </p>
    </div>
  )
}
