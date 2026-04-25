import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/signup",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Signup Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Signup
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;