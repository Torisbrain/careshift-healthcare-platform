import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'CareShift — Nigeria\'s Hospital Companion Platform' }] }),
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Nav />
      <Hero />
      <StatsBar />
      <Features />
      <Roles />
      <BurnoutShield />
      <CallToAction />
      <Footer />
    </div>
  )
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0f1e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4a1] to-[#0066ff] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">CareShift</span>
          <span className="ml-1 text-xs bg-[#00d4a1]/20 text-[#00d4a1] border border-[#00d4a1]/30 px-2 py-0.5 rounded-full font-medium">Beta</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Roles', 'Security', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2">Sign in</Link>
          <Link to="/dashboard" className="text-sm bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00d4a1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-[#0066ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00d4a1] animate-pulse" />
          <span className="text-sm text-gray-300">Built for Nigeria's health workforce crisis</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          Every shift.{' '}
          <span className="bg-gradient-to-r from-[#00d4a1] to-[#0066ff] bg-clip-text text-transparent">
            Every patient.
          </span>
          <br />Every life — covered.
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          CareShift is Nigeria's all-in-one hospital companion platform — reducing burnout, digitizing care, and connecting every stakeholder in real time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-all hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3l14 9-14 9V3z"/>
            </svg>
            Launch Dashboard
          </Link>
          <a href="#features" className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/5 transition-all">
            See Features
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </a>
        </div>

        {/* Dashboard preview mockup */}
        <div className="mt-16 relative">
          <div className="bg-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60 max-w-4xl mx-auto">
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0d1117]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-4 bg-[#1c2333] rounded-md px-3 py-1 text-xs text-gray-500">
                careshiftng.com/dashboard
              </div>
            </div>

            {/* Mock dashboard content */}
            <div className="p-5 grid grid-cols-12 gap-4">
              {/* Sidebar */}
              <div className="col-span-2 space-y-1">
                {['Dashboard', 'Patients', 'Vitals', 'Pharmacy', 'Shifts', 'Reports'].map((item, i) => (
                  <div key={item} className={`px-2 py-1.5 rounded-md text-xs ${i === 0 ? 'bg-[#00d4a1]/20 text-[#00d4a1]' : 'text-gray-500'}`}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="col-span-10 space-y-3">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Active Patients', val: '142', color: '#00d4a1' },
                    { label: 'Staff On Shift', val: '38', color: '#0066ff' },
                    { label: 'Critical Alerts', val: '3', color: '#ff4d4d' },
                    { label: 'Beds Available', val: '17', color: '#ffbd2e' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#1c2333] rounded-lg p-2.5">
                      <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                      <div className="text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>

                {/* Chart-like bars */}
                <div className="bg-[#1c2333] rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-2">Ward Occupancy</div>
                  <div className="space-y-1.5">
                    {[
                      { ward: 'Emergency', pct: 92, color: '#ff4d4d' },
                      { ward: 'Maternity', pct: 67, color: '#00d4a1' },
                      { ward: 'Paediatrics', pct: 45, color: '#0066ff' },
                      { ward: 'General', pct: 78, color: '#ffbd2e' },
                    ].map(w => (
                      <div key={w.ward} className="flex items-center gap-2">
                        <div className="text-xs text-gray-500 w-16 shrink-0">{w.ward}</div>
                        <div className="flex-1 bg-white/5 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ width: `${w.pct}%`, backgroundColor: w.color }} />
                        </div>
                        <div className="text-xs text-gray-500 w-8 text-right">{w.pct}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating alert card */}
          <div className="absolute -right-4 top-12 bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 rounded-xl p-3 w-52 shadow-lg hidden md:block">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#ff4d4d] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-red-400">Critical Alert</div>
                <div className="text-xs text-gray-400 mt-0.5">Patient Adamu S. — SpO2 dropped to 88%. Ward 3B.</div>
              </div>
            </div>
          </div>

          {/* Floating AI card */}
          <div className="absolute -left-4 bottom-12 bg-[#0066ff]/10 border border-[#0066ff]/30 rounded-xl p-3 w-56 shadow-lg hidden md:block">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00d4a1] to-[#0066ff] flex items-center justify-center shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-400">AI Diagnosis Assist</div>
                <div className="text-xs text-gray-400 mt-0.5">Symptoms match: Severe malaria (87% confidence). Review suggested.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    { value: '50+', label: 'Hospitals Onboarded' },
    { value: '2,400+', label: 'Health Workers' },
    { value: '18,000+', label: 'Patients Served' },
    { value: '34%', label: 'Burnout Reduction' },
    { value: '6', label: 'Nigerian States' },
  ]
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-8 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-black text-white mb-1">{s.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const featureList = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    color: '#00d4a1',
    title: 'Digital Patient Cards',
    desc: 'Create a full digital record per patient — QR code generated instantly. Scan at bedside to pull complete history, allergies, and active prescriptions in seconds.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    color: '#ff4d4d',
    title: 'Real-time Vitals Alerts',
    desc: 'Nurses log BP, SpO2, temperature, and pulse. Auto-alerts fire when values cross safe thresholds — direct escalation to the duty doctor with one tap.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    color: '#0066ff',
    title: 'AI Clinical Assistant',
    desc: 'Powered by Claude Sonnet. Input symptoms and get differential diagnoses, drug interaction checks, and discharge summary drafts — all flagged clearly as advisory.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    color: '#ffbd2e',
    title: 'Drug Inventory & Pharmacy',
    desc: 'Track every drug by batch, quantity, and expiry. Low-stock alerts 30/7/1 day before expiry. Doctors send digital prescriptions directly to pharmacists.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: '#a855f7',
    title: 'Shift Handover Notes',
    desc: 'Structured handover with patient priority flags: Critical / Stable / Discharge-ready. Outgoing nurses and doctors brief incoming staff in under 2 minutes.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: '#00d4a1',
    title: 'Burnout Shield',
    desc: 'Track hours, patient-to-nurse ratios, and wellness scores per shift. Supervisors are alerted before staff hit unsafe workload thresholds.',
  },
]

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-sm text-[#00d4a1] font-semibold bg-[#00d4a1]/10 border border-[#00d4a1]/20 px-4 py-1.5 rounded-full mb-4">
            Platform Features
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything a hospital needs,<br />
            <span className="text-gray-500">in one place.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From patient admission to discharge — every role, every workflow, every alert is handled by CareShift.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map(f => (
            <div key={f.title} className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${f.color}20`, color: f.color }}>
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const roles = [
  {
    role: 'Doctor',
    icon: '🩺',
    color: '#0066ff',
    bg: '#0066ff15',
    features: ['AI diagnosis assist', 'Prescription writing', 'Consultation notes', 'Shift handover', 'Lab/imaging requests'],
  },
  {
    role: 'Nurse',
    icon: '💉',
    color: '#00d4a1',
    bg: '#00d4a115',
    features: ['Ward board view', 'Vitals logging', 'NFC bedside scan', 'Task management', 'Doctor escalation'],
  },
  {
    role: 'Pharmacist',
    icon: '💊',
    color: '#ffbd2e',
    bg: '#ffbd2e15',
    features: ['Drug inventory', 'Prescription receive', 'Expiry alerts', 'Stock orders', 'Drug interaction lookup'],
  },
  {
    role: 'Hospital Admin',
    icon: '🏥',
    color: '#a855f7',
    bg: '#a855f715',
    features: ['Analytics dashboard', 'Staff management', 'Burnout reports', 'Billing & invoices', 'Audit logs'],
  },
  {
    role: 'Patient',
    icon: '🧑‍⚕️',
    color: '#ff4d4d',
    bg: '#ff4d4d15',
    features: ['Medical history', 'Appointments', 'Discharge notes', 'Medication reminders', '5 language support'],
  },
  {
    role: 'Super Admin',
    icon: '⚙️',
    color: '#00d4a1',
    bg: '#00d4a115',
    features: ['Multi-hospital view', 'Platform analytics', 'Hospital onboarding', 'System configuration', 'Global audit trail'],
  },
]

function Roles() {
  return (
    <section id="roles" className="py-24 px-6 bg-white/[0.015] border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-sm text-[#0066ff] font-semibold bg-[#0066ff]/10 border border-[#0066ff]/20 px-4 py-1.5 rounded-full mb-4">
            Role-Based Access
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Built for every person<br />
            <span className="text-gray-500">in the building.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Each role gets a focused, tailored view — no noise, just what matters for the job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map(r => (
            <div key={r.role} className="rounded-2xl border p-5" style={{ background: r.bg, borderColor: `${r.color}30` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{r.icon}</div>
                <div className="text-white font-bold text-lg">{r.role}</div>
              </div>
              <ul className="space-y-2">
                {r.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BurnoutShield() {
  const metrics = [
    { label: 'Hours This Week', value: 52, max: 60, danger: 50, color: '#ff4d4d' },
    { label: 'Patients per Nurse', value: 8, max: 12, danger: 10, color: '#ffbd2e' },
    { label: 'Wellness Score', value: 3.2, max: 5, danger: 2, color: '#00d4a1', isScore: true },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block text-sm text-[#a855f7] font-semibold bg-[#a855f7]/10 border border-[#a855f7]/20 px-4 py-1.5 rounded-full mb-6">
            🛡️ Burnout Shield — Unique to CareShift
          </div>
          <h2 className="text-4xl font-black text-white mb-6 leading-tight">
            Nigeria loses 2,000+ doctors<br />
            <span className="text-[#a855f7]">every year to burnout.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            CareShift's Burnout Shield monitors shift hours, patient loads, and anonymous wellness scores — alerting supervisors <em className="text-white not-italic font-medium">before</em> a health worker hits the wall.
          </p>
          <ul className="space-y-3">
            {[
              'Track hours per staff, per day, per week',
              'Auto-flag when patient-to-nurse ratio is unsafe',
              'Anonymous wellness check-in (1–5 score)',
              'Monthly burnout report per department',
              'Staff rest-day planner built in',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/40 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual card */}
        <div className="bg-[#111827] rounded-2xl border border-white/10 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Dr. Chinelo Obi</div>
              <div className="text-sm text-gray-500">Internal Medicine · Lagos General</div>
            </div>
            <div className="bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 text-[#ff4d4d] text-xs font-semibold px-3 py-1 rounded-full">
              ⚠ Overload Risk
            </div>
          </div>

          {metrics.map(m => (
            <div key={m.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{m.label}</span>
                <span className="text-white font-semibold">{m.value}{m.isScore ? '/5' : m.label.includes('Hours') ? 'h' : ''}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width: `${(m.value / m.max) * 100}%`,
                    backgroundColor: m.isScore ? (m.value < m.danger ? '#ff4d4d' : m.color) : (m.value >= m.danger ? '#ff4d4d' : m.color),
                  }}
                />
              </div>
            </div>
          ))}

          <div className="bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-xl p-4">
            <div className="text-sm font-semibold text-[#a855f7] mb-1">AI Recommendation</div>
            <div className="text-sm text-gray-400">Dr. Obi has worked 52 hours this week. Consider scheduling a rest day before Thursday's shift to maintain safe patient care standards.</div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, 3).concat(['Thu', 'Fri', 'Sat', 'Sun'].slice(0, 4)).map((day, i) => (
              <div key={`${day}-${i}`} className={`rounded-lg p-2 text-center text-xs ${i < 5 ? 'bg-[#0066ff]/20 text-[#0066ff]' : 'bg-white/5 text-gray-600'}`}>
                <div className="font-semibold">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</div>
                <div className="mt-0.5">{i < 5 ? '✓' : '—'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#00d4a1]/20 via-[#0066ff]/10 to-[#a855f7]/20 border border-white/10 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,161,0.1),transparent_70%)]" />
          <div className="relative z-10">
            <div className="text-5xl mb-6">🏥</div>
            <h2 className="text-4xl font-black text-white mb-4">
              Ready to transform your hospital?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Join hospitals across Nigeria using CareShift to reduce burnout, improve patient outcomes, and keep heroes in the building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-all hover:scale-105">
                Go to Dashboard
              </Link>
              <a href="mailto:hello@careshiftng.com" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/5 transition-all">
                Contact Sales
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><span className="text-[#00d4a1]">✓</span> NDPR Compliant</span>
              <span className="flex items-center gap-1.5"><span className="text-[#00d4a1]">✓</span> HIPAA-Aligned</span>
              <span className="flex items-center gap-1.5"><span className="text-[#00d4a1]">✓</span> Offline-Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4a1] to-[#0066ff] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="text-white font-bold">CareShift</span>
          <span className="text-gray-600 text-sm ml-2">Built for Nigeria. Designed to keep heroes in the building.</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Security</a>
          <a href="mailto:hello@careshiftng.com" className="hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}
