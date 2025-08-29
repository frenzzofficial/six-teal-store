"use client";
import { useEffect } from "react";
import { getUserProfileAPI } from "@/libs/api/api.auth";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/AuthProvider";

const useAuthorizeSession = () => {
  const { setIsAuthenticated, setUser } = useAuth();
  useEffect(() => {
    let isMounted = true;

    const getUserProfile = async () => {
      try {
        const response = await getUserProfileAPI();

        if (!response?.status || !response?.data) {
          if (isMounted) {
            toast.error("Failed to fetch profile");
            setIsAuthenticated(false);
            setUser(null);
          }
          return;
        }

        const { data } = response;

        if (isMounted) {
          setUser(data);
          setIsAuthenticated(true);
          toast.success("Welcome back " + data.fullname + "!");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        if (isMounted) {
          toast.error("Session expired or invalid");
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };

    getUserProfile();

    return () => {
      isMounted = false;
      console.log("LayoutProvider unmounted");
    };
  }, [setIsAuthenticated, setUser]);

  return null;
};

export default useAuthorizeSession;
