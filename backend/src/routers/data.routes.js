import { Router } from "express";
import { body, param } from "express-validator";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import {
  getDataRows,
  getDataRowById,
  addDataRow,
  updateDataRow,
  deleteDataRow,
  bulkDeleteDataRow,
  getDataRowsWithSortingAndPagination,
} from "../controllers/data.controller.js";

const router = Router();
router.use(verifyJWT);

// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/; // 10 digit number

// Get all rows
// router.get("/", getDataRows);

// Get all rows with pagination & sorting
router.get("/", getDataRowsWithSortingAndPagination);

// Get single row by ID
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid row ID"), validate],
  getDataRowById
);

// Add row (all fields required)
router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .matches(emailRegex)
      .withMessage("Please provide a valid email address"),

    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .bail()
      .matches(phoneRegex)
      .withMessage("Phone number must be 10 digits"),

    body("fathersNumber")
      .trim()
      .notEmpty()
      .withMessage("Father's number is required")
      .bail()
      .matches(phoneRegex)
      .withMessage("Father's number must be 10 digits"),

    body("age")
      .notEmpty()
      .withMessage("Age is required")
      .bail()
      .isInt({ min: 1, max: 120 })
      .withMessage("Age must be a valid number between 1 and 120"),

    validate,
  ],
  addDataRow
);

// Update row (all fields required)
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid row ID"),

    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .matches(emailRegex)
      .withMessage("Please provide a valid email address"),

    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .bail()
      .matches(phoneRegex)
      .withMessage("Phone number must be 10 digits"),

    body("fathersNumber")
      .trim()
      .notEmpty()
      .withMessage("Father's number is required")
      .bail()
      .matches(phoneRegex)
      .withMessage("Father's number must be 10 digits"),

    body("age")
      .notEmpty()
      .withMessage("Age is required")
      .bail()
      .isInt({ min: 1, max: 120 })
      .withMessage("Age must be a valid number between 1 and 120"),

    validate,
  ],
  updateDataRow
);

// Delete single row
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid row ID"), validate],
  deleteDataRow
);

// Bulk delete
router.post(
  "/bulk-delete",
  [
    body("ids")
      .isArray({ min: 1 })
      .withMessage("Please provide an array of row IDs to delete"),
    body("ids.*")
      .isMongoId()
      .withMessage("Each row ID must be a valid Mongo ID"),
    validate,
  ],
  bulkDeleteDataRow
);

export default router;
