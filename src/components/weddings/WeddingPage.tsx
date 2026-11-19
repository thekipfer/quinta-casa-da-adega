import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FacebookIcon, PinterestIcon, WhatsAppIcon } from "@/components/icons";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { WeddingGallery } from "@/components/weddings/WeddingGallery";
import { Breadcrumbs, Container, WeddingCard } from "@/components/weddings/parts";
import { SITE_URL } from "@/lib/content";
import type { Locale } from "@/lib/i18n/types";
import { itemPaths, routes } from "@/lib/routes";
import { breadcrumbSchema, graph, weddingGallerySchema } from "@/lib/schema";
import { getAdjacentWeddings, getWeddings, weddingHref, weddingsUi, type Wedding } from "@/lib/weddings";

function shareLinks(locale: Locale, w: Wedding) {
  const url = encodeURIComponent(`${SITE_URL}${weddingHref(locale, w.slug)}`);
  const text = encodeURIComponent(w.title);
  const media = encodeURIComponent(`${SITE_URL}${w.cover.src}`);
  return [
    { label: "Facebook", href: `https://www.facebook.com/sharer.php?u=${url}`, Icon: FacebookIcon },
    {
      label: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${text}`,
      Icon: PinterestIcon,
    },
    { label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${text}%20${url}`, Icon: WhatsAppIcon },
  ];
}

const label = "font-ui text-[13px] tracking-[0.12em] text-ink uppercase";

/** /casamentos/<slug> (pt) and /en/weddings/<slug> (en) — photo gallery, story, details and links to the other weddings. */
export function WeddingPage({ locale, wedding }: { locale: Locale; wedding: Wedding }) {
  const ui = weddingsUi[locale];
  const listHref = routes.weddings[locale];
  const { previous, next } = getAdjacentWeddings(locale, wedding.slug);
  const related = getWeddings(locale)
    .filter((w) => w.slug !== wedding.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <JsonLd
        data={graph(
          weddingGallerySchema(locale, {
            title: wedding.seoTitle,
            description: wedding.description,
            path: weddingHref(locale, wedding.slug),
            date: wedding.date,
            images: [wedding.cover, ...wedding.gallery],
          }),
          breadcrumbSchema([
            { name: ui.home, path: routes.home[locale] },
            { name: ui.title, path: listHref },
            { name: wedding.title },
          ]),
        )}
      />
      <SiteHeader locale={locale} current={listHref} alternates={itemPaths("weddings", wedding.slug)} />

      <main className="pt-[40px] pb-[80px] desk:pt-[70px] desk:pb-[120px]">
        <Container>
          <Breadcrumbs
            items={[
              { label: ui.home, href: routes.home[locale] },
              { label: ui.title, href: listHref },
              { label: wedding.title },
            ]}
          />

          <div className="mt-8 desk:mt-10">
            <WeddingGallery locale={locale} photos={wedding.gallery} title={wedding.title} />
          </div>

          <div className="mt-12 grid gap-10 desk:mt-[70px] desk:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] desk:gap-[60px]">
            <div>
              <h1 className="font-display text-[44px] leading-[1] font-normal tracking-[-0.03em] text-brand uppercase desk:text-[62px]">
                {wedding.title}
              </h1>
              <div className="mt-6 flex flex-col gap-5 font-serif text-[20px] leading-[30px] text-body">
                {wedding.content.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <dl className="flex flex-col gap-6 border-t border-hairline pt-8 desk:border-t-0 desk:border-l desk:pt-0 desk:pl-[30px]">
              <div>
                <dt className={label}>{ui.category}</dt>
                <dd className="mt-1 font-serif text-[18px] text-body">
                  <Link href={listHref} className="transition-colors hover:text-brand">
                    {ui.title}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className={label}>{ui.date}</dt>
                <dd className="mt-1 font-serif text-[18px] text-body">
                  <time dateTime={wedding.date}>{wedding.dateLabel}</time>
                </dd>
              </div>
              <div>
                <dt className={label}>{ui.share}</dt>
                <dd className="mt-3 flex gap-3">
                  {shareLinks(locale, wedding).map(({ label: name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ui.shareOn(name)}
                      className="flex size-[37px] items-center justify-center rounded-full border border-sand bg-brand text-white transition-colors hover:bg-brand-deep"
                    >
                      <Icon />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {(previous || next) && (
            <nav
              aria-label={ui.otherWeddings}
              className="mt-14 flex items-center justify-between gap-6 border-y border-hairline py-6 desk:mt-[80px]"
            >
              {previous ? (
                <Link href={weddingHref(locale, previous.slug)} className="group flex items-center gap-3 text-ink">
                  <ChevronLeft className="size-5 shrink-0 text-sand transition-transform group-hover:-translate-x-1" />
                  <span>
                    <span className={`block ${label} text-body`}>{ui.previous}</span>
                    <span className="mt-1 block font-display text-[24px] leading-[1.1] transition-colors group-hover:text-brand">
                      {previous.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link href={weddingHref(locale, next.slug)} className="group flex items-center gap-3 text-right text-ink">
                  <span>
                    <span className={`block ${label} text-body`}>{ui.next}</span>
                    <span className="mt-1 block font-display text-[24px] leading-[1.1] transition-colors group-hover:text-brand">
                      {next.title}
                    </span>
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-sand transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </nav>
          )}

          {related.length > 0 && (
            <section className="mt-14 desk:mt-[80px]">
              <h2 className="font-display text-[40px] leading-[1] font-normal tracking-[-0.02em] text-brand uppercase desk:text-[52px]">
                {ui.more}
              </h2>
              <div className="mt-8 grid gap-[30px] md:grid-cols-2 desk:grid-cols-3">
                {related.map((w) => (
                  <WeddingCard
                    key={w.slug}
                    locale={locale}
                    wedding={w}
                    cropped
                    headingLevel="h3"
                    sizes="(min-width: 1148px) 360px, (min-width: 768px) 50vw, 100vw"
                  />
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>

      <SiteFooter locale={locale} />
      <WhatsAppFloat locale={locale} />
    </div>
  );
}
