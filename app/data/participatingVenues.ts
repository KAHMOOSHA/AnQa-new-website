import { italianVenues } from "./italianVenues";
import { internationalVenues } from "./internationalVenues";

export type ParticipatingVenue = {
  id: string;
  name: string | null;
  country: string;
  region: string | null;
  province: string | null;
  municipality: string | null;
  address?: string | null;
};

export const participatingVenues: readonly ParticipatingVenue[] = [
  ...italianVenues,
  ...internationalVenues,
];
