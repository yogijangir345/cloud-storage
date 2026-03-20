const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// upload
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded", file: req.file });
});

// get files
router.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json(err);
    res.json(files);
  });
});

// delete
router.delete("/delete/:name", (req, res) => {
  fs.unlink(`uploads/${req.params.name}`, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

module.exports = router;