import { Icon, type IconName } from "@/components/ui";

type InfoCardProps = {
  icon: IconName;
  title: string;
  text: string;
};

export function InfoCard({ icon, title, text }: InfoCardProps) {
  return (
    <div className="content-card">
      <span className="content-card__icon">
        <Icon name={icon} size={20} />
      </span>
      <h3 className="content-card__title">{title}</h3>
      <p className="content-card__text">{text}</p>
    </div>
  );
}
