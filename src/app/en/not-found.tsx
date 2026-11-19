import { NotFoundView } from "@/components/NotFoundView";

// Rendered when an English route calls notFound() (e.g. an unknown /en/services/<slug>).
export default function NotFound() {
  return <NotFoundView locale="en" />;
}
