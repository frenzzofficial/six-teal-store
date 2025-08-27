"use client";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logoutAPI } from "@/libs/api/api.auth";
import { logout } from "@/libs/store/features/authSlice";
import Button_centerUnderline from "@/components/ui/buttons/Button_centerUnderline";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    const res = await logoutAPI();
    if (res.status === "success") {
      dispatch(logout());
      toast.success("Logged out successfully");
    }
  };
  return (
    <>
      <Button_centerUnderline
        isActive={true}
        label="Logout"
        onClick={() => {
          logoutUser();
        }}
      />
    </>
  );
};
export default LogoutButton;
