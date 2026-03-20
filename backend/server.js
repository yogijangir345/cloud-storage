// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const fileRoutes = require("./routes/fileRoutes");

const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const folderRoutes = require("./routes/folder");

const app = express();

// ✅ CORS FIX (important)
app.use(
  cors({
    origin: "https://cloud-storage-woad.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// middlewares
app.use(express.json());
app.use("/api", fileRoutes);

// serve uploaded files
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", folderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Cloud Storage Backend Running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});