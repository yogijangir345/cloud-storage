// FileList.jsx
import React, { useEffect, useState } from "react";
import "./FileList.css";

function FileList() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [previewFile, setPreviewFile] = useState(null);

  // Fetch files from backend
  const getFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/files");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.log("Error fetching files");
    }
  };

  // Delete file
  const deleteFile = async (name) => {
    try {
      await fetch(`http://localhost:5000/api/delete/${name}`, {
        method: "DELETE",
      });
      getFiles(); // refresh list
    } catch (error) {
      console.log("Delete failed");
    }
  };

  // File icon based on extension
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (ext === "pdf") return "📄";
    if (["png", "jpg", "jpeg", "gif"].includes(ext)) return "🖼️";
    if (["mp4", "mov", "avi"].includes(ext)) return "🎬";
    if (["zip", "rar"].includes(ext)) return "🗜️";
    return "📁";
  };

  // Clean file name (remove UUID prefix)
  const getCleanName = (fileName) => {
    const parts = fileName.split("-");
    return parts.length > 1 ? parts[parts.length - 1] : fileName;
  };

  // Filtered files based on search & type
  const filteredFiles = files.filter((file) => {
    const nameMatch = getCleanName(file)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatch =
      filterType === "all" || getFileIcon(file) === filterType;
    return nameMatch && typeMatch;
  });

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="files-container">
      <h2>Your Files</h2>

      {/* Search & Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="📄">PDF</option>
          <option value="🖼️">Images</option>
          <option value="🎬">Videos</option>
          <option value="🗜️">Archive</option>
          <option value="📁">Others</option>
        </select>
      </div>

      {/* File Grid */}
      <div className="files-grid">
        {filteredFiles.length === 0 && <p>No files uploaded yet.</p>}

        {filteredFiles.map((file, index) => (
          <div className="file-card" key={index}>
            <div
              className="file-icon"
              onClick={() =>
                ["🖼️", "📄", "🎬"].includes(getFileIcon(file)) &&
                setPreviewFile(file)
              }
            >
              {getFileIcon(file)}
            </div>

            <a
              href={`http://localhost:5000/uploads/${file}`}
              target="_blank"
              rel="noreferrer"
              className="file-name"
            >
              {getCleanName(file)}
            </a>

            <div className="file-actions">
              {/* Download Button */}
              <a
                href={`http://localhost:5000/uploads/${file}`}
                download={getCleanName(file)}
                className="download-btn"
              >
                Download
              </a>

              {/* Delete Button */}
              <button
                className="delete-btn"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this file?")
                  ) {
                    deleteFile(file);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="preview-modal" onClick={() => setPreviewFile(null)}>
          <div
            className="preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setPreviewFile(null)}
            >
              ×
            </button>
            {getFileIcon(previewFile) === "🖼️" && (
              <img
                src={`http://localhost:5000/uploads/${previewFile}`}
                alt="preview"
              />
            )}
            {getFileIcon(previewFile) === "📄" && (
              <iframe
                src={`http://localhost:5000/uploads/${previewFile}`}
                title="PDF Preview"
              />
            )}
            {getFileIcon(previewFile) === "🎬" && (
              <video controls>
                <source
                  src={`http://localhost:5000/uploads/${previewFile}`}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileList;