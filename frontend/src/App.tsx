import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";
import Dashboard from "./pages/private/Dashboard";
import { AuthProvider } from "./utils/AuthContext";
import RequireAuth from "./utils/RequireAuth";
import RequireNoAuth from "./utils/RequireNoAuth";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AuthProvider>
          <div className="min-vh-100 d-flex flex-column">
            <div className="flex-grow-0">
              <Navbar />
            </div>
            <div className="flex-grow-1 d-flex flex-column h-100 bg-light">
              <Routes>
                <Route index element={<Home />} />
                <Route
                  path="/login"
                  element={
                    <RequireNoAuth>
                      <Login />
                    </RequireNoAuth>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route path="/post" element={<PostPage />} />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
