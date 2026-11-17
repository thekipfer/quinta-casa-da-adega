import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeddingPage } from "@/components/weddings/WeddingPage";
import { getWedding, weddingMetadata, weddingSlugs } from "@/lib/weddings";

type Props = { params: Promise<{ slug: string }> };

// Every wedding is known at build time; unknown slugs 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return weddingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wedding = getWedding("pt", (await params).slug);
  return wedding ? weddingMetadata("pt", wedding) : {};
}

export default async function CasamentoPage({ params }: Props) {
  const wedding = getWedding("pt", (await params).slug);
  if (!wedding) notFound();
  return <WeddingPage locale="pt" wedding={wedding} />;
}
