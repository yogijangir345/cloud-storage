import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED

function FolderList() {

  const [folders, setFolders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate(); // ✅ ADDED

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {

    const res = await fetch(`http://localhost:5000/api/folders/${user._id}`);

    const data = await res.json();

    setFolders(data);

  };

  // ✅ UPDATED (sirf yahi change hua hai)
  const openFolder = (folder) => {
    navigate(`/folder/${folder._id}`);
  };

  return (
    <div>

      <h3>Folders</h3>

      {folders.map((folder) => (

        <div
          key={folder._id}
          onClick={() => openFolder(folder)}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          📁 {folder.name}
        </div>

      ))}

    </div>
  );
}

export default FolderList;