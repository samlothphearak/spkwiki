const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

let memoryUsers = [];

const createToken = (user) =>
  jwt.sign({ id: user.id || user._id, email: user.email }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "7d",
  });

const isMongoReady = () => mongoose.connection.readyState === 1;

const buildUserPayload = (user) => ({
  id: user._id?.toString() || user.id,
  name: user.name,
  email: user.email,
  role: user.role || "User",
  tier: user.tier || "free",
  bio: user.bio || "",
  avatar: user.avatar || null,
  isVerified: Boolean(user.isVerified),
  isActive: user.isActive === undefined ? true : Boolean(user.isActive),
  createdAt: user.createdAt,
});

const findUserByEmail = async (email) => {
  if (isMongoReady()) {
    return User.findOne({ email });
  }

  return memoryUsers.find((user) => user.email === email) || null;
};

const findUserById = async (id) => {
  if (isMongoReady()) {
    return User.findById(id);
  }

  return memoryUsers.find((user) => user.id === id || user._id?.toString() === id) || null;
};

const findUser = async (email) => findUserByEmail(email);

const createUserRecord = async ({ name, email, password }) => {
  if (isMongoReady()) {
    return User.create({ name, email, password });
  }

  const newUser = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    password,
    tier: "free",
  };
  memoryUsers.push(newUser);
  return newUser;
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const existingUser = await findUser(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUserRecord({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token: createToken(user),
      user: buildUserPayload(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed.", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await findUser(email);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    res.json({
      success: true,
      message: "Login successful.",
      token: createToken(user),
      user: buildUserPayload(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed.", error: error.message });
  }
};

exports.me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    res.json({
      success: true,
      user: buildUserPayload(req.user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to fetch user.", error: error.message });
  }
};

exports.upgrade = async (req, res) => {
  try {
    const { tier } = req.body;

    if (!tier || !["free", "pro", "enterprise"].includes(tier)) {
      return res.status(400).json({ success: false, message: "Invalid tier specified." });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    if (isMongoReady()) {
      const user = await User.findById(req.user._id || req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
      user.tier = tier;
      await user.save();
      req.user = user;
    } else {
      const user = memoryUsers.find((u) => u.id === req.user.id || u._id?.toString() === req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found in memory." });
      }
      user.tier = tier;
      req.user = user;
    }

    res.json({
      success: true,
      message: `Account upgraded to ${tier} successfully.`,
      user: buildUserPayload(req.user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upgrade operation failed.", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { bio, avatar } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    if (isMongoReady()) {
      const user = await User.findById(req.user._id || req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      if (bio !== undefined) user.bio = bio;
      if (avatar !== undefined) user.avatar = avatar;

      await user.save();
      req.user = user;
    } else {
      const user = memoryUsers.find((u) => u.id === req.user.id || u._id?.toString() === req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found in memory." });
      }
      if (bio !== undefined) user.bio = bio;
      if (avatar !== undefined) user.avatar = avatar;
      req.user = user;
    }

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: buildUserPayload(req.user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update operation failed.", error: error.message });
  }
};
