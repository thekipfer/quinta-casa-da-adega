import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeddingPage } from "@/components/weddings/WeddingPage";
import { getWedding, weddingMetadata, weddingSlugs } from "@/lib/weddings";

type Props = { params: Promise<{ slug: string }> };

// Same slugs as /casamentos/<slug>; unknown slugs 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return weddingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wedding = getWedding("en", (await params).slug);
  return wedding ? weddingMetadata("en", wedding) : {};
}

export default async function WeddingRoute({ params }: Props) {
  const wedding = getWedding("en", (await params).slug);
  if (!wedding) notFound();
  return <WeddingPage locale="en" wedding={wedding} />;
}
