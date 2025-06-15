import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "firebase/auth";
import { Dark } from "quasar";
import { useLocalStorage } from "@vueuse/core";
import type { Milestone, Profile, Workspace } from "../services/model";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
import { profileRepository } from "../services/Repository";

const userThemeMode = useLocalStorage<"dark" | "light">(
  "user-theme-mode",
  "light"
);

const nanoid = customAlphabet(alphanumeric, 24);

export const defaultProfile: Profile = {
  uid: "default",
  name: "default",
  email: "default@usetempo.io",
  createdBy: {
    uid: "default",
    name: "default",
  },
};

export const defaultWorkspace: Workspace = {
  uid: nanoid(),
  name: "New workspace",
  headline: "Headline",
  headlineDetails: "What are you up to?",
  workstreams: [{ uid: "default", name: "My Team" }],
  milestones: [],
};

type AppStore = ReturnType<typeof useAppStore>;

/**
 * The main application store for app-level data.  This is using the Setup Stores format.
 * See: https://pinia.vuejs.org/core-concepts/#setup-stores
 */
export const useAppStore = defineStore("appStore", () => {
  const user = ref<User>();
  const profile = ref<Profile>();
  const workspaces = ref<Workspace[]>([]);
  const activeWorkspace = ref<Workspace>(defaultWorkspace);
  const activeMilestones = ref<Milestone[]>([]);
  const authToken = ref<string>();
  const dark = computed(() => Dark.isActive);
  const focusMode = ref(false);

  if (
    (userThemeMode.value === "light" && Dark.isActive) ||
    (userThemeMode.value === "dark" && !Dark.isActive)
  ) {
    Dark.toggle();
  }

  function toggleDarkMode() {
    Dark.toggle();
    userThemeMode.value = Dark.isActive ? "dark" : "light";
  }

  function clearUser() {
    user.value = undefined;
    authToken.value = undefined;
  }

  /**
   * Routes the app to the target redirect.
   * See: https://github.com/quasarframework/quasar/discussions/15468
   * @param this A typed handle to this store
   * @param path The path to route to.
   */
  async function route(this: AppStore, path: string) {
    this.router.replace(path);
  }

  async function setUser(authUser: User) {
    user.value = authUser;
    authToken.value = await authUser.getIdToken();

    // Get the profile
    let userProfile = await profileRepository.findByUid(authUser.uid);

    if (!userProfile) {
      const userProfile: Profile = {
        uid: authUser.uid,
        name: authUser.displayName ?? "",
        email: authUser.email ?? "",
        createdBy: {
          uid: authUser.uid,
          name: authUser.displayName ?? "",
        },
      };
      profile.value = userProfile;
      await profileRepository.create(userProfile);
    } else {
      profile.value = userProfile;
    }
  }

  function setActiveWorkspace(uid: string) {
    const workspace = workspaces.value.find((w) => w.uid === uid);

    if (workspace) {
      activeWorkspace.value = workspace;
    } else {
      console.log(`No workspace with the UID: ${uid}`);
    }
  }

  return {
    user,
    profile,
    focusMode,
    workspaces,
    activeWorkspace,
    activeMilestones,
    authToken,
    dark,
    route,
    toggleDarkMode,
    setUser,
    clearUser,
    setActiveWorkspace,
  };
});
