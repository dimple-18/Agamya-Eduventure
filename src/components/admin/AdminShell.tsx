"use client";

import { usePathname } from "next/navigation";

import AdminNav from "@/components/admin/AdminNav";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f8f5ef] px-4 py-6 lg:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <AdminNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
