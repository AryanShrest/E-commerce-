"use client";
import { createContext, useContext, useState, useCallback, useEffect } from "react";

type ToastMessage = { title: string; detail: string };
type ToastContextValue = { showToast: (title: string, detail: string) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  const showToast = useCallback((title: string, detail: string) => {
    setMessage({ title, detail });
  }, []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-[30rem] rounded-xl border border-green-200 bg-green-50 p-5 text-green-900 shadow-lg"
        >
          <button
            type="button"
            onClick={() => setMessage(null)}
            aria-label="Dismiss cart confirmation"
            className="absolute right-4 top-4 text-xl leading-none text-gray-500 transition hover:text-gray-900"
          >
            ×
          </button>
          <p className="pr-8 font-semibold">{message.title}</p>
          <p className="mt-2 text-sm">{message.detail}</p>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="mt-3 text-xs font-semibold text-green-900 underline underline-offset-2"
          >
            Continue shopping
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
