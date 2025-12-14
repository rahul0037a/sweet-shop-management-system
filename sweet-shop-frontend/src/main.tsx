import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // ⬅ import CartProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>    {/* ⬅ wrap app here */}
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
