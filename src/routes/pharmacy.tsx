import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/pharmacy')({
  head: () => ({ meta: [{ title: 'CareShift — Pharmacy' }] }),
  component: PharmacyPage,
})

const DRUGS = [
  { id: 1, name: 'Amoxicillin 500mg', generic: 'Amoxicillin', category: 'Antibiotic', qty: 14, unit: 'Capsules', reorder: 50, expiry: '2025-06-01', batch: 'AMX-2025-01', status: 'critical' },
  { id: 2, name: 'Metformin 850mg', generic: 'Metformin HCl', category: 'Antidiabetic', qty: 220, unit: 'Tablets', reorder: 100, expiry: '2026-03-15', batch: 'MET-2024-09', status: 'ok' },
  { id: 3, name: 'Artemether-Lumefantrine', generic: 'Coartem', category: 'Antimalarial', qty: 45, unit: 'Packs', reorder: 60, expiry: '2025-07-20', batch: 'ART-2024-11', status: 'low' },
  { id: 4, name: 'Paracetamol 500mg', generic: 'Acetaminophen', category: 'Analgesic', qty: 840, unit: 'Tablets', reorder: 200, expiry: '2026-09-30', batch: 'PAR-2025-03', status: 'ok' },
  { id: 5, name: 'Lisinopril 10mg', generic: 'Lisinopril', category: 'Antihypertensive', qty: 38, unit: 'Tablets', reorder: 80, expiry: '2025-12-01', batch: 'LIS-2024-08', status: 'low' },
  { id: 6, name: 'Ceftriaxone 1g Inj', generic: 'Ceftriaxone Sodium', category: 'Antibiotic', qty: 82, unit: 'Vials', reorder: 30, expiry: '2026-02-28', batch: 'CEF-2025-02', status: 'ok' },
  { id: 7, name: 'Diazepam 5mg', generic: 'Diazepam', category: 'Sedative', qty: 0, unit: 'Tablets', reorder: 40, expiry: '2026-01-15', batch: 'DIA-2024-10', status: 'out' },
  { id: 8, name: 'ORS Sachet', generic: 'Oral Rehydration Salts', category: 'Electrolyte', qty: 310, unit: 'Sachets', reorder: 100, expiry: '2025-06-10', batch: 'ORS-2025-01', status: 'expiring' },
]

const PRESCRIPTIONS = [
  { id: 'RX-1041', patient: 'Adamu Suleiman', doctor: 'Dr. Nwosu', drug: 'Ceftriaxone 1g Inj', dose: '1g IV', freq: 'Every 12h', duration: '7 days', status: 'pending', time: '08:45' },
  { id: 'RX-1040', patient: 'Ngozi Eze', doctor: 'Dr. Adeyemi', drug: 'Artemether-Lumefantrine', dose: '4 tabs', freq: 'Twice daily', duration: '3 days', status: 'dispensed', time: '07:30' },
  { id: 'RX-1039', patient: 'Tunde Afolabi', doctor: 'Dr. Chidinma', drug: 'Metformin 850mg', dose: '850mg', freq: 'Twice daily', duration: '30 days', status: 'pending', time: '06:20' },
  { id: 'RX-1038', patient: 'Emeka Okafor', doctor: 'Dr. Bello', drug: 'Artemether-Lumefantrine', dose: '2 tabs', freq: 'Twice daily', duration: '3 days', status: 'dispensed', time: 'Yesterday' },
]

function PharmacyPage() {
  const [tab, setTab] = useState<'inventory' | 'prescriptions' | 'alerts'>('inventory')
  const [search, setSearch] = useState('')

  const alertDrugs = DRUGS.filter(d => d.status !== 'ok')
  const filteredDrugs = DRUGS.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.generic.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; color: string; bg: string }> = {
      ok: { label: 'In Stock', color: '#00d4a1', bg: '#00d4a115' },
      low: { label: 'Low Stock', color: '#ffbd2e', bg: '#ffbd2e15' },
      critical: { label: 'Critical Low', color: '#ff4d4d', bg: '#ff4d4d15' },
      out: { label: 'Out of Stock', color: '#ff4d4d', bg: '#ff4d4d20' },
      expiring: { label: 'Expiring Soon', color: '#ff8800', bg: '#ff880015' },
    }
    const s = map[status] || map.ok
    return <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: s.color, background: s.bg }}>{s.label}</span>
  }

  const daysUntilExpiry = (expiry: string) => {
    const diff = Math.ceil((new Date(expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return diff
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0f1e]/95 backdrop-blur-md border-b border-white/10 px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-1">
              <span>←</span> Dashboard
            </Link>
            <span className="text-gray-700">/</span>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>💊</span> Pharmacy
            </h1>
          </div>
          <button className="bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
            + Add Drug
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
          {(['inventory', 'prescriptions', 'alerts'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {t}
              {t === 'alerts' && alertDrugs.length > 0 && (
                <span className="ml-1.5 bg-[#ff4d4d] text-white text-xs px-1.5 py-0.5 rounded-full">{alertDrugs.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-6 max-w-6xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Drugs', value: DRUGS.length, icon: '📦', color: '#00d4a1' },
            { label: 'Low/Out of Stock', value: DRUGS.filter(d => ['low','critical','out'].includes(d.status)).length, icon: '⚠️', color: '#ff4d4d' },
            { label: 'Expiring ≤30 days', value: DRUGS.filter(d => daysUntilExpiry(d.expiry) <= 30).length, icon: '⏰', color: '#ffbd2e' },
            { label: 'Pending Rx', value: PRESCRIPTIONS.filter(r => r.status === 'pending').length, icon: '📋', color: '#0066ff' },
          ].map(s => (
            <div key={s.label} className="bg-[#111827] border border-white/10 rounded-xl p-4">
              <div className="text-xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {tab === 'inventory' && (
          <>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search drugs by name, generic, or category..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
              />
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      {['Drug Name', 'Category', 'Qty', 'Reorder At', 'Expiry', 'Batch', 'Status', ''].map(h => (
                        <th key={h} className="text-left text-gray-500 font-medium px-5 py-3 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredDrugs.map(d => {
                      const days = daysUntilExpiry(d.expiry)
                      return (
                        <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="text-white font-medium">{d.name}</div>
                            <div className="text-xs text-gray-600">{d.generic}</div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-400">{d.category}</td>
                          <td className="px-5 py-3.5">
                            <span className={`font-bold ${d.qty === 0 ? 'text-[#ff4d4d]' : d.qty < d.reorder ? 'text-[#ffbd2e]' : 'text-white'}`}>
                              {d.qty}
                            </span>
                            <span className="text-gray-600 text-xs ml-1">{d.unit}</span>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500">{d.reorder}</td>
                          <td className="px-5 py-3.5">
                            <span className={`text-sm ${days <= 7 ? 'text-[#ff4d4d]' : days <= 30 ? 'text-[#ffbd2e]' : 'text-gray-400'}`}>
                              {d.expiry}
                            </span>
                            {days <= 30 && <div className="text-xs text-gray-600">{days}d left</div>}
                          </td>
                          <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{d.batch}</td>
                          <td className="px-5 py-3.5">{getStatusBadge(d.status)}</td>
                          <td className="px-5 py-3.5">
                            <button className="text-xs border border-white/10 text-gray-500 hover:text-white hover:border-white/20 px-2.5 py-1 rounded-lg transition-colors">
                              Edit
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'prescriptions' && (
          <div className="space-y-3">
            {PRESCRIPTIONS.map(rx => (
              <div key={rx.id} className="bg-[#111827] border border-white/10 rounded-xl p-5 flex items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 flex items-center justify-center shrink-0">
                  <span className="text-lg">📋</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-semibold">{rx.patient}</span>
                    <span className="text-xs text-gray-600 font-mono">{rx.id}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rx.status === 'pending' ? 'bg-[#ffbd2e]/15 text-[#ffbd2e]' : 'bg-[#00d4a1]/15 text-[#00d4a1]'}`}>
                      {rx.status === 'pending' ? '⏳ Pending' : '✓ Dispensed'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mt-0.5">
                    <span className="text-white">{rx.drug}</span> · {rx.dose} · {rx.freq} · {rx.duration}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">{rx.doctor} · {rx.time}</div>
                </div>
                {rx.status === 'pending' && (
                  <button className="shrink-0 bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
                    Mark Dispensed
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'alerts' && (
          <div className="space-y-3">
            {alertDrugs.map(d => {
              const days = daysUntilExpiry(d.expiry)
              const isExpiry = days <= 30
              const isStock = ['low', 'critical', 'out'].includes(d.status)
              return (
                <div key={d.id} className={`border rounded-xl p-5 ${d.status === 'out' || days <= 7 ? 'bg-[#ff4d4d]/5 border-[#ff4d4d]/20' : 'bg-[#ffbd2e]/5 border-[#ffbd2e]/20'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${d.status === 'out' || days <= 7 ? 'bg-[#ff4d4d]/15' : 'bg-[#ffbd2e]/15'}`}>
                      {isExpiry && !isStock ? '⏰' : isStock ? '📦' : '⚠️'}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold">{d.name}</div>
                      <div className="text-sm text-gray-400 mt-0.5">
                        {isStock && <span>Only <strong className="text-white">{d.qty} {d.unit}</strong> remaining (reorder at {d.reorder}). </span>}
                        {isExpiry && <span>Expires on <strong className="text-white">{d.expiry}</strong> ({days} days). </span>}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Batch: {d.batch}</div>
                    </div>
                    <button className="shrink-0 text-xs border border-white/10 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                      Order Stock
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
