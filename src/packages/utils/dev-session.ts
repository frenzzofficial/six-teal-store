import {
  DEV_AUTH_ENABLED,
  DEV_SESSION_KEY,
  type DevPersona,
  getDevPersona,
} from "@/packages/configs/dev-auth.config";
import {
  readStorage,
  removeStorage,
  writeStorage,
} from "@/packages/utils/storage";

/** The persona that is "signed in" through dev auth, if any. Always null outside development. */
export const readDevSession = (): DevPersona | null => {
  if (!DEV_AUTH_ENABLED) return null;
  return getDevPersona(readStorage<string | null>(DEV_SESSION_KEY, null));
};

export const writeDevSession = (persona: DevPersona): void => {
  if (!DEV_AUTH_ENABLED) return;
  writeStorage(DEV_SESSION_KEY, persona.id);
};

export const clearDevSession = (): void => {
  removeStorage(DEV_SESSION_KEY);
};
