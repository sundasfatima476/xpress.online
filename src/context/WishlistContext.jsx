import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(null);
const STORAGE_KEY = "mn_wishlist";

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const toastCtx = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const isWishlisted = (id) => ids.includes(id);

  const toggleWishlist = (product) => {
    setIds((prev) => {
      if (prev.includes(product.id)) {
        toastCtx?.showToast(`${product.name} removed from wishlist`, "info");
        return prev.filter((i) => i !== product.id);
      }
      toastCtx?.showToast(`${product.name} added to wishlist`, "success");
      return [...prev, product.id];
    });
  };

  const removeFromWishlist = (id) => setIds((prev) => prev.filter((i) => i !== id));

  return (
    <WishlistContext.Provider value={{ ids, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
