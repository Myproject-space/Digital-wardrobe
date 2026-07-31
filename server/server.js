const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const clothesRoutes = require("./routes/clothes");
const outfitRoutes = require("./routes/outfit");

const app = express();

// 🔴 FIX 1: CORS Configuration Update
const allowedOrigins = [
  "https://digital-wardrobe-drab.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(null, true); // Permissive for testing all origins
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json());

// Static Files & Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/outfit", outfitRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clothes", clothesRoutes);

// MongoDB Connection
console.log("Connecting to MongoDB...");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ Database Connection Error:", err);
  });

app.get("/", (req, res) => {
  res.send("ClosetVault Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});