"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  DEV_AUTH_ENABLED,
  DEV_PERSONAS,
  type DevPersonaId,
} from "@/packages/configs/dev-auth.config";
import { safeRedirectPath } from "@/packages/utils/safe-redirect";

/**
 * Development-only quick sign-in: pick a sample owner, staff member or customer and go.
 * Renders nothing in a production build or when NEXT_PUBLIC_DEV_AUTH=false.
 */
const DevSignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { devSignInAs } = useAuth();

  if (!DEV_AUTH_ENABLED || !devSignInAs) return null;

  const next = searchParams.get("next");

  const pick = (id: DevPersonaId) => {
    const persona = devSignInAs(id);
    router.replace(next ? safeRedirectPath(next) : persona.home);
  };

  return (
    <section className="dev-signin" aria-label="Development sign-in">
      <p className="dev-signin__title">
        <span className="dev-signin__tag">Dev</span>
        Sign in as a sample user
      </p>
      <div className="dev-signin__list">
        {DEV_PERSONAS.map((persona) => (
          <button
            key={persona.id}
            type="button"
            className="dev-signin__option"
            onClick={() => pick(persona.id)}
          >
            <strong>{persona.label}</strong>
            <span>{persona.description}</span>
          </button>
        ))}
      </div>
      <p className="dev-signin__note">
        Only available while developing. No backend needed.
      </p>
    </section>
  );
};

export default DevSignIn;
