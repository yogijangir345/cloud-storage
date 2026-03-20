import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import UploadFile from "./components/UploadFile.jsx";
import FileList from "./FileList.jsx";
import FolderPage from "./FolderPage"; // ✅ ADDED

function ProtectedRoute({ children }) {

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {

  return (
    <Router>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>
                <Dashboard />
                <UploadFile />
                <FileList />
              </div>
            </ProtectedRoute>
          }
        />

        {/* ✅ ADDED ONLY THIS ROUTE */}
        <Route
          path="/folder/:id"
          element={
            <ProtectedRoute>
              <FolderPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
