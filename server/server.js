require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

// Fix Node DNS issue with MongoDB Atlas SRV
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const wikiRoutes = require("./routes/wikiRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/wiki", wikiRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Server is running 🚀",
        database: mongoose.connection.readyState === 1
            ? "Connected"
            : "Disconnected"
    });
});


// MongoDB Connection
async function connectDB() {
    try {

        console.log("Connecting to MongoDB...");

        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("✅ MongoDB Atlas Connected");

    } catch (error) {

        console.error("❌ MongoDB Connection Error:");
        console.error(error.message);

        process.exit(1);
    }
}


// Start Server
async function startServer() {

    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

}


startServer();


// Handle Errors
mongoose.connection.on("error", (err) => {
    console.error("MongoDB Error:", err);
});


mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});