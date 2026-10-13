"use client";

import { MapPin } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { ParticipatingVenue } from "../data/participatingVenues";
import styles from "./VenuesSection.module.css";

export type VenueRegion = {
  id: string;
  title: string;
  detail: string;
  venues: readonly ParticipatingVenue[];
};

export type VenueCountry = {
  id: string;
  title: string;
  detail: string;
  venues?: readonly ParticipatingVenue[];
  regions?: readonly VenueRegion[];
};

type VenuesAccordionProps = {
  italy: VenueCountry;
  countries: readonly VenueCountry[];
  cityPending: string;
  venuePending: string;
  detailLabels: VenueDetailLabels;
};

export type VenueDetailLabels = {
  time: string;
  organizer: string;
  credits: string;
  notes: string;
};

function groupBy<T>(items: readonly T[], key: (item: T) => string) {
  return items.reduce<Map<string, T[]>>((groups, item) => {
    const groupKey = key(item);
    groups.set(groupKey, [...(groups.get(groupKey) ?? []), item]);
    return groups;
  }, new Map());
}

function AccordionToggle({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <summary>
      <span className={styles.summaryCopy}>
        <strong>{title}</strong>
        <small>{detail}</small>
      </span>
      <span className={styles.arrow} aria-hidden="true" />
    </summary>
  );
}

function LazyAccordionItem({
  className,
  children,
  summary,
}: {
  className: string;
  children: ReactNode;
  summary: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className={className}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      {summary}
      {isOpen ? children : null}
    </details>
  );
}

function VenueList({
  venues,
  cityPending,
  venuePending,
  detailLabels,
}: {
  venues: readonly ParticipatingVenue[];
  cityPending: string;
  venuePending: string;
  detailLabels: VenueDetailLabels;
}) {
  const cities = groupBy(
    venues,
    (venue) => {
      const city = venue.municipality ?? venue.province ?? cityPending;
      return venue.country !== "Italia" && venue.region
        ? `${city} (${venue.region})`
        : city;
    },
  );

  return (
    <div className={styles.cityList}>
      {[...cities].map(([city, cityVenues]) => (
        <section className={styles.city} key={city}>
          <p className={styles.cityName}>
            <MapPin aria-hidden="true" />
            {city}
          </p>
          <ul>
            {cityVenues.map((venue) => (
              <li
                className={!venue.name ? styles.pending : undefined}
                key={venue.id}
              >
                <span dir="auto">{venue.name ?? venuePending}</span>
                {venue.address && (
                  <span className={styles.address} dir="auto">{venue.address}</span>
                )}
                {(venue.time || venue.organizer || venue.credits || venue.notes) && (
                  <dl className={styles.venueDetails}>
                    {venue.time && (
                      <div>
                        <dt>{detailLabels.time}</dt>
                        <dd>
                          <bdi dir="ltr">
                            <time dateTime={venue.time}>{venue.time}</time>
                            {venue.endTime && (
                              <> – <time dateTime={venue.endTime}>{venue.endTime}</time></>
                            )}
                          </bdi>
                        </dd>
                      </div>
                    )}
                    {venue.organizer && (
                      <div>
                        <dt>{detailLabels.organizer}</dt>
                        <dd><bdi>{venue.organizer}</bdi></dd>
                      </div>
                    )}
                    {venue.credits && (
                      <div>
                        <dt>{detailLabels.credits}</dt>
                        <dd><bdi>{venue.credits}</bdi></dd>
                      </div>
                    )}
                    {venue.notes && (
                      <div>
                        <dt>{detailLabels.notes}</dt>
                        <dd><bdi>{venue.notes}</bdi></dd>
                      </div>
                    )}
                  </dl>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function CountryAccordion({
  country,
  cityPending,
  venuePending,
  detailLabels,
}: {
  country: VenueCountry;
  cityPending: string;
  venuePending: string;
  detailLabels: VenueDetailLabels;
}) {
  return (
    <LazyAccordionItem
      className={styles.country}
      summary={<AccordionToggle title={country.title} detail={country.detail} />}
    >
      <div className={styles.countryContent}>
        {country.regions ? (
          <div className={styles.regionList}>
            {country.regions.map((region) => (
              <LazyAccordionItem
                className={styles.region}
                key={region.id}
                summary={
                  <AccordionToggle title={region.title} detail={region.detail} />
                }
              >
                <VenueList
                  venues={region.venues}
                  cityPending={cityPending}
                  venuePending={venuePending}
                  detailLabels={detailLabels}
                />
              </LazyAccordionItem>
            ))}
          </div>
        ) : (
          <VenueList
            venues={country.venues ?? []}
            cityPending={cityPending}
            venuePending={venuePending}
            detailLabels={detailLabels}
          />
        )}
      </div>
    </LazyAccordionItem>
  );
}

export function VenuesAccordion({
  italy,
  countries,
  cityPending,
  venuePending,
  detailLabels,
}: VenuesAccordionProps) {
  return (
    <div className={styles.accordion}>
      <CountryAccordion
        country={italy}
        cityPending={cityPending}
        venuePending={venuePending}
        detailLabels={detailLabels}
      />
      {countries.map((country) => (
        <CountryAccordion
          country={country}
          cityPending={cityPending}
          key={country.id}
          venuePending={venuePending}
          detailLabels={detailLabels}
        />
      ))}
    </div>
  );
}
