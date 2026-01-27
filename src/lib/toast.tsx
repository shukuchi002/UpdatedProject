"use client";

import React, { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastQueue: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

function notifyListeners() {
  listeners.forEach((listener) => listener([...toastQueue]));
}

export function addToast(message: string, type: ToastType = "success") {
  const id = Date.now().toString();
  const toast: Toast = { id, message, type };

  toastQueue = [...toastQueue, toast];
  notifyListeners();

  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    notifyListeners();
  }, 3000);

  return id;
}

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  return toasts;
}

export function ToastContainer() {
  const toasts = useToasts();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
}

function ToastItem({ toast }: ToastItemProps) {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }[toast.type];

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  }[toast.type];

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 pointer-events-auto animate-slideIn max-w-sm`}
    >
      <span className="text-xl font-bold shrink-0">{icon}</span>
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
    </div>
  );
}
