<template>
  <QChip
    class="q-mr-sm"
    :color="color"
    :text-color="dark ? lightestOption[color ?? 'blue-grey-8'] : color"
    :style="[
      `background-color: ${
        color ? colorCssMap[color][dark ? 'darken75' : 'light85'] : '#e3e3e3'
      } !important`,
    ]"
    :icon
    dense
  >
    {{ label }}
  </QChip>
</template>

<script setup lang="ts">
import type { ItemColor } from "../utils/color-options";

const appStore = useAppStore();

defineProps<{
  color?: ItemColor;
  label: string | number;
  icon?: string;
  dark?: boolean;
}>();
</script>
