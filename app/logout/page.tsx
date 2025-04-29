"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/logout", { method: "POST" }).then(() =>
      router.replace("/login"),
    );
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-lg">Logging you out…</span>
    </div>
  );
}
