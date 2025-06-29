import type { Milestone, Workspace } from "../services/model";
import { useMembers } from "./members";
import { useMilestones } from "./milestones";
import { useWorkspaces } from "./workspaces";

export const useDataStore = defineStore("dataStore", () => {
  const { profile } = storeToRefs(useAppStore());

  // Workspace state
  const workspaces = ref<Workspace[]>([]);
  const activeWorkspace = ref<Workspace>(defaultWorkspace);

  /**
   * A computed, rank-sorted list of the milestones for the active workspace.
   */
  const workspaceMilestones = computed(() => {
    const milestones = activeWorkspace.value.milestones;

    if (!milestones) {
      return [];
    }

    return Array.from(Object.values(milestones)).sort(rankSort);
  });

  return {
    ...useMembers(),
    ...useMilestones(activeWorkspace, workspaceMilestones),
    ...useTimeline(activeWorkspace),
    ...useWorkspaces(profile, workspaces, activeWorkspace),
    workspaceMilestones,
  };
});
