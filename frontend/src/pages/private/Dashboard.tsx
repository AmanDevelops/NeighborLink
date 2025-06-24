import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


interface MyTokenPayload {
  user_id: number;
  exp: number;
  iat: number;
}

function Dashboard() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
    const decoded = jwtDecode<MyTokenPayload>(cookies.token);
    console.log(decoded.exp, Date.now());
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  return <div>Authenticated</div>;
}

export default Dashboard;
