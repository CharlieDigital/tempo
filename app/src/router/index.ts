import { useAppStore } from "./../stores/appStore";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

/**
 * Sets up the authentication checks.
 */
router.beforeEach((to) => {
  const appStore = useAppStore();
  const { user } = appStore;

  // User is logged in; redirect to home or the target redirect
  if (user && to.name === "login") {
    return to.query.redirect?.toString() ?? "/";
  }

  // The route requires authentication and there is no user entity
  if (!user && to.meta.requiresAuth === true) {
    return { name: "Login", query: { redirect: to.fullPath } };
  }

  // Loading a workspace page; set the active workspace.
  if (to.name === "WorkspacePage") {
    appStore.setActiveWorkspace(to.params.uid as string);
  }
});

// https://router.vuejs.org/guide/advanced/transitions.html#route-based-dynamic-transition
/**
 * Prevents the transitions from executing on dialog routes.
 */
router.afterEach((to, from) => {
  const fromDialog = (from.name?.toString().indexOf("Dialog") ?? 0) > -1;
  const toDialog = (to.name?.toString().indexOf("Dialog") ?? 0) > -1;
  to.meta.transitionName = fromDialog || toDialog ? "" : "fade";
});

export default router;
