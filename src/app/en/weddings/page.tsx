import { WeddingsPage } from "@/components/weddings/WeddingsPage";
import { weddingsMetadata } from "@/lib/weddings";

export const metadata = weddingsMetadata("en");

export default function WeddingsRoute() {
  return <WeddingsPage locale="en" />;
}
