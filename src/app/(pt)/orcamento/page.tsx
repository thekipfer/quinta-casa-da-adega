import { OrcamentoPage } from "@/components/orcamento/OrcamentoPage";
import { orcamentoMetadata } from "@/lib/i18n/orcamento";

export const metadata = orcamentoMetadata("pt");

export default function Orcamento() {
  return <OrcamentoPage locale="pt" />;
}
