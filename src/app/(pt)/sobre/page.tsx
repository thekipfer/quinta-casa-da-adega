import { AboutPage } from "@/components/about/AboutPage";
import { aboutMetadata } from "@/lib/i18n/about";

export const metadata = aboutMetadata("pt");

export default function SobrePage() {
  return <AboutPage locale="pt" />;
}
