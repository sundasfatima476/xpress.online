import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);
const STORAGE_KEY = "mn_cart";

function makeLineId(productId, size, color) {
  return `${productId}__${size}__${color}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const toastCtx = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, { size, color, qty = 1 } = {}) => {
    const lineId = makeLineId(product.id, size || product.sizes[0], color || product.colors[0]);
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId);
      if (existing) {
        return prev.map((i) => (i.lineId === lineId ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          lineId,
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          size: size || product.sizes[0],
          color: color || product.colors[0],
          qty,
        },
      ];
    });
    toastCtx?.showToast(`${product.name} added to cart`, "success");
  };

  const removeFromCart = (lineId) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
    toastCtx?.showToast("Item removed from cart", "info");
  };

  const updateQty = (lineId, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.lineId === lineId ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
