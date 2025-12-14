import { useState } from "react";

export default function SweetCard({ sweet, onQuantityChange }) {
  const [qty, setQty] = useState(0);

  const increase = () => {
    if (qty < sweet.quantity) {
      setQty(qty + 1);
      onQuantityChange(sweet._id, qty + 1, sweet);
    }
  };

  const decrease = () => {
    if (qty > 0) {
      setQty(qty - 1);
      onQuantityChange(sweet._id, qty - 1, sweet);
    }
  };

  return (
    <div className="
      bg-white rounded-2xl shadow-lg border border-gray-100 
      p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
    ">
      {/* Fake Image placeholder */}
      <div className="
        h-40 w-full bg-gradient-to-r from-purple-300 to-pink-300
        rounded-xl mb-4 shadow-inner
      " />

      <h2 className="text-xl font-bold">{sweet.name}</h2>
      <p className="text-gray-600">Category: {sweet.category}</p>
      <p className="text-gray-700 font-semibold">₹{sweet.price}</p>
      <p className="text-gray-500">Available: {sweet.quantity}</p>

      {/* Qty Selector */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={decrease}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
        >
          -
        </button>

        <span className="text-lg font-semibold">{qty}</span>

        <button
          onClick={increase}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}
