import { internalAction, mutation, query } from "./_generated/server";
import { internal, components } from "./_generated/api";
import { listUIMessages, syncStreams, vStreamArgs } from "@convex-dev/agent";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { clinicalAgent } from "./agent";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createThread = mutation({
  args: { title: v.optional(v.string()) },
  returns: v.object({ threadId: v.string() }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const { threadId } = await clinicalAgent.createThread(ctx, {});
    // Store thread reference
    await ctx.db.insert("aiThreads", {
      userId,
      threadId,
      title: args.title ?? "Clinical Consultation",
    });
    return { threadId };
  },
});

export const sendMessage = mutation({
  args: { prompt: v.string(), threadId: v.string() },
  returns: v.string(),
  handler: async (ctx, { prompt, threadId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const { messageId } = await clinicalAgent.saveMessage(ctx, {
      threadId,
      prompt,
      userId,
      skipEmbeddings: true,
    });
    await ctx.scheduler.runAfter(0, internal.aiAssist.generateResponse, {
      threadId,
      promptMessageId: messageId,
    });
    return messageId;
  },
});

export const generateResponse = internalAction({
  args: { promptMessageId: v.string(), threadId: v.string() },
  handler: async (ctx, { promptMessageId, threadId }) => {
    const result = await clinicalAgent.streamText(
      ctx,
      { threadId },
      { promptMessageId },
      { saveStreamDeltas: { throttleMs: 200, chunking: "word" } },
    );
    await result.consumeStream();
  },
});

export const listMessages = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    streamArgs: vStreamArgs,
  },
  handler: async (ctx, args) => {
    const streams = await syncStreams(ctx, components.agent, args);
    const paginated = await listUIMessages(ctx, components.agent, args);
    return { ...paginated, streams };
  },
});

export const listThreads = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("aiThreads"),
    _creationTime: v.number(),
    userId: v.id("users"),
    patientId: v.optional(v.id("patients")),
    threadId: v.string(),
    title: v.optional(v.string()),
  })),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("aiThreads")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(20);
  },
});
