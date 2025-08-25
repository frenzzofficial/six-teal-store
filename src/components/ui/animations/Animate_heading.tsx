"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import { useAnimationContext } from "@/components/providers/AnimationProvider";

interface Animate_headingProps {
  targetRef: React.RefObject<HTMLHeadingElement>;
}
const Animate_heading = ({ targetRef }: Animate_headingProps) => {
  const { resetAnimation, waveRipple, rotateFlipWords } = useAnimationContext();

  useGSAP(() => {
    if (!targetRef) return null;
    waveRipple(targetRef.current.children[1] as HTMLElement);
    rotateFlipWords(targetRef.current.children[2] as HTMLElement);
    return {
      onEnter: () => {
        resetAnimation(targetRef.current as HTMLHeadingElement);
      },
    };
  });
  return null;
};

export default Animate_heading;
