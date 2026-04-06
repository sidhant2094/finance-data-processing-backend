const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const recordRoutes = require("./routes/record.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const protect = require("./middleware/auth.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Finance backend running successfully"
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Protected test route
app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user
  });
});

// Business routes
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error middleware
app.use(errorHandler);

module.exports = app;