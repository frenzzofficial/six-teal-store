// Declarative, framework-agnostic animation presets. Each preset only describes
// *what* to animate; timeline creation, splitting, cleanup and reduced-motion
// handling live in `useTextAnimation`.

import { gsap } from "./gsap";

/* -------------------------------------------------------------------------- */
/*  Options                                                                    */
/* -------------------------------------------------------------------------- */

export interface TextAnimationOptions {
  /** Playback speed multiplier. `2` plays twice as fast. */
  speed?: number;
  /** Start playing as soon as the element is mounted. */
  autoPlay?: boolean;
  /** Extra repetitions after the first play. `-1` repeats forever. */
  repeat?: number;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Seconds between each word / character. */
  stagger?: number;
  /** Any valid GSAP ease string. */
  ease?: string;
  /** Seconds to wait between repetitions. */
  repeatDelay?: number;
}

export type ResolvedTextAnimationOptions = Required<TextAnimationOptions>;

export const DEFAULT_TEXT_ANIMATION_OPTIONS: ResolvedTextAnimationOptions = {
  speed: 1,
  autoPlay: true,
  repeat: 0,
  delay: 0,
  stagger: 0.06,
  ease: "power3.out",
  repeatDelay: 0.5,
};

/** Uses `??` (not `||`) so explicit falsy values such as `autoPlay: false` or `delay: 0` are respected. */
export const resolveTextAnimationOptions = (
  options: TextAnimationOptions = {},
): ResolvedTextAnimationOptions => ({
  speed: options.speed ?? DEFAULT_TEXT_ANIMATION_OPTIONS.speed,
  autoPlay: options.autoPlay ?? DEFAULT_TEXT_ANIMATION_OPTIONS.autoPlay,
  repeat: options.repeat ?? DEFAULT_TEXT_ANIMATION_OPTIONS.repeat,
  delay: options.delay ?? DEFAULT_TEXT_ANIMATION_OPTIONS.delay,
  stagger: options.stagger ?? DEFAULT_TEXT_ANIMATION_OPTIONS.stagger,
  ease: options.ease ?? DEFAULT_TEXT_ANIMATION_OPTIONS.ease,
  repeatDelay:
    options.repeatDelay ?? DEFAULT_TEXT_ANIMATION_OPTIONS.repeatDelay,
});

/* -------------------------------------------------------------------------- */
/*  Preset contract                                                            */
/* -------------------------------------------------------------------------- */

export interface TextAnimationPreset {
  /** What the element is split into. `"none"` animates the element itself. */
  split: "none" | "words" | "chars";
  /** Wrap each unit in an `overflow: clip` mask (for reveal-from-below effects). */
  mask?: "words" | "chars";
  /** Adds tweens to the timeline. Must not create its own timeline. */
  animate: (
    timeline: gsap.core.Timeline,
    targets: Element[],
    options: ResolvedTextAnimationOptions,
  ) => void;
}

/** Scales a base duration (seconds) by the speed multiplier. */
const scaled = (seconds: number, { speed }: ResolvedTextAnimationOptions) =>
  seconds / speed;

const SCRAMBLE_CHARACTERS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

/* -------------------------------------------------------------------------- */
/*  Presets                                                                    */
/* -------------------------------------------------------------------------- */

export const TEXT_ANIMATION_PRESETS = {
  /* --- Whole-element "attention" effects ---------------------------------- */

  fadePulse: {
    split: "none",
    animate: (timeline, targets, options) => {
      timeline
        .to(targets, {
          opacity: 0,
          duration: scaled(0.5, options),
          ease: "power2.inOut",
        })
        .to(targets, {
          opacity: 1,
          duration: scaled(0.5, options),
          ease: "power2.inOut",
        });
    },
  },

  scalePop: {
    split: "none",
    animate: (timeline, targets, options) => {
      timeline
        .to(targets, {
          scale: 1.5,
          duration: scaled(0.3, options),
          ease: "back.out(1.7)",
        })
        .to(targets, {
          scale: 0.8,
          duration: scaled(0.2, options),
          ease: "power2.inOut",
        })
        .to(targets, {
          scale: 1,
          duration: scaled(0.3, options),
          ease: "elastic.out(1, 0.5)",
        });
    },
  },

  slideShake: {
    split: "none",
    animate: (timeline, targets, options) => {
      timeline
        .to(targets, {
          x: 100,
          duration: scaled(0.4, options),
          ease: "power2.out",
        })
        .to(targets, {
          x: -100,
          duration: scaled(0.4, options),
          ease: "power2.inOut",
        })
        .to(targets, {
          x: 0,
          duration: scaled(0.4, options),
          ease: "back.out(1.7)",
        });
    },
  },

  scrambleGlitch: {
    split: "none",
    animate: (timeline, targets, options) => {
      const text = targets[0]?.textContent ?? "";
      timeline.to(targets, {
        duration: scaled(1.2, options),
        ease: "none",
        scrambleText: { text, chars: SCRAMBLE_CHARACTERS, speed: 0.6 },
      });
    },
  },

  /* --- Word-level entrances ----------------------------------------------- */

  slideUpWords: {
    split: "words",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        y: 30,
        opacity: 0,
        duration: scaled(0.6, options),
        ease: options.ease,
        stagger: options.stagger,
      });
    },
  },

  scaleBounceWords: {
    split: "words",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        scale: 0,
        opacity: 0,
        duration: scaled(0.5, options),
        ease: "back.out(1.7)",
        stagger: options.stagger,
      });
    },
  },

  rotateFlipWords: {
    split: "words",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        rotationX: -90,
        opacity: 0,
        transformOrigin: "center bottom",
        transformPerspective: 600,
        duration: scaled(0.7, options),
        ease: options.ease,
        stagger: options.stagger,
      });
    },
  },

  slideAlternateWords: {
    split: "words",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        x: (index: number) => (index % 2 === 0 ? -50 : 50),
        opacity: 0,
        duration: scaled(0.6, options),
        ease: options.ease,
        stagger: options.stagger,
      });
    },
  },

  pushUpWords: {
    split: "words",
    mask: "words",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        yPercent: 100,
        duration: scaled(0.5, options),
        ease: "power3.out",
        stagger: options.stagger,
      });
    },
  },

  fadeCascadeWords: {
    split: "words",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        opacity: 0,
        duration: scaled(0.4, options),
        ease: "power1.out",
        stagger: options.stagger,
      });
    },
  },

  layeredSlideReveal: {
    split: "words",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        x: -120,
        opacity: 0,
        filter: "blur(4px)",
        duration: scaled(0.8, options),
        ease: "power2.out",
        stagger: options.stagger,
      });
    },
  },

  /* --- Character-level entrances ------------------------------------------ */

  scatterExplode: {
    split: "chars",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-200, 200),
        rotation: () => gsap.utils.random(-180, 180),
        opacity: 0,
        scale: 0,
        duration: scaled(0.8, options),
        ease: "back.out(1.7)",
        stagger: options.stagger * 0.5,
      });
    },
  },

  waveRipple: {
    split: "chars",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        y: 50,
        opacity: 0,
        duration: scaled(1, options),
        ease: "elastic.out(1, 0.4)",
        stagger: options.stagger,
      });
    },
  },

  typewriterBounce: {
    split: "chars",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        opacity: 0,
        scale: 0,
        y: 20,
        duration: scaled(0.25, options),
        ease: "back.out(2.5)",
        stagger: options.stagger,
      });
    },
  },

  matrixReveal: {
    split: "chars",
    animate: (timeline, targets, options) => {
      timeline.from(targets, {
        opacity: 0,
        scale: 1.15,
        filter: "blur(10px)",
        duration: scaled(0.6, options),
        ease: "power2.out",
        stagger: options.stagger * 0.5,
      });
    },
  },
} satisfies Record<string, TextAnimationPreset>;

export type TextAnimationName = keyof typeof TEXT_ANIMATION_PRESETS;
