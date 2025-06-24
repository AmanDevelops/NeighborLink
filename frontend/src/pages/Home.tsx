import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Categories from "../components/Categories";
import Posts from "../components/Posts";

export type PostType = {
  id: number;
  title: string;
  created_at: string;
  category: string;
  user: string;
};

function Home() {
  const location = useLocation();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState<PostType[]>([]);
  const [status, setstatus] = useState<"idle" | "loading">("idle");

  useEffect(() => {
    const fetchPosts = async () => {
      // Get filter parameter from URL if it exists
      const urlParams = new URLSearchParams(location.search);
      const filterParam = urlParams.get("filter");

      // Construct the URL with filter parameter if it exists
      const url = filterParam
        ? `${BACKEND_URL}posts?filter=${filterParam}`
        : `${BACKEND_URL}posts`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    setstatus("loading");
    fetchPosts();
    setstatus("idle");
  }, [location.search, BACKEND_URL]);
  return (
    <div className="container-fluid">
      <div className="row">
        <main className="col-lg-9 main-content px-0 p-4 px-4">
          {status === "loading" && (
            <div className="d-flex justify-content-center p-5">
              <div className="spinner-grow" role="status"></div>
            </div>
          )}
          {posts.map((post, index) => (
            <Posts key={index} post={post} />
          ))}
        </main>

        <Categories />
      </div>
    </div>
  );
}

export default Home;
