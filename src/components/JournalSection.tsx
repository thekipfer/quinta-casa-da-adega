import Image from "next/image";
import { getDictionary, type Locale } from "@/lib/i18n";

/** "Jornal da Quinta" — two latest blog posts, framed by white hairlines top and bottom. */
export function JournalSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).journal;

  return (
    <section className="px-6 pb-[99px] desk:px-0 desk:pb-[110px]">
      <div className="mx-auto max-w-[1100px] border-y border-white pt-20 pb-[34px] desk:pt-[90px]">
        <h2 className="text-center font-display text-[48px] leading-[50px] font-normal text-white uppercase desk:text-[62px] desk:leading-[68px]">
          {t.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-[62px] grid grid-cols-1 gap-y-[60px] desk:mt-[29px] md:grid-cols-2 md:gap-x-10">
          {t.posts.map((post) => (
            <article key={post.href}>
              <a href={post.href} className="block">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1025px) 530px, (min-width: 768px) 50vw, 100vw"
                  className="block aspect-[530/353] h-auto w-full object-cover"
                />
              </a>
              <div className="mt-[21px] font-serif text-[18px] leading-[28px] text-white">
                <a href={post.dateHref} className="transition-colors duration-300 ease-out hover:text-[#3c3c3c]">
                  {post.date}
                </a>
                <span className="mx-[6px]">/</span>
                <a href={post.categoryHref} className="transition-colors duration-300 ease-out hover:text-[#3c3c3c]">
                  {post.category}
                </a>
              </div>
              <h4 className="mt-[9px]">
                <a
                  href={post.href}
                  className="font-display text-[32px] leading-[23px] font-normal tracking-[-1.28px] text-white transition-colors duration-300 ease-out"
                >
                  {post.title}
                </a>
              </h4>
              <p className="mt-[18px] font-serif text-[18px] leading-[28px] text-white">{post.excerpt}</p>
              <a href={post.href} className="qcda-textual mt-[49px] text-white">
                <span>{t.readMore}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
