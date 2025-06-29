<template>
  <QList class="q-px-sm">
    <QExpansionItem
      v-model="expanded"
      header-class="rounded-borders q-mt-sm q-pa-sm relative"
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
              :dark
              @click.capture.stop
            />
            <ColoredChip
              v-if="milestone.targetDate"
              :color="milestone.color"
              :label="dayjs().to(milestone.targetDate)"
              :icon="tabCalendarDue"
              :dark
              @click.capture.stop
            />
            <ColoredChip
              v-for="tag in milestone.tags"
              :key="tag"
              :color="milestone.color"
              :label="tag"
              :dark
              @click.capture.stop
              dense
            />
          </QItemLabel>
        </QItemSection>
        <QItemSection v-show="hoveringMilestone === milestone.uid" side>
          <MilestoneMenu :milestone @save="handleSaveMilestone" />
        </QItemSection>
        <QIcon
          v-show="hoveringMilestone === milestone.uid"
          :name="tabGripHorizontal"
          class="grip absolute"
          size="xs"
          color="grey-6"
        />
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
import {
  tabCalendarDue,
  tabGripHorizontal,
  tabHexagons,
} from "quasar-extras-svg-icons/tabler-icons-v2";
import type { Milestone, Task } from "../../services/model";
import dayjs from "dayjs";

defineProps<{
  milestone: Milestone;
}>();

const appStore = useAppStore();
const { dark } = storeToRefs(appStore);

const dataStore = useDataStore();

const expanded = ref(false);
const hoveringMilestone = ref("");
const hoveringTask = ref("");

async function handleSaveMilestone(milestone: Milestone, mode: "add" | "update") {
  await dataStore.saveMilestone(milestone, mode);
}

const tasks = computed<Task[]>(() => {
  return [];
});
</script>

<style scoped>
.grip {
  cursor: grab;
  top: 4px;
  right: 16px;
}
</style>
