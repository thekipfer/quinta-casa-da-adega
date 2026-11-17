import { ServicesPage } from "@/components/servicos/ServicesPage";
import { servicesMetadata } from "@/lib/i18n/servicos";

export const metadata = servicesMetadata("en");

export default function ServicesRoute() {
  return <ServicesPage locale="en" />;
}
