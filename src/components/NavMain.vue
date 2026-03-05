<script setup lang="ts">
import type { Component } from "vue";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarGroup from "./ui/sidebar/SidebarGroup.vue";

defineProps<{
  items: {
    title: string;
    path: string;
    icon: Component;
    isActive?: boolean;
  }[];
}>();
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton as-child :is-active="item.isActive">
          <router-link :to="item.path">
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
          </router-link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
