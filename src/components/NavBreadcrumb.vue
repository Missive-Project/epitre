<script setup lang="ts">
import type { BreadcrumbItems } from "@/types/navigationTypes";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

defineProps<{
  breadcrumbs: BreadcrumbItems;
}>();
</script>

<template>
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
</template>
