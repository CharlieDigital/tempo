<template>
  <QCard class="q-my-sm q-mx-xs" flat>
    <QCardActions class="justify-end q-py-none">
      <QBtn flat dense :icon="tabEditCircle" @click="emit('showOptions')">
        <QTooltip>Workspace Options</QTooltip>
      </QBtn>
      <QBtn flat dense :icon="tabSwitchHorizontal" @click="emit('showWorkspaces')">
        <QTooltip>Switch Workspace</QTooltip>
      </QBtn>
    </QCardActions>

    <QItem class="q-px-xs">
      <QItemSection class="q-px-sm">
        <QItemLabel v-if="activeTargetDate" caption>
          {{ activeTargetDate?.format("YYYY/MM/DD") }} ({{ activeTargetDateTo }})
        </QItemLabel>
        <QItemLabel class="text-subtitle1 text-weight-bold tempo-skew">
          {{ activeWorkspace?.headline ?? "Headline" }}
        </QItemLabel>
        <QItemLabel class="text-body2">
          {{ activeWorkspace?.headlineDetails ?? "What are you up to?" }}
        </QItemLabel>
      </QItemSection>
    </QItem>
  </QCard>
</template>

<script setup lang="ts">
import { tabEditCircle, tabSwitchHorizontal } from "quasar-extras-svg-icons/tabler-icons";
import dayjs from "dayjs";

const dataStore = useDataStore();
const { activeWorkspace } = storeToRefs(dataStore);

const emit = defineEmits<{
  showWorkspaces: [];
  showOptions: [];
}>();

const activeTargetDate = computed(() =>
  activeWorkspace.value.activeTargetDate
    ? dayjs(activeWorkspace.value.activeTargetDate, "YYYY/MM/DD")
    : undefined
);

const activeTargetDateTo = computed(() => {
  return activeWorkspace.value.activeTargetDate
    ? dayjs().to(activeTargetDate.value)
    : "No target date";
});
</script>

<style scoped></style>
