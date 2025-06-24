import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface MyTokenPayload {
  user_id: number;
  exp: number;
  iat: number;
}

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.token;

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<MyTokenPayload>(token);
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Token error", err);
      navigate("/login");
    }
  }, [cookies.token, navigate]);

  if (loading)
    return (
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

  return <>{children}</>;
};

export default RequireAuth;
