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
          className="fixed left-1 right-1 top-1 z-50 w-auto rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-green-900 shadow-md md:left-auto md:right-5 md:top-auto md:bottom-5 md:w-[calc(100%-2.5rem)] md:max-w-[30rem] md:rounded-xl md:p-5 md:shadow-lg"
        >
          <button
            type="button"
            onClick={() => setMessage(null)}
            aria-label="Dismiss confirmation"
            className="absolute right-2 top-1 text-base leading-none text-gray-500 transition hover:text-gray-900 md:right-4 md:top-4 md:text-xl"
          >
            ×
          </button>
          <p className="pr-6 text-[10px] font-semibold leading-4 md:pr-8 md:text-base md:leading-normal">{message.title}</p>
          <p className="mt-0.5 text-[10px] leading-4 md:mt-2 md:text-sm md:leading-normal">{message.detail}</p>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="mt-3 hidden text-xs font-semibold text-green-900 underline underline-offset-2 md:inline-block"
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
