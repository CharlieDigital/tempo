<template>
  <QCard flat>
    <!-- Header: User Avatar and Name -->
    <QCardSection class="q-pb-none">
      <QItem dense>
        <QItemSection side>
          <QAvatar
            size="lg"
            :color="colorOptions[(index + 4) % colorOptions.length].value"
            text-color="white"
            class="q-mr-md"
          >
            {{ getInitials(member.name) }}
          </QAvatar>
        </QItemSection>
        <QItemSection>
          <QItemLabel class="text-h6">{{ member.name }}</QItemLabel>
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
              :color="task.color || 'blue-grey-8'"
              :track-color="lighterOption[task.color || 'blue-grey-8']"
              class="q-mr-sm"
              show-value
              size="lg"
            >
              <template v-if="task.step < 1">
                {{ task.step * 100 }}
              </template>
              <QIcon v-else :name="tabCheck" :color="task.color ?? 'accent'" size="sm" />
            </QKnob>
          </QItemSection>
          <QItemSection>
            <QItemLabel>{{ task.name }}</QItemLabel>
            <QItemLabel caption>{{ task.description }}</QItemLabel>
          </QItemSection>
          <QItemSection side>
            <ColoredChip :color="task.color" label="In Progress" :dark dense>
              In Progress
            </ColoredChip>
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
import type { Profile, Task } from "../../services/model";
import { getInitials } from "../../utils/utility";
import type { NamedColor } from "quasar";

defineProps<{
  member: Profile;
  index: number;
}>();

const appStore = useAppStore();
const { dark } = storeToRefs(appStore);

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
    createdBy: { uid: "user_1", name: "Charles Chen", type: "profile" },
    targetDate: "",
    color: colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
  },
  {
    uid: "task_2",
    name: "Setup Database",
    workspaceUid: "workspace_1",
    assignees: { user_1: "Charles Chen" },
    step: 0.2,
    rank: "b",
    description: "Initialize Firestore collections",
    createdBy: { uid: "user_1", name: "Charles Chen", type: "profile" },
    targetDate: "",
    color: colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
  },
  {
    uid: "task_3",
    name: "Implement Auth",
    workspaceUid: "workspace_1",
    assignees: { user_1: "Charles Chen" },
    step: 0.8,
    rank: "c",
    description: "Add user authentication with Firebase",
    createdBy: { uid: "user_1", name: "Charles Chen", type: "profile" },
    targetDate: "",
    color: colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
  },
];
</script>

<style scoped></style>
