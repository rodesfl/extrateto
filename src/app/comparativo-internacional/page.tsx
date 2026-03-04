import { getPaisesComparativo } from "@/data/international-comparison";
import { ComparativoInternacionalClient } from "./comparativo-internacional-client";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Comparativo Internacional | ExtraTeto",
  description:
    "Compare salários de juízes brasileiros com outros países.",
};

export default function ComparativoInternacionalPage() {
  const paises = getPaisesComparativo();

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
              Comparativo Internacional
            </h1>
            <p className="mt-2 text-gray-600">
              Salários de juízes em diferentes países (em moeda local)
            </p>
          </header>

          <ComparativoInternacionalClient paises={paises} />

          <Footer />
        </div>
      </div>
    </main>
  );
}
