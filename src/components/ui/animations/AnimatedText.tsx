// src/components/animation/AnimatedText.tsx
"use client";

import { type ElementType, useRef } from "react";
import { useTextAnimation } from "@/packages/gsap/useTextAnimation";
import type {
  TextAnimationName,
  TextAnimationOptions,
} from "@/packages/utils/text-animation.presets";

interface AnimatedTextProps extends TextAnimationOptions {
  /** Plain text only: it is split into words / characters. */
  children: string;
  preset: TextAnimationName;
  /** Rendered element. Defaults to `span`. */
  as?: ElementType;
  className?: string;
}

/** Hidden until the hook has applied initial animation states, which prevents a flash of unanimated text. */
const HIDDEN_UNTIL_ANIMATED = { visibility: "hidden" } as const;

export const AnimatedText = ({
  children,
  preset,
  as: Tag = "span",
  className,
  ...animationOptions
}: AnimatedTextProps) => {
  const elementRef = useRef<HTMLElement>(null);

  useTextAnimation(elementRef, { preset, ...animationOptions });

  // `key` remounts when the text changes so SplitText always starts from fresh DOM.
  return (
    <Tag
      key={children}
      ref={elementRef}
      className={className}
      style={HIDDEN_UNTIL_ANIMATED}
    >
      {children}
    </Tag>
  );
};

/* Usage replacing <Animate_heading />:

<h1>
  <span>Build</span>{" "}
  <AnimatedText preset="waveRipple">smooth</AnimatedText>{" "}
  <AnimatedText preset="rotateFlipWords" delay={0.4}>animations</AnimatedText>
</h1>
*/
