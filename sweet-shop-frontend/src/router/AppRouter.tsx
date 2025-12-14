import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CartPage from "../pages/CartPage";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AdminPanel from "../pages/AdminPanel";

// 🔒 Normal Protected Route (requires valid token)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

// 🔒 Admin-only protected route
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/" />; // block normal users

  return children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard (protected) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PAGE - only visible if role === 'admin' */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
  }
/>

      </Routes>
      </div>
    </BrowserRouter>
  );
}
