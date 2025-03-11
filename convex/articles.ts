import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("articles").collect();

    const sortedArticles = articles.sort(
      (a, b) => b._creationTime - a._creationTime
    );

    return sortedArticles.map((article) => {
      return {
        id: article._id,
        title: article.title,
        description: article.description,
        author: article.author,
        createdAt: article._creationTime,
        viewCount: article.viewCount,
      };
    });
  },
});

export const getPopular = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { limit } = args;
    const articles = await ctx.db.query("articles").collect();

    const sortedArticles = articles
      .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
      .slice(0, limit ?? 10);
    return sortedArticles.map((article) => {
      return {
        id: article._id,
        title: article.title,
        description: article.description,
        author: article.author,
        createdAt: article._creationTime,
        viewCount: article.viewCount,
      };
    });
  },
});

export const insert = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, { title, description }) => {
    await ctx.db.insert("articles", {
      title,
      description,
      author: "@Sicut_study",
      viewCount: 0,
    });
  },
});

// 追加
export const getById = query({
  args: {
    id: v.id("articles"),
  },
  handler: async (ctx, { id }) => {
    const article = await ctx.db.get(id);
    if (!article) {
      throw new Error("Article not found");
    }

    return {
      id: article._id,
      title: article.title,
      description: article.description,
      author: article.author,
      createdAt: article._creationTime,
      viewCount: article.viewCount,
    };
  },
});

// 追加
export const incrementViewCount = mutation({
  args: {
    id: v.id("articles"),
  },
  handler: async (ctx, { id }) => {
    const article = await ctx.db.get(id);
    if (!article) {
      throw new Error("Article not found");
    }

    await ctx.db.patch(article._id, {
      viewCount: article.viewCount + 1,
    });
  },
});
