<template>
  <QChip
    class="q-mr-sm"
    :color="color"
    :text-color="color"
    :style="[
      `background-color: ${color ? colorCssMap[color]['light85'] : '#e3e3e3'} !important`,
    ]"
    :icon
    dense
  >
    {{ label }}
  </QChip>
</template>

<script setup lang="ts">
import type { ItemColor } from "../utils/color-options";

defineProps<{
  color?: ItemColor;
  label: string | number;
  icon?: string;
}>();
</script>
