"use client";

import { type RefObject, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/packages/utils/gsap";

export type RevealFrom = "up" | "down" | "left" | "right" | "scale" | "fade";

export interface RevealOptions {
  /**
   * What to reveal inside the referenced element:
   * - "children" (default): each direct child, staggered. Best for card grids.
   * - "self": the element itself.
   * - any CSS selector, resolved inside the element (it can't be hidden before hydration).
   */
  target?: "children" | "self" | (string & {});
  /** Where the element travels from. Default "up". */
  from?: RevealFrom;
  /** Travel distance in px for up/down/left/right. Default 28. */
  distance?: number;
  /** Seconds per element. Default 0.85. */
  duration?: number;
  /** Seconds between elements that appear together. Default 0.09. */
  stagger?: number;
  /** Seconds before the first element starts. Default 0. */
  delay?: number;
  ease?: string;
  /** Soften the entrance with a short blur. Default false. */
  blur?: boolean;
  /**
   * "scroll" (default): reveal as the element nears the viewport. Elements already in view on
   * load play straight away. "load": play right after mount whatever the scroll position.
   */
  trigger?: "scroll" | "load";
  /** ScrollTrigger start position. Default "top 88%": a little before it is fully in view. */
  start?: string;
  /** Replay when scrolling back up and down again. Default false (play once). */
  replay?: boolean;
}

const FROM_VARS: Record<RevealFrom, (distance: number) => gsap.TweenVars> = {
  up: (d) => ({ y: d }),
  down: (d) => ({ y: -d }),
  left: (d) => ({ x: d }),
  right: (d) => ({ x: -d }),
  scale: (d) => ({ scale: 0.94, y: d * 0.5 }),
  fade: () => ({}),
};

// Inline styles the reveal sets. `transition` is switched off while GSAP drives the element, so
// a CSS `transition: transform` (hover lift on cards) can't smooth GSAP's per-frame values and
// make the entrance lag; everything but opacity is cleared afterwards so hover styles work again.
const CLEAR_WHEN_DONE = "transform,filter,transition,willChange";

const resolveTargets = (root: HTMLElement, target: string): HTMLElement[] => {
  if (target === "self") return [root];
  if (target === "children") return Array.from(root.children) as HTMLElement[];
  return Array.from(root.querySelectorAll<HTMLElement>(target));
};

/**
 * Staggered reveal-on-scroll for cards and sections.
 *
 * Attach the returned ref to a container. Its children (or `target`) start hidden and slide in
 * as they scroll into view; elements that enter together are staggered, so a row of cards
 * cascades instead of popping in at once.
 *
 * - Runs in a layout effect (via `useGSAP`) so initial states are set before first paint.
 * - Uses `ScrollTrigger.batch`: one trigger per group, not one per card.
 * - Respects `prefers-reduced-motion`: nothing is hidden or moved.
 * - Reverts everything on unmount.
 *
 * Pair it with `data-reveal` (see components/ui/animations/Reveal.tsx and reveal.css) to hide
 * the content before React hydrates, so there is no flash of unanimated cards.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>({
  target = "children",
  from = "up",
  distance = 28,
  duration = 0.85,
  stagger = 0.09,
  delay = 0,
  ease = "power3.out",
  blur = false,
  trigger = "scroll",
  start = "top 88%",
  replay = false,
}: RevealOptions = {}): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mediaQuery = gsap.matchMedia();

      mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
        const elements = resolveTargets(root, target);
        if (elements.length === 0) return;

        const hiddenState: gsap.TweenVars = {
          autoAlpha: 0,
          transition: "none",
          willChange: "transform, opacity",
          ...FROM_VARS[from](distance),
          ...(blur ? { filter: "blur(6px)" } : {}),
        };

        const play = (batch: Element[], extra: gsap.TweenVars = {}) =>
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            ...(blur ? { filter: "blur(0px)" } : {}),
            duration,
            ease,
            stagger,
            overwrite: "auto",
            onComplete: () => {
              gsap.set(batch, { clearProps: CLEAR_WHEN_DONE });
            },
            ...extra,
          });

        gsap.set(elements, hiddenState);

        if (trigger === "load") {
          const tween = play(elements, { delay });
          return () => {
            tween.kill();
          };
        }

        const triggers = ScrollTrigger.batch(elements, {
          start,
          once: !replay,
          interval: 0.1,
          batchMax: 8,
          onEnter: (batch) => play(batch, { delay }),
          ...(replay
            ? {
                onLeaveBack: (batch: Element[]) => gsap.set(batch, hiddenState),
              }
            : {}),
        });

        // Images load after the first layout and push content down; positions measured
        // before that would be wrong, so measure again once the page has settled.
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState !== "complete") {
          window.addEventListener("load", refresh, { once: true });
        }

        return () => {
          window.removeEventListener("load", refresh);
          for (const instance of triggers) instance.kill();
        };
      });
    },
    {
      scope: ref,
      dependencies: [
        target,
        from,
        distance,
        duration,
        stagger,
        delay,
        ease,
        blur,
        trigger,
        start,
        replay,
      ],
      revertOnUpdate: true,
    },
  );

  return ref;
};
