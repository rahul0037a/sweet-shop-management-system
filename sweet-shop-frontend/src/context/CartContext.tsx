import { createContext, useContext, useState } from "react";

interface CartItem {
  sweetId: string;
  name: string;
  price: number;
  quantity: number;
  available: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (sweetId: string, qty: number) => void;
  removeItem: (sweetId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.sweetId === item.sweetId);

      if (existing) {
        const updatedQty = Math.min(
          existing.quantity + item.quantity,
          existing.available
        );

        return prev.map((c) =>
          c.sweetId === item.sweetId
            ? { ...c, quantity: updatedQty }
            : c
        );
      }

      return [...prev, item];
    });
  };

const updateQuantity = (id, qty) => {
  setCart((prev) =>
    prev.map((item) =>
      item._id === id ? { ...item, quantity: qty } : item
    )
  );
};


  const removeItem = (sweetId: string) => {
    setCart((prev) => prev.filter((c) => c.sweetId !== sweetId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
