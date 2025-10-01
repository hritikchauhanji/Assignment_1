import DataRow from "../models/datarow.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Get all rows for logged in user
export const getDataRows = asyncHandler(async (req, res) => {
  const rows = await DataRow.find({ createdBy: req.userId });
  res.status(200).json(new ApiResponse(200, rows));
});

// Add row
export const addDataRow = asyncHandler(async (req, res) => {
  const row = await DataRow.create({ ...req.body, createdBy: req.userId });
  res.status(201).json(new ApiResponse(201, row, "Row added"));
});

// Update row
export const updateDataRow = asyncHandler(async (req, res) => {
  const row = await DataRow.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.userId },
    req.body,
    { new: true }
  );
  if (!row) throw new ApiError(404, "Row not found");
  res.status(200).json(new ApiResponse(200, row, "Row updated"));
});

// Delete single row
export const deleteDataRow = asyncHandler(async (req, res) => {
  const row = await DataRow.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.userId,
  });
  if (!row) throw new ApiError(404, "Row not found");
  res.status(200).json(new ApiResponse(200, null, "Row deleted"));
});

// Bulk delete
export const bulkDeleteDataRow = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  await DataRow.deleteMany({ _id: { $in: ids }, createdBy: req.userId });
  res.status(200).json(new ApiResponse(200, null, "Rows deleted"));
});
