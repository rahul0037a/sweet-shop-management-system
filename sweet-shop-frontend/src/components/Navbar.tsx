import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const { cart } = useCart();
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav
      className="
        sticky top-0 z-50 
        bg-white/70 dark:bg-gray-900/70
        backdrop-blur-lg 
        shadow-lg p-4 flex justify-between items-center
        border-b border-gray-300 dark:border-gray-700
      "
    >
      <Link
        to="/"
        className="
          text-2xl font-extrabold 
          bg-gradient-to-r from-pink-500 to-purple-600 
          bg-clip-text text-transparent
        "
      >
        🍬 Sweet Shop
      </Link>

      {token && (
        <div className="flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">

          <Link className="hover:text-purple-600" to="/">
            Dashboard
          </Link>

          {role === "admin" && (
            <Link className="hover:text-purple-600" to="/admin">
              Admin
            </Link>
          )}

          {/* 🛒 Cart Icon */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="
                absolute -top-2 -right-3 bg-red-500 text-white 
                text-xs w-5 h-5 rounded-full flex justify-center items-center
              ">
                {totalItems}
              </span>
            )}
          </div>

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="
              text-xl px-3 py-1 rounded-lg 
              bg-gray-200 dark:bg-gray-700 
              hover:bg-gray-300 dark:hover:bg-gray-600
            "
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <button
            className="
              px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md
            "
            onClick={logout}
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
}
