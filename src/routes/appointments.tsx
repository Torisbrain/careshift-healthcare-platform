import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/appointments')({
  head: () => ({ meta: [{ title: 'CareShift — Appointments' }] }),
  component: AppointmentsPage,
})

const APPOINTMENTS = [
  { id: 'APT-1041', patient: 'Chukwuemeka Nwosu', patientId: 'MRN-00501', doctor: 'Dr. Adeyemi', dept: 'General Medicine', datetime: '2025-05-26T09:00', type: 'outpatient', status: 'confirmed', phone: '0803-441-9920', notes: 'Follow-up for hypertension' },
  { id: 'APT-1042', patient: 'Amina Usman', patientId: 'MRN-00502', doctor: 'Dr. Nwosu', dept: 'Emergency', datetime: '2025-05-26T10:30', type: 'follow_up', status: 'scheduled', phone: '0812-330-1145', notes: 'Post-surgery review' },
  { id: 'APT-1043', patient: 'Bola Okonkwo', patientId: 'MRN-00488', doctor: 'Dr. Chidinma', dept: 'General Medicine', datetime: '2025-05-26T11:00', type: 'outpatient', status: 'scheduled', phone: '0901-222-5543', notes: 'Diabetes management' },
  { id: 'APT-1044', patient: 'Fatima Al-Hassan', patientId: 'MRN-00491', doctor: 'Dr. Adeyemi', dept: 'Maternity', datetime: '2025-05-26T14:00', type: 'telemedicine', status: 'confirmed', phone: '0805-119-8871', notes: 'Antenatal check-in' },
  { id: 'APT-1045', patient: 'Segun Abiodun', patientId: 'MRN-00499', doctor: 'Dr. Bello', dept: 'Paediatrics', datetime: '2025-05-26T15:30', type: 'outpatient', status: 'scheduled', phone: '0703-884-0092', notes: 'Child vaccination follow-up' },
  { id: 'APT-1046', patient: 'Grace Obiora', patientId: 'MRN-00477', doctor: 'Dr. Tanko', dept: 'Paediatrics', datetime: '2025-05-27T09:00', type: 'follow_up', status: 'scheduled', phone: '0809-441-3312', notes: 'Asthma review' },
  { id: 'APT-1038', patient: 'Musa Ibrahim', patientId: 'MRN-00460', doctor: 'Dr. Nwosu', dept: 'Emergency', datetime: '2025-05-25T08:00', type: 'outpatient', status: 'completed', phone: '0802-551-6634', notes: 'Malaria treatment complete' },
  { id: 'APT-1039', patient: 'Ngozi Eze', patientId: 'MRN-00389', doctor: 'Dr. Adeyemi', dept: 'Maternity', datetime: '2025-05-25T10:00', type: 'outpatient', status: 'no_show', phone: '0812-330-9901', notes: 'Antenatal check' },
]

const QUEUE = [
  { number: 1, name: 'Chukwuemeka Nwosu', waitMin: 5, status: 'in-progress', type: 'APT-1041' },
  { number: 2, name: 'Amina Usman', waitMin: 25, status: 'waiting', type: 'APT-1042' },
  { number: 3, name: 'Bola Okonkwo', waitMin: 55, status: 'waiting', type: 'APT-1043' },
  { number: 4, name: 'Walk-in', waitMin: 80, status: 'registered', type: 'Walk-in' },
  { number: 5, name: 'Walk-in', waitMin: 85, status: 'registered', type: 'Walk-in' },
]

const TYPE_LABELS: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  outpatient: { label: 'Outpatient', color: '#00d4a1', bg: '#00d4a115', icon: '🏥' },
  follow_up: { label: 'Follow-up', color: '#0066ff', bg: '#0066ff15', icon: '🔄' },
  telemedicine: { label: 'Telemedicine', color: '#a855f7', bg: '#a855f715', icon: '📱' },
  emergency: { label: 'Emergency', color: '#ff4d4d', bg: '#ff4d4d15', icon: '🚨' },
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  scheduled: { label: 'Scheduled', color: '#ffbd2e', bg: '#ffbd2e15' },
  confirmed: { label: 'Confirmed', color: '#00d4a1', bg: '#00d4a115' },
  completed: { label: 'Completed', color: '#6b7280', bg: '#6b728015' },
  cancelled: { label: 'Cancelled', color: '#ff4d4d', bg: '#ff4d4d15' },
  no_show: { label: 'No Show', color: '#ff8800', bg: '#ff880015' },
}

function formatTime(datetime: string) {
  const d = new Date(datetime)
  return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
}

function formatDate(datetime: string) {
  const d = new Date(datetime)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return d.toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short' })
}

function AppointmentsPage() {
  const [tab, setTab] = useState<'today' | 'queue' | 'all' | 'new'>('today')
  const [statusFilter, setStatusFilter] = useState('all')
  const [smsSent, setSmsSent] = useState<Set<string>>(new Set())
  const [newAppt, setNewAppt] = useState({ patient: '', doctor: '', date: '', time: '', type: 'outpatient', notes: '' })
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const today = new Date().toDateString()
  const todayAppts = APPOINTMENTS.filter(a => new Date(a.datetime).toDateString() === today || a.datetime.startsWith('2025-05-26'))
  const filteredAll = statusFilter === 'all' ? APPOINTMENTS : APPOINTMENTS.filter(a => a.status === statusFilter)

  const sendSmsReminder = (id: string) => {
    setSmsSent(prev => new Set([...prev, id]))
  }

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
    setTimeout(() => { setBookingSuccess(false); setTab('today') }, 2500)
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0f1e]/95 backdrop-blur-md border-b border-white/10 px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-1">
              ← Dashboard
            </Link>
            <span className="text-gray-700">/</span>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              📅 Appointments
            </h1>
          </div>
          <button
            onClick={() => setTab('new')}
            className="bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            + New Appointment
          </button>
        </div>
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
          {([
            { key: 'today', label: `Today (${todayAppts.length})` },
            { key: 'queue', label: `Queue (${QUEUE.length})` },
            { key: 'all', label: 'All Appointments' },
            { key: 'new', label: '+ Book New' },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 max-w-6xl space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Today's Total", value: todayAppts.length, icon: '📅', color: '#00d4a1' },
            { label: 'Confirmed', value: APPOINTMENTS.filter(a => a.status === 'confirmed').length, icon: '✅', color: '#0066ff' },
            { label: 'Queue Now', value: QUEUE.length, icon: '👥', color: '#ffbd2e' },
            { label: 'Avg Wait (min)', value: '32', icon: '⏱️', color: '#a855f7' },
          ].map(s => (
            <div key={s.label} className="bg-[#111827] border border-white/10 rounded-xl p-4">
              <div className="text-xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* TODAY TAB */}
        {tab === 'today' && (
          <div className="space-y-3">
            <h2 className="text-white font-bold text-lg">Today's Appointments — Monday 26 May 2025</h2>
            {todayAppts.map(a => {
              const typeInfo = TYPE_LABELS[a.type]
              const statusInfo = STATUS_LABELS[a.status]
              const smsAlready = smsSent.has(a.id)
              return (
                <div key={a.id} className="bg-[#111827] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Time */}
                    <div className="text-center w-16 shrink-0">
                      <div className="text-xl font-black text-white">{formatTime(a.datetime)}</div>
                      <div className="text-xs text-gray-500">{formatDate(a.datetime)}</div>
                    </div>

                    <div className="w-px h-10 bg-white/10 shrink-0" />

                    {/* Patient */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white font-semibold">{a.patient}</span>
                        <span className="text-xs text-gray-600 font-mono">{a.patientId}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ color: typeInfo.color, background: typeInfo.bg }}>
                          {typeInfo.icon} {typeInfo.label}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{a.doctor} · {a.dept}</div>
                      {a.notes && <div className="text-xs text-gray-600 mt-0.5 italic">"{a.notes}"</div>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap shrink-0">
                      {a.status === 'scheduled' || a.status === 'confirmed' ? (
                        <>
                          <button
                            onClick={() => sendSmsReminder(a.id)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${
                              smsAlready
                                ? 'border-[#00d4a1]/30 bg-[#00d4a1]/10 text-[#00d4a1]'
                                : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {smsAlready ? '✓ SMS Sent' : '📱 Send Reminder'}
                          </button>
                          {a.type === 'telemedicine' && (
                            <button className="text-xs bg-[#a855f7]/15 border border-[#a855f7]/30 text-[#a855f7] px-3 py-1.5 rounded-lg hover:bg-[#a855f7]/25 transition-colors">
                              📱 Join Call
                            </button>
                          )}
                          <button className="text-xs bg-[#00d4a1]/15 border border-[#00d4a1]/30 text-[#00d4a1] px-3 py-1.5 rounded-lg hover:bg-[#00d4a1]/25 transition-colors">
                            ✓ Mark Done
                          </button>
                          <button className="text-xs border border-[#ff4d4d]/20 text-[#ff4d4d] px-3 py-1.5 rounded-lg hover:bg-[#ff4d4d]/10 transition-colors">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-600">{a.status === 'completed' ? '✓ Done' : '✗ No show'}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* QUEUE TAB */}
        {tab === 'queue' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">Live Queue — Outpatient Department</h2>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-[#00d4a1] animate-pulse inline-block" />
                Live · Auto-updates
              </div>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden">
              {/* Current patient */}
              <div className="bg-[#00d4a1]/10 border-b border-[#00d4a1]/20 p-5">
                <div className="text-xs text-[#00d4a1] font-semibold uppercase mb-2">🟢 Now Seeing</div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00d4a1] flex items-center justify-center text-[#0a0f1e] font-black text-xl">
                    1
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{QUEUE[0].name}</div>
                    <div className="text-sm text-gray-400">In consultation · Est. 15 min remaining</div>
                  </div>
                  <div className="ml-auto">
                    <button className="bg-[#00d4a1] text-[#0a0f1e] font-semibold px-4 py-2 rounded-lg text-sm">
                      Complete
                    </button>
                  </div>
                </div>
              </div>

              {/* Waiting */}
              <div className="p-4 space-y-2">
                <div className="text-xs text-gray-500 uppercase font-semibold px-2 mb-3">Waiting</div>
                {QUEUE.slice(1).map((q) => (
                  <div key={q.number} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      q.status === 'registered' ? 'bg-white/5 text-gray-500' : 'bg-[#ffbd2e]/15 text-[#ffbd2e]'
                    }`}>
                      {q.number}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{q.name}</div>
                      <div className="text-xs text-gray-500">
                        {q.status === 'registered' ? 'Walk-in · Registered' : 'Has appointment'} · Waiting ~{q.waitMin} min
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-mono">
                      {q.type !== 'Walk-in' ? q.type : '🚶 Walk-in'}
                    </div>
                    <button className="text-xs border border-white/10 text-gray-500 hover:text-[#00d4a1] hover:border-[#00d4a1]/30 px-2.5 py-1.5 rounded-lg transition-colors">
                      Bump Up
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 p-4 flex gap-3">
                <button className="flex-1 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 text-sm font-medium py-2.5 rounded-xl transition-colors">
                  + Add Walk-in
                </button>
                <button className="flex-1 bg-[#0066ff]/15 border border-[#0066ff]/30 text-[#0066ff] hover:bg-[#0066ff]/25 text-sm font-medium py-2.5 rounded-xl transition-colors">
                  📢 Call Next
                </button>
              </div>
            </div>

            {/* SMS reminder batch */}
            <div className="bg-[#0066ff]/10 border border-[#0066ff]/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">Send Bulk SMS Reminders</div>
                <div className="text-xs text-gray-400 mt-0.5">3 patients with tomorrow's appointments haven't been notified</div>
              </div>
              <button className="bg-[#0066ff] text-white font-semibold px-5 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity">
                📱 Send All Reminders
              </button>
            </div>
          </div>
        )}

        {/* ALL TAB */}
        {tab === 'all' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-white font-bold text-lg">All Appointments</h2>
              <div className="flex gap-2">
                {['all', 'scheduled', 'confirmed', 'completed', 'no_show'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-colors capitalize ${
                      statusFilter === s ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {s === 'all' ? 'All' : s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      {['ID', 'Patient', 'Doctor', 'Date & Time', 'Type', 'Status', 'Action'].map(h => (
                        <th key={h} className="text-left text-gray-500 font-medium px-5 py-3 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredAll.map(a => {
                      const typeInfo = TYPE_LABELS[a.type]
                      const statusInfo = STATUS_LABELS[a.status]
                      return (
                        <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3 font-mono text-xs text-gray-600">{a.id}</td>
                          <td className="px-5 py-3">
                            <div className="text-white font-medium">{a.patient}</div>
                            <div className="text-xs text-gray-600">{a.patientId}</div>
                          </td>
                          <td className="px-5 py-3 text-gray-400">{a.doctor}</td>
                          <td className="px-5 py-3">
                            <div className="text-white">{formatTime(a.datetime)}</div>
                            <div className="text-xs text-gray-600">{formatDate(a.datetime)}</div>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ color: typeInfo.color, background: typeInfo.bg }}>
                              {typeInfo.icon} {typeInfo.label}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            {(a.status === 'scheduled' || a.status === 'confirmed') && (
                              <button
                                onClick={() => sendSmsReminder(a.id)}
                                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${smsSent.has(a.id) ? 'border-[#00d4a1]/30 text-[#00d4a1]' : 'border-white/10 text-gray-500 hover:text-white'}`}
                              >
                                {smsSent.has(a.id) ? '✓ Sent' : '📱 SMS'}
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* NEW APPOINTMENT TAB */}
        {tab === 'new' && (
          <div className="max-w-xl">
            <h2 className="text-white font-bold text-lg mb-6">Book New Appointment</h2>

            {bookingSuccess ? (
              <div className="bg-[#00d4a1]/10 border border-[#00d4a1]/30 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <div className="text-white font-bold text-xl mb-2">Appointment Booked!</div>
                <div className="text-gray-400 text-sm">SMS reminder will be sent automatically 24h and 2h before the appointment.</div>
              </div>
            ) : (
              <form onSubmit={handleBook} className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Patient Name / MRN</label>
                    <input
                      required
                      value={newAppt.patient}
                      onChange={e => setNewAppt(p => ({ ...p, patient: e.target.value }))}
                      placeholder="Search patient name or MRN..."
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Doctor</label>
                    <select
                      required
                      value={newAppt.doctor}
                      onChange={e => setNewAppt(p => ({ ...p, doctor: e.target.value }))}
                      className="w-full bg-[#111827] border border-white/10 text-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
                    >
                      <option value="">Select doctor</option>
                      {['Dr. Nwosu', 'Dr. Adeyemi', 'Dr. Chidinma', 'Dr. Bello', 'Dr. Tanko'].map(d => (
                        <option key={d} value={d} className="bg-[#111827]">{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                    <select
                      value={newAppt.type}
                      onChange={e => setNewAppt(p => ({ ...p, type: e.target.value }))}
                      className="w-full bg-[#111827] border border-white/10 text-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
                    >
                      <option value="outpatient" className="bg-[#111827]">🏥 Outpatient</option>
                      <option value="follow_up" className="bg-[#111827]">🔄 Follow-up</option>
                      <option value="telemedicine" className="bg-[#111827]">📱 Telemedicine</option>
                      <option value="emergency" className="bg-[#111827]">🚨 Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                    <input
                      type="date"
                      required
                      value={newAppt.date}
                      onChange={e => setNewAppt(p => ({ ...p, date: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Time</label>
                    <input
                      type="time"
                      required
                      value={newAppt.time}
                      onChange={e => setNewAppt(p => ({ ...p, time: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Notes (optional)</label>
                    <textarea
                      rows={3}
                      value={newAppt.notes}
                      onChange={e => setNewAppt(p => ({ ...p, notes: e.target.value }))}
                      placeholder="Reason for visit, special requirements..."
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a1]/50 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="bg-[#0066ff]/10 border border-[#0066ff]/20 rounded-xl p-3 text-xs text-gray-400 flex items-start gap-2">
                  <span>📱</span>
                  <span>SMS reminders will be auto-sent to the patient 24 hours and 2 hours before this appointment.</span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
                  >
                    Book Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('today')}
                    className="border border-white/10 text-gray-400 px-6 py-3 rounded-xl text-sm hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
