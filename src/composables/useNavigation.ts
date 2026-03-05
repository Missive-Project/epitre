import { computed } from "vue";
import { useRoute } from "vue-router";
import { navigationItems } from "@/configs/navigationConfig";

export function useNavigation() {
  const route = useRoute();

  const navItems = computed(() => {
    return navigationItems.map((item) => ({
      ...item,
      isActive: route.path === item.path,
    }));
  });

  return {
    navItems,
  };
}
