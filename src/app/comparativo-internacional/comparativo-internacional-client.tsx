"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Flag, ExternalLink } from "lucide-react";
import type { PaisComparativo } from "@/data/international-comparison";
import { cn } from "@/lib/utils";

interface Props {
  paises: PaisComparativo[];
}

type SortOption = "alfabetica" | "salario-maior" | "salario-menor";

function formatCurrency(simbolo: string, value: number): string {
  return `${simbolo} ${value.toLocaleString("pt-BR")}`;
}

function PaisCard({ pais, featured = false }: { pais: PaisComparativo; featured?: boolean }) {
  const ratio = pais.salarioMinimoNacional > 0 
    ? (pais.salarioMinimo / pais.salarioMinimoNacional).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : "N/A";

  if (featured) {
    const aboveTeto = pais.salarioMedio 
      ? pais.salarioMedio - pais.salarioMaximo 
      : 0;
    const aboveTetoPercent = pais.salarioMedio && pais.salarioMaximo > 0 
      ? ((pais.salarioMedio - pais.salarioMaximo) / pais.salarioMaximo * 100).toFixed(0)
      : "0";
    const ratio = pais.salarioMedio && pais.salarioMinimoNacional > 0 
      ? (pais.salarioMedio / pais.salarioMinimoNacional).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : "N/A";
    const tetoRatio = pais.salarioMaximo && pais.salarioMinimoNacional > 0 
      ? (pais.salarioMaximo / pais.salarioMinimoNacional).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : "N/A";

    return (
      <div
        className="group rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Flag className="h-5 w-5 text-green-600" />
            <h3 className="font-serif text-xl font-semibold text-navy">
              {pais.pais}
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Teto Constitucional</p>
            <div className="flex items-center gap-3">
              <p className="text-lg font-bold text-navy">
                {formatCurrency(pais.simboloMoeda, pais.salarioMaximo)}
              </p>
              <span className="rounded-full bg-amber/10 px-2 py-0.5 text-sm font-bold text-amber">
                {tetoRatio}x
              </span>
            </div>
          </div>

          {pais.salarioMedio && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">Média Real Paga</p>
                  <p className="text-2xl font-bold text-red-700">
                    {formatCurrency(pais.simboloMoeda, pais.salarioMedio)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-red-600">
                    ▲ {formatCurrency(pais.simboloMoeda, aboveTeto)} acima do teto
                  </p>
                  <p className="text-lg font-bold text-red-700">+{aboveTetoPercent}%</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-red-200 pt-3">
                <span className="text-sm text-red-600">
                  Salário Mínimo: {formatCurrency(pais.simboloMoeda, pais.salarioMinimoNacional)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-sm font-bold text-red-700">
                  {ratio}x
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[140px_1fr_auto] items-center gap-4 rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="font-serif font-semibold text-navy">
        {pais.pais}
      </h3>
      <div className="flex flex-col text-sm">
        <span className="font-medium text-navy">
          {formatCurrency(pais.simboloMoeda, pais.salarioMinimo)} - {formatCurrency(pais.simboloMoeda, pais.salarioMaximo)}
        </span>
        <span className="text-xs text-gray-400">
          Salário Mínimo: {formatCurrency(pais.simboloMoeda, pais.salarioMinimoNacional)}
        </span>
      </div>
      <span className="rounded-lg bg-amber/10 px-2 py-1 text-sm font-bold text-amber">
        {ratio}x
      </span>
    </div>
  );
}

export function ComparativoInternacionalClient({ paises }: Props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("alfabetica");

  const brasil = paises.find((p) => p.paisSlug === "brasil");
  const outrosPaises = paises.filter((p) => p.paisSlug !== "brasil");

  const filteredOutrosPaises = useMemo(() => {
    let result = outrosPaises;

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter((p) =>
        p.pais.toLowerCase().includes(searchLower)
      );
    }

    switch (sort) {
      case "alfabetica":
        result = [...result].sort((a, b) => a.pais.localeCompare(b.pais, "pt-BR"));
        break;
      case "salario-maior":
        result = [...result].sort((a, b) => b.salarioMaximo - a.salarioMaximo);
        break;
      case "salario-menor":
        result = [...result].sort((a, b) => a.salarioMaximo - b.salarioMaximo);
        break;
    }

    return result;
  }, [outrosPaises, search, sort]);

  const SortButton = ({
    option,
    label,
  }: {
    option: SortOption;
    label: string;
  }) => (
    <button
      onClick={() => setSort(option)}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
        sort === option
          ? "bg-red-primary text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
    >
      {option === "alfabetica" && <ArrowUpDown className="h-3.5 w-3.5" />}
      {option === "salario-maior" && <ArrowUp className="h-3.5 w-3.5" />}
      {option === "salario-menor" && <ArrowDown className="h-3.5 w-3.5" />}
      {label}
    </button>
  );

  return (
    <div className="space-y-8">
      {brasil && (
        <section>
          <h2 className="mb-4 font-serif text-xl font-semibold text-navy">
            Referência
          </h2>
          <PaisCard pais={brasil} featured />
        </section>
      )}

      <section>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-xl font-semibold text-navy">
            Outros Países
          </h2>
          <div className="flex gap-2">
            <SortButton option="alfabetica" label="A-Z" />
            <SortButton option="salario-maior" label="Maior" />
            <SortButton option="salario-menor" label="Menor" />
          </div>
        </div>

        <div className="relative mb-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-red-primary focus:ring-1 focus:ring-red-primary"
          />
        </div>

        <div className="space-y-3">
          {filteredOutrosPaises.map((pais) => (
            <PaisCard key={pais.id} pais={pais} />
          ))}
        </div>

        {filteredOutrosPaises.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">Nenhum país encontrado.</p>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-3 font-serif text-sm font-semibold text-navy">Fontes</h3>
          <ul className="space-y-1 text-sm">
            {paises.map((pais) => (
              <li key={pais.id} className="flex items-center gap-2">
                <span className="font-medium text-navy">{pais.pais}:</span>
                <a
                  href={pais.fonteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-red-primary hover:underline"
                >
                  {pais.fonte}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
