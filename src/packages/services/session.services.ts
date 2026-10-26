import { apiClient } from "@/packages/api/axios.api";
import {
  AUTH_ENDPOINTS,
  sessionEndpoint,
} from "@/packages/configs/endpoints.config";
import type { ActivityEntry, DeviceSession } from "@/types/account";
import type { SuccessResponse } from "@/types/auth";

// Where the user is signed in, and what happened on the account recently.

export const getSessions = async (): Promise<DeviceSession[]> => {
  const { data } = await apiClient.get<{ sessions: DeviceSession[] }>(
    AUTH_ENDPOINTS.sessions,
  );
  // An unexpected body must read as "unavailable" in the UI, never crash the whole page.
  if (!Array.isArray(data.sessions)) {
    throw new Error("Unexpected sessions response");
  }
  return data.sessions;
};

export const getActivity = async (limit = 8): Promise<ActivityEntry[]> => {
  const { data } = await apiClient.get<{ activity: ActivityEntry[] }>(
    AUTH_ENDPOINTS.activity,
    { params: { limit } },
  );
  if (!Array.isArray(data.activity)) {
    throw new Error("Unexpected activity response");
  }
  return data.activity;
};

/** Signs one device out. */
export const revokeSession = async (id: string): Promise<SuccessResponse> => {
  const { data } = await apiClient.delete<SuccessResponse>(sessionEndpoint(id));
  return data;
};

/** Signs every device out except this one. */
export const revokeOtherSessions = async (): Promise<
  SuccessResponse & { revokedSessions: number }
> => {
  const { data } = await apiClient.post<
    SuccessResponse & { revokedSessions: number }
  >(AUTH_ENDPOINTS.revokeOtherSessions);
  return data;
};
