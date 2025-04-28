"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.detail || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign in to Tagline</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
          autoFocus
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
