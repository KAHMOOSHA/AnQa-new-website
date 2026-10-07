import { italianVenues } from "./italianVenues";

export type ParticipatingVenue = {
  id: string;
  name: string | null;
  country: string;
  region: string | null;
  province: string | null;
  municipality: string | null;
  address?: string | null;
};

const internationalVenues: readonly ParticipatingVenue[] = [
  { id: "france-1", name: "Ensemble Nomade", country: "Francia", region: null, province: "St. Etienne", municipality: "St. Etienne" },
  { id: "cyprus-1", name: "Tyatro Kira", country: "Cipro", region: null, province: "Nicosia", municipality: "Nicosia" },
  { id: "ireland-1", name: "IPSC Inishowen Branch", country: "Irlanda", region: null, province: "Donegal", municipality: "Donegal" },
  { id: "greece-1", name: "Apo Koinou", country: "Grecia", region: null, province: "Atene", municipality: "Atene" },
  { id: "spain-1", name: "Sala Negra", country: "Spagna", region: null, province: "Logroño", municipality: "Logroño" },
  { id: "chile-1", name: null, country: "Cile", region: null, province: null, municipality: null },
  { id: "mexico-1", name: null, country: "Messico", region: null, province: "Ciudad de Mexico", municipality: "Col San Pedro de los Pinos" },
  { id: "switzerland-1", name: "Teatro Paravento", country: "Svizzera", region: null, province: null, municipality: "Locarno" },
];

export const participatingVenues: readonly ParticipatingVenue[] = [
  ...italianVenues,
  ...internationalVenues,
];
