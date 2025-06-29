<template>
  <SideDialogShell
    v-model="visible"
    title="Manage Users"
    :icon="tabUsers"
    >
    Need to manage users?
  </SideDialogShell>
</template>

<script setup lang="ts">
import { tabUsers } from "quasar-extras-svg-icons/tabler-icons";

const visible = defineModel<boolean>({ required: true })
</script>
