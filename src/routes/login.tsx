import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { useConvexAuth } from 'convex/react'

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'CareShift — Sign In' }] }),
  component: LoginPage,
})

const ROLES = [
  { value: 'doctor', label: 'Doctor', icon: '🩺' },
  { value: 'nurse', label: 'Nurse', icon: '💉' },
  { value: 'pharmacist', label: 'Pharmacist', icon: '💊' },
  { value: 'admin', label: 'Hospital Admin', icon: '🏥' },
  { value: 'patient', label: 'Patient', icon: '🧑‍⚕️' },
]

function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useConvexAuth()

  if (isAuthenticated) {
    navigate({ to: '/dashboard' })
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-[#0d1117] to-[#0a0f1e] border-r border-white/10 p-12 justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00d4a1] to-[#0066ff] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="text-white font-bold text-xl">CareShift</span>
        </Link>
        <div>
          <div className="text-4xl font-black text-white mb-4 leading-tight">
            Welcome back,<br />
            <span className="bg-gradient-to-r from-[#00d4a1] to-[#0066ff] bg-clip-text text-transparent">
              healthcare hero.
            </span>
          </div>
          <p className="text-gray-500 text-lg mb-12">
            Your patients are waiting. Sign in to your CareShift dashboard.
          </p>
          <div className="space-y-4">
            {[
              { icon: '🔒', title: 'Secure & NDPR Compliant', desc: 'Your data is encrypted and never shared.' },
              { icon: '📱', title: 'Works Offline', desc: 'Access critical records even without internet.' },
              { icon: '🛡️', title: 'Burnout Shield Active', desc: 'We look after you as you look after others.' },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="text-2xl">{f.icon}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{f.title}</div>
                  <div className="text-gray-500 text-sm">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-gray-600 text-sm">© 2025 CareShift · Built for Nigeria</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4a1] to-[#0066ff] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl">CareShift</span>
          </Link>
          <AuthForm />
        </div>
      </div>
    </div>
  )
}

function AuthForm() {
  const { signIn } = useAuthActions()
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | { email: string }>('email')
  const [role, setRole] = useState('doctor')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (step === 'email') {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-2">Sign in to CareShift</h1>
          <p className="text-gray-500 text-sm">Enter your email to receive a secure sign-in code.</p>
        </div>

        {/* Role selector */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-400 mb-2">Your Role</label>
          <div className="grid grid-cols-5 gap-2">
            {ROLES.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition-all ${
                  role === r.value
                    ? 'border-[#00d4a1] bg-[#00d4a1]/10 text-[#00d4a1]'
                    : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'
                }`}
              >
                <span className="text-lg">{r.icon}</span>
                <span className="hidden sm:block">{r.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setError('')
            setLoading(true)
            const formData = new FormData(e.currentTarget)
            signIn('resend-otp', formData)
              .then(() => {
                setStep({ email: formData.get('email') as string })
                setLoading(false)
              })
              .catch((err) => {
                setError(err.message)
                setLoading(false)
              })
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="doctor@lagosgeneral.ng"
              autoFocus
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a1]/50 focus:bg-white/10 transition-all"
            />
          </div>
          {error && (
            <div className="bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 text-[#ff4d4d] text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#0a0f1e]/30 border-t-[#0a0f1e] rounded-full animate-spin" />
                Sending code...
              </>
            ) : 'Send Sign-in Code'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-[#00d4a1] hover:underline">Contact your hospital admin</a>
          </p>
        </div>
        <div className="mt-4 text-center text-xs text-gray-600">
          Protected by Convex Auth · NDPR Compliant
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#00d4a1]/15 border border-[#00d4a1]/30 flex items-center justify-center text-2xl mb-4">
          📧
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Check your email</h1>
        <p className="text-gray-500 text-sm">
          We sent a 8-digit code to <span className="text-white font-medium">{step.email}</span>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setError('')
          setLoading(true)
          const formData = new FormData(e.currentTarget)
          signIn('resend-otp', formData)
            .then(() => {
              setLoading(false)
              navigate({ to: '/dashboard' })
            })
            .catch((err) => {
              setError(err.message)
              setLoading(false)
            })
        }}
        className="space-y-4"
      >
        <input name="email" value={step.email} type="hidden" readOnly />
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Verification Code</label>
          <input
            name="code"
            placeholder="Enter 8-digit code"
            autoComplete="one-time-code"
            inputMode="numeric"
            autoFocus
            required
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4a1]/50 focus:bg-white/10 transition-all text-center tracking-widest text-lg"
          />
        </div>
        {error && (
          <div className="bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 text-[#ff4d4d] text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#00d4a1] to-[#00b8d4] text-[#0a0f1e] font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0a0f1e]/30 border-t-[#0a0f1e] rounded-full animate-spin" />
              Verifying...
            </>
          ) : 'Verify & Sign In'}
        </button>
        <button
          type="button"
          onClick={() => { setStep('email'); setError('') }}
          className="w-full border border-white/10 text-gray-400 hover:text-white py-3 rounded-xl text-sm transition-colors"
        >
          ← Use a different email
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-gray-600">
        Code expires in 15 minutes · Check spam folder if not received
      </div>
    </div>
  )
}
