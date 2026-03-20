import { useState } from "react";
import "./UploadFile.css";

function UploadFile() {

  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      console.log("Upload response:", data);

      alert("File uploaded successfully");

      setFile(null); // reset file

    } catch (error) {
      console.log("Upload error:", error);
      alert("Upload failed");
    }

  };

  return (

    <div className="upload-container">

      <div
        className="upload-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >

        <label className="drop-area">

          <h2>Upload File</h2>

          <p>Drag & Drop your file here</p>

          <p>or click to browse</p>

          <input type="file" onChange={handleFileChange} />

        </label>

        {file && (
          <p className="file-name">
            Selected: {file.name}
          </p>
        )}

        <button
          className="upload-btn"
          onClick={handleUpload}
        >
          Upload
        </button>

      </div>

    </div>

  );

}

export default UploadFile;