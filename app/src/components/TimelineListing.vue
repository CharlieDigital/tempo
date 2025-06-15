<template>
  <QTimeline layout="dense" color="secondary" :dark>
    <QTimelineEntry
      v-for="event in events"
      :key="event.uid"
      :title="event.name"
      :subtitle="`${event.createdBy.name} - ${dayjs(event.createdUtc).fromNow()}`"
      dense
    >
      <div class="text-subtitle2 q-mb-sm">{{ event.text }}</div>
    </QTimelineEntry>
  </QTimeline>
</template>

<script setup lang="ts">
import type { TimelineEvent } from "../services/model";
import dayjs from "dayjs";

const appStore = useAppStore();
const { dark } = storeToRefs(appStore);

const events = ref<TimelineEvent[]>([
  {
    uid: "event-1",
    name: "Event 1",
    text: "Description for Event 1",
    workspaceUid: "",
    createdUtc: "2023-01-01",
    createdBy: {
      uid: "user-1",
      name: "John Doe",
    },
  },
  {
    uid: "event-2",
    name: "Event 2",
    text: "Description for Event 2",
    workspaceUid: "",
    createdUtc: "2023-01-02",
    createdBy: {
      uid: "user-2",
      name: "Jane Smith",
    },
  },
  {
    uid: "event-3",
    name: "Event 3",
    text: "Description for Event 3",
    workspaceUid: "",
    createdUtc: "2023-01-03",
    createdBy: {
      uid: "user-3",
      name: "Charlie Brown",
    },
  },
]);
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
</style>
