import { Icon, type IconName } from "@/components/ui";

const BADGES = [
  { icon: "truck", title: "Free Shipping", subtitle: "On orders above ₹999" },
  {
    icon: "lock",
    title: "Secure Payments",
    subtitle: "100% safe & secure",
  },
  {
    icon: "rotate-ccw",
    title: "Easy Returns",
    subtitle: "7-day return policy",
  },
  {
    icon: "headset",
    title: "Premium Support",
    subtitle: "We're here to help",
  },
];

export function TrustBadgeRow() {
  return (
    <ul className="trust-badges">
      {BADGES.map((b) => (
        <li key={b.title} className="trust-badges__item">
          <Icon name={b.icon as IconName} className="trust-badges__icon" />
          <div>
            <p className="trust-badges__title">{b.title}</p>
            <p className="trust-badges__subtitle">{b.subtitle}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
