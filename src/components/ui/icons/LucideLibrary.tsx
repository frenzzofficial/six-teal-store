import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Compass,
  Cpu,
  CreditCard,
  Grid2x2,
  Heart,
  HeartPulse,
  Home,
  LogIn,
  type LucideIcon,
  MapPin,
  Menu,
  Package,
  Search,
  Settings,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Truck,
  User,
  UserPlus,
  Watch,
  X,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  compass: Compass,
  "trending-up": TrendingUp,
  "shopping-bag": ShoppingBag,
  search: Search,
  heart: Heart,
  user: User,
  "shopping-cart": ShoppingCart,
  "grid-2x2": Grid2x2,
  shirt: Shirt,
  cpu: Cpu,
  "book-open": BookOpen,
  sparkles: Sparkles,
  watch: Watch,
  "heart-pulse": HeartPulse,
  package: Package,
  "map-pin": MapPin,
  settings: Settings,
  "log-in": LogIn,
  "user-plus": UserPlus,
  truck: Truck,
  "credit-card": CreditCard,
  "circle-check": CircleCheck,
  menu: Menu,
  close: X,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
};

type LucideLibraryProps = {
  /** icon key from navigation.config (e.g. "home", "shopping-cart") */
  name?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

const LucideLibrary = ({
  name,
  className,
  size,
  strokeWidth,
}: LucideLibraryProps) => {
  if (!name) return null;

  const Icon = iconMap[name];

  // Unknown key: fail quietly instead of breaking layout, but keep it
  // visible in dev so a typo'd icon key in the config gets noticed.
  if (!Icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`LucideIcon: no icon mapped for "${name}"`);
    }
    return null;
  }

  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
};

export default LucideLibrary;
