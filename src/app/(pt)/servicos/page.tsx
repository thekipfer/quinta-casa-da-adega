import { ServicesPage } from "@/components/servicos/ServicesPage";
import { servicesMetadata } from "@/lib/i18n/servicos";

export const metadata = servicesMetadata("pt");

export default function Servicos() {
  return <ServicesPage locale="pt" />;
}
