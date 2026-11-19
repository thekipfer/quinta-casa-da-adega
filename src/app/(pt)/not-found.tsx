import { NotFoundView } from "@/components/NotFoundView";

// Rendered when a Portuguese route calls notFound() (e.g. an unknown /servicos/<slug>).
export default function NotFound() {
  return <NotFoundView locale="pt" />;
}
