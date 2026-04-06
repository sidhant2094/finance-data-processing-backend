const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const dashboardController = require(
  "../controllers/dashboard.controller"
);

router.get(
  "/summary",
  protect,
  authorizeRoles("viewer", "analyst", "admin"),
  dashboardController.getSummary
);

router.get(
  "/category-summary",
  protect,
  authorizeRoles("viewer", "analyst", "admin"),
  dashboardController.getCategorySummary
);

router.get(
  "/monthly-trends",
  protect,
  authorizeRoles("viewer", "analyst", "admin"),
  dashboardController.getMonthlyTrends
);

router.get(
  "/recent-transactions",
  protect,
  authorizeRoles("viewer", "analyst", "admin"),
  dashboardController.getRecentTransactions
);

module.exports = router;