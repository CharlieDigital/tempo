<template>
  <QSeparator inset />

  <QToolbar>
    <QToolbarTitle class="tempo-skew q-ml-xs"
      ><span class="text-body1 text-bold">Timeline</span></QToolbarTitle
    >
  </QToolbar>

  <div class="q-ml-lg q-pl-sm">
    <TimelineListing />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
