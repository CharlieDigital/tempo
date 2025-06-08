<template>
  <SideDialogShell
    v-model="visible"
    title="Workspace Options"
    :icon="tabEditCircle"
  >
    <!--// The milestone and objective //-->
    <QCardSection>
      <p class="text-bold">Basics</p>

      <QInput
        stack-label
        label="Workspace name"
        v-model="activeWorkspace.name"
        :color="dark ? 'accent' : 'dark'"
        autofocus
      />

      <p class="text-bold q-mt-lg">Headline</p>

      <QInput
        stack-label
        label="Headline - what are you working towards?"
        v-model="activeWorkspace.headline"
        :color="dark ? 'accent' : 'dark'"
      />

      <QInput
        stack-label
        type="textarea"
        autogrow
        label="Give it some more color"
        v-model="activeWorkspace.headlineDetails"
        :color="dark ? 'accent' : 'dark'"
      />

      <QInput
        stack-label
        label="Do you have a target date?"
        mask="date"
        v-model="activeWorkspace.activeTargetDate"
        :color="dark ? 'accent' : 'dark'"
      >
        <template v-slot:append>
          <QBtn :icon="tabCalendarEvent" flat dense>
            <QPopupProxy cover transition-show="scale" transition-hide="scale">
              <QDate v-model="activeWorkspace.activeTargetDate" bordered minimal>
                <div class="row items-center justify-end">
                  <QBtn v-close-popup label="Close" color="accent" flat />
                </div>
              </QDate>
            </QPopupProxy>
          </QBtn>
        </template>
      </QInput>

      <p class="text-bold q-mt-lg">Workstreams</p>
      <p>How are your workstreams organized?  These can represent people, teams, or topics</p>

      <QList>
        <QItem
          v-for="(workstream, index) in workstreams"
          :key="`workstream-${index}`"
          class="rounded-corner q-px-none"
        >
          <QItemSection>
            <QInput
              stack-label
              :label="index === 0 ? 'Default workstream' : `Workstream ${index}`"
              v-model="activeWorkspace.workstreams[index]"
              :color="dark ? 'accent' : 'dark'"
              :autofocus="false"
            >
              <template #append>
                <QBtn
                  v-if="index > 0"
                  flat
                  dense
                  :icon="tabTrash"
                  @click="removeWorkstream(index)" />
                <QBtn
                  v-if="workstreams && index === workstreams.length - 1"
                  flat
                  dense
                  :icon="tabPlus"
                  @click="addWorkstream()"
                />
              </template>
            </QInput>
          </QItemSection>
        </QItem>
      </QList>

      <QBtn
        flat
        :icon="tabCircleCheck"
        :disable="!activeWorkspace.name"
        class="full-width q-mt-md"
        @click="saveWorkspaceOptions()"
        label="Save"
        no-caps
      />
    </QCardSection>
  </SideDialogShell>
</template>

<script setup lang="ts">
import { tabCalendarEvent, tabCircleCheck, tabEditCircle, tabPlug, tabPlus, tabTrash } from 'quasar-extras-svg-icons/tabler-icons'
import { workspaceRepository } from '../services/Repository'

const visible = defineModel<boolean>({ required: true })

const store = useAppStore()
const { dark, activeWorkspace } = storeToRefs(store)
const workstreams = computed(() => activeWorkspace.value.workstreams)

function addWorkstream() {
  const lastIndex = activeWorkspace.value.workstreams.length ?? 0
  activeWorkspace.value.workstreams.splice(lastIndex, 0, `Workstream ${lastIndex}`)
}

function removeWorkstream(index: number) {
  activeWorkspace.value.workstreams.splice(index, 1)
}

async function saveWorkspaceOptions() {
  workspaceRepository.update(activeWorkspace.value)
}
</script>

<style>
/* For the text input */
:deep(.q-manual-focusable--focused > .q-focus-helper) {
  background: #0cada0 !important;
}
</style>
