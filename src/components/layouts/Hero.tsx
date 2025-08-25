"use client";
import Link from "next/link";
import React, { RefObject } from "react";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/shadcn/button";
import { RootState } from "@/libs/store/store";
import { HeroItems } from "@/libs/data/data.hero";
import Image_component from "../ui/images/Image_component";
import Animate_heading from "../ui/animations/Animate_heading";
import { imageURLFromGit } from "@/libs/configs/config.helper";

const Hero = () => {
  const homepageProductsData = useSelector(
    (state: RootState) => state.products.homepageProductsData
  );
  const targetRef = React.useRef<HTMLHeadingElement | null>(null);

  if (!homepageProductsData) {
    return <h3>Loading...</h3>;
  }
  const list = HeroItems(homepageProductsData);

  return (
    <section className="container relative mx-auto md:px-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4" ref={targetRef}>
            <div className="inline-flex items-center mt-5 lg:mt-1 gap-2 px-4 py-2 rounded-full text-primary bg-gradient-to-r from-bg-muted to-bg-muted-foreground text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Six Teal Collection
            </div>
            <h1 className="heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Define Your Style
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
              Discover curated collections that speak to every facet of your
              personality. From fashion to wellness, technology to
              literature—express yourself authentically.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href={"/Trending"}>
              <Button
                size="lg"
                variant={"gradient"}
                className="w-fit text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start lg:gap-8 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted">50K+</div>
              <div className="text-sm text-muted-foreground">
                Happy Customers
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted">6</div>
              <div className="text-sm text-muted-foreground">
                Lifestyle Categories
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted">Premium</div>
              <div className="text-sm text-muted-foreground">
                Quality Assured
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {list?.slice(0, 6).map((item) => (
              <div key={item.uid}>
                <div
                  className={`group relative overflow-hidden rounded-2xl ${item.css} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
                >
                  {item.image ? (
                    <Image_component
                      id={item.image[0].id}
                      src={imageURLFromGit(item.image[0].src)}
                      alt={item.image[0].alt}
                      width={item.image[0].width || 512}
                      height={item.image[0].height || 512}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                  ) : null}
                  <h6 className="font-semibold text-gray-900 text-sm leading-tight">
                    {item.label}
                  </h6>
                  <p className="text-xs text-gray-600">{item.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Animate_heading targetRef={targetRef as RefObject<HTMLHeadingElement>} />
    </section>
  );
};

export default Hero;
