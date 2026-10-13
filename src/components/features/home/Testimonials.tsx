import { RatingStars } from "@/components/ui/rating/RatingStars";

const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    quote:
      "SixTeal has completely changed the way I shop. The quality, curation, and overall experience is just amazing.",
  },
  {
    name: "Priya Sharma",
    quote:
      "Beautiful products and even better service. I love how SixTeal brings together everything I care about in one place.",
  },
  {
    name: "Karan Verma",
    quote:
      "From tech to wellness, everything feels thoughtfully curated. SixTeal is now my go-to lifestyle store.",
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function Testimonials() {
  return (
    <section className="home-section">
      <div className="home-rail__header">
        <div>
          <h2 className="home-section__title">What Our Customers Say</h2>
          <p className="home-section__subtitle">
            Real stories from our growing community
          </p>
        </div>
      </div>
      <div className="testimonials">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="testimonial-card">
            <RatingStars average={5} />
            <blockquote className="testimonial-card__quote">
              “{t.quote}”
            </blockquote>
            <figcaption className="testimonial-card__author">
              <span className="testimonial-card__avatar" aria-hidden="true">
                {initials(t.name)}
              </span>
              {t.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
