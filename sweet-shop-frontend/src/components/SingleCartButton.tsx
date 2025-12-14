import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function SingleCartButton({ selected }) {
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const items = Object.values(selected).filter((s: any) => s.qty > 0);
  const totalQty = items.reduce((sum, s: any) => sum + s.qty, 0);

  useEffect(() => {
    setIsVisible(items.length > 0);
  }, [items.length]);

  if (!isVisible) return null;

  const handleAddAll = () => {
    items.forEach((entry: any) => {
      const { qty, sweet } = entry;
      addToCart({
        sweetId: sweet._id,
        name: sweet.name,
        price: sweet.price,
        quantity: qty,
        available: sweet.quantity
      });
    });

    alert("Items added to cart!");
  };

  return (
    <div className="
        fixed bottom-10 left-1/2 -translate-x-1/2 z-50
        transition-all duration-300
        animate-slide-up
      "
    >
      <button
        onClick={handleAddAll}
        className="
          px-10 py-4 
          bg-gradient-to-r from-purple-600 to-fuchsia-500
          text-white font-semibold text-lg
          rounded-full shadow-2xl
          hover:scale-105 transition-transform
        "
      >
        🛒 Add to Cart ({totalQty} items)
      </button>
    </div>
  );
}
