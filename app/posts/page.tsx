import axios from "axios";
import PostsList from "./PostList";
import { Post } from "@/hooks/usePosts";

async function fetchInitialPosts(): Promise<Post[]> {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
    {
      params: {
        _limit: 10,
        _page: 1,
      },
    }
  );
  return data;
}

export default async function PostsPage() {
  const initialPosts = await fetchInitialPosts();

  return (
    <div className="posts-page-container">
      <h1 className="page-title">Lista de Publicaciones</h1>
      <PostsList initialPosts={initialPosts} />
    </div>
  );
}
