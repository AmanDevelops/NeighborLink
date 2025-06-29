import { useState } from "react";
import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"loading" | "idle">("idle");
  const [cookies, setCookie, removeCookie] = useCookies(["token", "refresh"]);
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setStatus("loading");

      const response = await fetch(BACKEND_URL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      setStatus("idle");

      if (!response.ok) {
        setError(data.detail || "Login failed");
      }
      if (data.access) {
        setCookie("token", data.access, {
          path: "/",
          maxAge: 3600,
        });
        if (rememberMe) {
          setCookie("refresh", data.refresh, {
            path: "/",
            maxAge: 604800,
          });
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setStatus("idle");

      setError("An error occurred");
    }
  };

  return (
    <div className="w-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <div className="col-md-4 bg-white">
        <div className="card shadow">
          <div className="card-body p-4">
            <h3 className="mb-4 text-center">Login</h3>
            {error !== "" && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}{" "}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                ></input>
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      {" "}
                      <span
                        className="spinner-grow spinner-grow-sm"
                        aria-hidden="true"
                      ></span>{" "}
                      <span role="status">Logging in...</span>
                    </>
                  ) : (
                    <span>Login Now</span>
                  )}
                </button>
              </div>
            </form>
            <div className="mt-3 text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-decoration-none text-black">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
