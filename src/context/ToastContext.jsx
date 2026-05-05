import { createContext, useContext, useState, useCallback } from "react";
import { Check, X } from "lucide-react";

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function Toast({ toast, onDismiss }) {
  return (
    <div
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-slide-down"
      role="alert"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100">
        {toast.type === "success" ? (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Check size={16} className="text-green-600" />
          </div>
        ) : toast.type === "error" ? (
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <X size={16} className="text-red-600" />
          </div>
        ) : null}
        <p className="text-sm font-medium text-gray-900">{toast.message}</p>
        <button
          onClick={onDismiss}
          className="ml-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Tutup"
        >
          <X size={14} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = {
    showToast,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={() => dismissToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}
