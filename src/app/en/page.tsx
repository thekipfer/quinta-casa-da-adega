import { HomePage } from "@/components/HomePage";
import { homeMetadata } from "@/lib/i18n";

export const metadata = homeMetadata("en");

export default function EnglishHome() {
  return <HomePage locale="en" />;
}
