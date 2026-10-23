"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Icon, type IconName } from "@/components/ui";
import {
  getOAuthProviders,
  startOAuthSignIn,
} from "@/packages/services/auth.services";
import type { AuthProviderInfo } from "@/types/auth";

const ICONS: Record<string, IconName> = {
  google: "google",
  discord: "discord",
};

/**
 * Drop into an AuthForm's `footer` slot. The buttons are not hard-coded: the backend lists the
 * sign-in methods it has switched on (GET /v1/auth/providers), so a disabled or not-yet-built
 * method simply never appears. Clicking one navigates the browser to the backend, which takes
 * it through the provider and back to `/auth/callback` (see OAuthCallback).
 */
const SocialSignIn = () => {
  const searchParams = useSearchParams();
  const [providers, setProviders] = useState<AuthProviderInfo[]>([]);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getOAuthProviders()
      .then((list) => {
        if (!cancelled) setProviders(list);
      })
      // No buttons is a safe fallback: email sign-in still works.
      .catch(() => {
        if (!cancelled) setProviders([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (providers.length === 0) return null;

  const handleClick = (provider: AuthProviderInfo) => {
    setFailed(false);
    setPendingId(provider.id);
    try {
      // The browser navigates away; this component goes with it.
      startOAuthSignIn(provider, searchParams.get("next"));
    } catch {
      setFailed(true);
      setPendingId(null);
    }
  };

  return (
    <div className="auth-social">
      <div className="auth-divider">
        <span>or continue with</span>
      </div>

      <div className="auth-social__row">
        {providers.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="secondary"
            size="lg"
            className="auth-social__button"
            disabled={pendingId !== null}
            aria-label={`Continue with ${provider.label}`}
            onClick={() => handleClick(provider)}
          >
            {ICONS[provider.id] && <Icon name={ICONS[provider.id]} size={18} />}
            <span>
              {pendingId === provider.id
                ? "Redirecting…"
                : `Continue with ${provider.label}`}
            </span>
          </Button>
        ))}
      </div>

      {failed && (
        <p role="alert" className="auth-alert">
          Couldn't start that sign-in. Please try again.
        </p>
      )}
    </div>
  );
};

export default SocialSignIn;
