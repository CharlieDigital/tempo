<template>
  <QTimeline layout="dense" color="secondary" :dark>
    <template v-for="event in reversedEvents" :key="event.uid">
      <Transition appear enter-active-class="animated slideInDown" leave-active-class="">
        <QTimelineEntry
          :title="event.name"
          :color="actionColors[event.actionType]"
          :icon="actionIcons[event.actionType]"
          dense
        >
          <template #subtitle>
            <span class="text-caption text-bold text-capitalize">
              {{ event.createdBy.name }} -
            </span>
            <span class="text-caption text-lowercase">
              {{ dayjs(event.createdUtc).fromNow() }}
            </span>
          </template>
          <div class="text-subtitle2 q-mb-sm">{{ event.text }}</div>
        </QTimelineEntry>
      </Transition>
    </template>
  </QTimeline>
</template>

<script setup lang="ts">
import {
  tabDeviceFloppy,
  tabPlus,
  tabTrash,
} from "quasar-extras-svg-icons/tabler-icons-v2";
import type { ActionType, EntityRef, TimelineEvent } from "../../services/model";
import dayjs from "dayjs";

const appStore = useAppStore();
const { dark } = storeToRefs(appStore);

const props = defineProps<{
  events: TimelineEvent[];
}>();

const reversedEvents = computed(() => {
  return [...props.events].reverse().splice(0, 10);
});

const actionIcons: Record<ActionType, string> = {
  delete: tabTrash,
  add: tabPlus,
  update: tabDeviceFloppy,
};

const actionColors: Record<ActionType, string> = {
  delete: dark.value ? "grey-8" : "grey-4",
  add: dark.value ? "light-green-8" : "light-green-6",
  update: "blue-grey-12",
};
</script>

<style scoped>
:deep(.q-timeline__subtitle) {
  margin-bottom: 0px;
}

:deep(.q-timeline__title) {
  margin-bottom: 0px;
  font-size: 1em;
  font-weight: 700;
}

:deep(.q-timeline__content) {
  padding-bottom: 1em;
}

.q-timeline {
  opacity: 0.3;
  transition: opacity 0.3s ease-in-out;
}

.q-timeline:hover {
  opacity: 0.9;
}
</style>
