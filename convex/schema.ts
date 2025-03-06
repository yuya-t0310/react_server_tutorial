import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  articles: defineTable({
    title: v.string(),
    description: v.string(),
    author: v.string(),
    viewCount: v.number(),
  }),
});