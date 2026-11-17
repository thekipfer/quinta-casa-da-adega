"use client";

import Image from "next/image";
import { useState } from "react";
import { useAppear } from "@/hooks/use-appear";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/content";

/** "A Quinta" — three columns: left photo, copy, right photo. Photos enter with a curtain reveal (see .qcda-photo-reveal). */
export function QuintaSection({ locale }: { locale: Locale }) {
  const quinta = getDictionary(locale).quinta;

  return (
    <section className="grid grid-cols-1 desk:grid-cols-[29fr_52fr_19fr]">
      <div className="pt-[140px] desk:pt-[120px] desk:pb-[110px]">
        <RevealPhoto image={quinta.leftImage} sizes="(min-width: 1025px) 29vw, 100vw" />
      </div>

      <div className="px-6 pt-[25px] pb-[136px] desk:px-0 desk:pt-[225px] desk:pb-0 desk:pl-[18%]">
        <div className="max-w-[547px]">
          <h1 className="font-display text-[52px] leading-[37px] font-light text-white uppercase desk:text-[120px] desk:leading-[83px]">
            <span className="desk:block">{quinta.titleLead}</span> {quinta.titleRest}
          </h1>
          <p className="mt-[25px] font-serif text-[22px] leading-[35px] text-white">{quinta.description}</p>
          <a href={quinta.cta.href} className="qcda-btn qcda-btn--outlined-light mt-[37px]">
            {quinta.cta.label}
          </a>
        </div>
      </div>

      <div className="hidden pt-[223px] desk:block">
        <RevealPhoto
          image={quinta.rightImage}
          sizes="19vw"
          className="qcda-photo-reveal--right [--photo-delay:0.25s]"
        />
      </div>
    </section>
  );
}

/**
 * Photo that plays the curtain reveal once it is in view AND loaded — the images are lazy, so
 * starting on view alone could sweep the curtain off an empty frame on a fast scroll.
 */
function RevealPhoto({
  image,
  sizes,
  className,
}: {
  image: ImageAsset & { alt: string };
  sizes: string;
  className?: string;
}) {
  const [observe, inView] = useAppear<HTMLDivElement>();
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={observe} className={cn("qcda-photo-reveal", inView && loaded && "is-appeared", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className="block h-auto w-full"
      />
    </div>
  );
}
