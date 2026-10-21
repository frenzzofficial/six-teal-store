import type { Metadata } from "next";
import { ContentHero } from "@/components/features/content/ContentHero";
import { InfoCard } from "@/components/features/content/InfoCard";
import { Icon, Link } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work with Six Teal. See how we work and how to get in touch.",
};

const PERKS = [
  {
    icon: "target",
    title: "Real ownership",
    text: "A small team means your work ships and your ideas get heard.",
  },
  {
    icon: "rocket",
    title: "Room to grow",
    text: "We back people who want to learn new skills and take on more.",
  },
  {
    icon: "heart-pulse",
    title: "Sustainable pace",
    text: "We care about good work done well, not constant firefighting.",
  },
] as const;

export default function CareersPage() {
  const email = appConfig.author.email;

  return (
    <>
      <ContentHero
        eyebrow="Careers"
        title="Help us build a better store."
        lead="We're a small team that cares about craft, clarity and the people we serve."
      />

      <div className="content-page">
        <section className="content-section">
          <h2 className="content-section__title">How we work</h2>
          <p className="content-section__subtitle">
            What it's like to be part of Six Teal.
          </p>
          <div className="content-grid content-grid--3">
            {PERKS.map((p) => (
              <InfoCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2 className="content-section__title">Open roles</h2>
          <p className="content-section__subtitle">
            There are no open positions right now.
          </p>
          <div className="content-card">
            <h3 className="content-card__title">
              Think you'd be a great fit anyway?
            </h3>
            <p className="content-card__text">
              We're always glad to hear from thoughtful people. Send a short
              note about yourself and what you'd like to work on, and we'll keep
              it on file for when something opens up.
            </p>
            <div className="home-hero__actions">
              <Link href={`mailto:${email}`} variant="primary-button">
                Email us
                <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/about" variant="secondary-button">
                About Six Teal
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
