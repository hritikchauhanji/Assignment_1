import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDataRow } from "../../api/dataService";
import { toast } from "react-toastify"; // <-- import toast

const AddRow = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    fathersNumber: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // <-- field-level errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await addDataRow(form);
      toast.success("Data added successfully!");
      setForm({
        name: "",
        email: "",
        phoneNumber: "",
        fathersNumber: "",
        age: "",
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      const resErrors = err.response?.data?.errors;
      if (resErrors && Array.isArray(resErrors)) {
        // convert backend array to object for per-field errors
        const fieldErrors = resErrors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      } else {
        toast.error(err.response?.data?.message || "❌ Something went wrong.");
      }
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Father's Number */}
          <div>
            <input
              name="fathersNumber"
              value={form.fathersNumber}
              onChange={handleChange}
              placeholder="Father's Number"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
            />
            {errors.fathersNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fathersNumber}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>

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
