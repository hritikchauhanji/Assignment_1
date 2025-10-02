import React from "react";
import { useState } from "react";
import { login } from "../api/authService"; // manual login API
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const res = await login(form);
      setMessage("✅ Login successful!");
      navigate("/dashboard");
      console.log(res.data);
      // maybe redirect to dashboard
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
    // replace with your backend Google auth route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-400">{message}</div>
        )}

        {/* Manual Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-700" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition flex items-center justify-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C36.26 2.74 30.64 0 24 0 14.64 0 6.61 5.49 2.56 13.44l7.98 6.2C12.37 13.02 17.74 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.08 24.55c0-1.58-.14-3.09-.39-4.55H24v9.12h12.39c-.54 2.9-2.17 5.36-4.64 7.04l7.3 5.65c4.28-3.96 6.73-9.79 6.73-17.26z"
            />
            <path
              fill="#4A90E2"
              d="M24 48c6.48 0 11.91-2.14 15.88-5.81l-7.3-5.65c-2.03 1.37-4.61 2.17-8.58 2.17-6.26 0-11.62-3.52-14.46-8.64l-7.98 6.2C6.61 42.51 14.64 48 24 48z"
            />
            <path
              fill="#FBBC05"
              d="M9.54 28.07c-.47-1.37-.74-2.83-.74-4.32s.27-2.95.74-4.32l-7.98-6.2C.9 16.89 0 20.35 0 23.75s.9 6.86 2.56 9.52l7.98-6.2z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <p className="mt-6 text-gray-400 text-sm text-center">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
