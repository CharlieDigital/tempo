<template>
  <QSeparator inset />

  <QToolbar>
    <QToolbarTitle class="tempo-skew q-ml-xs"
      ><span class="text-body1 text-bold">Milestones</span></QToolbarTitle
    >
    <MilestoneActionButton id="new-milestone-button" @click="handleSetMenuTarget" />
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
      <MilestoneListing :milestone="milestone" @click="handleSetMenuTarget" />
    </Draggable>
  </Container>

  <!-- Reusable milestone menu component -->
  <MilestoneMenu
    :milestone="selectedMilestone"
    :target="milestoneMenuTarget"
    @save="handleSaveMilestone"
  />
</template>

<script setup lang="ts">
import type { DropEvent, Milestone } from "../../services/model";
import { Container, Draggable } from "vue3-smooth-dnd";

const { dark } = storeToRefs(useAppStore());
const dataStore = useDataStore();
const { workspaceMilestones } = storeToRefs(dataStore);

const selectedMilestone = ref<Milestone>();
const milestoneMenuTarget = ref<string>("#new-milestone-button");

/**
 * Handles the save operation emitted from the milestone menu.
 * @param milestone The milestone to save.
 * @param mode The mode of the operation (add or update).
 */
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

/**
 * When the user completes a drag and drop operation, we use this to set the rank
 * on the dropped milestone to sort it correctly.
 */
function handleDragUpdate(event: DropEvent) {
  const { removedIndex, addedIndex } = event;

  if (removedIndex !== addedIndex) {
    dataStore.moveMilestone(removedIndex ?? undefined, addedIndex ?? undefined);
  }
}

/**
 * To support the reusable milestone menu component, we need to set the target when
 * the user clicks on either the add or the edit button.  When we set the target
 * and the milestone, this will set the context for the menu.
 * @param id The ID of the button that the user clicked
 * @param milestone The milestone associated with the action.
 */
function handleSetMenuTarget(id: string, milestone?: Milestone) {
  milestoneMenuTarget.value = `#${id}`;
  selectedMilestone.value = milestone;
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
