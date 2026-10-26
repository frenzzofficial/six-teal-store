"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button, Icon, type IconName } from "@/components/ui";
import { getAuthErrorMessage } from "@/packages/utils/auth-error";

const SHORTCUTS: {
  href: string;
  icon: IconName;
  title: string;
  text: string;
}[] = [
  {
    href: "/account/orders",
    icon: "package",
    title: "Your orders",
    text: "Track and review what you've bought.",
  },
  {
    href: "/account/profile",
    icon: "user",
    title: "Profile",
    text: "Your details and email preferences.",
  },
  {
    href: "/account/security",
    icon: "shield",
    title: "Security",
    text: "Password, devices and activity.",
  },
  {
    href: "/wishlist",
    icon: "heart",
    title: "Wishlist",
    text: "Items you've saved for later.",
  },
  {
    href: "/cart",
    icon: "shopping-bag",
    title: "Cart",
    text: "Pick up where you left off.",
  },
];

const initialsOf = (fullname: string): string =>
  fullname
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

/** The signed-in overview. Rendered inside (protected), so `user` is always set here. */
export function AccountPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const handleSignOut = async () => {
    setPending(true);
    setError(null);
    try {
      await signOut();
      router.replace("/signin");
    } catch (err: unknown) {
      setError(
        getAuthErrorMessage(err, "Couldn't sign out. Please try again."),
      );
      setPending(false);
    }
  };

  return (
    <div className="account-page section-bleed__inner">
      <header className="account-hero">
        <span className="account-hero__avatar" aria-hidden="true">
          {initialsOf(user.fullname) || <Icon name="user" size={28} />}
        </span>
        <div className="account-hero__text">
          <h1 className="account-hero__name">{user.fullname}</h1>
          <p className="account-hero__email">{user.email}</p>
          {user.role && user.role !== "USER" && (
            <span className="account-hero__role">
              {user.role.toLowerCase()}
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleSignOut}
          disabled={pending}
        >
          {pending ? "Signing out…" : "Sign out"}
        </Button>
      </header>

      {error && (
        <p role="alert" className="auth-alert">
          {error}
        </p>
      )}

      <ul className="account-shortcuts">
        {SHORTCUTS.map((item) => (
          <li key={item.href}>
            <NextLink href={item.href} className="account-shortcut">
              <span className="account-shortcut__icon">
                <Icon name={item.icon} size={22} />
              </span>
              <span className="account-shortcut__text">
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </span>
              <Icon name="chevron-right" size={18} />
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
