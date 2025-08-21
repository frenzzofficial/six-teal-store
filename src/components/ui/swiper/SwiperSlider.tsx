"use client";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";

import gsap from "gsap";
import Image from "next/image";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useBreakpoint } from "@/libs/hooks/use-breakpoints";

export interface swiperLink {
  id: string;
  color?: string;
  className?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface SwiperMainProps {
  swipeTime?: number;
  className?: string;
  swiperLinks: Array<swiperLink>;
}

const SwiperSlider = ({
  className,
  swiperLinks,
  swipeTime = 400,
}: SwiperMainProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);
  const mainSlide = useRef<HTMLDivElement | null>(null);
  const overlaySlide = useRef<HTMLDivElement | null>(null);
  const tl: gsap.core.Timeline = gsap.timeline({ repeat: 0 });
  const swiperAnim = useSwiperAnim(swipeTime, tl);
  const { isTablet, isMobile } = useBreakpoint();
  const isPhone = isTablet || isMobile;

  useEffect(() => {
    setCurrentSlide(0);
  }, [swiperLinks]);

  return (
    <>
      {!isPhone ? (
        <Swiper
          grabCursor={true}
          speed={swipeTime}
          effect={"creative"}
          creativeEffect={{
            prev: {
              translate: ["0%", 0, 0],
              scale: 1.2,
            },
            next: {
              translate: ["0%", 0, 0],
              scale: 1.2,
            },
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          //slide start
          onSlideNextTransitionStart={() => {
            swiperAnim(overlaySlide?.current);
          }}
          onSlidePrevTransitionStart={() => {
            swiperAnim(overlaySlide?.current);
          }}
          //slide end
          onSlideNextTransitionEnd={(swiper) => {
            setCurrentSlide(swiper.realIndex);
          }}
          onSlidePrevTransitionEnd={(swiper) => {
            setCurrentSlide(swiper.realIndex);
          }}
          // navigation={true}
          modules={[EffectCreative, Navigation, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className={className}
        >
          {swiperLinks.map((link) => {
            return (
              <SwiperSlide key={link.id}>
                <SwiperImage link={link} refObject={mainSlide} />
              </SwiperSlide>
            );
          })}
          <div
            style={{
              width: "100%",
              height: "auto",
              position: "absolute",
              left: "-100%",
              top: "0",
              zIndex: "1",
            }}
          >
            <SwiperImage
              link={swiperLinks[currentSlide]}
              refObject={overlaySlide}
            />
          </div>
          <SwiperNavigation
            dir="prev"
            onclick={() => swiperRef.current?.slidePrev()}
            className="custom-prev"
          />
          <SwiperNavigation
            dir="next"
            onclick={() => swiperRef.current?.slideNext()}
            className="custom-next"
          />
        </Swiper>
      ) : null}
    </>
  );
};

export default SwiperSlider;

interface SwiperImageProps {
  link: swiperLink;
  refObject: React.RefObject<HTMLDivElement | null>;
}

const SwiperImage = ({ link, refObject }: SwiperImageProps) => {
  const { src, alt } = link.image;
  return (
    <section
      ref={refObject}
      style={{
        width: "100%",
        // full screen height  set height to "100vh"
        // height: "calc(100vh - 60px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        // fill // replaces width/height for full container fill
        priority={false}
        loading="lazy"
        className={link.className}
        style={{
          objectFit: "cover",
        }}
      />
    </section>
  );
};

const useSwiperAnim = (swipeTime = 400, tl: gsap.core.Timeline) => {
  const swiperAnim = useCallback(
    (elem: HTMLDivElement | null) => {
      if (!elem) return;

      const slide = tl.fromTo(
        elem,
        {
          x: "100%",
          duration: swipeTime / 1000,
          ease: "power1.in",
        },
        {
          x: "200%",
        }
      );

      tl.add("start");
      tl.add(slide, "start");
    },
    [swipeTime, tl]
  );

  return swiperAnim;
};

interface SwiperNavigationProps {
  dir: "prev" | "next";
  onclick: () => void;
  className?: string;
}

const SwiperNavigation = ({
  className,
  dir,
  onclick,
}: SwiperNavigationProps) => {
  const isPrev = dir === "prev";

  return (
    <div
      onClick={onclick}
      className={className}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [isPrev ? "left" : "right"]: "20px",
        zIndex: 10,
        color: "#fff",
        padding: "10px",
        borderRadius: "50%",
        cursor: "pointer",
        userSelect: "none",
        fontSize: "18px",
        backgroundColor: "#ec4899",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#831843";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#ec4899";
      }}
    >
      {isPrev ? <ChevronsLeft /> : <ChevronsRight />}
    </div>
  );
};

// usage example:
//   <SwiperSlider swiperLinks={swiperLinks} swipeTime={400} className="w-full h-full" />
