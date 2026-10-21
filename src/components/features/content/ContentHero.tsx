type ContentHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
};

/** Tinted page header shared by the about / contact / careers / legal pages. */
export function ContentHero({ eyebrow, title, lead }: ContentHeroProps) {
  return (
    <section className="content-hero">
      <div className="content-hero__inner">
        <p className="content-hero__eyebrow">{eyebrow}</p>
        <h1 className="content-hero__title">{title}</h1>
        <p className="content-hero__lead">{lead}</p>
      </div>
    </section>
  );
}
