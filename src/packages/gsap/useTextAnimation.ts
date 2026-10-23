// src/hooks/useTextAnimation.ts
"use client";

import { type RefObject, useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/packages/utils/gsap";
import {
  resolveTextAnimationOptions,
  TEXT_ANIMATION_PRESETS,
  type TextAnimationName,
  type TextAnimationOptions,
  type TextAnimationPreset,
} from "@/packages/utils/text-animation.presets";

interface UseTextAnimationParams extends TextAnimationOptions {
  preset: TextAnimationName;
}

/**
 * Plays a text animation preset on the referenced element.
 *
 * - Runs in a layout effect (via `useGSAP`) so initial states are applied before first paint.
 * - Splits text with `SplitText`: accessible (aria-label + aria-hidden handled for you),
 *   re-splits on resize/font load, and is fully reverted on unmount.
 * - Respects `prefers-reduced-motion`.
 * - Owns its own timeline: animations on different elements never interfere.
 */
export const useTextAnimation = <T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  { preset: presetName, ...animationOptions }: UseTextAnimationParams,
) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const options = resolveTextAnimationOptions(animationOptions);
  const { speed, autoPlay, repeat, delay, stagger, ease, repeatDelay } =
    options;

  const { contextSafe } = useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) return;

      const { split, mask, animate }: TextAnimationPreset =
        TEXT_ANIMATION_PRESETS[presetName];

      const revealElement = () => {
        gsap.set(element, { autoAlpha: 1 });
      };

      const buildTimeline = (targets: Element[]) => {
        const timeline = gsap.timeline({
          paused: !autoPlay,
          delay,
          repeat,
          repeatDelay,
        });
        animate(timeline, targets, options);
        timelineRef.current = timeline;
        return timeline;
      };

      const mediaQuery = gsap.matchMedia();

      mediaQuery.add("(prefers-reduced-motion: reduce)", revealElement);

      mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
        if (split === "none") {
          buildTimeline([element]);
        } else {
          SplitText.create(element, {
            type: split === "chars" ? "words,chars" : "words",
            mask,
            autoSplit: true,
            // Returning the animation lets SplitText revert and rebuild it on re-split.
            onSplit: (self) =>
              buildTimeline(split === "chars" ? self.chars : self.words),
          });
        }
        revealElement();
      });

      return () => mediaQuery.revert();
    },
    {
      scope: elementRef,
      dependencies: [
        presetName,
        speed,
        autoPlay,
        repeat,
        delay,
        stagger,
        ease,
        repeatDelay,
      ],
      revertOnUpdate: true,
    },
  );

  const replay = contextSafe(() => {
    timelineRef.current?.restart();
  });

  return { replay };
};
