import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/types";
import { weddingHref, weddingsHref, weddingsUi, type Wedding } from "@/lib/weddings";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1148px] px-6", className)}>{children}</div>;
}

/** "Início / Casamentos / …" (or "Home / Weddings / …") trail, the same one the original theme shows above each page. */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-ui text-[15px] leading-[24px] text-body">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-x-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-sand">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-brand">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Photo card with the category and couple's name laid over the image ("info on image" layout). */
export function WeddingCard({
  locale,
  wedding,
  sizes,
  cropped = false,
  preload = false,
  headingLevel: Heading = "h2",
}: {
  locale: Locale;
  wedding: Wedding;
  sizes: string;
  /** Crop every card to the same 4:3 frame (related list) instead of the photo's own proportions (masonry grid). */
  cropped?: boolean;
  /** Above-the-fold card (the first one on the list page): preload its photo, it's the LCP element. */
  preload?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const { cover } = wedding;
  return (
    <article className="group relative overflow-hidden bg-cream">
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes={sizes}
        preload={preload}
        className={cn(
          "block h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]",
          cropped && "aspect-[4/3] object-cover",
        )}
      />
      {/* Whole-card link; the title below is the accessible one, so this duplicate is hidden from AT. */}
      <Link href={weddingHref(locale, wedding.slug)} aria-hidden="true" tabIndex={-1} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 desk:p-[34px]">
        <Link
          href={weddingsHref(locale)}
          className="pointer-events-auto font-ui text-[13px] tracking-[0.12em] text-white/85 uppercase transition-colors hover:text-white"
        >
          {weddingsUi[locale].title}
        </Link>
        <Heading
          className={cn(
            "mt-2 font-display leading-[1.1] font-normal tracking-[-0.02em] text-white",
            cropped ? "text-[30px]" : "text-[34px] desk:text-[46px]",
          )}
        >
          <Link href={weddingHref(locale, wedding.slug)} className="pointer-events-auto">
            {wedding.title}
          </Link>
        </Heading>
      </div>
    </article>
  );
}
