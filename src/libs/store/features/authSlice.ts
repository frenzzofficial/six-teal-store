import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfileRoleType } from "@/types/auth";

// User type
export interface AuthUser {
  id: string;
  user_id: string;
  email: string;
  fullname: string;
  avatar: string;
  role: IUserProfileRoleType;
  created_at: string;
  updated_at: string;
}

// Auth state
export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Role check selectors
export const hasRole = (
  state: AuthState,
  role: IUserProfileRoleType | IUserProfileRoleType[]
): boolean => {
  const currentRole = state.user?.role;
  if (!currentRole) return false;
  return Array.isArray(role)
    ? role.includes(currentRole)
    : currentRole === role;
};

export const isAdmin = (state: AuthState): boolean => hasRole(state, "ADMIN");

// Export actions
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
