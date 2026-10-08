import { participatingVenues } from "../data/participatingVenues";
import { VenuesAccordion } from "./VenuesAccordion";
import styles from "./VenuesSection.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

type Copy = {
  title: string;
  listUpdating: string;
  cityPending: string;
  venuePending: string;
  venueCount: (count: number) => string;
};

const copy: Record<Language, Copy> = {
  en: {
    title: "Participating venues",
    listUpdating: "This list is being updated *",
    cityPending: "City to be announced",
    venuePending: "Venue to be announced",
    venueCount: (count) => `${count} ${count === 1 ? "venue" : "venues"}`,
  },
  ar: {
    title: "المساحات المشاركة",
    listUpdating: "* يجري تحديث هذه القائمة",
    cityPending: "سيُعلن عن المدينة قريباً",
    venuePending: "سيُعلن عن المكان قريباً",
    venueCount: (count) => `${count} ${count === 1 ? "مكان" : "أماكن"}`,
  },
  it: {
    title: "Luoghi partecipanti",
 
    listUpdating: "Questo elenco è in fase di aggiornamento *",
    cityPending: "Città da annunciare",
    venuePending: "Sede da annunciare",
    venueCount: (count) => `${count} ${count === 1 ? "sede" : "sedi"}`,
  },
  fr: {
    title: "Lieux participants",
    listUpdating: "Cette liste est en cours de mise à jour *",
    cityPending: "Ville à confirmer",
    venuePending: "Lieu à confirmer",
    venueCount: (count) => `${count} ${count === 1 ? "lieu" : "lieux"}`,
  },
  tr: {
    title: "Katılımcı mekânlar",
    listUpdating: "Bu liste güncellenmektedir *",
    cityPending: "Şehir daha sonra duyurulacak",
    venuePending: "Mekân daha sonra duyurulacak",
    venueCount: (count) => `${count} ${count === 1 ? "mekân" : "mekân"}`,
  },
};

const countryNames: Record<Language, Record<string, string>> = {
  en: {
    "Argentina": "Argentina",
    "Belgio": "Belgium",
    "Colombia": "Colombia",
    "Corea del Sud": "South Korea",
    "Gaza": "Gaza",
    "Giordania": "Jordan",
    "Irlanda del Nord": "Northern Ireland",
    "Nuova Zelanda": "New Zealand",
    "Paesi Bassi": "Netherlands",
    "Palestina": "Palestine",
    "Polonia": "Poland",
    "Portogallo": "Portugal",
    "Regno Unito": "United Kingdom",
    "Sudafrica": "South Africa",
    Italia: "Italy",
    Francia: "France",
    Cipro: "Cyprus",
    Irlanda: "Ireland",
    Grecia: "Greece",
    Spagna: "Spain",
    Cile: "Chile",
    Messico: "Mexico",
    Svizzera: "Switzerland",
  },
  ar: {
    "Argentina": "الأرجنتين",
    "Belgio": "بلجيكا",
    "Colombia": "كولومبيا",
    "Corea del Sud": "كوريا الجنوبية",
    "Gaza": "غزة",
    "Giordania": "الأردن",
    "Irlanda del Nord": "أيرلندا الشمالية",
    "Nuova Zelanda": "نيوزيلندا",
    "Paesi Bassi": "هولندا",
    "Palestina": "فلسطين",
    "Polonia": "بولندا",
    "Portogallo": "البرتغال",
    "Regno Unito": "المملكة المتحدة",
    "Sudafrica": "جنوب أفريقيا",
    Italia: "إيطاليا",
    Francia: "فرنسا",
    Cipro: "قبرص",
    Irlanda: "إيرلندا",
    Grecia: "اليونان",
    Spagna: "إسبانيا",
    Cile: "تشيلي",
    Messico: "المكسيك",
    Svizzera: "سويسرا",
  },
  it: {},
  fr: {
    "Argentina": "Argentine",
    "Belgio": "Belgique",
    "Colombia": "Colombie",
    "Corea del Sud": "Corée du Sud",
    "Gaza": "Gaza",
    "Giordania": "Jordanie",
    "Irlanda del Nord": "Irlande du Nord",
    "Nuova Zelanda": "Nouvelle-Zélande",
    "Paesi Bassi": "Pays-Bas",
    "Palestina": "Palestine",
    "Polonia": "Pologne",
    "Portogallo": "Portugal",
    "Regno Unito": "Royaume-Uni",
    "Sudafrica": "Afrique du Sud",
    Italia: "Italie",
    Francia: "France",
    Cipro: "Chypre",
    Irlanda: "Irlande",
    Grecia: "Grèce",
    Spagna: "Espagne",
    Cile: "Chili",
    Messico: "Mexique",
    Svizzera: "Suisse",
  },
  tr: {
    "Argentina": "Arjantin",
    "Belgio": "Belçika",
    "Colombia": "Kolombiya",
    "Corea del Sud": "Güney Kore",
    "Gaza": "Gazze",
    "Giordania": "Ürdün",
    "Irlanda del Nord": "Kuzey İrlanda",
    "Nuova Zelanda": "Yeni Zelanda",
    "Paesi Bassi": "Hollanda",
    "Palestina": "Filistin",
    "Polonia": "Polonya",
    "Portogallo": "Portekiz",
    "Regno Unito": "Birleşik Krallık",
    "Sudafrica": "Güney Afrika",
    Italia: "İtalya",
    Francia: "Fransa",
    Cipro: "Kıbrıs",
    Irlanda: "İrlanda",
    Grecia: "Yunanistan",
    Spagna: "İspanya",
    Cile: "Şili",
    Messico: "Meksika",
    Svizzera: "İsviçre",
  },
};

function groupBy<T>(items: readonly T[], key: (item: T) => string) {
  return items.reduce<Map<string, T[]>>((groups, item) => {
    const groupKey = key(item);
    groups.set(groupKey, [...(groups.get(groupKey) ?? []), item]);
    return groups;
  }, new Map());
}

export function VenuesSection({ language }: { language: Language }) {
  const t = copy[language];
  const italy = participatingVenues.filter((venue) => venue.country === "Italia");
  const otherCountries = participatingVenues.filter(
    (venue) => venue.country !== "Italia",
  );
  const italianRegions = [...groupBy(italy, (venue) => venue.region ?? t.cityPending)].map(
    ([region, venues]) => ({
      id: `italy-${region}`,
      title: region,
      detail: t.venueCount(venues.length),
      venues,
    }),
  );
  const countries = [...groupBy(otherCountries, (venue) => venue.country)].map(
    ([country, venues]) => ({
      id: country,
      title: countryNames[language][country] ?? country,
      detail: t.venueCount(venues.length),
      venues,
    }),
  );

  return (
    <section className={styles.section} aria-labelledby="venues-title">
      <header className={styles.intro}>
        <h1 id="venues-title">{t.title}</h1>
        <p className={styles.updatingNote}>{`[${t.listUpdating}]`}</p>
      </header>

      <VenuesAccordion
        italy={{
          id: "italy",
          title: countryNames[language].Italia ?? "Italia",
          detail: t.venueCount(italy.length),
          regions: italianRegions,
        }}
        countries={countries}
        cityPending={t.cityPending}
        venuePending={t.venuePending}
      />
    </section>
  );
}
