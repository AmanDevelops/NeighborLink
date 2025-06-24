import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CategoryType = {
  id: number;
  name: string;
  description: string;
};

function Categories() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(BACKEND_URL + "items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <aside className="col-lg-3 d-lg-block p-3">
      <div className="mb-4">
        <h2>Categories</h2>
        <ul className="list-group">
          {categories.length == 0 && (
            <li className="list-group-item text-center">
              <div className="spinner-grow" role="status"></div>
            </li>
          )}

          {categories.map((category) => (
            <li key={category.id} className="list-group-item">
              <Link
                to={`?filter=${category.id}`}
                className="text-decoration-none"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Categories;
