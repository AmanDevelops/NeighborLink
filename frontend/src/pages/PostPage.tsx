import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

type PostDetail = {
  id: number;
  category: string;
  user: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_flagged: boolean;
};

function PostPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [postData, setpostData] = useState<PostDetail | null>(null);

  const urlParams = new URLSearchParams(location.search);
  const filterParam = urlParams.get("id");
  useEffect(() => {
    if (!filterParam) {
      navigate("/");
      return;
    }

    let isMounted = true;

    const fetchPostDetails = async () => {
      try {
        const url = `${BACKEND_URL}post_info?id=${filterParam}`;
        console.log(url);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setpostData(data[0]);
        } else if (isMounted) {
          console.warn("No post data found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        if (isMounted) navigate("/");
      }
    };

    fetchPostDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container mt-5 ">
        <div className="col-lg-8">
          {postData ? (
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{postData.title}</h1>
                <div className="text-muted fst-italic mb-2">
                  Posted on {postData.created_at} by {postData.user}
                </div>
                <a
                  className="badge bg-success text-decoration-none link-light"
                  href="/?filter=id"
                >
                  {postData.category}
                </a>
              </header>

              <section className="mb-5">
                <p className="fs-5 mb-4">{postData.content}</p>
              </section>
            </article>
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
              <div
              className="spinner-grow"
              style={{ width: "6rem", height: "6rem" }}
              role="status"
              >
              <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}

export default PostPage;
