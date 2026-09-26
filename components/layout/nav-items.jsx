import {
  IconBanknote,
  IconChart,
  IconCocktail,
  IconHome,
  IconReport,
  IconUserPlus,
} from "../ui/icons";

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: IconHome, adminOnly: true },
  { label: "Drinks", href: "/drinks", icon: IconCocktail, adminOnly: false },
  { label: "Reports", href: "/reports", icon: IconReport, adminOnly: true },
  { label: "Charts", href: "/chart", icon: IconChart, adminOnly: true },
  { label: "Cash Out", href: "/cashout", icon: IconBanknote, adminOnly: true },
  { label: "Add User", href: "/signup", icon: IconUserPlus, adminOnly: true },
];

export const getInitials = (name) =>
  (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "SF";
