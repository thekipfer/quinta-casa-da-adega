import { PrivacyPage } from "@/components/privacidade/PrivacyPage";
import { privacyMetadata } from "@/lib/i18n/privacidade";

export const metadata = privacyMetadata();

export default function PoliticaDePrivacidade() {
  return <PrivacyPage />;
}
