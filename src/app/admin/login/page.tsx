import { Suspense } from "react";

import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f8f5ef] text-sm text-[#5f6c79]">
          Loading...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
