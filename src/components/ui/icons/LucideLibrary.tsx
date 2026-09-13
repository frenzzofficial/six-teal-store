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

import {
  InstagramBrandIcon,
  LinkedinBrandIcon,
  TwitterBrandIcon,
} from "./BrandIcons";

type IconComponent = LucideIcon | typeof InstagramBrandIcon;

const iconMap: Record<string, IconComponent> = {
  // Lucide icons
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

  // UI icons
  menu: Menu,
  close: X,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,

  // Brand icons
  instagram: InstagramBrandIcon,
  twitter: TwitterBrandIcon,
  linkedin: LinkedinBrandIcon,
};

type LucideLibraryProps = {
  /** Icon key from navigation.config */
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

  if (!Icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`IconLibrary: no icon mapped for "${name}"`);
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
