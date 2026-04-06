const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const recordController = require("../controllers/record.controller");

const {
  validateRecordInput
} = require("../middleware/validation.middleware");

// Read routes → all roles
router.get(
  "/",
  protect,
  authorizeRoles("viewer", "analyst", "admin"),
  recordController.getRecords
);

router.get(
  "/:id",
  protect,
  authorizeRoles("viewer", "analyst", "admin"),
  recordController.getRecordById
);

// Write routes → admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateRecordInput,
  recordController.createRecord
);

router.patch(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateRecordInput,
  recordController.updateRecord
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  recordController.deleteRecord
);

module.exports = router;