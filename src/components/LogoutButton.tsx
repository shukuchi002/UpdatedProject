"use client";

import { useRouter } from "next/navigation";
import { addToast } from "@/lib/toast";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call logout API endpoint
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        addToast("Logged out successfully!", "success");
        // Redirect to sign in page
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        addToast("Logout failed", "error");
      }
    } catch (err) {
      console.error("Logout error:", err);
      addToast("Error during logout", "error");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition cursor-pointer flex items-center gap-2"
    >
      <span>Logout</span>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  );
}
