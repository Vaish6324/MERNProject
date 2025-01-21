const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");
const User = require("./user");
const favicon = require("serve-favicon");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
const corsOptions = {
  origin: "https://frontend-iota-ecru.vercel.app", // Frontend URLs
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Configure Multer and Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user-profile-pics", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
  },
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is working fine!");
});

// Signup Route with Image Upload
app.post("/api/signup", upload.single("profilePic"), async (req, res) => {
  const { fullName, dateOfBirth, gender, email, password } = req.body;

  try {
    const profilePicUrl = req.file ? req.file.path : null; // Cloudinary URL from uploaded image

    const newUser = new User({
      fullName,
      dateOfBirth,
      gender,
      email,
      password,
      profilePicUrl,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
