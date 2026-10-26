interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

const PageHeader = ({ title, description, actions }: PageHeaderProps) => (
  <header className="dash-page-header">
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    {actions ? (
      <div className="dash-page-header__actions">{actions}</div>
    ) : null}
  </header>
);

export default PageHeader;
