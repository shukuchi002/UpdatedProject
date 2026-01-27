"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    res.ok ? router.push("/dashboard") : setError("Invalid credentials");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Login
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 cursor-pointer">
          Sign In
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>
    </main>
  );
}
