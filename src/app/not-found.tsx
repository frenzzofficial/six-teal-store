"use client";
import gsap from "gsap";
import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const digitsRef = useRef<HTMLHeadingElement | null>(null);
  const itemsRef = useRef<HTMLParagraphElement | HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const container = containerRef.current;
    const digits = digitsRef.current;
    const items = itemsRef.current;

    if (!container || !digits || !items) {
      return;
    }
    const newChildren = items.childNodes as unknown as HTMLCollectionOf<
      HTMLParagraphElement | HTMLDivElement
    >;

    const updatedChildren = Array.from(newChildren).slice(1);

    tl.fromTo(
      digits.childNodes,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        onComplete: () => {
          tl.to(digits.childNodes, {
            scale: 1.1,
            opacity: 0.1,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        },
      }
    );

    // Animate text and button
    tl.fromTo(
      updatedChildren,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <div className="space-y-6" ref={itemsRef}>
        <h1
          ref={digitsRef}
          className="text-8xl font-extrabold tracking-tight sm:text-9xl lg:text-[10rem]"
        >
          {["4", "0", "4"].map((digit, index) => (
            <span
              key={index}
              className="inline-block text-[100px] text-muted-foreground opacity-0
              "
            >
              {digit}
            </span>
          ))}
        </h1>

        <p className="text-2xl font-medium text-muted sm:text-3xl">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <p className="text-lg text-muted-foreground sm:text-xl">
          It seems you&apos;ve ventured into uncharted territory.
        </p>
        <div>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
