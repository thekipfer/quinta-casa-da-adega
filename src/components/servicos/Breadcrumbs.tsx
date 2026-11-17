import { Fragment } from "react";

export type Crumb = { label: string; href?: string };

/** Theme page title: pink Cormorant asterisk + "Home > Serviços > …" in Alegreya. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-4 desk:gap-[14px]">
      <span
        aria-hidden="true"
        className="-mb-4 shrink-0 font-display text-[64px] leading-none font-light text-[#e0bdb6] desk:text-[80px]"
      >
        *
      </span>
      <ol className="flex flex-wrap items-center font-serif text-[20px] leading-[25px] text-body desk:text-[22px]">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && (
              <li aria-hidden="true" className="mx-[6px]">
                &gt;
              </li>
            )}
            <li>
              {item.href ? (
                <a href={item.href} className="transition-colors duration-300 hover:text-brand">
                  {item.label}
                </a>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
