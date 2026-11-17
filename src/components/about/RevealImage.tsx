"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { useAppear } from "@/hooks/use-appear";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/content";

type RevealImageProps = {
  image: ImageAsset & { alt: string };
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Curtain sweep direction (default "left": enters from the left edge). */
  from?: "left" | "right";
  /** Seconds to wait before the reveal starts — staggers photos shown side by side. */
  delay?: number;
};

/**
 * Image with the same curtain reveal as the home page's "A Quinta" photos (see .qcda-photo-reveal).
 * Plays once the image is in view AND loaded, so the curtain never sweeps off an empty frame.
 */
export function RevealImage({ image, sizes, className, imageClassName, from = "left", delay = 0 }: RevealImageProps) {
  const [observe, inView] = useAppear<HTMLDivElement>("0px 0px -12% 0px");
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      ref={observe}
      style={delay ? ({ "--photo-delay": `${delay}s` } as CSSProperties) : undefined}
      className={cn(
        "qcda-photo-reveal",
        from === "right" && "qcda-photo-reveal--right",
        inView && loaded && "is-appeared",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn("block h-auto w-full", imageClassName)}
      />
    </div>
  );
}
