<template>
  <div
    style="position: relative"
    @mouseover="hovering = task.uid"
    @mouseleave="hovering = ''"
  >
    <QItem
      class="rounded-borders q-ml-sm turas-drag-handle"
      style="padding-right: 13px"
      clickable
      dense
    >
      <!-- The left icon -->
      <QItemSection class="q-pl-xs" thumbnail>
        <QIcon
          class="relative"
          size="xs"
          :name="iconOptions.find((o) => o.value === task.icon)?.icon ?? tabHexagon"
          :color="task.color ?? 'grey-5'"
        >
          <div
            v-show="hovering === task.uid"
            style="position: absolute; top: -1px; right: -16px"
          >
            <QIcon size="xs" :name="tabGripVertical" color="grey-5" />
          </div>
        </QIcon>
      </QItemSection>
      <QItemSection>
        <QItemLabel>{{ task.name }}</QItemLabel>
        <QItemLabel caption>{{ task.description }}</QItemLabel>
      </QItemSection>
    </QItem>
  </div>
</template>

<script setup lang="ts">
import { tabGripVertical, tabHexagon } from "quasar-extras-svg-icons/tabler-icons-v2";
import type { Task } from "../../services/model";

const props = defineProps<{
  task: Task;
}>();

const hovering = defineModel<string>({
  required: true,
});
</script>

<style scoped></style>
