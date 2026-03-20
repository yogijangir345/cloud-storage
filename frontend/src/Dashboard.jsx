import React from "react";
import { useNavigate } from "react-router-dom";
import CreateFolder from "./components/CreateFolder";
import FolderList from "./components/FolderList";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>My Drive</h2>

      <p>Welcome {user?.name}</p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      {/* Create Folder */}
      <CreateFolder />

      {/* Folder List */}
      <FolderList />

    </div>
  );
}

export default Dashboard;