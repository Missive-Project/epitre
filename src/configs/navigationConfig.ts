import { House, WalletCards } from "lucide-vue-next";
import type { NavigationItem } from "@/types/navigationTypes";

export const navigationItems: NavigationItem[] = [
  {
    title: "Accueil",
    path: "/dashboard",
    icon: House,
    meta: {
      breadcrumbLabel: "Dashboard",
    },
  },
  {
    title: "Cartes",
    path: "/dashboard/cards",
    icon: WalletCards,
    meta: {
      breadcrumbLabel: "Cartes",
    },
  },
];
