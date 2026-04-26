// Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";
import API from "../api/axios";

export function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl border p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-black text-white">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-500">Login to your AI Notes Hub</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-2xl pl-12 pr-4 py-3 outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-2xl pl-12 pr-4 py-3 outline-none"
              required
            />
          </div>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition">
          <LogIn className="w-5 h-5" />
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account? {" "}
          <Link to="/signup" className="font-semibold text-black">
            Signup
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Login;


