"use client";

import { Link } from "@lazarv/react-server/navigation";
import { Article } from "../domain/Article";

type Props = {
  article: Article;
};

export const truncText = (text: string, maxLength: number) => {
  if (text.length < ~maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export default function ArticleCard(props: Props) {
  const { article } = props;
  const trunctedTitle = truncText(article.title, 45);
  const trunctedDescription = truncText(article.description, 100);

  return (
    <Link to={`articles/${article.id}`}>
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer w-full">
        <div className="h2 bg-teal-600"></div>
        <div className="p-6 h-[calc(280px-8px)] flex-col">
          <h3 className="text-hl font-bold text-gray-900 mb-2 line-clamp-2">
            {trunctedTitle}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
            {trunctedDescription}
          </p>
          <div className="flex items-center mt-auto">
            <div className="w-8 h-8 rouded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium mr-3">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-gray-900">{article.author}</div>
              <div className="text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
