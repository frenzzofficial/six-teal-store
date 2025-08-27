import { persistReducer } from "redux-persist";
import authReducer, { AuthState } from "../features/authSlice";
import storageSession from "redux-persist/lib/storage/session";
import { createEncryptedTransform } from "@/libs/utils/utils-encryption";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_AUTH_SECRET || "default_secret128bit_key";

const encryptTransform = createEncryptedTransform<AuthState>({
  secretKey: SECRET_KEY,
  fallbackState: { isAuthenticated: false, user: null },
  whitelist: ["isAuthenticated", "user"],
});

const authPersistConfig = {
  key: "session",
  storage: storageSession,
  transforms: [encryptTransform],
};

export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);
