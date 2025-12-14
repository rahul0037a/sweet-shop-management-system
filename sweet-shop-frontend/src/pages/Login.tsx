import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ⬅️ Use the updated AuthContext functions
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/auth/login", { email, password });

      // Save token + role into AuthContext + localStorage
      login(res.data.token, res.data.role);

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>

        <div className="space-y-4">
          <input
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          No account?{" "}
          <Link className="text-blue-600 hover:underline" to="/register">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
