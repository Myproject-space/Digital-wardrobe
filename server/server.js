const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const clothesRoutes = require("./routes/clothes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ Database Connection Error:", err);
  });
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/clothes", clothesRoutes);


app.get("/", (req, res) => {
   res.send("ClosetVault Backend is Running 🚀");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});