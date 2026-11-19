import { ThankYouPage } from "@/components/obrigado/ThankYouPage";
import { thankYouMetadata } from "@/lib/i18n/obrigado";

export const metadata = thankYouMetadata("en");

export default function ThankYou() {
  return <ThankYouPage locale="en" />;
}
