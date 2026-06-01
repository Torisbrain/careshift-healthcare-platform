import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const currentUser = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      name: v.optional(v.string()),
      email: v.optional(v.string()),
      image: v.optional(v.string()),
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
      phone: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      phoneVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.get(userId);
  },
});

export const updateRole = mutation({
  args: {
    role: v.union(
      v.literal("doctor"),
      v.literal("nurse"),
      v.literal("pharmacist"),
      v.literal("admin"),
      v.literal("patient"),
      v.literal("super_admin"),
    ),
    name: v.optional(v.string()),
    department: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(userId, {
      role: args.role,
      name: args.name,
      department: args.department,
    });
    return null;
  },
});
