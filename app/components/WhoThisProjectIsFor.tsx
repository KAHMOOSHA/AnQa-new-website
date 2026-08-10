import { AudienceCredits } from "./AudienceCredits";
import styles from "./WhoThisProjectIsFor.module.css";

const projectAudiences = [
  "Theatrical institutions",
  "Associations",
  "Schools",
  "Bookstores",
  "Collectives",
  "Clubs",
] as const;

export function WhoThisProjectIsFor() {
  return (
    <section
      className={styles.section}
      aria-labelledby="project-audience-heading"
    >
      <h2 id="project-audience-heading">Who this project is for</h2>

      <AudienceCredits items={projectAudiences} />

      <p className={styles.sustainabilityNote}>
        The proposal has been designed to ensure{" "}
        <strong>maximum production sustainability</strong>, requiring minimal
        technical setups: the staging can be achieved even through a simple
        reading of the texts.
      </p>
    </section>
  );
}
