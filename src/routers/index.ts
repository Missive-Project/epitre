import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { supabaseClient } from "../clients/supabaseClient";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardTest.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "GsapTest",
    component: () => import("../views/GsapTest.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (to.meta.requiresAuth && !session) {
    next("/login");
  } else if (to.meta.requiresGuest && session) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
