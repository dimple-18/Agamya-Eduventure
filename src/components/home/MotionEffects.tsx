"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("motion-reveal-visible");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    const revealTargets = document.querySelectorAll<HTMLElement>(
      ".hero-stage, section.section-shell > div",
    );

    revealTargets.forEach((element) => {
      element.classList.add("motion-reveal-ready");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
