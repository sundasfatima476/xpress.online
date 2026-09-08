import { createContext, useCallback, useContext, useState } from "react";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = ++idCounter;
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => removeToast(id), 3200);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 w-[92vw] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-slide-in flex items-start gap-3 bg-forest text-ivory px-4 py-3.5 shadow-soft border border-forest-light/40"
          >
            {t.type === "success" && <FiCheckCircle className="mt-0.5 shrink-0 text-gold-light" size={18} />}
            {t.type === "error" && <FiXCircle className="mt-0.5 shrink-0 text-red-300" size={18} />}
            {t.type === "info" && <FiInfo className="mt-0.5 shrink-0 text-gold-light" size={18} />}
            <p className="text-sm leading-snug">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
