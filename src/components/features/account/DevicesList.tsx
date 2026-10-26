"use client";

import { useState } from "react";
import { Button, Icon } from "@/components/ui";
import {
  revokeOtherSessions,
  revokeSession,
} from "@/packages/services/session.services";
import { deviceTitle } from "@/packages/utils/account-format";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";
import { formatRelativeTime } from "@/packages/utils/date";
import type { DeviceSession } from "@/types/account";

interface DevicesListProps {
  sessions: DeviceSession[];
  /** Called after a device was signed out, so the page can reload this list and the activity. */
  onChanged: () => void;
}

const OTHERS = "others";

/** Where the user is signed in, with a way to end any session other than this one. */
const DevicesList = ({ sessions, onChanged }: DevicesListProps) => {
  // The id being signed out, or OTHERS while "sign out all other devices" is running.
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const others = sessions.filter((session) => !session.current);

  const run = async (target: string, action: () => Promise<unknown>) => {
    setBusy(target);
    setError(null);
    try {
      await action();
      onChanged();
    } catch (err: unknown) {
      setError(
        getAuthErrorMessage(err, "Couldn't sign that device out. Try again."),
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <ul className="account-list">
        {sessions.map((session) => (
          <li key={session.id} className="account-list__item">
            <span className="account-list__icon" aria-hidden="true">
              <Icon name="monitor" size={18} />
            </span>
            <div className="account-list__text">
              <strong>{deviceTitle(session)}</strong>
              <span>
                {session.current
                  ? "This device"
                  : `Active ${formatRelativeTime(session.lastSeenAt)}`}
              </span>
            </div>
            {session.current ? (
              <span className="account-badge">Current</span>
            ) : (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={busy !== null}
                onClick={() => run(session.id, () => revokeSession(session.id))}
              >
                {busy === session.id ? "Signing out…" : "Sign out"}
              </Button>
            )}
          </li>
        ))}
      </ul>

      {error && (
        <p role="alert" className="auth-alert">
          {error}
        </p>
      )}

      {others.length > 1 && (
        <div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={busy !== null}
            onClick={() => run(OTHERS, revokeOtherSessions)}
          >
            {busy === OTHERS ? "Signing out…" : "Sign out all other devices"}
          </Button>
        </div>
      )}
    </>
  );
};

export default DevicesList;
