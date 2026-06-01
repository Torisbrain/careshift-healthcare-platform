import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/patients')({
  head: () => ({ meta: [{ title: 'CareShift — Patients' }] }),
  component: PatientsPage,
})

const ALL_PATIENTS = [
  { id: 'MRN-00412', name: 'Adamu Suleiman', age: 54, gender: 'M', ward: 'Emergency', bed: '3B', blood: 'O+', doctor: 'Dr. Nwosu', status: 'Critical', admitted: '2025-05-24', diagnosis: 'Respiratory Failure', phone: '0803-244-5521' },
  { id: 'MRN-00389', name: 'Ngozi Eze', age: 28, gender: 'F', ward: 'Maternity', bed: '6A', blood: 'A+', doctor: 'Dr. Adeyemi', status: 'Stable', admitted: '2025-05-25', diagnosis: 'Antepartum Hemorrhage', phone: '0812-330-9901' },
  { id: 'MRN-00401', name: 'Tunde Afolabi', age: 37, gender: 'M', ward: 'General A', bed: '12C', blood: 'B+', doctor: 'Dr. Chidinma', status: 'Stable', admitted: '2025-05-23', diagnosis: 'Typhoid Fever', phone: '0901-777-4413' },
  { id: 'MRN-00415', name: 'Aisha Musa', age: 62, gender: 'F', ward: 'ICU', bed: '1A', blood: 'AB-', doctor: 'Dr. Nwosu', status: 'Critical', admitted: '2025-05-22', diagnosis: 'Stroke (Haemorrhagic)', phone: '0805-119-0022' },
  { id: 'MRN-00388', name: 'Emeka Okafor', age: 9, gender: 'M', ward: 'Paediatrics', bed: '8D', blood: 'O-', doctor: 'Dr. Bello', status: 'Discharge Ready', admitted: '2025-05-21', diagnosis: 'Severe Malaria', phone: '0703-441-8811' },
  { id: 'MRN-00390', name: 'Chioma Obi', age: 45, gender: 'F', ward: 'General B', bed: '14B', blood: 'A-', doctor: 'Dr. Adeyemi', status: 'Stable', admitted: '2025-05-24', diagnosis: 'Diabetes Type 2', phone: '0809-223-6612' },
  { id: 'MRN-00395', name: 'Ibrahim Yusuf', age: 31, gender: 'M', ward: 'General A', bed: '11A', blood: 'O+', doctor: 'Dr. Chidinma', status: 'Stable', admitted: '2025-05-25', diagnosis: 'Hypertension Crisis', phone: '0802-551-7789' },
  { id: 'MRN-00400', name: 'Blessing Okeke', age: 19, gender: 'F', ward: 'Maternity', bed: '5C', blood: 'B+', doctor: 'Dr. Adeyemi', status: 'Stable', admitted: '2025-05-26', diagnosis: 'Labour (Active)', phone: '0703-884-3344' },
]

const NAV_ITEMS = [
  { label: 'Dashboard', icon: '📊', to: '/dashboard' },
  { label: 'Patients', icon: '🛏️', to: '/patients' },
  { label: 'Pharmacy', icon: '💊', to: '/pharmacy' },
  { label: 'Burnout Shield', icon: '🛡️', to: '/burnout' },
]

function PatientsPage() {
  const [search, setSearch] = useState('')
  const [filterWard, setFilterWard] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [selectedPatient, setSelectedPatient] = useState<typeof ALL_PATIENTS[0] | null>(null)

  const wards = ['All', ...Array.from(new Set(ALL_PATIENTS.map(p => p.ward)))]
  const statuses = ['All', 'Critical', 'Stable', 'Discharge Ready']

  const filtered = ALL_PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search) || p.diagnosis.toLowerCase().includes(search.toLowerCase())
    const matchWard = filterWard === 'All' || p.ward === filterWard
    const matchStatus = filterStatus === 'All' || p.status === filterStatus
    return matchSearch && matchWard && matchStatus
  })

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex">
      {/* Mini sidebar */}
      <aside className="w-16 shrink-0 bg-[#0d1117] border-r border-white/10 flex flex-col items-center py-4 gap-1">
        <Link to="/" className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00d4a1] to-[#0066ff] flex items-center justify-center mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </Link>
        {NAV_ITEMS.map(item => (
          <Link key={item.label} to={item.to} title={item.label}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all hover:bg-white/10 ${item.label === 'Patients' ? 'bg-[#00d4a1]/15' : ''}`}>
            {item.icon}
          </Link>
        ))}
      </aside>

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Patients</h1>
            <p className="text-sm text-gray-500">{filtered.length} of {ALL_PATIENTS.length} patients shown</p>
          </div>
          <button className="bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Patient
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-64">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, MRN, or diagnosis..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterWard}
                onChange={e => setFilterWard(e.target.value)}
                className="bg-white/5 border border-white/10 text-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
              >
                {wards.map(w => <option key={w} value={w} className="bg-[#111827]">{w === 'All' ? 'All Wards' : w}</option>)}
              </select>

              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="bg-white/5 border border-white/10 text-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
              >
                {statuses.map(s => <option key={s} value={s} className="bg-[#111827]">{s === 'All' ? 'All Statuses' : s}</option>)}
              </select>
            </div>
          </div>

          {/* Status summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Critical', count: ALL_PATIENTS.filter(p => p.status === 'Critical').length, color: '#ff4d4d' },
              { label: 'Stable', count: ALL_PATIENTS.filter(p => p.status === 'Stable').length, color: '#00d4a1' },
              { label: 'Discharge Ready', count: ALL_PATIENTS.filter(p => p.status === 'Discharge Ready').length, color: '#ffbd2e' },
            ].map(s => (
              <div key={s.label} className="bg-[#111827] border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <div>
                  <div className="text-2xl font-black" style={{ color: s.color }}>{s.count}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Patient list */}
          <div className="grid gap-3">
            {filtered.map(p => {
              const statusColor = p.status === 'Critical' ? '#ff4d4d' : p.status === 'Stable' ? '#00d4a1' : '#ffbd2e'
              const statusBg = p.status === 'Critical' ? '#ff4d4d15' : p.status === 'Stable' ? '#00d4a115' : '#ffbd2e15'
              return (
                <div
                  key={p.id}
                  className={`bg-[#111827] border rounded-xl p-5 cursor-pointer hover:border-white/20 transition-all ${selectedPatient?.id === p.id ? 'border-[#00d4a1]/40' : 'border-white/10'}`}
                  onClick={() => setSelectedPatient(selectedPatient?.id === p.id ? null : p)}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4a1]/30 to-[#0066ff]/30 flex items-center justify-center text-white font-bold shrink-0">
                      {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>

                    {/* Name + info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white font-semibold">{p.name}</span>
                        <span className="text-xs text-gray-600 font-mono">{p.id}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ color: statusColor, background: statusBg }}>
                          {p.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5 flex flex-wrap gap-3">
                        <span>{p.age}y {p.gender === 'M' ? '♂' : '♀'}</span>
                        <span>·</span>
                        <span>{p.ward} · Bed {p.bed}</span>
                        <span>·</span>
                        <span className="text-gray-400">{p.diagnosis}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm text-gray-400">{p.doctor}</div>
                      <div className="text-xs text-gray-600">Admitted {p.admitted}</div>
                    </div>

                    <div className="text-gray-600 text-sm ml-2">
                      {selectedPatient?.id === p.id ? '▲' : '▼'}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {selectedPatient?.id === p.id && (
                    <div className="mt-4 pt-4 border-t border-white/10 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Blood Type', value: p.blood },
                        { label: 'Phone', value: p.phone },
                        { label: 'Doctor', value: p.doctor },
                        { label: 'Admitted', value: p.admitted },
                      ].map(f => (
                        <div key={f.label}>
                          <div className="text-xs text-gray-500 mb-0.5">{f.label}</div>
                          <div className="text-sm text-white font-medium">{f.value}</div>
                        </div>
                      ))}
                      <div className="sm:col-span-2 md:col-span-4 flex gap-2 mt-2">
                        <button className="text-xs bg-[#00d4a1]/15 border border-[#00d4a1]/30 text-[#00d4a1] px-3 py-1.5 rounded-lg hover:bg-[#00d4a1]/25 transition-colors">
                          View Full Record
                        </button>
                        <button className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                          Log Vitals
                        </button>
                        <button className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                          Write Prescription
                        </button>
                        {p.status === 'Critical' && (
                          <button className="text-xs bg-[#ff4d4d]/15 border border-[#ff4d4d]/30 text-[#ff4d4d] px-3 py-1.5 rounded-lg hover:bg-[#ff4d4d]/25 transition-colors">
                            🚨 Escalate to Doctor
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
