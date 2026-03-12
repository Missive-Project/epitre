import { computed } from "vue";
import { useRoute } from "vue-router";
import { navigationItems } from "@/configs/navigationConfig";
import type { BreadcrumbItem } from "@/types/navigationTypes";

export function useBreadcrumbs() {
  const route = useRoute();

  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const path = route.path;
    const items: BreadcrumbItem[] = [];

    if (path !== "/dashboard") {
      items.push({
        label: "Dashboard",
        href: "/dashboard",
      });
    }

    const currentItem = navigationItems.find((item) => path === item.path);

    if (currentItem) {
      items.push({
        label: currentItem.meta?.breadcrumbLabel || currentItem.title,
        isCurrent: true,
      });
    }

    return items;
  });

  return {
    breadcrumbs,
  };
}
