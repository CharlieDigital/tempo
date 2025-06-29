<template>
  <SideDialogShell v-model="visible" title="Manage Workspaces" :icon="tabHexagon">
    <!--// There are no workspace references for this user //-->
    <template v-if="!hasWorkspaces">
      <QCardSection>
        <p>
          Looks like you don't have any workspaces yet. Let's create your first workspace!
        </p>
      </QCardSection>
    </template>

    <!--// There are workspaces for this user //-->
    <QCardSection>
      <p class="text-h6">New workspace</p>

      <QInput
        stack-label
        label="Workspace name"
        v-model="workspaceName"
        :color="dark ? 'accent' : 'dark'"
        autofocus
      />
      <QBtn
        flat
        :icon="tabPlus"
        class="full-width q-mt-md"
        label="Create workspace"
        :disable="!workspaceName"
        @click="createWorkspace($router)"
      />
    </QCardSection>

    <template v-if="hasWorkspaces">
      <!-- List of workspaces -->
      <QCardSection>
        <p class="text-h6">Your workspaces</p>

        <QList>
          <QItem
            v-for="workspace in workspaces"
            :key="workspace.uid"
            @click="
              $router.push({ name: 'WorkspacePage', params: { uid: workspace.uid } })
            "
            clickable
            class="rounded-borders"
          >
            <QItemSection avatar>
              <QIcon size="36px" :name="tabHexagon" />
            </QItemSection>
            <QItemSection>
              <QItemLabel header class="text-subtitle1 text-bold">
                {{ workspace.name }}
              </QItemLabel>
            </QItemSection>
            <QItemSection side>
              <QChip
                v-if="profile?.defaultWorkspace?.uid === workspace.uid"
                dense
                dark
                class="q-px-md"
                color="green-8"
              >
                default
              </QChip>
            </QItemSection>
          </QItem>
        </QList>
      </QCardSection>
    </template>
  </SideDialogShell>
</template>

<script setup lang="ts">
import { tabHexagon, tabPlus } from "quasar-extras-svg-icons/tabler-icons";
import { useCreateWorkspace } from "../../composables/workspaces";

const store = useAppStore();
const { dark } = storeToRefs(store);

const dataStore = useDataStore();
const { workspaces } = storeToRefs(dataStore);

const profile = computed(() => store.profile);

const hasWorkspaces = computed(() => workspaces.value.length > 0);

const { workspaceName, createWorkspace } = useCreateWorkspace();

const visible = defineModel<boolean>({ required: true });
</script>

<style>
/* For the text input */
:deep(.q-manual-focusable--focused > .q-focus-helper) {
  background: #0cada0 !important;
}
</style>
