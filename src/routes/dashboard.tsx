import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard')({
  head: () => ({ meta: [{ title: 'CareShift — Admin Dashboard' }] }),
  component: Dashboard,
})

const STATS = [
  { label: 'Active Patients', value: '142', change: '+12 today', color: '#00d4a1', icon: '🛏️' },
  { label: 'Staff On Shift', value: '38', change: '8 on break', color: '#0066ff', icon: '👷' },
  { label: 'Critical Alerts', value: '3', change: '2 pending', color: '#ff4d4d', icon: '🚨' },
  { label: 'Beds Available', value: '17', change: 'of 159 total', color: '#ffbd2e', icon: '🏥' },
  { label: 'Prescriptions Today', value: '86', change: '12 pending', color: '#a855f7', icon: '💊' },
  { label: 'Appointments', value: '54', change: '9 remaining', color: '#00d4a1', icon: '📅' },
]

const WARDS = [
  { name: 'Emergency', beds: 20, occupied: 19, status: 'critical' },
  { name: 'Maternity', beds: 30, occupied: 20, status: 'normal' },
  { name: 'Paediatrics', beds: 25, occupied: 11, status: 'normal' },
  { name: 'General A', beds: 40, occupied: 32, status: 'warning' },
  { name: 'General B', beds: 40, occupied: 29, status: 'normal' },
  { name: 'ICU', beds: 10, occupied: 7, status: 'warning' },
]

const ALERTS = [
  { time: '2 min ago', type: 'critical', msg: 'Patient Adamu Suleiman — SpO2 dropped to 88% in Ward 3B', role: 'Nurse Fatima' },
  { time: '11 min ago', type: 'warning', msg: 'Drug stock low: Amoxicillin 500mg — 14 units remaining', role: 'Pharmacist' },
  { time: '23 min ago', type: 'info', msg: 'Dr. Chidinma has worked 11h today — Burnout Shield flagged', role: 'System' },
  { time: '1 hr ago', type: 'critical', msg: 'Patient Ngozi Eze — BP reading 180/110 in Maternity Ward', role: 'Nurse Blessing' },
  { time: '2 hrs ago', type: 'info', msg: 'Shift handover completed — 14 patients transferred to Night team', role: 'Dr. Emeka' },
]

const PATIENTS = [
  { name: 'Adamu Suleiman', id: 'MRN-00412', ward: 'Emergency', status: 'Critical', doctor: 'Dr. Nwosu', age: 54 },
  { name: 'Ngozi Eze', id: 'MRN-00389', ward: 'Maternity', status: 'Stable', doctor: 'Dr. Adeyemi', age: 28 },
  { name: 'Tunde Afolabi', id: 'MRN-00401', ward: 'General A', status: 'Stable', doctor: 'Dr. Chidinma', age: 37 },
  { name: 'Aisha Musa', id: 'MRN-00415', ward: 'ICU', status: 'Critical', doctor: 'Dr. Nwosu', age: 62 },
  { name: 'Emeka Okafor', id: 'MRN-00388', ward: 'Paediatrics', status: 'Discharge Ready', doctor: 'Dr. Bello', age: 9 },
]

const STAFF = [
  { name: 'Dr. Amaka Nwosu', role: 'Doctor', dept: 'Emergency', hours: 9, wellness: 4, status: 'on-shift' },
  { name: 'Nurse Fatima Bello', role: 'Nurse', dept: 'Emergency', hours: 11, wellness: 2, status: 'on-shift' },
  { name: 'Dr. Seun Adeyemi', role: 'Doctor', dept: 'Maternity', hours: 7, wellness: 5, status: 'on-shift' },
  { name: 'Pharm. Chukwu Obi', role: 'Pharmacist', dept: 'Pharmacy', hours: 8, wellness: 3, status: 'on-shift' },
  { name: 'Dr. Chidinma Eze', role: 'Doctor', dept: 'General', hours: 12, wellness: 2, status: 'flagged' },
]

const NAV_ITEMS = [
  { label: 'Dashboard', icon: '📊', to: '/dashboard' },
  { label: 'Patients', icon: '🛏️', to: '/patients' },
  { label: 'Pharmacy', icon: '💊', to: '/pharmacy' },
  { label: 'Appointments', icon: '📅', to: '/appointments' },
  { label: 'AI Assistant', icon: '🤖', to: '/ai-assist' },
  { label: 'Burnout Shield', icon: '🛡️', to: '/burnout' },
  { label: 'Login', icon: '🔐', to: '/login' },
]

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="w-64 shrink-0 bg-[#0d1117] border-r border-white/10 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4a1] to-[#0066ff] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
        <span className="text-white font-bold text-lg">CareShift</span>
      </div>

      {/* Hospital selector */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="bg-white/5 rounded-lg px-3 py-2.5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Hospital</div>
            <div className="text-sm text-white font-medium">Lagos General Hospital</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              active === item.label
                ? 'bg-[#00d4a1]/15 text-[#00d4a1] font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
            {item.label === 'Burnout Shield' && (
              <span className="ml-auto w-2 h-2 rounded-full bg-[#ff4d4d]" />
            )}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a855f7] to-[#0066ff] flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div>
            <div className="text-sm text-white font-medium">Admin Olu</div>
            <div className="text-xs text-gray-500">Hospital Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function Dashboard() {
  const [alertFilter, setAlertFilter] = useState<'all' | 'critical' | 'warning'>('all')

  const filteredAlerts = alertFilter === 'all' ? ALERTS : ALERTS.filter(a => a.type === alertFilter)

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex">
      <Sidebar active="Dashboard" />

      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Hospital Overview</h1>
            <p className="text-sm text-gray-500">Monday, 26 May 2025 · Morning Shift · 08:42</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff4d4d] text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
            </div>
            <Link to="/" className="text-sm text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
              ← Home
            </Link>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="bg-[#111827] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
                <div className="text-xl mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-white mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-gray-500 font-medium mb-0.5">{s.label}</div>
                <div className="text-xs text-gray-600">{s.change}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Ward Occupancy */}
            <div className="lg:col-span-2 bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">Ward Occupancy</h2>
                <span className="text-xs text-gray-500">159 beds total</span>
              </div>
              <div className="space-y-4">
                {WARDS.map(w => {
                  const pct = Math.round((w.occupied / w.beds) * 100)
                  const color = w.status === 'critical' ? '#ff4d4d' : w.status === 'warning' ? '#ffbd2e' : '#00d4a1'
                  return (
                    <div key={w.name}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{w.name}</span>
                          {w.status === 'critical' && <span className="text-[10px] bg-[#ff4d4d]/20 text-[#ff4d4d] px-1.5 py-0.5 rounded font-semibold">CRITICAL</span>}
                          {w.status === 'warning' && <span className="text-[10px] bg-[#ffbd2e]/20 text-[#ffbd2e] px-1.5 py-0.5 rounded font-semibold">HIGH</span>}
                        </div>
                        <span className="text-gray-400">{w.occupied}/{w.beds} beds</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Live Alerts */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg">Live Alerts</h2>
                <div className="flex gap-1.5">
                  {(['all', 'critical', 'warning'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setAlertFilter(f)}
                      className={`text-xs px-2 py-1 rounded-md transition-colors ${alertFilter === f ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {filteredAlerts.map((a, i) => {
                  const color = a.type === 'critical' ? '#ff4d4d' : a.type === 'warning' ? '#ffbd2e' : '#0066ff'
                  return (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                      <div>
                        <div className="text-gray-300 text-xs leading-relaxed">{a.msg}</div>
                        <div className="text-gray-600 text-xs mt-0.5">{a.role} · {a.time}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Recent Patients</h2>
              <Link to="/patients" className="text-sm text-[#00d4a1] hover:underline">View all →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    {['Patient', 'MRN', 'Ward', 'Status', 'Doctor', 'Age', ''].map(h => (
                      <th key={h} className="text-gray-500 font-medium pb-3 pr-6">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {PATIENTS.map(p => {
                    const statusColor = p.status === 'Critical' ? '#ff4d4d' : p.status === 'Stable' ? '#00d4a1' : '#ffbd2e'
                    const statusBg = p.status === 'Critical' ? '#ff4d4d20' : p.status === 'Stable' ? '#00d4a120' : '#ffbd2e20'
                    return (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 pr-6 font-medium text-white">{p.name}</td>
                        <td className="py-3 pr-6 text-gray-500 font-mono text-xs">{p.id}</td>
                        <td className="py-3 pr-6 text-gray-400">{p.ward}</td>
                        <td className="py-3 pr-6">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ color: statusColor, background: statusBg }}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 pr-6 text-gray-400">{p.doctor}</td>
                        <td className="py-3 pr-6 text-gray-400">{p.age}y</td>
                        <td className="py-3">
                          <button className="text-xs text-gray-500 hover:text-[#00d4a1] transition-colors border border-white/10 hover:border-[#00d4a1]/30 px-2 py-1 rounded-md">
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Staff on Shift */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Staff on Shift</h2>
              <span className="text-xs text-gray-500">Burnout Shield Active 🛡️</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {STAFF.map(s => {
                const wellnessColor = s.wellness >= 4 ? '#00d4a1' : s.wellness >= 3 ? '#ffbd2e' : '#ff4d4d'
                return (
                  <div key={s.name} className={`rounded-xl p-4 border ${s.status === 'flagged' ? 'border-[#ff4d4d]/30 bg-[#ff4d4d]/5' : 'border-white/10 bg-white/[0.02]'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4a1]/40 to-[#0066ff]/40 flex items-center justify-center text-white text-sm font-bold">
                        {s.name.split(' ')[1][0]}
                      </div>
                      {s.status === 'flagged' && <span className="text-[9px] bg-[#ff4d4d]/20 text-[#ff4d4d] px-1.5 py-0.5 rounded-full font-semibold">FLAGGED</span>}
                    </div>
                    <div className="text-white text-xs font-semibold mb-0.5 truncate">{s.name}</div>
                    <div className="text-gray-500 text-xs">{s.role} · {s.dept}</div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-gray-500">{s.hours}h worked</span>
                      <span className="font-semibold" style={{ color: wellnessColor }}>😊 {s.wellness}/5</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Assist Teaser */}
          <div className="bg-gradient-to-r from-[#0066ff]/10 to-[#a855f7]/10 border border-[#0066ff]/20 rounded-2xl p-6 flex items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4a1] to-[#0066ff] flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-bold mb-1">AI Clinical Assistant — Powered by Claude Sonnet</div>
                <div className="text-gray-400 text-sm">Get differential diagnoses, drug interaction checks, and discharge summary drafts. All outputs are advisory and clearly flagged.</div>
              </div>
            </div>
            <Link to="/dashboard" className="shrink-0 bg-gradient-to-r from-[#00d4a1] to-[#0066ff] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
              Open AI Assist →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
