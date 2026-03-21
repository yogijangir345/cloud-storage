const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS FIX (FINAL WORKING)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cloud-storage-woad.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

// middleware
app.use(express.json());

// ===== Routes =====
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// ===== MongoDB =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// ===== Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});