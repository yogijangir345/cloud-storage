import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FolderPage() {
  const { id } = useParams();

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ ADDED

  const user = JSON.parse(localStorage.getItem("user")); // ✅ ADDED

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await fetch(`http://localhost:5000/api/files/${id}`);
    const data = await res.json();
    setFiles(data);
  };

  // ✅ handle file select
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // ✅ upload file
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folderId", id);
    formData.append("userId", user._id);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert(data.message);

    setSelectedFile(null);
    fetchFiles(); // ✅ refresh list
  };

  return (
    <div>
      <h2>Folder Opened</h2>
      <p>Folder ID: {id}</p>

      <hr />

      {/* ✅ UPDATED */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>

      <hr />

      <h3>Files</h3>

      {files.length === 0 ? (
        <p>No files in this folder</p>
      ) : (
        files.map((file) => (
          <div key={file._id}>
            📄 {file.filename}
          </div>
        ))
      )}
    </div>
  );
}

export default FolderPage;