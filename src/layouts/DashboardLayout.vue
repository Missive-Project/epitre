<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import NavBreadcrumb from "@/components/NavBreadcrumb.vue";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSignOut, useUserMetadata } from "@/composables/useAuth";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";

const { data: userMetadata, isLoading } = useUserMetadata();
const { mutate: signOut } = useSignOut();
const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <div v-if="isLoading" class="flex h-screen items-center justify-center">
    <p>Chargement...</p>
  </div>
  <SidebarProvider v-if="userMetadata">
    <AppSidebar :user-metadata="userMetadata" :on-logout="signOut" />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <NavBreadcrumb :breadcrumbs="breadcrumbs" />
        </div>
      </header>
      <main class="flex flex-1 flex-col p-4 pt-0">
        <router-view />
      </main>
    </SidebarInset>
  </SidebarProvider>

  <div v-else class="flex h-screen items-center justify-center">
    <p>Session invalide, redirection...</p>
  </div>
</template>
