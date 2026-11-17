import { AboutPage } from "@/components/about/AboutPage";
import { aboutMetadata } from "@/lib/i18n/about";

export const metadata = aboutMetadata("en");

export default function AboutRoute() {
  return <AboutPage locale="en" />;
}
