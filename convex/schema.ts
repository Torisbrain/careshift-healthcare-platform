import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  // Override users table with custom fields
  users: defineTable({
    // Auth fields (keep all optional)
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // CareShift custom fields
    role: v.optional(v.union(
      v.literal("doctor"),
      v.literal("nurse"),
      v.literal("pharmacist"),
      v.literal("admin"),
      v.literal("patient"),
      v.literal("super_admin"),
    )),
    department: v.optional(v.string()),
    hospitalId: v.optional(v.id("hospitals")),
    isActive: v.optional(v.boolean()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  // Hospitals
  hospitals: defineTable({
    name: v.string(),
    address: v.string(),
    state: v.string(),
    phone: v.string(),
    email: v.string(),
    tier: v.optional(v.string()),
  }),

  // Patients
  patients: defineTable({
    hospitalId: v.id("hospitals"),
    mrn: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    dob: v.string(),
    gender: v.string(),
    bloodType: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    nokName: v.optional(v.string()),
    nokPhone: v.optional(v.string()),
    allergies: v.optional(v.array(v.string())),
  })
    .index("by_hospital", ["hospitalId"])
    .index("by_mrn", ["mrn"]),

  // Admissions
  admissions: defineTable({
    patientId: v.id("patients"),
    hospitalId: v.id("hospitals"),
    ward: v.string(),
    bedNumber: v.string(),
    admittingDoctorId: v.id("users"),
    admissionDate: v.string(),
    dischargeDate: v.optional(v.string()),
    status: v.union(v.literal("admitted"), v.literal("discharged"), v.literal("transferred")),
    diagnosis: v.optional(v.string()),
  })
    .index("by_patient", ["patientId"])
    .index("by_hospital", ["hospitalId"])
    .index("by_ward", ["ward"]),

  // Consultations
  consultations: defineTable({
    patientId: v.id("patients"),
    doctorId: v.id("users"),
    admissionId: v.optional(v.id("admissions")),
    notes: v.string(),
    diagnosis: v.optional(v.string()),
    aiSuggestions: v.optional(v.string()),
  })
    .index("by_patient", ["patientId"])
    .index("by_doctor", ["doctorId"]),

  // Vitals
  vitals: defineTable({
    patientId: v.id("patients"),
    nurseId: v.id("users"),
    bpSystolic: v.optional(v.number()),
    bpDiastolic: v.optional(v.number()),
    temperature: v.optional(v.number()),
    pulse: v.optional(v.number()),
    spo2: v.optional(v.number()),
    weight: v.optional(v.number()),
    alertSent: v.optional(v.boolean()),
    notes: v.optional(v.string()),
  })
    .index("by_patient", ["patientId"])
    .index("by_nurse", ["nurseId"]),

  // Prescriptions
  prescriptions: defineTable({
    patientId: v.id("patients"),
    doctorId: v.id("users"),
    consultationId: v.optional(v.id("consultations")),
    drugName: v.string(),
    dose: v.string(),
    frequency: v.string(),
    duration: v.string(),
    status: v.union(v.literal("pending"), v.literal("dispensed"), v.literal("cancelled")),
    dispensedBy: v.optional(v.id("users")),
    dispensedAt: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_patient", ["patientId"])
    .index("by_status", ["status"]),

  // Drug inventory
  drugs: defineTable({
    hospitalId: v.id("hospitals"),
    name: v.string(),
    genericName: v.optional(v.string()),
    category: v.string(),
    quantity: v.number(),
    unit: v.string(),
    reorderLevel: v.number(),
    expiryDate: v.string(),
    batchNo: v.string(),
  })
    .index("by_hospital", ["hospitalId"])
    .index("by_name", ["name"]),

  // Appointments
  appointments: defineTable({
    hospitalId: v.id("hospitals"),
    patientId: v.id("patients"),
    doctorId: v.id("users"),
    datetime: v.string(),
    type: v.union(v.literal("outpatient"), v.literal("follow_up"), v.literal("telemedicine"), v.literal("emergency")),
    status: v.union(v.literal("scheduled"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled"), v.literal("no_show")),
    notes: v.optional(v.string()),
    reminderSent: v.optional(v.boolean()),
  })
    .index("by_hospital", ["hospitalId"])
    .index("by_patient", ["patientId"])
    .index("by_doctor", ["doctorId"])
    .index("by_status", ["status"]),

  // Staff shifts / Burnout shield
  shifts: defineTable({
    userId: v.id("users"),
    hospitalId: v.id("hospitals"),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    patientCount: v.optional(v.number()),
    hoursWorked: v.optional(v.number()),
    wellnessScore: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_hospital", ["hospitalId"]),

  // AI assist threads (for clinical assistant)
  aiThreads: defineTable({
    userId: v.id("users"),
    patientId: v.optional(v.id("patients")),
    threadId: v.string(),
    title: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_thread", ["threadId"]),
});
