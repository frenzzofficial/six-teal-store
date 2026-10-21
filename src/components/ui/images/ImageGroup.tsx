"use client";

import type { ImageProps as NextImageProps } from "next/image";
import Image from "next/image";
import Link from "next/link";
import type { ImageProps } from "@/types/app";

type ImageSource = ImageProps | ImageProps[];

interface ImageComponentGroupProps {
  images: ImageSource;
  className?: string;
  imageClassName?: string;
  layout?: "single" | "grid" | "row" | "column";
  gap?: number;
  sizes?: string;
  priority?: boolean;
  onImageClick?: (image: ImageProps) => void;
}

export function ImageComponentGroup({
  images,
  className = "",
  imageClassName = "",
  layout = "single",
  gap = 4,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  onImageClick,
}: ImageComponentGroupProps) {
  const imageList = Array.isArray(images) ? images : [images];

  if (imageList.length === 0) return null;

  const layoutClasses: Record<
    NonNullable<ImageComponentGroupProps["layout"]>,
    string
  > = {
    single: "flex",
    grid: "grid grid-cols-2 sm:grid-cols-3",
    row: "flex flex-row flex-wrap",
    column: "flex flex-col",
  };

  const gapClass = `gap-${gap}`;

  return (
    <div className={`${layoutClasses[layout]} ${gapClass} ${className}`}>
      {imageList.map((image, index) => {
        const imagePriority = image.priority ?? priority;
        const imageLoading = imagePriority
          ? undefined
          : (image.loading ?? "lazy");

        const imageElement = (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1254}
            height={image.height ?? 1254}
            sizes={sizes}
            priority={imagePriority}
            loading={imageLoading as NextImageProps["loading"]}
            className={`${image.className ?? ""} ${imageClassName}`}
          />
        );

        const content = image.href ? (
          <Link
            href={image.href}
            key={image.id}
            className="block"
            aria-label={image.alt}
          >
            {imageElement}
          </Link>
        ) : (
          imageElement
        );

        return (
          <button
            type="button"
            key={image.id || index}
            className="min-w-0"
            onClick={() => onImageClick?.(image)}
            role={onImageClick ? "button" : undefined}
            tabIndex={onImageClick ? 0 : undefined}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

export default ImageComponentGroup;
