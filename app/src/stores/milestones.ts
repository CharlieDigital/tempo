import { LexoRank } from "lexorank";
import type { Milestone, Workspace } from "../services/model";
import {
  recordAdd,
  recordUpdate,
  workspaceRepository,
} from "../services/Repository";

export function useMilestones(
  workspace: Ref<Workspace>,
  workspaceMilestones: ComputedRef<Milestone[]>
) {
  async function saveMilestone(
    milestone: Milestone,
    mode: "add" | "update" = "add"
  ) {
    // Get the current maximum rank and calculate a rank between that and the max.
    if (milestone.rank === "") {
      const lastRank = workspaceMilestones.value
        .map((m) => m.rank)
        .sort()
        .pop();

      milestone.rank = LexoRank.parse(lastRank ?? LexoRank.middle().format())
        .between(LexoRank.max())
        .format();
    }

    workspaceRepository.updateFields(workspace.value.uid, {
      [`milestones.${milestone.uid}`]: milestone,
    });

    if (mode === "add") {
      recordAdd("Added milestone", milestone);
    } else {
      recordUpdate("Updated milestone", milestone);
    }
  }

  /**
   * Moves a milestone from one index to another.  Here, we need to change the
   * `.rank` of the milestone and then update the milestone in the database.
   * @param oldIndex The old index of the milestone to move.
   * @param newIndex The new index of the milestone to move.
   */
  const moveMilestone = async (oldIndex?: number, newIndex?: number) => {
    if (oldIndex === undefined || newIndex === undefined) {
      return;
    }

    const items = workspaceMilestones.value;
    const milestone = items[oldIndex];
    let newRank: LexoRank | undefined;

    if (newIndex === 0) {
      const minRank = LexoRank.parse(items[newIndex].rank);
      newRank = minRank.genPrev();
    } else if (newIndex === items.length - 1) {
      const maxRank = LexoRank.parse(items[newIndex].rank);
      newRank = maxRank.genNext();
    } else {
      const offset = oldIndex > newIndex ? -1 : 1;

      // Get a lexorank between
      const lowerRank = LexoRank.parse(items[newIndex + offset].rank);
      const upperRank = LexoRank.parse(items[newIndex].rank);

      newRank = lowerRank.between(upperRank);
    }

    milestone.rank = newRank.toString();

    await saveMilestone(milestone, "update");
  };

  return {
    saveMilestone,
    moveMilestone,
  };
}
