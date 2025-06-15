<template>
  <QToolbar>
    <QToolbarTitle class="tempo-skew q-ml-xs"
      ><span class="text-body1 text-bold">Team</span></QToolbarTitle
    >
    <QBtn class="q-mr-xs" :icon="tabSquareRoundedPlus" flat dense>
      <QTooltip self="center end" anchor="center left">Add Team Member</QTooltip>
    </QBtn>
  </QToolbar>

  <MemberListing />
</template>

<script setup lang="ts">
import { tabSquareRoundedPlus } from "quasar-extras-svg-icons/tabler-icons-v2";
</script>

<style scoped></style>
