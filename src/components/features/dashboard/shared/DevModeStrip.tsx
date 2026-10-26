"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { DEV_PERSONAS } from "@/packages/configs/dev-auth.config";

/**
 * The dark bar above the dashboard while signed in through dev auth. It says the data is
 * sample data and lets you swap between owner, staff and customer without signing out.
 */
const DevModeStrip = () => {
  const { user, devSignInAs } = useAuth();

  if (!devSignInAs || !user?.id.startsWith("dev-")) return null;

  return (
    <div className="dash-devstrip">
      <span>
        <strong>Dev mode</strong> · signed in as {user.fullname} ({user.email})
        · all data is sample data
      </span>
      <span className="dash-devstrip__switch">
        View as
        {DEV_PERSONAS.map((persona) => (
          <button
            key={persona.id}
            type="button"
            aria-pressed={persona.user.id === user.id}
            onClick={() => devSignInAs(persona.id)}
          >
            {persona.label}
          </button>
        ))}
      </span>
    </div>
  );
};

export default DevModeStrip;
