import { OrcamentoPage } from "@/components/orcamento/OrcamentoPage";
import { orcamentoMetadata } from "@/lib/i18n/orcamento";

export const metadata = orcamentoMetadata("en");

export default function QuoteRoute() {
  return <OrcamentoPage locale="en" />;
}
