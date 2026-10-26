import { Icon } from "@/components/ui";
import { eventLabel } from "@/packages/utils/account-format";
import { cn } from "@/packages/utils/cn";
import { formatRelativeTime } from "@/packages/utils/date";
import type { ActivityEntry } from "@/types/account";

/** The latest security events on the account, newest first. */
const ActivityList = ({ activity }: { activity: ActivityEntry[] }) => {
  if (activity.length === 0) {
    return <p className="account-section__note">Nothing to show yet.</p>;
  }

  return (
    <ol className="account-list">
      {activity.map((entry) => {
        const failed = entry.outcome === "FAILURE";
        return (
          <li key={entry.id} className="account-list__item">
            <span
              className={cn(
                "account-list__icon",
                failed && "account-list__icon--failed",
              )}
              aria-hidden="true"
            >
              <Icon name={failed ? "flag" : "shield"} size={18} />
            </span>
            <div className="account-list__text">
              <strong>{eventLabel(entry.event)}</strong>
              <span>
                {formatRelativeTime(entry.createdAt)}
                {entry.deviceName ? ` · ${entry.deviceName}` : ""}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default ActivityList;
