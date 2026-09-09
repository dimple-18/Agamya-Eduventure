import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Database,
  GraduationCap,
  Mail,
  MessageSquareQuote,
  Phone,
} from "lucide-react";

import { isSupabaseConfigured } from "@/lib/supabase/config";

const cards = [
  {
    href: "/admin/programs",
    title: "Programs",
    description: "Add or edit courses shown on the programs page and home preview.",
    icon: BookOpen,
  },
  {
    href: "/admin/gallery",
    title: "Gallery",
    description: "Manage event photos for the gallery and home page highlights.",
    icon: Camera,
  },
  {
    href: "/admin/outcomes",
    title: "Outcomes",
    description: "Manage student projects on the outcomes page and home showcase.",
    icon: GraduationCap,
  },
  {
    href: "/admin/testimonials",
    title: "Testimonials",
    description: "Add, edit, or remove student reviews shown on the website.",
    icon: MessageSquareQuote,
  },
  {
    href: "/admin/contact",
    title: "Contact details",
    description: "Update phone, address, WhatsApp, and support information.",
    icon: Phone,
  },
  {
    href: "/admin/enquiries",
    title: "Enquiries",
    description: "View messages from the enquiry popup and contact form.",
    icon: Mail,
  },
];

export default function AdminDashboardPage() {
  const configured = isSupabaseConfigured();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h1 className="text-2xl font-semibold text-[#1b4d3e]">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5f6c79]">
          Manage website content from here. Changes appear on the live site after you save.
          Works on Vercel now and on Hiox later — both use the same Supabase database.
        </p>

        {!configured && (
          <div className="mt-4 rounded-xl border border-[#f0dfbf] bg-[#fff9ef] px-4 py-3 text-sm text-[#7a5a2d]">
            Supabase is not connected yet. Copy <code>env.example</code> to{" "}
            <code>.env.local</code>, run the SQL in <code>supabase/schema.sql</code>, then create
            an admin user in Supabase Auth.
          </div>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-[#e8e2d8] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#cfe0de]"
          >
            <Icon className="h-5 w-5 text-[#1b6b66]" />
            <h2 className="mt-4 text-lg font-semibold text-[#1b4d3e]">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5f6c79]">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1b6b66]">
              Open
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <SeedPanel configured={configured} />
    </div>
  );
}

function SeedPanel({ configured }: { configured: boolean }) {
  return (
    <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
      <div className="flex items-start gap-3">
        <Database className="mt-0.5 h-5 w-5 text-[#1b6b66]" />
        <div>
          <h2 className="text-lg font-semibold text-[#1b4d3e]">First-time setup</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5f6c79]">
            After connecting Supabase, import the current website content into the database once
            from the testimonials page.
          </p>
          {!configured && (
            <p className="mt-2 text-sm text-[#9b6d40]">Connect Supabase before importing.</p>
          )}
        </div>
      </div>
    </section>
  );
}
