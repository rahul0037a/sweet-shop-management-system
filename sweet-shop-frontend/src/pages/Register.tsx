import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/register", { email, password });
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          Create Account
        </h1>

        <div className="space-y-4">
          <input
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link className="text-green-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
