<template>
  <QToolbar>
    <QToolbarTitle class="tempo-skew q-ml-xs"
      ><span class="text-body1 text-bold">Timeline</span></QToolbarTitle
    >
  </QToolbar>

  <div class="q-ml-lg q-pl-sm">
    <TimelineListing :events="activeTimeline?.events ?? []" />
  </div>
</template>

<script setup lang="ts">
const { activeTimeline } = storeToRefs(useDataStore());
</script>

<style scoped></style>
