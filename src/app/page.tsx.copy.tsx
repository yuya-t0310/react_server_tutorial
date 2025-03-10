import { Link } from "@lazarv/react-server/navigation";
import { LatestArticleList } from "../components/LatestArticleList";
import { PopularArticleList } from "../components/PopularArticleList";
import { ArrowRight, Clock } from "lucide-react";

type ArticleJson = {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: number;
  viewCount: number;
};

const getArticles = async () => {
  const response = await fetch(
    "http://localhost:3000/api/articles/popular?limit=10"
  );
  const data = await response.json();
  return data;
};

export default async function Home() {
  const articles = (await getArticles()) as ArticleJson[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TechSearch
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover and share valuable insights in technology.
        </p>
        <Link 
          to="/editor"
          className="inline-flex item-center bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300">
            Start Writing <ArrowRight className="m1-2" size={20} />
          </Link>
      </div>

      <div className="mb-12">
        <div className="flex items-center mb-8">
          <Clock size={24} className="text-gray-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
        </div>
        <LatestArticleList />
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Clock size={24} className="text-gray-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Articles
            </h2>
          </div>
          <Link 
            to="/popular"
            className="inline-flex items-center text-teal-600 hover:text-teal-700">
              View All
              <ArrowRight className="w-5 h5 ml-1" />
          </Link>
        </div>
        <PopularArticleList articles={articles} />
      </div>
    </div>
  )
}