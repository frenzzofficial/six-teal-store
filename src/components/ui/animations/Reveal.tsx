"use client";

import "@/styles/ui/reveal.css";
import type { ElementType, ReactNode } from "react";
import { type RevealOptions, useReveal } from "@/packages/gsap/useReveal";

interface RevealProps extends RevealOptions {
  children: ReactNode;
  /** Rendered element. Defaults to `div`. */
  as?: ElementType;
  className?: string;
}

/**
 * Reveals its children (or itself, with `target="self"`) with a staggered entrance. It exists so
 * server components can use `useReveal` without becoming client components themselves: they
 * render `<Reveal className="grid">…cards…</Reveal>` in place of the plain wrapper.
 *
 *   <Reveal className="home-rail__grid">{cards}</Reveal>            // cards cascade on scroll
 *   <Reveal target="self" from="fade">…</Reveal>                    // one block fades in
 *   <Reveal className="hero__actions" trigger="load" delay={0.3}>…  // plays on page load
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  className,
  ...options
}: RevealProps) => {
  const ref = useReveal<HTMLElement>(options);
  // Only "self" and "children" can be hidden by CSS ahead of hydration; a selector target
  // is hidden by the hook as soon as it runs.
  const mode = options.target ?? "children";
  const dataReveal = mode === "self" || mode === "children" ? mode : undefined;

  return (
    <Tag ref={ref} className={className} data-reveal={dataReveal}>
      {children}
    </Tag>
  );
};
