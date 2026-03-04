export interface PaisComparativo {
  id: number;
  pais: string;
  paisSlug: string;
  moeda: string;
  simboloMoeda: string;
  salarioMinimo: number;
  salarioMaximo: number;
  salarioMinimoNacional: number;
  salarioMedio?: number;
  fonte: string;
  fonteLink: string;
  anoDados: number;
}

export const mockPaisesComparativo: PaisComparativo[] = [
  {
    id: 1,
    pais: "Brasil",
    paisSlug: "brasil",
    moeda: "BRL",
    simboloMoeda: "R$",
    salarioMinimo: 471516,
    salarioMaximo: 556392,
    salarioMinimoNacional: 16944,
    salarioMedio: 954480,
    fonte: "STF",
    fonteLink: "https://www.stf.jus.br",
    anoDados: 2025,
  },
  {
    id: 2,
    pais: "Estados Unidos",
    paisSlug: "estados-unidos",
    moeda: "USD",
    simboloMoeda: "$",
    salarioMinimo: 217600,
    salarioMaximo: 286500,
    salarioMinimoNacional: 15080,
    fonte: "US Courts",
    fonteLink: "https://www.uscourts.gov",
    anoDados: 2024,
  },
  {
    id: 3,
    pais: "Alemanha",
    paisSlug: "alemanha",
    moeda: "EUR",
    simboloMoeda: "€",
    salarioMinimo: 82500,
    salarioMaximo: 124000,
    salarioMinimoNacional: 24048,
    fonte: "DRiG",
    fonteLink: "https://www.drig.de",
    anoDados: 2024,
  },
  {
    id: 4,
    pais: "França",
    paisSlug: "franca",
    moeda: "EUR",
    simboloMoeda: "€",
    salarioMinimo: 78000,
    salarioMaximo: 108000,
    salarioMinimoNacional: 22008,
    fonte: "Cour de Cassation",
    fonteLink: "https://www.courdecassation.fr",
    anoDados: 2024,
  },
  {
    id: 5,
    pais: "Reino Unido",
    paisSlug: "reino-unido",
    moeda: "GBP",
    simboloMoeda: "£",
    salarioMinimo: 169500,
    salarioMaximo: 272100,
    salarioMinimoNacional: 23304,
    fonte: "UK Judiciary",
    fonteLink: "https://www.judiciary.uk",
    anoDados: 2024,
  },
];

export function getPaisesComparativo(): PaisComparativo[] {
  return mockPaisesComparativo;
}
