import { query } from "./_generated/server";
import { v } from "convex/values";

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

    // const sortedArticles = articles
    //   .sort((a, b) => b.viewCount - a.viewCount)
    //   .slice(0, limit ?? 10);
    return articles.map((article) => {
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
