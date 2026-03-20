import React, { useState } from "react";

function CreateFolder() {

  const [folderName, setFolderName] = useState("");

  const createFolder = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!folderName) {
      alert("Enter folder name");
      return;
    }

    const res = await fetch("http://localhost:5000/api/create-folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: folderName,
        userId: user._id
      })
    });

    const data = await res.json();

    alert(data.message);

    setFolderName("");

  };

  return (

    <div style={{marginBottom:"20px"}}>

      <input
        type="text"
        placeholder="Folder name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />

      <button onClick={createFolder}>
        Create Folder
      </button>

    </div>

  );

}

export default CreateFolder;