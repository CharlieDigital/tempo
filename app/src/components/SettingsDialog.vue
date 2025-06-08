<template>
  <SideDialogShell
    v-model="visible"
    title="Configure Settings"
    :icon="tabAdjustmentsHorizontal"
    >
    Need to manage settings?
    <button />
  </SideDialogShell>
</template>

<script setup lang="ts">
import { tabAdjustmentsHorizontal } from "quasar-extras-svg-icons/tabler-icons";

const visible = defineModel<boolean>({ required: true })
</script>
