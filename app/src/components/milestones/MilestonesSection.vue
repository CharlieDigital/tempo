<template>
  <QSeparator inset />

  <QToolbar>
    <QToolbarTitle class="tempo-skew q-ml-xs"
      ><span class="text-body1 text-bold">Milestones</span></QToolbarTitle
    >
    <MilestoneMenu @save="handleSaveMilestone" />
  </QToolbar>

  <div ref="milestonesContainer">
    <MilestoneListing
      v-for="milestone in workspaceMilestones"
      :key="milestone.uid"
      :milestone="milestone"
    />
  </div>
</template>

<script setup lang="ts">
import type { Milestone } from "../../services/model";
import { useDraggable } from "vue-draggable-plus";
import { recordAdd, recordUpdate } from "../../services/Repository";

const dataStore = useDataStore();
const { workspaceMilestones } = storeToRefs(dataStore);

const milestonesContainer = ref<HTMLDivElement>();

async function handleSaveMilestone(milestone: Milestone, mode: "add" | "update") {
  await dataStore.saveMilestone(milestone, mode);
}

const { start } = useDraggable(milestonesContainer, workspaceMilestones, {
  animation: 150,
  ghostClass: "shadow",
  dragClass: "dragging",
  direction: "vertical",
  handle: ".grip",
  group: "milestones",
  customUpdate: async (event) => {
    const { oldIndex, newIndex } = event;

    if (oldIndex !== newIndex) {
      await dataStore.moveMilestone(oldIndex, newIndex);
    }
  },
});
</script>

<style scoped>
/* https://vue-draggable-plus.pages.dev/en/api/#api-1 */

:deep(.dragging) {
  opacity: 0.9;
}

:deep(.shadow) {
  opacity: 0.5;
}
</style>
