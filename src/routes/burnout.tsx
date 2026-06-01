import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/burnout')({
  head: () => ({ meta: [{ title: 'CareShift — Burnout Shield' }] }),
  component: BurnoutPage,
})

const STAFF_DATA = [
  { name: 'Dr. Amaka Nwosu', role: 'Doctor', dept: 'Emergency', hoursWeek: 42, hrsToday: 9, patientRatio: 12, wellness: [4, 3, 4, 5, 4, null, null], flag: false },
  { name: 'Nurse Fatima Bello', role: 'Nurse', dept: 'Emergency', hoursWeek: 56, hrsToday: 11, patientRatio: 16, wellness: [2, 1, 2, 3, 2, null, null], flag: true },
  { name: 'Dr. Seun Adeyemi', role: 'Doctor', dept: 'Maternity', hoursWeek: 38, hrsToday: 7, patientRatio: 8, wellness: [5, 4, 5, 4, 5, null, null], flag: false },
  { name: 'Pharm. Chukwu Obi', role: 'Pharmacist', dept: 'Pharmacy', hoursWeek: 40, hrsToday: 8, patientRatio: null, wellness: [3, 3, 4, 3, 3, null, null], flag: false },
  { name: 'Dr. Chidinma Eze', role: 'Doctor', dept: 'General', hoursWeek: 61, hrsToday: 12, patientRatio: 18, wellness: [2, 1, 1, 2, 2, null, null], flag: true },
  { name: 'Nurse Grace Okonkwo', role: 'Nurse', dept: 'Maternity', hoursWeek: 44, hrsToday: 8, patientRatio: 10, wellness: [4, 4, 3, 4, 4, null, null], flag: false },
  { name: 'Dr. Musa Tanko', role: 'Doctor', dept: 'Paediatrics', hoursWeek: 35, hrsToday: 7, patientRatio: 9, wellness: [5, 5, 4, 5, 5, null, null], flag: false },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function WellnessBar({ scores }: { scores: (number | null)[] }) {
  return (
    <div className="flex gap-1 items-center">
      {scores.map((s, i) => {
        const color = s === null ? '#ffffff10' : s >= 4 ? '#00d4a1' : s >= 3 ? '#ffbd2e' : '#ff4d4d'
        return (
          <div
            key={i}
            title={s !== null ? `${DAYS[i]}: ${s}/5` : `${DAYS[i]}: Not logged`}
            className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold transition-all hover:scale-125"
            style={{ backgroundColor: color, color: s !== null ? '#0a0f1e' : 'transparent' }}
          >
            {s}
          </div>
        )
      })}
    </div>
  )
}

function BurnoutPage() {
  const [activeStaff, setActiveStaff] = useState<typeof STAFF_DATA[0] | null>(null)
  const [wellnessInput, setWellnessInput] = useState<number>(3)
  const [submitted, setSubmitted] = useState(false)

  const flaggedStaff = STAFF_DATA.filter(s => s.flag)
  const avgHours = Math.round(STAFF_DATA.reduce((a, s) => a + s.hoursWeek, 0) / STAFF_DATA.length)
  const avgWellness = (STAFF_DATA.reduce((a, s) => a + (s.wellness.filter(Boolean) as number[]).reduce((b, n) => b + n, 0) / s.wellness.filter(Boolean).length, 0) / STAFF_DATA.length).toFixed(1)

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0f1e]/95 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-1">
              ← Dashboard
            </Link>
            <span className="text-gray-700">/</span>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              🛡️ Burnout Shield
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Weekly workload monitoring — Lagos General Hospital</p>
        </div>
        <div className="bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 text-[#ff4d4d] px-4 py-2 rounded-xl text-sm font-semibold">
          ⚠ {flaggedStaff.length} Staff Flagged
        </div>
      </div>

      <div className="p-8 space-y-8 max-w-6xl">
        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Staff Monitored', value: STAFF_DATA.length, icon: '👥', color: '#00d4a1' },
            { label: 'Flagged (Overload)', value: flaggedStaff.length, icon: '🚨', color: '#ff4d4d' },
            { label: 'Avg Hours/Week', value: `${avgHours}h`, icon: '⏱️', color: avgHours > 48 ? '#ff4d4d' : '#ffbd2e' },
            { label: 'Avg Wellness Score', value: `${avgWellness}/5`, icon: '❤️', color: Number(avgWellness) >= 4 ? '#00d4a1' : Number(avgWellness) >= 3 ? '#ffbd2e' : '#ff4d4d' },
          ].map(s => (
            <div key={s.label} className="bg-[#111827] border border-white/10 rounded-xl p-4">
              <div className="text-xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Flagged alerts */}
        {flaggedStaff.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-white font-bold text-lg">🚨 Overload Alerts</h2>
            {flaggedStaff.map(s => (
              <div key={s.name} className="bg-[#ff4d4d]/5 border border-[#ff4d4d]/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff4d4d]/20 flex items-center justify-center text-xl shrink-0">⚠️</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-white font-semibold">{s.name}</span>
                      <span className="text-xs text-gray-500">{s.role} · {s.dept}</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1 space-y-0.5">
                      {s.hoursWeek > 48 && (
                        <div>⏱ <strong className="text-[#ff4d4d]">{s.hoursWeek}h</strong> worked this week (safe limit: 48h)</div>
                      )}
                      {s.patientRatio && s.patientRatio > 12 && (
                        <div>🛏️ Managing <strong className="text-[#ff4d4d]">{s.patientRatio} patients</strong> (safe ratio: 1:12)</div>
                      )}
                      {(s.wellness.filter(Boolean) as number[]).some(w => w <= 2) && (
                        <div>💔 Wellness score critically low this week</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-xs bg-[#ff4d4d]/15 border border-[#ff4d4d]/30 text-[#ff4d4d] px-3 py-1.5 rounded-lg hover:bg-[#ff4d4d]/25 transition-colors">
                      Schedule Rest Day
                    </button>
                    <button className="text-xs border border-white/10 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Staff workload table */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">Staff Workload — This Week</h2>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#00d4a1] inline-block" /> Good (4–5)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#ffbd2e] inline-block" /> Fair (3)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#ff4d4d] inline-block" /> Poor (1–2)</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  {['Staff Member', 'Role / Dept', 'Hrs/Week', 'Today', 'Patients', 'Wellness (Mon–Sun)', 'Flag', ''].map(h => (
                    <th key={h} className="text-left text-gray-500 font-medium px-5 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {STAFF_DATA.map(s => (
                  <tr
                    key={s.name}
                    className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${s.flag ? 'bg-[#ff4d4d]/[0.03]' : ''}`}
                    onClick={() => setActiveStaff(activeStaff?.name === s.name ? null : s)}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d4a1]/40 to-[#0066ff]/40 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {s.name.split(' ')[1][0]}
                        </div>
                        <span className="text-white font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{s.role} · {s.dept}</td>
                    <td className="px-5 py-3.5">
                      <span className={`font-bold ${s.hoursWeek > 55 ? 'text-[#ff4d4d]' : s.hoursWeek > 48 ? 'text-[#ffbd2e]' : 'text-[#00d4a1]'}`}>
                        {s.hoursWeek}h
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400">{s.hrsToday}h</td>
                    <td className="px-5 py-3.5">
                      {s.patientRatio ? (
                        <span className={`font-medium ${s.patientRatio > 12 ? 'text-[#ff4d4d]' : 'text-gray-300'}`}>
                          1:{s.patientRatio}
                        </span>
                      ) : <span className="text-gray-600">N/A</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <WellnessBar scores={s.wellness} />
                    </td>
                    <td className="px-5 py-3.5">
                      {s.flag
                        ? <span className="text-xs font-semibold text-[#ff4d4d] bg-[#ff4d4d]/15 px-2 py-0.5 rounded-full">FLAGGED</span>
                        : <span className="text-xs text-[#00d4a1] bg-[#00d4a1]/10 px-2 py-0.5 rounded-full">OK</span>
                      }
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-gray-600 text-xs">{activeStaff?.name === s.name ? '▲' : '▼'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anonymous wellness check-in */}
        <div className="bg-gradient-to-r from-[#a855f7]/10 to-[#0066ff]/10 border border-[#a855f7]/20 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-2">🧡 Anonymous Wellness Check-in</h2>
          <p className="text-gray-400 text-sm mb-5">How are you feeling today? Your response is anonymous and helps us support you better.</p>

          {!submitted ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setWellnessInput(n)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${wellnessInput === n ? 'border-[#a855f7] bg-[#a855f7]/15' : 'border-white/10 hover:border-white/20'}`}
                  >
                    <span className="text-2xl">{['😰', '😟', '😐', '😊', '😄'][n - 1]}</span>
                    <span className="text-xs text-gray-500">{n}/5</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSubmitted(true)}
                className="bg-[#a855f7] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                Submit (Anonymous)
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-[#00d4a1]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="font-semibold">Thank you! Your check-in has been recorded anonymously. 💚</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
