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
          size="lg"
          :color="colorOptions[index % colorOptions.length].value"
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
import type { Profile } from "../services/model";

const members = ref<Profile[]>([
  {
    uid: "member_1",
    name: "Alice Smith",
    email: "alice.smith@example.com",
  },
  {
    uid: "member_2",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
  },
  {
    uid: "member_3",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
  },
]);

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}
</script>

<style scoped></style>
