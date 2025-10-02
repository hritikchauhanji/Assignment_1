import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDataRow } from "../api/dataService";

const AddRow = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    fathersNumber: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await addDataRow(form);
      setMessage("✅ Data added successfully!");
      setForm({
        name: "",
        email: "",
        phoneNumber: "",
        fathersNumber: "",
        age: "",
      });
      // Navigate back to dashboard after 1 sec
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Add New Data
        </h2>
        {message && (
          <div className="mb-4 text-center text-sm text-green-400">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />
          <input
            name="fathersNumber"
            value={form.fathersNumber}
            onChange={handleChange}
            placeholder="Father's Number"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-1/2 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRow;
