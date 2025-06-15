<template>
  <QList class="q-px-sm">
    <QExpansionItem
      v-model="expanded"
      header-class="rounded-borders q-mt-sm q-pa-sm"
      @mouseover="hoveringMilestone = milestone.uid"
      @mouseout="hoveringMilestone = ''"
      hide-expand-icon
    >
      <template #header>
        <QItemSection>
          <QItemLabel
            class="tempo-skew text-bold"
            :class="[milestone.color ? `text-${milestone.color}` : '']"
            >{{ milestone.name }}</QItemLabel
          >
          <QItemLabel caption>{{ milestone.objective }}</QItemLabel>
          <QItemLabel>
            <ColoredChip
              :color="milestone.color"
              :label="tasks.length"
              :icon="tabHexagons"
              @click.capture.stop
            />
            <ColoredChip
              v-if="milestone.targetDate"
              :color="milestone.color"
              :label="dayjs().to(milestone.targetDate)"
              :icon="tabCalendarDue"
              @click.capture.stop
            />
            <ColoredChip
              v-for="tag in milestone.tags"
              :key="tag"
              :color="milestone.color"
              :label="tag"
              @click.capture.stop
              dense
            />
          </QItemLabel>
        </QItemSection>
        <QItemSection side>
          <MilestoneMenu />
        </QItemSection>
      </template>

      <div
        class="q-ml-md"
        :style="[
          `border-left: 3px dotted ${
            milestone.color ? colorCssMap[milestone.color]['light75'] : '#e6e6e6'
          }`,
        ]"
      >
        <QList>
          <MilestoneTaskListing
            v-model="hoveringTask"
            v-for="task in tasks"
            :key="task.uid"
            :task="task"
          />
        </QList>
      </div>
    </QExpansionItem>
  </QList>
</template>

<script setup lang="ts">
import { tabCalendarDue, tabHexagons } from "quasar-extras-svg-icons/tabler-icons-v2";
import type { Milestone, Task } from "../services/model";
import dayjs from "dayjs";

const props = defineProps<{
  milestone: Milestone;
}>();

const expanded = ref(false);
const hoveringMilestone = ref("");
const hoveringTask = ref("");

// TODO: These should be computed
const tasks = ref<Task[]>([
  {
    uid: "task_1",
    name: "Design UI",
    description: "Create the initial UI design",
    step: 0.5,
    workspaceUid: "",
    assignees: {},
    rank: "",
    targetDate: "",
  },
  {
    uid: "task_2",
    name: "Implement Backend",
    description: "Set up the backend infrastructure",
    step: 0.8,
    workspaceUid: "",
    assignees: {},
    rank: "",
    targetDate: "",
  },
]);
</script>

<style scoped></style>
