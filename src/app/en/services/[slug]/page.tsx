import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/servicos/ServiceDetailPage";
import { getService, serviceMetadata, serviceSlugs } from "@/lib/i18n/servicos";

type Props = { params: Promise<{ slug: string }> };

/** Same slugs as /servicos/<slug>; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService("en", (await params).slug);
  return service ? serviceMetadata("en", service) : {};
}

export default async function ServiceRoute({ params }: Props) {
  const service = getService("en", (await params).slug);
  if (!service) notFound();
  return <ServiceDetailPage locale="en" service={service} />;
}
