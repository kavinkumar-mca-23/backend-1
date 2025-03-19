const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));

// MongoDB Connection (Hardcoded URI)
const MONGO_URI = "mongodb+srv://kavin:kavin@cluster0.kgtws.mongodb.net/spangles"; // Replace with your actual MongoDB URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Start server with a hardcoded port
const PORT = 5000; // You can change this if needed
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
