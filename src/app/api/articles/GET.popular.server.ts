import { ConvexClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
if (!convexUrl) {
  throw new Error("VITE_CONVEX_URL is not defined");
}

const client = new ConvexClient(convexUrl);

export default async function GetPopular(request: Request) {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit")
     ? Number(url.searchParams.get("limit"))
     : 20;
  const articles = await client.query(api.articles.getPopular, {
     limit : limit,
  });
  // return new Response(JSON.stringify(articles));
  return new Response(JSON.stringify(articles));
}
