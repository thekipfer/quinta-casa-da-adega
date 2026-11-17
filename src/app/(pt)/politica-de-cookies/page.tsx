import { CookiePolicyPage } from "@/components/legal/CookiePolicyPage";
import { cookiesMetadata } from "@/lib/i18n/cookies";

export const metadata = cookiesMetadata();

export default function PoliticaDeCookies() {
  return <CookiePolicyPage />;
}
