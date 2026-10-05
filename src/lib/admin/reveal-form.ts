export function revealForm(section: HTMLElement | null, field?: HTMLElement | null) {
  if (!section) return;

  requestAnimationFrame(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

    // Focusing on touch devices pops the on-screen keyboard mid-scroll.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      field?.focus({ preventScroll: true });
    }
  });
}
