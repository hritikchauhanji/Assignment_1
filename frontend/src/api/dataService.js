import axiosInstance from "./axiosInstance";

// ✅ Get all data rows of the logged-in user
export const getDataRows = async () => {
  const res = await axiosInstance.get("/data");
  return res.data;
};

// ✅ Get a single row by ID
export const getDataRowById = async (id) => {
  const res = await axiosInstance.get(`/data/${id}`);
  return res.data;
};

// ✅ Add a new row
export const addDataRow = async (data) => {
  const res = await axiosInstance.post("/data", data);
  return res.data;
};

// ✅ Update a row by ID
export const updateDataRow = async (id, data) => {
  const res = await axiosInstance.put(`/data/${id}`, data);
  return res.data;
};

// ✅ Delete a single row
export const deleteDataRow = async (id) => {
  const res = await axiosInstance.delete(`/data/${id}`);
  return res.data;
};

// ✅ Bulk delete multiple rows
export const bulkDeleteDataRows = async (ids) => {
  const res = await axiosInstance.post("/data/bulk-delete", { ids });
  return res.data;
};
