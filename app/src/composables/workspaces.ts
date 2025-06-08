import { type Unsubscribe, where } from "firebase/firestore";
import { type Router } from "vue-router";
import { computed, ref } from "vue";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
import { defaultWorkspace, useAppStore } from "../stores/appStore";
import { workspaceRepository } from "../services/Repository";

export function useCreateWorkspace() {
  const appStore = useAppStore();
  const profile = computed(() => appStore.profile);
  const workspaceName = ref("");

  const createWorkspace = async (router: Router) => {
    if (!profile.value) {
      return;
    }

    const users: Record<string, string> = {};
    users[profile.value.uid] = profile.value.name;
    const nanoid = customAlphabet(alphanumeric, 8);
    const uid = nanoid();

    await workspaceRepository.create({
      ...defaultWorkspace,
      uid: uid,
      name: workspaceName.value,
      users: users,
    });

    await router.push({ name: "WorkspacePage", params: { uid: uid } });
  };

  return {
    workspaceName,
    createWorkspace,
  };
}

export function useSubscribeWorkspace(uid: string) {
  const appStore = useAppStore();
  const subscriptions: Unsubscribe[] = [];
  let disposed = false;

  const unsubscribeAll = () => {
    if (disposed) {
      return;
    }

    for (const unsubscribe of subscriptions) {
      unsubscribe();
    }

    disposed = true;
  };

  // Add listener to unsubscribe in case the user leaves
  document.addEventListener("visibilitychanged", () => {
    unsubscribeAll();
  });

  return {
    unsubscribeAll,
  };
}
