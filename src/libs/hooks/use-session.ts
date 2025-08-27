"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProfileAPI } from "@/libs/api/api.auth";
import { login, logout } from "../store/features/authSlice";

export const useSessionValidator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await getUserProfileAPI(); // This should validate the refresh token via cookie
        if (res.status === "success" && res.data) {
          dispatch(login(res.data));
        } else {
          dispatch(logout()); // Token invalid or expired
        }
      } catch (error) {
        console.warn("Session validation failed:", error);
        dispatch(logout());
      }
    };

    validateSession();
  }, [dispatch]);
};
