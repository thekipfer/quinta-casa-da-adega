import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getWeddings, weddingHref, weddingsHref, weddingsUi } from "@/lib/weddings";

/** How many weddings the home page shows (newest first); the rest are on /casamentos. */
const MAX_WEDDINGS = 2;

/**
 * Home "Casamentos na Quinta" — the latest real weddings, each with its own cover photo, linking to its
 * page and to the full list. Replaces the old blog ("Jornal da Quinta") section, keeping its frame:
 * white hairlines top and bottom on the sand background.
 */
export function WeddingsHomeSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).weddingsHome;
  const category = weddingsUi[locale].title;
  const weddings = getWeddings(locale).slice(0, MAX_WEDDINGS);
  if (weddings.length === 0) return null;

  return (
    <section className="px-6 pb-[99px] desk:px-0 desk:pb-[110px]">
      <div className="mx-auto max-w-[1100px] border-y border-white pt-20 pb-[60px] desk:pt-[90px] desk:pb-[70px]">
        <h2 className="text-center font-display text-[48px] leading-[50px] font-normal text-white uppercase desk:text-[62px] desk:leading-[68px]">
          {t.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-[62px] grid grid-cols-1 gap-y-[60px] md:grid-cols-2 md:gap-x-10 desk:mt-[50px]">
          {weddings.map((w) => {
            const href = weddingHref(locale, w.slug);
            return (
              <article key={w.slug} className="group">
                <Link href={href} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
                  <Image
                    src={w.landscape.src}
                    alt={w.landscape.alt}
                    width={w.landscape.width}
                    height={w.landscape.height}
                    style={w.landscape.position ? { objectPosition: w.landscape.position } : undefined}
                    sizes="(min-width: 1025px) 530px, (min-width: 768px) 50vw, 100vw"
                    className="block aspect-[3/2] h-auto w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="mt-[21px] font-serif text-[18px] leading-[28px] text-white">
                  <time dateTime={w.date}>{w.dateLabel}</time>
                  <span className="mx-[6px]" aria-hidden="true">
                    /
                  </span>
                  <Link href={weddingsHref(locale)} className="transition-colors duration-300 ease-out hover:text-[#3c3c3c]">
                    {category}
                  </Link>
                </div>
                <h3 className="mt-[9px]">
                  <Link
                    href={href}
                    className="font-display text-[32px] leading-[1.1] font-normal tracking-[-1.28px] text-white transition-colors duration-300 ease-out hover:text-[#3c3c3c]"
                  >
                    {w.title}
                  </Link>
                </h3>
                <p className="mt-[14px] font-serif text-[18px] leading-[28px] text-white">{w.description}</p>
                <Link href={href} className="qcda-textual mt-[30px] text-white">
                  <span>{t.viewWedding}</span>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-[60px] flex justify-center desk:mt-[70px]">
          <Link href={weddingsHref(locale)} className="qcda-btn qcda-btn--outlined-light">
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
