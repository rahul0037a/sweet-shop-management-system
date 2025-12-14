import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import SweetCard from "../components/SweetCard";
import SingleCartButton from "../components/SingleCartButton";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none");

  const [selected, setSelected] = useState({});

  const load = async () => {
    const res = await axiosClient.get("/sweets");
    setSweets(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // --------------------
  // Search + Filter + Sort system
  // --------------------
  useEffect(() => {
    let data = [...sweets];

    // Search filter
    if (search.trim() !== "") {
      data = data.filter((s: any) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter
    if (category !== "All") {
      data = data.filter((s: any) => s.category === category);
    }

    // Sorting
    if (sort === "price-asc") data.sort((a: any, b: any) => a.price - b.price);
    if (sort === "price-desc") data.sort((a: any, b: any) => b.price - a.price);
    if (sort === "name") data.sort((a: any, b: any) => a.name.localeCompare(b.name));
    if (sort === "stock") data.sort((a: any, b: any) => b.quantity - a.quantity);

    setFiltered(data);
  }, [search, category, sort, sweets]);

  // ---------------------
  // Update local selected quantities
  // ---------------------
  const updateQuantity = (id: string, qty: number, sweet: any) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { qty, sweet }
    }));
  };

  const categories = [...new Set(sweets.map((s: any) => s.category))];

  return (
    <>
      <Navbar />

      {/* Filters Section */}
      <div className="p-6 bg-white shadow-md sticky top-16 z-40">

        {/* Search */}
        <input
          type="text"
          placeholder="Search sweets..."
          className="w-full max-w-md px-4 py-3 border rounded-lg shadow-sm focus:ring-purple-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Chips */}
        <div className="flex gap-3 mt-4 flex-wrap">
          <button
            className={`px-4 py-2 rounded-full border ${category === "All" ? "bg-purple-600 text-white" : "bg-gray-100"}`}
            onClick={() => setCategory("All")}
          >
            All
          </button>

          {categories.map((cat: string) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border ${
                category === cat ? "bg-purple-600 text-white" : "bg-gray-100"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <div className="mt-4">
          <select
            className="px-4 py-2 border rounded-lg"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="none">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name (A-Z)</option>
            <option value="stock">Stock (High → Low)</option>
          </select>
        </div>
      </div>

      {/* Sweets Grid */}
      <div className="p-10 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {filtered.map((s: any) => (
          <SweetCard key={s._id} sweet={s} onQuantityChange={updateQuantity} />
        ))}
      </div>

      <SingleCartButton selected={selected} />
    </>
  );
}
