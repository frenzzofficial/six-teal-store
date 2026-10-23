import { Icon, type IconName, Link } from "@/components/ui";
import { AnimatedText } from "@/components/ui/animations/AnimatedText";

const POINTS = [
  { icon: "sparkles", label: "Better Mind" },
  { icon: "heart-pulse", label: "Stronger You" },
  { icon: "sparkles", label: "Happier Days" },
];

export function WellnessBanner() {
  return (
    <section className="wellness-banner">
      <div className="wellness-banner__inner section-bleed__inner">
        <div className="wellness-banner__content">
          <p className="wellness-banner__eyebrow">A more mindful tomorrow</p>
          <h2 className="wellness-banner__title">
            <AnimatedText preset={"scaleBounceWords"}>
              Live Better Every Day
            </AnimatedText>
          </h2>
          <p className="wellness-banner__description">
            Curated essentials for a healthier, happier, and more inspired you.
          </p>
          <Link href="/products?category=wellness" variant="primary-button">
            Shop Wellness
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
        <ul className="wellness-banner__points">
          {POINTS.map((point) => (
            <li key={point.label} className="wellness-banner__point">
              <Icon name={point.icon as IconName} />
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
