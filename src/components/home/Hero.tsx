"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faLocationDot,
  faCircleInfo,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";

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
] as const;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const quickActions = [
    { label: "Apply", icon: faCalendarCheck },
    { label: "Visit", icon: faLocationDot },
    { label: "Virtual Tour", icon: faDisplay },
    { label: "Request Info", icon: faCircleInfo },
  ] as const;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section-shell pt-0">
      <div className="mx-auto max-w-7xl">
        <div className="hero-stage">
          {heroImages.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-opacity duration-700 ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
              sizes="(min-width: 1024px) 1280px, 100vw"
            />
          ))}

          <div className="hero-action-rail">
            {quickActions.map((action, index) => (
              <div
                key={action.label}
                className={`${index < quickActions.length - 1 ? "border-b border-[var(--line)]" : ""} flex min-h-[6.2rem] flex-col items-center justify-center px-2 py-3 text-center`}
              >
                <FontAwesomeIcon
                  icon={action.icon}
                  className="h-5 w-5 text-[var(--brand)]"
                />
                <p className="mt-2 text-[13px] font-semibold leading-5 text-[var(--brand)]">
                  {action.label}
                </p>
              </div>
            ))}
          </div>

          <div className="hero-overlay-card">
            <p className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--brand)] sm:text-[2.35rem]">
              Coding Programs
            </p>
            <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">
              Learn with structure, mentoring, and practical guidance from the
              beginning.
            </p>
            <a
              href="#programs"
              className="mt-5 inline-flex items-center bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white"
            >
              LEARN MORE
            </a>
          </div>

          <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 lg:flex">
            {heroImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show hero image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-[var(--brand)]" : "bg-white/80 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
