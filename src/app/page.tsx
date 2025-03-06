"use client";

import { useEffect, useState } from "react";
import "./global.css";
import { api } from "../../convex/_generated/api";
import { Article } from "../domain/Article";
import { useQuery } from "convex/react";

export default function Home() {

  const articlesData = useQuery(api.articles.get);
  const [articles, setArticle] = useState<Article[]>([]);

  useEffect(() => {
    if(!articlesData) return;
    const articleList = articlesData.map((article) => {
      return new Article(
        article.id,
        article.title,
        article.description,
        article.author,
        article.createdAt,
        article.viewCount
      );
    })
    setArticle(articleList);
  }, [articlesData]);

  return (
    <div>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <p>{article.author}</p>
            <p>{article.createdAt}</p>
            <p>{article.viewCount}</p>
          </div>
        );
      })}
    </div>
  );
}
