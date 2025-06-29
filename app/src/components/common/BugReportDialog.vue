<template>
  <SideDialogShell
    v-model="visible"
    title="Report a Bug"
    :icon="tabBug"
    >
    Report a bug!
  </SideDialogShell>
</template>

<script setup lang="ts">
import { tabBug } from "quasar-extras-svg-icons/tabler-icons";

const visible = defineModel<boolean>({ required: true })
</script>
