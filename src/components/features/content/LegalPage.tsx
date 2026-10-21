import type { ReactNode } from "react";
import { ContentHero } from "./ContentHero";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
};

/** Long-form legal layout: sticky table of contents + numbered sections. */
export function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <>
      <ContentHero eyebrow={eyebrow} title={title} lead={lead} />
      <div className="content-page">
        <div className="legal-layout">
          <nav className="legal-toc" aria-label="On this page">
            <p className="legal-toc__title">On this page</p>
            <ol>
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    {i + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="legal-prose">
            <p className="legal-meta">Last updated: {updated}</p>
            {sections.map((section, i) => (
              <section key={section.id} id={section.id}>
                <h2>
                  {i + 1}. {section.title}
                </h2>
                {section.body}
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
