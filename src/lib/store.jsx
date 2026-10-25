import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PRODUCTS } from "../data/content";

const CartContext = createContext(null);

const STORAGE_KEY = "palmo-cart-v1";

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        PRODUCTS.some((product) => product.id === item.id) &&
        Number.isFinite(item.qty) &&
        item.qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() =>
    typeof window === "undefined" ? [] : readCart(),
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items]);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const addItem = useCallback(
    (product, qty = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + qty } : item,
          );
        }
        return [...current, { id: product.id, qty }];
      });
      showToast(`${product.name} added to your crate`);
    },
    [showToast],
  );

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const setQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, qty } : item)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.id);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean),
    [items],
  );

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      detailedItems.reduce(
        (sum, item) => sum + item.product.price * item.qty,
        0,
      ),
    [detailedItems],
  );

  const value = useMemo(
    () => ({
      items: detailedItems,
      count,
      subtotal,
      addItem,
      removeItem,
      setQty,
      clearCart,
      cartOpen,
      setCartOpen,
      menuOpen,
      setMenuOpen,
      toast,
      showToast,
    }),
    [
      detailedItems,
      count,
      subtotal,
      addItem,
      removeItem,
      setQty,
      clearCart,
      cartOpen,
      menuOpen,
      toast,
      showToast,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
