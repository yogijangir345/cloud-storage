const express = require("express");
const router = express.Router();
const Folder = require("../models/Folder");


// ===== Create Folder =====
router.post("/create-folder", async (req, res) => {

  try {

    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ message: "Name and userId required" });
    }

    const newFolder = new Folder({
      name,
      userId
    });

    await newFolder.save();

    console.log("Folder Created:", newFolder);

    res.json({
      message: "Folder created successfully",
      folder: newFolder
    });

  } catch (error) {

    console.log("Create Folder Error:", error);

    res.status(500).json({
      message: "Error creating folder"
    });

  }

});


// ===== Get User Folders =====
router.get("/folders/:userId", async (req, res) => {

  try {

    const userId = req.params.userId;

    console.log("Fetching folders for user:", userId);

    const folders = await Folder.find({ userId });

    console.log("Folders Found:", folders);

    res.json(folders);

  } catch (error) {

    console.log("Fetch Folder Error:", error);

    res.status(500).json({
      message: "Error fetching folders"
    });

  }

});


module.exports = router;