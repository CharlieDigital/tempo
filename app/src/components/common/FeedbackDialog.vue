<template>
  <SideDialogShell
    v-model="visible"
    title="Give Feedback"
    :icon="tabMessagePlus">
    Give your feedback
  </SideDialogShell>
</template>

<script setup lang="ts">
import { tabMessagePlus } from "quasar-extras-svg-icons/tabler-icons";

const visible = defineModel<boolean>({ required: true })
</script>
