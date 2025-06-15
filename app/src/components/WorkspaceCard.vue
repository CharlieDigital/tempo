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

    <QToolbar class="justify-center">
      <!-- Title -->
      <QToolbarTitle class="tempo-skew text-bold">{{
        activeWorkspace?.name
      }}</QToolbarTitle>
    </QToolbar>

    <QItem class="q-px-xs">
      <QItemSection class="q-px-sm">
        <QItemLabel caption>
          {{ activeTargetDate?.format("YYYY/MM/DD") ?? "" }} ({{ activeTargetDateTo }})
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

const appStore = useAppStore();
const { activeWorkspace } = storeToRefs(appStore);

const emit = defineEmits<{
  showWorkspaces: [];
  showOptions: [];
}>();

const activeTargetDate = computed(() =>
  dayjs(activeWorkspace.value.activeTargetDate, "YYYY/MM/DD")
);

const activeTargetDateTo = computed(() => {
  return activeWorkspace.value.activeTargetDate
    ? dayjs().to(activeTargetDate.value)
    : "No target date";
});
</script>

<style scoped></style>
