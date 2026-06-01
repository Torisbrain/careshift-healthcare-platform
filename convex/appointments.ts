import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const appointmentFields = {
  _id: v.id("appointments"),
  _creationTime: v.number(),
  hospitalId: v.id("hospitals"),
  patientId: v.id("patients"),
  doctorId: v.id("users"),
  datetime: v.string(),
  type: v.union(v.literal("outpatient"), v.literal("follow_up"), v.literal("telemedicine"), v.literal("emergency")),
  status: v.union(v.literal("scheduled"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled"), v.literal("no_show")),
  notes: v.optional(v.string()),
  reminderSent: v.optional(v.boolean()),
};

export const list = query({
  args: {
    hospitalId: v.id("hospitals"),
    status: v.optional(v.union(v.literal("scheduled"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled"), v.literal("no_show"))),
  },
  returns: v.array(v.object(appointmentFields)),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    if (args.status) {
      return await ctx.db
        .query("appointments")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .filter((q) => q.eq(q.field("hospitalId"), args.hospitalId))
        .order("desc")
        .collect();
    }
    return await ctx.db
      .query("appointments")
      .withIndex("by_hospital", (q) => q.eq("hospitalId", args.hospitalId))
      .order("desc")
      .collect();
  },
});

export const listByDoctor = query({
  args: { doctorId: v.id("users") },
  returns: v.array(v.object(appointmentFields)),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db
      .query("appointments")
      .withIndex("by_doctor", (q) => q.eq("doctorId", args.doctorId))
      .order("desc")
      .take(50);
  },
});

export const create = mutation({
  args: {
    hospitalId: v.id("hospitals"),
    patientId: v.id("patients"),
    doctorId: v.id("users"),
    datetime: v.string(),
    type: v.union(v.literal("outpatient"), v.literal("follow_up"), v.literal("telemedicine"), v.literal("emergency")),
    notes: v.optional(v.string()),
  },
  returns: v.id("appointments"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("appointments", {
      ...args,
      status: "scheduled",
      reminderSent: false,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("appointments"),
    status: v.union(v.literal("scheduled"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled"), v.literal("no_show")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(args.id, { status: args.status });
    return null;
  },
});
