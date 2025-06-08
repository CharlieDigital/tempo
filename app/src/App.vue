<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const $q = useQuasar()
const dark = computed(() => $q.dark.isActive)
const avatarBorderColor = computed(() => dark.value ? '#282828' : '#ffffff')
</script>

<style>
html, body, #app {
  height: 100%;
}

/* For the avatar groups  */
.tempo-overlapping {
  position: absolute;
  outline: 2px solid v-bind(avatarBorderColor);
}

.tempo-overlapping .row {
  text-align: left !important;
}

/* For the text input */
:deep(.q-manual-focusable--focused > .q-focus-helper) {
  background: #0cada0 !important;
}
</style>
