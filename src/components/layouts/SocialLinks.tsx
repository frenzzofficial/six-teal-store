import appConfig from "@/packages/configs/app.config";
import Icon, { type IconName } from "../ui/icon/IconsLibrary";

const SOCIALS: { key: "instagram" | "twitter" | "linkedin"; icon: IconName }[] =
  [
    { key: "instagram", icon: "instagram" },
    { key: "twitter", icon: "twitter" },
    { key: "linkedin", icon: "linkedin" },
  ];

/** Social profile icons — URLs come from the NEXT_PUBLIC_* env config. */
const SocialLinks = () => (
  <ul className="social-links" aria-label="Follow us">
    {SOCIALS.map(({ key, icon }) => {
      const { name, handle } = appConfig.social[key];
      if (!handle) return null;
      return (
        <li key={key}>
          <a
            href={handle}
            className="social-links__item"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${appConfig.site.name} on ${name}`}
          >
            <Icon name={icon} size={18} />
          </a>
        </li>
      );
    })}
  </ul>
);

export default SocialLinks;
