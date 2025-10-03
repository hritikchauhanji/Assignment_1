import React, { useEffect, useState } from "react";
import {
  deleteDataRow,
  bulkDeleteDataRows,
  getDataRowsWithSortingAndPagination,
} from "../../api/dataService";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authService";
import { toast } from "react-toastify"; // <-- import toast

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const fetchRows = async () => {
    setLoading(true);
    try {
      const res = await getDataRowsWithSortingAndPagination(
        page,
        limit,
        sortColumn,
        sortDirection
      );
      setRows(res.data.rows);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, [page, sortColumn, sortDirection]);

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDataRow(id);
      toast.success("✅ Row deleted successfully!");
      fetchRows();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete row.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.info("⚠️ No rows selected for deletion.");
      return;
    }
    try {
      await bulkDeleteDataRows(selectedIds);
      toast.success(`✅ ${selectedIds.length} row(s) deleted!`);
      setSelectedIds([]);
      fetchRows();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete selected rows.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("isLoggedIn");
      toast.success("✅ Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("❌ Logout failed.");
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-400">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-between mb-2 items-center">
          <button
            onClick={() => navigate("/add")}
            className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded font-semibold"
          >
            + Add New
          </button>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleBulkDelete}
              className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded font-semibold"
            >
              Delete Selected
            </button>
            <span>{selectedIds.length} selected</span>
          </div>
        </div>

        <div className="overflow-x-auto bg-gray-900 rounded-xl">
          <table className="min-w-full">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="px-4 py-2">Select</th>
                {["name", "email", "phoneNumber", "age", "fathersNumber"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-4 py-2 cursor-pointer"
                      onClick={() => handleSort(col)}
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                      {sortColumn === col
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : ""}
                    </th>
                  )
                )}
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row._id}
                  className="bg-gray-800 border-b border-gray-700"
                >
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row._id)}
                      onChange={() => handleSelect(row._id)}
                    />
                  </td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.phoneNumber}</td>
                  <td className="px-4 py-2">{row.age}</td>
                  <td className="px-4 py-2">{row.fathersNumber}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit/${row._id}`)}
                      className="bg-yellow-400 hover:bg-yellow-300 px-2 py-1 rounded font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="bg-red-500 hover:bg-red-400 px-2 py-1 rounded font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-400">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
