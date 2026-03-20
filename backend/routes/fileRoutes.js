const express = require("express");
const router = express.Router();
const File = require("../models/File");
const multer = require("multer");
const mongoose = require("mongoose"); // ✅ ADDED

// 👉 Multer config (UNCHANGED)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 👉 ✅ FIXED: Get files by folderId
router.get("/files/:folderId", async (req, res) => {
  try {
    const files = await File.find({
      folderId: new mongoose.Types.ObjectId(req.params.folderId)
    });

    res.json(files);

  } catch (err) {
    res.status(500).json({ message: "Error fetching files" });
  }
});

// 👉 Upload file API (UNCHANGED)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { folderId, userId } = req.body;

    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      folderId,
      userId
    });

    await newFile.save();

    res.json({ message: "File uploaded successfully" });

  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;