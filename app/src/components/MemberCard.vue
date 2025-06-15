<template>
  <QCard flat>
    <!-- Header: User Avatar and Name -->
    <QCardSection class="q-pb-none">
      <QItem dense>
        <QItemSection side>
          <QAvatar size="lg" color="accent" text-color="white" class="q-mr-md">
            CC
          </QAvatar>
        </QItemSection>
        <QItemSection>
          <QItemLabel class="text-h6">Charles Chen</QItemLabel>
        </QItemSection>
      </QItem>
    </QCardSection>
    <!-- Task List -->
    <QCardSection>
      <QList>
        <QItem v-for="task in tasks" class="rounded-borders" :key="task.uid">
          <QItemSection side>
            <QKnob
              v-model="task.step"
              :min="0"
              :max="1"
              :step="0.1"
              color="primary"
              track-color="grey-3"
              class="q-mr-sm"
              show-value
              size="lg"
            >
              <template v-if="task.step < 1">
                {{ task.step * 100 }}
              </template>
              <QIcon v-else :name="tabCheck" color="accent" size="sm" />
            </QKnob>
          </QItemSection>
          <QItemSection side>
            <QIcon :name="tabStar" />
          </QItemSection>
          <QItemSection>
            <QItemLabel>{{ task.name }}</QItemLabel>
            <QItemLabel caption>{{ task.description }}</QItemLabel>
          </QItemSection>
          <QItemSection side>
            <QChip color="accent" dense> In Progress </QChip>
          </QItemSection>
        </QItem>
        <QItem v-if="!tasks.length">
          <QItemSection class="text-grey text-center"> No tasks assigned </QItemSection>
        </QItem>
      </QList>
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import { tabCheck, tabStar } from "quasar-extras-svg-icons/tabler-icons-v2";
import type { Task } from "../services/model";

const step = ref(0);

/**
 * Mock list of tasks for demonstration.
 * Uses the Task model from model.ts.
 */
const tasks: Task[] = [
  {
    uid: "task_1",
    name: "Design Homepage",
    workspaceUid: "workspace_1",
    assignees: { user_1: "Charles Chen" },
    step: 0.5,
    rank: "a",
    description: "Create the initial homepage design",
    createdBy: { uid: "user_1", name: "Charles Chen" },
    targetDate: "",
  },
  {
    uid: "task_2",
    name: "Setup Database",
    workspaceUid: "workspace_1",
    assignees: { user_1: "Charles Chen" },
    step: 0.2,
    rank: "b",
    description: "Initialize Firestore collections",
    createdBy: { uid: "user_1", name: "Charles Chen" },
    targetDate: "",
  },
  {
    uid: "task_3",
    name: "Implement Auth",
    workspaceUid: "workspace_1",
    assignees: { user_1: "Charles Chen" },
    step: 0.8,
    rank: "c",
    description: "Add user authentication with Firebase",
    createdBy: { uid: "user_1", name: "Charles Chen" },
    targetDate: "",
  },
];
</script>

<style scoped></style>
