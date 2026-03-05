import type { Component } from "vue";

export interface NavigationItem {
  title: string;
  path: string;
  icon: Component;
  meta?: {
    breadcrumbLabel?: string;
    requiresAuth?: boolean;
  };
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}
