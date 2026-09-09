"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Camera, GraduationCap, LayoutDashboard, LogOut, Mail, MessageSquareQuote, Phone } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/gallery", label: "Gallery", icon: Camera },
  { href: "/admin/outcomes", label: "Outcomes", icon: GraduationCap },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/contact", label: "Contact", icon: Phone },
  { href: "/admin/enquiries", label: "Enquiries", icon: Mail },
];

export default function AdminNav() {
  const pathname = usePathname();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <aside className="flex w-full flex-col gap-6 rounded-2xl border border-[#e8e2d8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] lg:min-h-[calc(100vh-3rem)] lg:w-64">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a8a9c]">
          Agamya Admin
        </p>
        <p className="mt-1 text-lg font-semibold text-[#1b4d3e]">Content Panel</p>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#e8f4f3] text-[#1b4d3e]"
                  : "text-[#5f6c79] hover:bg-[#f6f1e8] hover:text-[#1b4d3e]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <Link
          href="/"
          className="rounded-xl border border-[#e8e2d8] px-3 py-2.5 text-center text-sm font-medium text-[#5f6c79] transition hover:bg-[#f6f1e8]"
        >
          View website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b4d3e] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#164032]"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
