"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Camera, GraduationCap, LayoutDashboard, LogOut, Mail, Menu, MessageSquareQuote, Phone, X } from "lucide-react";

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

async function handleLogout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = "/admin/login";
}

function NavContent({ pathname, onNavigate }: { pathname: string | null; onNavigate?: () => void }) {
  return (
    <>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition lg:min-h-0 ${
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
          onClick={onNavigate}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#e8e2d8] px-3 py-2.5 text-center text-sm font-medium text-[#5f6c79] transition hover:bg-[#f6f1e8] lg:min-h-0"
        >
          View website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1b4d3e] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#164032] lg:min-h-0"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );
}

function PanelTitle() {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a8a9c]">
        Agamya Admin
      </p>
      <p className="mt-1 text-lg font-semibold text-[#1b4d3e]">Content Panel</p>
    </div>
  );
}

export default function AdminNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <div className="sticky top-0 z-40 -mx-4 -mt-4 bg-[#f8f5ef]/95 px-4 pb-2 pt-4 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e8e2d8] bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <PanelTitle />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open admin menu"
            aria-expanded={drawerOpen}
            aria-controls="admin-nav-drawer"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e8e2d8] text-[#1b4d3e] transition hover:bg-[#f6f1e8]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close admin menu"
            onClick={closeDrawer}
            className="absolute inset-0 bg-[#0f1a28]/40"
          />
          <div
            id="admin-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
            className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col gap-6 overflow-y-auto overscroll-contain bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.18)]"
          >
            <div className="flex items-start justify-between gap-3">
              <PanelTitle />
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close admin menu"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e8e2d8] text-[#1b4d3e] transition hover:bg-[#f6f1e8]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavContent pathname={pathname} onNavigate={closeDrawer} />
          </div>
        </div>
      ) : null}

      <aside className="hidden w-full flex-col gap-6 rounded-2xl border border-[#e8e2d8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] lg:flex lg:min-h-[calc(100vh-3rem)] lg:w-64">
        <PanelTitle />
        <NavContent pathname={pathname} />
      </aside>
    </>
  );
}
