<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSignOut, useUserMetadata } from "@/composables/useAuth";
import { computed } from "vue";
import { useRouter } from "vue-router";

const { data: userMetadata, isLoading } = useUserMetadata();
const { mutate: signOut } = useSignOut();
const router = useRouter();

const breadcrumbs = computed(() => {
  const route = router.currentRoute.value;
  const items = [];

  if (route.path.includes("/dashboard/cartes")) {
    items.push({ label: "Dashboard", href: "/dashboard" });
    items.push({ label: "Cartes", isCurrent: true });
  } else if (route.path === "/dashboard") {
    items.push({ label: "Accueil", isCurrent: true });
  }

  return items;
});
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
          <Breadcrumb>
            <BreadcrumbList>
              <template v-for="(item, index) in breadcrumbs" :key="index">
                <BreadcrumbItem v-if="!item.isCurrent">
                  <BreadcrumbLink :href="item.href">
                    {{ item.label }}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem v-else>
                  <BreadcrumbPage>{{ item.label }}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  v-if="index < breadcrumbs.length - 1"
                  class="hidden md:block"
                />
              </template>
            </BreadcrumbList>
          </Breadcrumb>
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
