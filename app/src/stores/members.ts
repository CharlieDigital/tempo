import type { Profile } from "../services/model";

export function useMembers() {
  const __members = ref<Profile[]>([
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

  const members = computed(() =>
    __members.value
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((member, index) => {
        // TODO: Additional mapping here
        return member;
      })
  );

  return {
    members,
  };
}
