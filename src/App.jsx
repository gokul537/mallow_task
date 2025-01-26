import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserPage from "./components/UserPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { route } from "./routes/AppRoutes";
import LoginPage from "./components/LoginPage";
import Layout from "./layout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Layout id="main" /> : <LoginPage />}>
          {route.map((item) => (
            <Route key={item.path} path={item.path} element={item.component} />
          ))}
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
