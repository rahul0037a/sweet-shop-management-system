import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FloatingCartButton() {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return null; // hide when cart is empty

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <button
      onClick={() => navigate("/cart")}
      className="
        fixed bottom-6 right-6 
        bg-purple-600 hover:bg-purple-700 
        text-white font-semibold 
        rounded-full shadow-xl 
        px-6 py-4 
        flex items-center gap-3
        transition-all duration-300
      "
    >
      🛒 Cart ({totalItems})
    </button>
  );
}
