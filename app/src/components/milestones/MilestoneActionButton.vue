<template>
  <QBtn
    :icon="milestone ? evaEditOutline : tabSquareRoundedPlus"
    :class="{ 'q-mr-xs': !milestone }"
    @click.stop="emits('click', id)"
    dense
    flat
    no-caps
    size="md"
    :id
  >
  </QBtn>
</template>

<script setup lang="ts">
import { evaEditOutline } from "@quasar/extras/eva-icons";
import type { Milestone } from "../../services/model";
import { tabSquareRoundedPlus } from "quasar-extras-svg-icons/tabler-icons-v2";

defineProps<{
  milestone?: Milestone;
  id: string;
}>();

const emits = defineEmits<{
  click: [id: string];
}>();
</script>
