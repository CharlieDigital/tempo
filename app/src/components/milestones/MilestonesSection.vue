<template>
  <QSeparator inset />

  <QToolbar>
    <QToolbarTitle class="tempo-skew q-ml-xs"
      ><span class="text-body1 text-bold">Milestones</span></QToolbarTitle
    >
    <MilestoneMenu @save="handleSaveMilestone" />
  </QToolbar>

  <Container
    orientation="vertical"
    group-name="milestones"
    lock-axis="y"
    drag-handle-selector=".grip"
    :drag-class="
      dark
        ? 'bg-grey-8 shadow-1 rounded-borders q-mx-sm tempo-dragging'
        : 'bg-grey-2 shadow-1 rounded-borders q-mx-sm tempo-dragging'
    "
    :get-ghost-parent="getAppContainer"
    :drop-placeholder="dark ? darkGhostStyles : lightGhostStyles"
    @drop="(e: DropEvent) => handleDragUpdate(e)"
  >
    <Draggable v-for="milestone in workspaceMilestones" :key="milestone.uid">
      <MilestoneListing :milestone="milestone" />
    </Draggable>
  </Container>
</template>

<script setup lang="ts">
import type { DropEvent, Milestone } from "../../services/model";
import { Container, Draggable } from "vue3-smooth-dnd";

const { dark } = storeToRefs(useAppStore());
const dataStore = useDataStore();
const { workspaceMilestones } = storeToRefs(dataStore);

async function handleSaveMilestone(milestone: Milestone, mode: "add" | "update") {
  await dataStore.saveMilestone(milestone, mode);
}

/**
 * Retrieves the container for the vue3-smooth-dnd drag-drop ghost.  Without this
 * the ghost doesn't show up because of the the presence of transforms in the
 * ancestor chain
 */
function getAppContainer() {
  return document.getElementById("tempo-app");
}

function handleDragUpdate(event: DropEvent) {
  const { removedIndex, addedIndex } = event;

  if (removedIndex !== addedIndex) {
    dataStore.moveMilestone(removedIndex ?? undefined, addedIndex ?? undefined);
  }
}

const lightGhostStyles = {
  className: `bg-grey-4 q-mx-sm rounded-borders`,
  animationDuration: "150",
  showOnTop: false,
};

const darkGhostStyles = {
  className: `bg-grey-10 q-mx-sm rounded-borders`,
  animationDuration: "150",
  showOnTop: false,
};
</script>

<style>
/* https://vue-draggable-plus.pages.dev/en/api/#api-1 */

.tempo-dragging {
  opacity: 0.9 !important;
  transform: rotate(-2deg) !important;
  cursor: grab;
  transition: all 0.3s ease-in-out;
}

.tempo-shadow {
  opacity: 0.5;
}
</style>
