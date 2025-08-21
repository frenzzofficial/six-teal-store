"use client";
import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBreakpoint } from "@/libs/hooks/use-breakpoints";

gsap.registerPlugin(ScrollTrigger);

const Animate_header = ({
  refObject,
}: {
  refObject: React.RefObject<HTMLDivElement | null>;
}) => {
  const { isMobile, isTablet } = useBreakpoint();
  const isResponsive = isMobile || isTablet;

  useGSAP(() => {
    if (!refObject?.current) return;
    if (isResponsive) return;

    const tl = gsap.timeline({ paused: true });

    tl.addLabel("onLoading");
    tl.fromTo(
      refObject.current,
      {
        opacity: 0,
        y: -40,
      },
      {
        opacity: 1,
        y: 0,
        scaleY: 1,
        duration: 1,
      }
    );
    tl.play("onLoading");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [refObject]);

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,

      scrollTrigger: {
        trigger: refObject.current,
        toggleActions: "onScroll none onScroll none",
        // markers: {
        //   startColor: "pink",
        //   endColor: "green",
        //   fontSize: "40px",
        //   indent: 20,
        // },
        // pin: true,
        scrub: 1,
        start: "top top",
        end: "bottom top",
      },
    });
    tl.addLabel("onScroll");
    tl.to(refObject.current, {
      height: "6vh",
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [refObject]);

  return null;
};

export default Animate_header;
