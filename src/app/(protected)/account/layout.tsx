import AccountNav from "@/components/features/account/AccountNav";
import VerifyEmailNotice from "@/components/features/account/VerifyEmailNotice";

/**
 * Shared by every /account page: the tab bar, and a notice while the email is unverified.
 * Rendered inside (protected)/layout.tsx, so a signed-out visitor never gets this far.
 */
const AccountLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AccountNav />
    <VerifyEmailNotice />
    {children}
  </>
);

export default AccountLayout;
