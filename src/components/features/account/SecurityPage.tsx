"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useLoad } from "@/packages/hooks/useLoad";
import { getActivity, getSessions } from "@/packages/services/session.services";
import AccountSection from "./AccountSection";
import ActivityList from "./ActivityList";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";
import DevicesList from "./DevicesList";
import LoadGate from "./LoadGate";

/** /account/security: sign-in details, devices, recent activity and account deletion. */
export function SecurityPage() {
  const { user } = useAuth();
  // Accounts created through Google have no password until they set one.
  const hasPassword = user?.hasPassword !== false;

  const sessions = useLoad(
    getSessions,
    "Your devices couldn't be loaded right now.",
  );
  const activity = useLoad(
    getActivity,
    "Your activity couldn't be loaded right now.",
  );

  // A password change or a sign-out changes both lists: the other sessions are gone, and the
  // event is in the activity log.
  const reloadLists = () => {
    sessions.reload();
    activity.reload();
  };

  return (
    <div className="account-page section-bleed__inner">
      <header className="account-page__header">
        <h1 className="account-page__title">Security</h1>
        <p className="account-page__subtitle">
          How you sign in, and where you are signed in.
        </p>
      </header>

      <ChangePasswordForm hasPassword={hasPassword} onChanged={reloadLists} />
      <ChangeEmailForm hasPassword={hasPassword} />

      <AccountSection
        title="Signed-in devices"
        description="Sign out of any device you don't recognise."
      >
        <LoadGate state={sessions.state} onRetry={sessions.reload}>
          {(list) => <DevicesList sessions={list} onChanged={reloadLists} />}
        </LoadGate>
      </AccountSection>

      <AccountSection
        title="Recent activity"
        description="The latest security events on your account."
      >
        <LoadGate state={activity.state} onRetry={activity.reload} rows={3}>
          {(list) => <ActivityList activity={list} />}
        </LoadGate>
      </AccountSection>

      <DeleteAccountForm hasPassword={hasPassword} />
    </div>
  );
}
