import { HomePage } from "@/components/HomePage";
import { homeMetadata } from "@/lib/i18n";

export const metadata = homeMetadata("pt");

export default function Home() {
  return <HomePage locale="pt" />;
}
