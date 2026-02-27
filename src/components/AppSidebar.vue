<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

import { House, WalletCards } from "lucide-vue-next";
import NavUser from "@/components/NavUser.vue";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavMain from "./NavMain.vue";
import SidebarMenu from "./ui/sidebar/SidebarMenu.vue";
import SidebarMenuItem from "./ui/sidebar/SidebarMenuItem.vue";
import SidebarMenuButton from "./ui/sidebar/SidebarMenuButton.vue";
import type { UserMetadata } from "@/types/userTypes";

const props = withDefaults(
  defineProps<
    SidebarProps & {
      userMetadata: UserMetadata;
      onLogout: () => void;
    }
  >(),
  {
    collapsible: "icon",
  },
);

const data = {
  navMain: [
    {
      title: "Accueil",
      url: "#",
      icon: House,
      isActive: false,
    },
    {
      title: "Cartes",
      url: "#",
      icon: WalletCards,
      isActive: true,
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="#">
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <img src="../assets/logo.png" alt="Missive Logo" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">Missive</span>
                <span class="truncate text-xs">Enterprise</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser
        :user-metadata="props.userMetadata"
        :on-logout="props.onLogout"
      />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
