import { ThankYouPage } from "@/components/obrigado/ThankYouPage";
import { thankYouMetadata } from "@/lib/i18n/obrigado";

export const metadata = thankYouMetadata("pt");

export default function Obrigado() {
  return <ThankYouPage locale="pt" />;
}
