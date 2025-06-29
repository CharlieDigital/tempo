<template>
  <QList>
    <QItem
      v-for="(member, index) in members"
      :key="member.uid"
      class="rounded-borders q-ma-sm"
      clickable
    >
      <QItemSection side>
        <QAvatar
          size="md"
          :color="colorOptions[(index + 4) % colorOptions.length].value"
          text-color="white"
          class="q-mr-md"
        >
          {{ getInitials(member.name) }}
        </QAvatar>
      </QItemSection>
      <QItemSection>
        <QItemLabel class="text-bold">{{ member.name }}</QItemLabel>
        <QItemLabel caption>{{ member.email }}</QItemLabel>
      </QItemSection>
    </QItem>
  </QList>
</template>

<script setup lang="ts">
import type { Profile } from "../../services/model";
import { getInitials } from "../../utils/utility";

defineProps<{
  members: Profile[];
}>();
</script>

<style scoped></style>
