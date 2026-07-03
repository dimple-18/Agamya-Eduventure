"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faLocationDot,
  faCircleInfo,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { pageContainerClass, pageGutterClass } from "./section-layout";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Students learning together",
  },
  {
    src: "/hero/html-css-collage-concept-with-person.jpg",
    alt: "Person working with HTML and CSS concepts on screen",
  },
  {
    src: "/hero/programming-background-with-person-working-with-codes-computer.jpg",
    alt: "Student working on programming tasks with code projected in front",
  },
  {
    src: "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    alt: "Programming workspace with code open on a laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1632406898177-95f7acd8854f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern coding and technology workspace",
    fallbackSrc: "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
  },
  {
    src: "https://images.unsplash.com/photo-1688380692117-63178554d76d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hands-on programming session in a modern setup",
    fallbackSrc: "/hero/programming-background-with-person-working-with-codes-computer.jpg",
  },
] as const;

export default function Hero() {
  type QuickAction = {
    label: string;
    icon: IconDefinition;
    href: string;
    external?: boolean;
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSources, setFailedSources] = useState<Record<string, boolean>>({});
  const address =
    "Agamya Eduventure, 2nd floor, R.S. Tower, New Kalimati Rd, Hirasingh Bagan, Sakchi, Jamshedpur, Jharkhand 831001, India";
  const mapsQuery = encodeURIComponent(address);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const quickActions: readonly QuickAction[] = [
    { label: "Apply", icon: faCalendarCheck, href: "/contact#contact-form" },
    { label: "Visit", icon: faLocationDot, href: mapsLink, external: true },
    { label: "Gallery", icon: faDisplay, href: "/gallery" },
    { label: "Request Info", icon: faCircleInfo, href: "/contact" },
  ];

  const renderRailIcon = (icon: (typeof quickActions)[number]["icon"], label: string) => (
    <>
      <span className="hero-rail-icon-stack">
        <span className="hero-rail-orbit hero-rail-orbit-1" />
        <span className="hero-rail-orbit hero-rail-orbit-2" />
        <span className="hero-rail-orbit hero-rail-orbit-3" />
        <FontAwesomeIcon
          icon={icon}
          className="hero-rail-icon h-5 w-5 text-[var(--brand)]"
        />
      </span>
      <p className="hero-rail-label mt-2 text-[13px] font-semibold leading-5 text-[var(--brand)]">
        {label}
      </p>
    </>
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={`pb-0 pt-6 ${pageGutterClass}`}>
      <div className={pageContainerClass}>
        <div className="hero-stage">
          {heroImages.map((image, index) => (
            <Image
              key={image.src}
              src={failedSources[image.src] && "fallbackSrc" in image ? image.fallbackSrc : image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-opacity duration-700 ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
              sizes="(min-width: 1024px) 1280px, 100vw"
              onError={() => {
                if (!("fallbackSrc" in image)) return;
                setFailedSources((prev) =>
                  prev[image.src] ? prev : { ...prev, [image.src]: true },
                );
              }}
            />
          ))}

          <div className="hero-action-rail">
            {quickActions.map((action, index) => (
              action.external ? (
                <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={`hero-rail-item ${index < quickActions.length - 1 ? "border-b border-[var(--line)]" : ""} flex min-h-[6.2rem] flex-col items-center justify-center px-2 py-3 text-center transition hover:bg-white`}
              >
                  {renderRailIcon(action.icon, action.label)}
                </a>
              ) : (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`hero-rail-item ${index < quickActions.length - 1 ? "border-b border-[var(--line)]" : ""} flex min-h-[6.2rem] flex-col items-center justify-center px-2 py-3 text-center transition hover:bg-white`}
                >
                  {renderRailIcon(action.icon, action.label)}
                </Link>
              )
            ))}
          </div>

          <div className="hero-overlay-copy">
            <p className="hero-overlay-eyebrow">Agamya Eduventure</p>
            <p className="text-[2.7rem] font-semibold leading-[1] tracking-[-0.055em] text-white sm:text-[3.8rem] lg:text-[4.6rem]">
              ISO-certified computer education with personality development and
              interview preparation.
            </p>
            <p className="mt-3 max-w-xl text-base leading-7 text-white/88">
              Learn with structure, mentoring, and practical guidance from the
              beginning.
            </p>
            <a
              href="#programs"
              className="hero-cta mt-5 inline-flex items-center bg-[var(--brand)] px-5 py-3 text-sm font-semibold"
              style={{ color: "#ffffff" }}
            >
              <span style={{ color: "#ffffff" }}>LEARN MORE</span>
            </a>
          </div>

          <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 lg:flex">
            {heroImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show hero image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-[var(--accent)]" : "bg-white/80 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
