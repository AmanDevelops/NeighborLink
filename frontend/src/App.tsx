import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/private/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequireAuth from "./utils/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <div className="min-vh-100 d-flex flex-column">
          <div className="flex-grow-0">
            <Navbar />
          </div>
          <div className="flex-grow-1 d-flex flex-column h-100 bg-light">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
        </div>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
