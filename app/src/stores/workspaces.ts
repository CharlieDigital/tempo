import { where } from "firebase/firestore";
import { firebaseSubscriptions } from "../services/FirebaseSubscriptions";
import { workspaceRepository } from "../services/Repository";
import type { Milestone, Profile, Workspace } from "../services/model";

export const defaultWorkspace: Workspace = {
  uid: nanoid(),
  name: "New workspace",
  headline: "Headline",
  headlineDetails: "What are you up to?",
  workstreams: [{ uid: "default", name: "My Team", type: "workstream" }],
  milestones: {},
};

/**
 * Store that holds the workspaces
 */
export function useWorkspaces(
  profile: Ref<Profile>,
  workspaces: Ref<Workspace[]>,
  activeWorkspace: Ref<Workspace>
) {
  const route = useRoute();

  watch(
    [route, () => workspaces.value.length],
    ([currentRoute, workspaceCount]) => {
      const workspaceUid = currentRoute.params.uid as string;

      console.log(
        `Workspace change detected: ${workspaceUid}, available workspaces: ${workspaceCount}`
      );

      if (workspaceUid) {
        setActiveWorkspace(workspaceUid);
      } else {
        activeWorkspace.value = defaultWorkspace;
      }
    },
    { immediate: true }
  );

  watch(profile, async (p) => {
    firebaseSubscriptions.unsubscribe("workspaces");
    await loadWorkspaces(p.uid);
  });

  function setActiveWorkspace(uid: string) {
    const workspace = workspaces.value.find((w) => w.uid === uid);

    if (workspace) {
      activeWorkspace.value = workspace;
    } else {
      console.log(`No workspace with the UID: ${uid}`);
    }
  }

  async function loadWorkspaces(userId: string) {
    if (profile.value.uid === defaultProfile.uid) {
      return;
    }

    console.log(`Subscribing workspaces for user: ${userId}`);

    const workspaceSubscription = workspaceRepository.subscribe(
      {
        added: (workspace) => {
          workspaces.value.push(workspace);
        },
        modified: (workspace) => {
          console.log("Updated workspace:", workspace);

          const index = workspaces.value.findIndex(
            (w) => w.uid === workspace.uid
          );

          if (index !== -1) {
            workspaces.value[index] = workspace;
          }

          if (activeWorkspace.value.uid === workspace.uid) {
            activeWorkspace.value = workspace;
          }
        },
        removed: (workspace) => {
          workspaces.value = workspaces.value.filter(
            (w) => w.uid !== workspace.uid
          );
        },
      },
      where(`users.${userId}`, "!=", null)
    );

    firebaseSubscriptions.register("workspaces", workspaceSubscription);
  }

  return {
    loadWorkspaces,
    setActiveWorkspace,
    activeWorkspace,
    workspaces,
  };
}
