
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import React from "react";
import Dashboard from "../components/Dashboard/index.js";
import Login from "../components/Login/index.js";
import "../components/UI/style.css";
import TrainingTable from "../components/Dashboard/Acknowledge/TrainingTable.js";
import Index from "../components/Dashboard/ParticipantTable/index.js";
import Add from "../components/Dashboard/Add.js";
import SignUpForm from "../components/SignUp/SignUpForm.js";
import "./index.css";
import { AuthProvider, useAuth } from "../context/AuthContext.js";
import Layout from "../Layout.js";

function App() {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";
  const isAuthenticated = localStorage.getItem("is_authenticated") === "true";
  return (
    <AuthProvider>
      <div className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/"
            element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="reports" element={<Index />} />
            <Route path="schedule" element={<Add />} />
            <Route path="table/:id" element={<TrainingTable />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
