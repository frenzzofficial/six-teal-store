// Utility to create an encrypted transform for redux-persist
import { createTransform } from "redux-persist";
import CryptoJS from "crypto-js";

interface TransformOptions<T> {
  secretKey: string;
  fallbackState: T;
  whitelist?: string[];
}

export function createEncryptedTransform<T>(options: TransformOptions<T>) {
  const { secretKey, fallbackState, whitelist } = options;

  return createTransform<T, string>(
    (inboundState: T): string => {
      try {
        return CryptoJS.AES.encrypt(
          JSON.stringify(inboundState),
          secretKey
        ).toString();
      } catch (error) {
        console.error("Encryption failed:", error);
        return JSON.stringify(inboundState); // fallback: store as plain string
      }
    },
    (outboundState: string): T => {
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(outboundState, secretKey);
        const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted) as T;
      } catch (error) {
        console.error("Decryption failed:", error);
        return fallbackState;
      }
    },
    whitelist ? { whitelist } : undefined
  );
}
