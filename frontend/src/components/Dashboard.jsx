import React, { useEffect, useState } from "react";
import {
  getDataRows,
  deleteDataRow,
  bulkDeleteDataRows,
} from "../api/dataService";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authService";

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRows = async () => {
    setLoading(true);
    try {
      const res = await getDataRows();
      setRows(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async (id) => {
    await deleteDataRow(id);
    fetchRows();
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    await bulkDeleteDataRows(selectedIds);
    setSelectedIds([]);
    fetchRows();
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
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

        {/* Add New + Bulk Delete */}
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

        {/* Table */}
        <div className="overflow-x-auto bg-gray-900 rounded-xl">
          <table className="min-w-full">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="px-4 py-2">Select</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Father's Number</th>
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
      </div>
    </div>
  );
};

export default Dashboard;
