import { useCart } from "../context/CartContext";
import axiosClient from "../api/axiosClient";
import Navbar from "../components/Navbar";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axiosClient.post(
        "/sweets/checkout",
        {
          items: cart.map((item) => ({
            sweetId: item.sweetId,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Checkout successful!");
      clearCart();
    } catch (err: any) {
      alert(err.response?.data?.error || "Checkout failed");
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold text-gray-700">
            Your cart is empty 🛒
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.sweetId}
              className="p-5 bg-white shadow-lg rounded-xl flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>
                <p className="text-gray-600 text-sm">
                  Available: {item.available}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                  onClick={() =>
                    updateQuantity(item.sweetId, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                  onClick={() =>
                    updateQuantity(item.sweetId, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.available}
                >
                  +
                </button>

                {/* Delete */}
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  onClick={() => removeItem(item.sweetId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-8 p-5 bg-white shadow-lg rounded-xl flex justify-between items-center">
          <h2 className="text-xl font-bold">Total:</h2>
          <span className="text-2xl font-bold text-green-600">₹{total}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-6 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold shadow-lg"
        >
          Checkout
        </button>
      </div>
    </>
  );
}
