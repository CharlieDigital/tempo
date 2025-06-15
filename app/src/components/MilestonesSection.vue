<template>
  <QSeparator inset />

  <QToolbar>
    <QToolbarTitle class="tempo-skew q-ml-xs"
      ><span class="text-body1 text-bold">Milestones</span></QToolbarTitle
    >
    <QBtn class="q-mr-xs" :icon="tabSquareRoundedPlus" flat dense>
      <QTooltip self="center end" anchor="center left">Add Milestone</QTooltip>
    </QBtn>
  </QToolbar>

  <MilestoneListing
    v-for="milestone in milestones"
    :key="milestone.uid"
    :milestone="milestone"
  />
</template>

<script setup lang="ts">
import { tabSquareRoundedPlus } from "quasar-extras-svg-icons/tabler-icons-v2";
import type { Milestone } from "../services/model";

// A list of fake milestones for binding
const milestones = ref<Milestone[]>([
  {
    uid: "milestone_1",
    name: "Initial Design",
    objective: "Complete the initial design phase",
    tags: ["design", "ui/ux"],
    color: "blue",
  },
  {
    uid: "milestone_2",
    name: "Development Phase",
    objective: "Start development of core features",
    tags: ["development", "backend"],
    color: "light-green-9",
    targetDate: "2025-08-01",
  },
]);
</script>

<style scoped></style>
