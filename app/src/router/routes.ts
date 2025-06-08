import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "AppLayout",
    path: "/",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        name: "Home",
        path: "",
        component: () => import("../pages/IndexPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "WorkspacePage",
        path: "workspace/:uid",
        component: () => import("../pages/WorkspacePage.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [],
      },
    ],
  },

  {
    name: "Login",
    path: "/login",
    component: () => import("../pages/LoginPage.vue"),
  },
];

export default routes;
