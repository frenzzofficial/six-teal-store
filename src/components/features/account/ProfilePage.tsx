"use client";

import { useLoad } from "@/packages/hooks/useLoad";
import { getAccount } from "@/packages/services/account.services";
import LoadGate from "./LoadGate";
import PreferencesForm from "./PreferencesForm";
import UpdateProfileForm from "./UpdateProfileForm";

const LOAD_ERROR = "Couldn't load your account. Please try again.";

/** /account/profile: personal details and email preferences. */
export function ProfilePage() {
  const { state, reload } = useLoad(getAccount, LOAD_ERROR);

  return (
    <div className="account-page section-bleed__inner">
      <header className="account-page__header">
        <h1 className="account-page__title">Profile</h1>
        <p className="account-page__subtitle">
          Your details and how we get in touch.
        </p>
      </header>

      <LoadGate state={state} onRetry={reload} rows={3}>
        {(account) => (
          <>
            <UpdateProfileForm account={account} />
            <PreferencesForm account={account} />
          </>
        )}
      </LoadGate>
    </div>
  );
}
