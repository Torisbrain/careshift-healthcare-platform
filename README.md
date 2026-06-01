# 🏥 CareShift — Nigeria's All-in-One Hospital Companion Platform

> **"Every shift, every patient, every life — covered."**

CareShift is a full-stack hospital management platform built for Nigerian healthcare workers. It reduces burnout, digitizes patient care, and connects every hospital stakeholder in one real-time system.

[![Built with Convex](https://img.shields.io/badge/Built%20with-Convex-orange)](https://convex.dev)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20TanStack-blue)](https://tanstack.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-cyan)](https://tailwindcss.com)

---

## 🌍 About

CareShift is designed for Nigeria's health workforce crisis — where over 2,000 doctors leave the system annually due to burnout, outdated paper records, and poor communication between hospital departments.

**Built by:** Victoria Robin Toris  
**Contact:** victoriarobintoris32@gmail.com  
**GitHub:** [https://github.com/Torisbrain](https://github.com/Torisbrain)

---

## 👥 User Roles

| Role | Access Level | Key Features |
|------|-------------|--------------|
| **Doctor** | Full clinical access | AI diagnosis assist, prescriptions, handover notes |
| **Nurse** | Ward-level access | Task lists, vitals tracking, shift handover |
| **Pharmacist** | Drug & prescription access | Inventory, prescription verification, expiry alerts |
| **Patient** | Read-only personal health | Medical history, appointments, discharge notes |
| **Hospital Admin** | Full system access | Staff management, analytics, billing, burnout dashboard |
| **Super Admin** | Platform-wide | Multi-hospital management |

---

## ✨ Features

### ✅ Phase 1 (Built)
- 🔐 **Authentication** — OTP email login via Convex Auth (NDPR compliant)
- 🛏️ **Patient Management** — Digital patient cards, QR codes, medical history
- 📊 **Admin Dashboard** — Real-time ward occupancy, alerts, staff overview
- 💊 **Pharmacy Module** — Drug inventory, expiry alerts, prescription management
- 📅 **Appointments** — Booking, live queue, SMS reminders, telemedicine support
- 🤖 **AI Clinical Assistant** — Powered by Claude Sonnet via Convex Agent
- 🛡️ **Burnout Shield** — Staff workload monitoring, wellness check-ins, overload alerts
- 📈 **Vitals Tracking** — Real-time logging with critical threshold alerts

### 🔜 Roadmap
- CareShift Pay (Paystack/Flutterwave integration)
- Lab Module (HL7 FHIR integration)
- Blood Bank Tracker
- Referral Network
- WhatsApp Bot
- Offline AI (TensorFlow Lite)
- iOS + Android apps (React Native / Expo)

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** React + TanStack Start (file-based routing, SSR)
- **Styling:** Tailwind CSS v4
- **State:** Zustand + TanStack Query

### Backend
- **Database & Real-time:** [Convex](https://convex.dev) (PostgreSQL-like with real-time subscriptions)
- **Authentication:** `@convex-dev/auth` with OTP email (Resend)
- **AI:** `@convex-dev/agent` with Claude Sonnet via OpenRouter

### Infrastructure (Production Target)
- **Cloud:** AWS (af-south-1 Cape Town primary, eu-west-1 failover)
- **Compute:** AWS ECS Fargate
- **CDN:** AWS CloudFront
- **Storage:** AWS S3
- **Search:** AWS OpenSearch

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Convex](https://convex.dev) account (free)
- A [Resend](https://resend.com) account for email OTP
- An [OpenRouter](https://openrouter.ai) API key for AI features

### Installation

```bash
# Clone the repo
git clone https://github.com/Torisbrain/careshift-healthcare-platform.git
cd careshift-healthcare-platform

# Install dependencies
npm install

# Set up Convex
npx convex dev
```

### Environment Variables

Create `.env.development.local`:
```env
VITE_CONVEX_URL=your_convex_deployment_url
```

Set Convex environment variables:
```bash
# Auth keys (auto-generated)
npx convex env set JWT_PRIVATE_KEY "..."
npx convex env set JWKS "..."
npx convex env set SITE_URL "https://yourapp.com"

# Email OTP
npx convex env set RESEND_API_KEY "re_..."

# AI Features
npx convex env set OPENROUTER_API_KEY "sk-or-..."
```

### Running Locally

```bash
# Terminal 1 — Convex backend
npx convex dev

# Terminal 2 — Vite dev server
npm run dev:web
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📱 App Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Authentication (OTP email) |
| `/dashboard` | Admin overview dashboard |
| `/patients` | Patient management |
| `/pharmacy` | Drug inventory & prescriptions |
| `/appointments` | Booking, queue, SMS reminders |
| `/ai-assist` | AI Clinical Assistant (Claude) |
| `/burnout` | Burnout Shield — staff wellbeing |

---

## 🗄️ Database Schema

CareShift uses Convex with the following core tables:

- `users` — Staff and patient accounts with roles
- `hospitals` — Multi-tenant hospital profiles
- `patients` — Digital patient records
- `admissions` — Ward/bed tracking
- `consultations` — Doctor notes + AI suggestions
- `vitals` — Nurse-logged patient vitals with alert flags
- `prescriptions` — Digital prescriptions with pharmacy workflow
- `drugs` — Drug inventory with expiry tracking
- `appointments` — Outpatient booking with SMS integration
- `shifts` — Burnout Shield shift data
- `aiThreads` — AI consultation sessions

---

## 🛡️ Security & Compliance

- ✅ All data encrypted in transit (TLS) and at rest
- ✅ NDPR (Nigeria Data Protection Regulation) compliant
- ✅ HIPAA-aligned data practices
- ✅ Role-based access control (RBAC)
- ✅ MFA support via Convex Auth
- ✅ Audit trail for all clinical actions
- ✅ No patient data in logs

---

## 💰 Estimated AWS Monthly Cost (MVP, ~5 hospitals)

| Service | Est. Monthly Cost |
|---------|------------------|
| Convex (backend) | ~$25 |
| AWS S3 + CloudFront | ~$15 |
| AWS Route 53 + SSL | ~$5 |
| Resend (email) | Free tier |
| OpenRouter (AI) | Pay-per-use |
| **Total** | **~$45–70/month** |

---

## 🤝 Contributing

This project is open to contributions from Nigerian developers and healthcare tech enthusiasts.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/lab-module`)
3. Commit your changes (`git commit -m 'Add lab module'`)
4. Push to the branch (`git push origin feature/lab-module`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built for Nigeria. Designed to keep heroes in the building. 🇳🇬</strong>
  <br/>
  <sub>Made with ❤️ by Victoria Robin Toris</sub>
</div>
