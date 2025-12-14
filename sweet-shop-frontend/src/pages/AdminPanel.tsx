import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const load = async () => {
    const res = await axiosClient.get("/sweets");
    setSweets(res.data);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    await axiosClient.post("/sweets", form);
    setForm({ name: "", category: "", price: "", quantity: "" });
    load();
  };

  const remove = async (id: string) => {
    await axiosClient.delete(`/sweets/${id}`);
    load();
  };

  const restock = async (id: string) => {
    await axiosClient.post(`/sweets/${id}/restock`, { amount: 5 });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
        <h1 className="text-3xl font-extrabold mb-10 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Admin Dashboard
        </h1>

        {/* Add Sweet Form */}
        <div className="
          bg-white/70 backdrop-blur-xl border border-white/40 
          shadow-xl rounded-2xl p-8 mb-12
        ">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            ➕ Add New Sweet
          </h2>

          <form className="grid grid-cols-4 gap-5" onSubmit={submit}>
            <input
              className="glass-input"
              placeholder="Sweet Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="glass-input"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              className="glass-input"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="glass-input"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />

            <button
              className="
                col-span-4 py-3 rounded-xl font-semibold text-white 
                bg-gradient-to-r from-green-500 to-teal-500
                hover:shadow-lg active:scale-95
              "
            >
              Add Sweet
            </button>
          </form>
        </div>

        {/* Sweet List */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🍭 Manage Sweets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sweets.map((s: any) => (
            <div
              key={s._id}
              className="
                bg-white/80 backdrop-blur-xl border border-white/40 
                p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition
              "
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{s.name}</h3>

              <p className="text-gray-600">Category: {s.category}</p>
              <p className="text-gray-600">Price: ₹{s.price}</p>
              <p className="text-gray-600 mb-4">Qty: {s.quantity}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => restock(s._id)}
                  className="
                    flex-1 py-2 bg-blue-500 hover:bg-blue-600 
                    text-white rounded-xl active:scale-95
                  "
                >
                  Restock +5
                </button>

                <button
                  onClick={() => remove(s._id)}
                  className="
                    flex-1 py-2 bg-red-500 hover:bg-red-600 
                    text-white rounded-xl active:scale-95
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
