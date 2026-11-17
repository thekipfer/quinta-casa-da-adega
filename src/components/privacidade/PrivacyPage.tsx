import { Fragment } from "react";
import { FilePenLine, Gem, Hand, Mail, MapPin, MonitorSmartphone, Phone, ShieldCheck, Trash2, Undo2, UserRound } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitText } from "@/components/SplitText";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RiseIn } from "@/components/servicos/RiseIn";
import { Breadcrumbs, Container } from "@/components/weddings/parts";
import { MAPS_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/i18n/orcamento";
import { PRIVACY_HREF, privacy, type PrivacyBlock, type PrivacyIcon } from "@/lib/i18n/privacidade";
import { routes } from "@/lib/routes";

const icons: Record<PrivacyIcon, typeof Gem> = {
  user: UserRound,
  rings: Gem,
  browser: MonitorSmartphone,
  edit: FilePenLine,
  erase: Trash2,
  undo: Undo2,
  hand: Hand,
};

const number = (i: number) => String(i + 1).padStart(2, "0");

function Block({ block }: { block: PrivacyBlock }) {
  switch (block.kind) {
    case "text":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4">
              <span aria-hidden="true" className="mt-[13px] size-[6px] shrink-0 rounded-full bg-sand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "cards":
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {block.items.map(({ icon, text }) => {
            const Icon = icons[icon];
            return (
              <li
                key={text}
                className="flex items-start gap-4 border border-hairline/70 bg-white p-5 text-[17px] leading-[1.55] transition-colors duration-300 hover:border-sand"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sand/70 text-brand">
                  <Icon className="size-[18px]" strokeWidth={1.4} />
                </span>
                <span>{text}</span>
              </li>
            );
          })}
        </ul>
      );
    case "note":
      return (
        <p className="flex items-center gap-4 border-l-2 border-sand bg-cream px-5 py-4 text-ink italic">
          <ShieldCheck className="size-5 shrink-0 text-brand" strokeWidth={1.4} />
          {block.text}
        </p>
      );
  }
}

/** /politica-de-privacidade — hero, sticky table of contents, numbered sections and a contact card. */
export function PrivacyPage() {
  const p = privacy;
  const c = p.contact;

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader locale="pt" current={PRIVACY_HREF} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-cream pt-[40px] pb-14 desk:pt-[70px] desk:pb-[90px]">
          <Container>
            <Breadcrumbs items={[{ label: p.breadcrumbHome, href: routes.home.pt }, { label: p.title }]} />
            <p className="mt-10 font-ui text-[12px] font-medium tracking-[0.24em] text-sand-dark uppercase desk:mt-14">
              {p.eyebrow}
            </p>
            <SplitText
              as="h1"
              text={p.title}
              className="mt-4 max-w-[900px] font-display text-[50px] leading-[0.92] font-light tracking-[-0.03em] text-brand uppercase desk:text-[96px]"
            />
            <RiseIn delay={150}>
              <p className="mt-8 max-w-[720px] font-serif text-[20px] leading-[1.6] text-body desk:text-[22px]">{p.intro}</p>
            </RiseIn>
            <RiseIn delay={300}>
              <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-ui text-[13px] tracking-[0.08em] text-ink">
                <span>
                  {p.updatedLabel}: <time dateTime={p.updated.iso}>{p.updated.label}</time>
                </span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-hairline sm:block" />
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-sand-dark" strokeWidth={1.5} />
                  {p.compliance}
                </span>
              </p>
            </RiseIn>
          </Container>
        </section>

        {/* Table of contents + sections */}
        <Container className="py-14 desk:py-[100px]">
          <div className="grid gap-12 desk:grid-cols-[250px_minmax(0,1fr)] desk:gap-[80px]">
            <nav aria-labelledby="privacy-toc" className="desk:sticky desk:top-[110px] desk:self-start">
              <h2 id="privacy-toc" className="font-ui text-[12px] font-medium tracking-[0.24em] text-sand-dark uppercase">
                {p.tocTitle}
              </h2>
              <ol className="mt-5 flex flex-col border-l border-hairline">
                {p.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="group -ml-px flex gap-3 border-l border-transparent py-2 pl-5 font-serif text-[17px] leading-snug text-body transition-colors hover:border-brand hover:text-brand"
                    >
                      <span className="font-display text-[17px] text-sand transition-colors group-hover:text-brand">
                        {number(i)}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div>
              {p.sections.map((s, i) => (
                <RiseIn
                  as="section"
                  key={s.id}
                  className="grid gap-4 border-t border-hairline py-10 first:border-t-0 first:pt-0 sm:grid-cols-[72px_minmax(0,1fr)] desk:py-12"
                >
                  <span id={s.id} aria-hidden="true" className="scroll-mt-[110px] font-display text-[44px] leading-none font-light text-sand">
                    {number(i)}
                  </span>
                  <div>
                    <h2 className="font-display text-[32px] leading-[1.05] font-normal text-brand desk:text-[38px]">{s.title}</h2>
                    <div className="mt-5 flex flex-col gap-5 font-serif text-[19px] leading-[1.65] text-body">
                      {s.blocks.map((block, bi) => (
                        <Fragment key={bi}>
                          <Block block={block} />
                        </Fragment>
                      ))}
                      {s.id === p.emailAfterSection && (
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="inline-flex items-center gap-3 self-start font-ui text-[17px] text-brand underline decoration-sand underline-offset-[6px] transition-colors hover:text-brand-deep hover:decoration-brand"
                        >
                          <Mail className="size-[18px]" strokeWidth={1.5} />
                          {CONTACT_EMAIL}
                        </a>
                      )}
                    </div>
                  </div>
                </RiseIn>
              ))}
            </div>
          </div>
        </Container>

        {/* Contact card */}
        <Container className="pb-[90px] desk:pb-[130px]">
          <RiseIn className="grid gap-10 bg-cream px-6 py-12 sm:px-12 desk:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] desk:items-center desk:gap-16 desk:px-[70px] desk:py-[70px]">
            <div>
              <h2 className="font-display text-[40px] leading-[0.95] font-light tracking-[-0.02em] text-brand uppercase desk:text-[56px]">
                {c.title}
              </h2>
              <p className="mt-4 font-serif text-[19px] leading-[1.6] text-body">{c.text}</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="qcda-btn qcda-btn--filled mt-8 gap-3 hover:bg-brand-deep">
                <Mail className="size-[18px]" strokeWidth={1.5} />
                {c.button}
              </a>
            </div>
            <dl className="flex flex-col gap-6 font-serif text-[18px] text-body">
              <ContactRow label={c.addressLabel} Icon={MapPin}>
                <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">
                  {c.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </ContactRow>
              <ContactRow label={c.emailLabel} Icon={Mail}>
                <a href={`mailto:${CONTACT_EMAIL}`} className="break-all transition-colors hover:text-brand">
                  {CONTACT_EMAIL}
                </a>
              </ContactRow>
              <ContactRow label={c.phoneLabel} Icon={Phone}>
                <a href={PHONE_HREF} className="transition-colors hover:text-brand">
                  {PHONE_DISPLAY}
                </a>
              </ContactRow>
            </dl>
          </RiseIn>
        </Container>
      </main>

      <SiteFooter locale="pt" />
      <WhatsAppFloat locale="pt" />
    </div>
  );
}

function ContactRow({ label, Icon, children }: { label: string; Icon: typeof Mail; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sand/70 bg-white text-brand">
        <Icon className="size-[18px]" strokeWidth={1.4} />
      </span>
      <div>
        <dt className="font-ui text-[12px] font-medium tracking-[0.2em] text-ink uppercase">{label}</dt>
        <dd className="mt-1">{children}</dd>
      </div>
    </div>
  );
}
