const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./user");
const favicon = require('serve-favicon');
const path = require('path');

require("dotenv").config();

const app = express();

// Middleware
const corsOptions = {
  origin:'https://frontend-iota-ecru.vercel.app',// Allow the frontend domain
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Connect to MongoDB
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
  
  app.get("/",(req, res) => {
    res.json("Hello");
  })

// Route for adding a user (Signup)
app.post("/api/signup", async (req, res) => {
  const { fullName, dateOfBirth, gender, email, password } = req.body;

  try {
    const newUser = new User({
      fullName,
      dateOfBirth,
      gender,
      email,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Route for user login
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

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
