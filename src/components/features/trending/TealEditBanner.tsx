import { Icon, Link } from "@/components/ui";

export function TealEditBanner() {
  return (
    <section className="teal-edit">
      <div className="teal-edit__inner section-bleed__inner">
        <div className="teal-edit__icons" aria-hidden="true">
          <Icon name="shirt" />
          <Icon name="headset" />
          <Icon name="sparkles" />
        </div>
        <p className="teal-edit__label">Style</p>
        <h2 className="teal-edit__title">The Teal Edit</h2>
        <p className="teal-edit__subtitle">Styles making the biggest wave.</p>
        <p className="teal-edit__description">
          A curated selection of trending fashion, tech, and lifestyle picks —
          all in one place.
        </p>
        <Link href="/products" variant="primary-button">
          Shop the Edit
          <Icon name="arrow-right" size={18} />
        </Link>
        <p className="teal-edit__social-proof">
          10K+ people are loving this edit
        </p>
      </div>
    </section>
  );
}
