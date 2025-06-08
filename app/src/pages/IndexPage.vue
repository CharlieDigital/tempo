<template>
  <QPage
    padding
    class="row justify-center"
    :class="{
      'bg-grey-10': dark,
    }"
  >
    <!-- Landing zone after login -->
    <QCard class="col-9 col-lg-10 col-md-11 col-xs-12" flat bordered>
      <QToolbar class="justify-center">
        <QBtn flat dense :icon="tabHexagons">
          <QTooltip>Workspaces</QTooltip>
        </QBtn>
      </QToolbar>

      <!-- Input to create new workspaces -->
      <QCardSection class="text-center">
        <p class="text-h4 tempo-skew">Workspaces</p>
        <div>
           <p v-if="workspaces.length === 0">
            It looks like there aren't any workspaces here yet. Let's start by
            creating one!
          </p>
          <QInput
            v-model="workspaceName"
            label="New workspace name"
            style="max-width: 400px; margin: auto"
            color="accent"
            stack-label
          />
          <QBtn
            label="Create workspace"
            flat
            class="q-mt-lg"
            @click="createWorkspace($router)"
            :icon="tabPlus"
            :disable="!workspaceName"
            no-caps
          />
        </div>
      </QCardSection>

      <!-- List of workspaces -->
      <QCardSection class="row q-col-gutter-md">
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-4"
          v-for="workspace in workspaces"
          :key="workspace.uid"
        >
          <QCard bordered flat>
            <QItem
              clickable
              :to="{ name: 'WorkspacePage', params: { uid: workspace.uid }  }">
              <QItemSection avatar>
                <QIcon
                  size="24px"
                  :name="tabHexagon"/>
              </QItemSection>
              <QItemSection>
                <QItemLabel
                  header lines="1">
                  {{ workspace.name }}
                </QItemLabel>
              </QItemSection>
            </QItem>
          </QCard>
        </div>
      </QCardSection>
    </QCard>
  </QPage>
</template>

<script setup lang="ts">
import { tabHexagon, tabHexagons, tabPlus } from 'quasar-extras-svg-icons/tabler-icons'
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useAppStore } from '../stores/appStore'
import { storeToRefs } from 'pinia'
import { useCreateWorkspace } from '../composables/workspaces'

const $q = useQuasar()
const dark = computed(() => $q.dark.isActive)
const appStore = useAppStore()

const { workspaceName, createWorkspace } = useCreateWorkspace()
const { workspaces } = storeToRefs(appStore)
</script>

<style scoped>
.q-list--dense .q-item {
  padding: 2px 0px;
}
:deep(.q-timeline__title) {
  margin-bottom: 0px;
}
:deep(.q-timeline__content) {
  padding-bottom: 0px;
}
.q-manual-focusable--focused > .q-focus-helper {
  background: #0cada0 !important;
}
</style>
