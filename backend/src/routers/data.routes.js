import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getDataRows,
  addDataRow,
  updateDataRow,
  deleteDataRow,
  bulkDeleteDataRow,
} from "../controllers/data.controller.js";

const router = Router();
router.use(authMiddleware);

router.get("/", getDataRows);
router.post("/", addDataRow);
router.put("/:id", updateDataRow);
router.delete("/:id", deleteDataRow);
router.post("/bulk-delete", bulkDeleteDataRow);

export default router;
