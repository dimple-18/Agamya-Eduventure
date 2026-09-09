"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  ChevronRight,
  Code2,
  GraduationCap,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  homeGalleryFeatured as defaultHomeGalleryFeatured,
  homeGallerySidebar as defaultHomeGallerySidebar,
  type GalleryEvent,
} from "./content";
import { pageContainerClass, pageGutterClass } from "./section-layout";

const galleryFeatures = [
  {
    label: "Hands-on Learning",
    icon: Users,
    iconBg: "bg-[#e8f5ee]",
    iconColor: "text-[#1b4d3e]",
  },
  {
    label: "Practical Exposure",
    icon: Code2,
    iconBg: "bg-[#fdf0e4]",
    iconColor: "text-[#d97706]",
  },
  {
    label: "Real-world Experience",
    icon: Award,
    iconBg: "bg-[#f1edf8]",
    iconColor: "text-[#6d4bb8]",
  },
] as const;

const galleryStats = [
  {
    value: "24+",
    label: "Events Conducted",
    subtext: "Workshops, sessions & more",
    icon: Calendar,
    tone: "teal",
  },
  {
    value: "850+",
    label: "Students Participated",
    subtext: "Across all events",
    icon: Users,
    tone: "orange",
  },
  {
    value: "96%",
    label: "Students Engaged",
    subtext: "Active participation rate",
    icon: GraduationCap,
    tone: "purple",
  },
  {
    value: "15+",
    label: "Expert Speakers",
    subtext: "Industry professionals",
    icon: Trophy,
    tone: "blue",
  },
] as const;

function FeaturedEventCard({ event }: { event: GalleryEvent }) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-[#ebe5db] bg-white shadow-[0_10px_32px_rgba(15,23,42,0.08)]">
      <div className="relative h-[260px] sm:h-[300px]">
        <Image
          src={event.photos[0]}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 520px, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a28]/55 via-[#0f1a28]/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-[#1b6b66] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
          Featured
        </span>

        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {event.location ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0f1a28]/72 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                <MapPin className="h-3 w-3" strokeWidth={2.25} />
                {event.location}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0f1a28]/72 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              <Calendar className="h-3 w-3" strokeWidth={2.25} />
              {event.date}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0f1a28]/72 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            <Users className="h-3 w-3" strokeWidth={2.25} />
            {event.students}
          </span>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1b6b66]">
          {event.label}
        </p>
        <h3 className="mt-2 text-[22px] font-bold leading-tight tracking-[-0.02em] text-[#1b4d3e] sm:text-[24px]">
          {event.title}
        </h3>
        <p className="mt-2.5 text-[14px] leading-[1.65] text-[#5f6f82] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {event.description}
        </p>
        <Link
          href="/gallery"
          className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1b6b66] transition-colors hover:text-[#164032]"
        >
          View Details
          <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
        </Link>
      </div>
    </article>
  );
}

function SidebarEventCard({ event }: { event: GalleryEvent }) {
  return (
    <article className="flex gap-3.5 rounded-[16px] border border-[#ebe5db] bg-white p-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)] sm:gap-4 sm:p-3.5">
      <div className="relative h-[72px] w-[88px] shrink-0 overflow-hidden rounded-xl sm:h-[78px] sm:w-[96px]">
        <Image
          src={event.photos[0]}
          alt={event.title}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b6b66]">
          {event.label}
        </p>
        <h4 className="mt-1 text-[14px] font-bold leading-snug text-[#1b4d3e] sm:text-[15px]">
          {event.title}
        </h4>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[#6b7c8f]">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" strokeWidth={2.1} />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" strokeWidth={2.1} />
            {event.students}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function HomeGallery({
  events,
}: {
  events?: readonly GalleryEvent[];
}) {
  const homeGalleryFeatured = events?.length ? events.slice(0, 4) : defaultHomeGalleryFeatured;
  const homeGallerySidebar = events?.length ? events.slice(1, 4) : defaultHomeGallerySidebar;
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredEvent = homeGalleryFeatured[activeIndex] ?? homeGalleryFeatured[0];

  useEffect(() => {
    if (homeGalleryFeatured.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % homeGalleryFeatured.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [homeGalleryFeatured.length]);

  const goPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + homeGalleryFeatured.length) % homeGalleryFeatured.length,
    );
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % homeGalleryFeatured.length);
  };

  return (
    <section id="gallery" className={`bg-[#fdfbf7] pb-20 pt-14 ${pageGutterClass}`}>
      <div className={pageContainerClass}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.45fr)_minmax(0,0.95fr)] lg:gap-8 xl:gap-10">
          <div className="max-w-[400px]">
            <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b4d3e]">
              <span className="h-2 w-2 rounded-full bg-[#f39c12]" />
              Gallery
            </p>

            <h2 className="mt-5 text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#1b4d3e] sm:text-[40px] lg:text-[44px]">
              Event highlights from workshops, practice, and institute{" "}
              <span className="inline-block whitespace-nowrap">occasions.</span>
            </h2>

            <p className="mt-6 text-[15px] leading-[1.75] text-[#5f6f82]">
              A glimpse into the learning environment, interactive sessions, and memorable
              moments that shape student's skills and confidence.
            </p>

            <ul className="mt-8 space-y-3">
              {galleryFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.label}
                    className="flex items-center gap-3 text-[14px] font-semibold text-[#1b4d3e]"
                  >
                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${feature.iconBg} ${feature.iconColor}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.1} />
                    </span>
                    {feature.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            {featuredEvent ? <FeaturedEventCard key={featuredEvent.title} event={featuredEvent} /> : null}

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goPrevious}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6dde5] bg-white text-[#1b4d3e] shadow-sm transition-colors hover:bg-[#f3f5f4]"
                aria-label="Previous gallery highlight"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
              </button>

              <div className="flex items-center gap-2">
                {homeGalleryFeatured.map((event, index) => (
                  <button
                    key={event.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-7 bg-[#f39c12]"
                        : "w-2.5 bg-[#c8d0d8] hover:bg-[#a8b4c0]"
                    }`}
                    aria-label={`Show ${event.title}`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6dde5] bg-white text-[#1b4d3e] shadow-sm transition-colors hover:bg-[#f3f5f4]"
                aria-label="Next gallery highlight"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {homeGallerySidebar.map((event) => (
              <SidebarEventCard key={event.title} event={event} />
            ))}
            <Link
              href="/gallery"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b4d3e] px-7 py-3.5 text-[14px] font-semibold !text-white transition-colors hover:bg-[#164032] cta-pulse"
            >
              View Full Gallery
              <ArrowRight className="h-4 w-4 text-white" strokeWidth={2.25} />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryStats.map((stat) => {
            const Icon = stat.icon;
            const toneStyles = {
              teal: {
                iconBg: "bg-[#e8f4f3]",
                iconColor: "text-[#1b6b66]",
                valueColor: "text-[#1b4d3e]",
              },
              orange: {
                iconBg: "bg-[#fdf0e4]",
                iconColor: "text-[#d97706]",
                valueColor: "text-[#d97706]",
              },
              purple: {
                iconBg: "bg-[#f1edf8]",
                iconColor: "text-[#6d4bb8]",
                valueColor: "text-[#6d4bb8]",
              },
              blue: {
                iconBg: "bg-[#e8f1ff]",
                iconColor: "text-[#2563eb]",
                valueColor: "text-[#2563eb]",
              },
            }[stat.tone];

            return (
              <div
                key={stat.label}
                className="rounded-[18px] border border-[#ebe5db] bg-white px-5 py-5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] sm:px-6"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${toneStyles.iconBg} ${toneStyles.iconColor}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.1} />
                </span>
                <p className={`mt-4 text-[26px] font-bold leading-none ${toneStyles.valueColor}`}>
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[15px] font-bold text-[#1b4d3e]">{stat.label}</p>
                <p className="mt-1 text-[13px] text-[#6b7c8f]">{stat.subtext}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
