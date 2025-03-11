import { Link } from "@lazarv/react-server/navigation";
import { LatestArticleList } from "../../components/LatestArticleList";

// type ArticleJson = {
//   id: string;
//   title: string;
//   description: string;
//   author: string;
//   createdAt: number;
//   viewCount: number;
// };

// const getArticles = async () => {
//   const response = await fetch(
//     "http://localhost:3000/api/articles/get?limit=50"
//   );
//   const data = await response.json();
//   return data;
// };

export default async function Latest() {
  //const articles = (await getArticles()) as ArticleJson[];

  return (
    <div className="container mx-auto px-4 py8">
      <div>
        <Link to="/">Back to Home</Link>
      </div>
      <div>
        <h1>Latest Articles</h1>
      </div>
      <LatestArticleList />
    </div>
  );
}
