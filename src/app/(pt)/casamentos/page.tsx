import { WeddingsPage } from "@/components/weddings/WeddingsPage";
import { weddingsMetadata } from "@/lib/weddings";

export const metadata = weddingsMetadata("pt");

export default function CasamentosPage() {
  return <WeddingsPage locale="pt" />;
}
