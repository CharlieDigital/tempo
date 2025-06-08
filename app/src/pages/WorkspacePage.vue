<template>
  <QPage
    padding
    class="row justify-center"
    :class="{
      'bg-grey-10': dark,
    }"
  >
    <!--// Card for milestone/iteration -->
    <QCard class="col-9 col-lg-10 col-md-11 col-xs-12" flat bordered>
      <QToolbar class="justify-center q-px-xl">
        <!-- Title -->
        <QToolbarTitle class="tempo-skew text-bold">{{
          activeWorkspace?.name
        }}</QToolbarTitle>

        <!-- Top toolbar buttons -->
        <QBtn
          flat
          dense
          :icon="tabEditCircle"
          @click="showOptions = true"
        >
          <QTooltip>Workspace Options</QTooltip>
        </QBtn>
        <QBtn
          flat
          dense
          :icon="tabSwitchHorizontal"
          @click="showWorkspaces = true"
        >
          <QTooltip>Switch Workspace</QTooltip>
        </QBtn>
      </QToolbar>

      <QSeparator />

      <QCardSection class="q-pt-md">
        <QCardSection class="q-py-none">
          <!--// Title and description //-->
          <QCardSection horizontal>
            <QCardSection class="col-10 q-pt-none">
              <div class="text-h6 text-weight-bold tempo-skew">
                {{ activeWorkspace?.headline ?? 'Headline' }}
              </div>
              <div class="text-subtitle1">
                {{ activeWorkspace?.headlineDetails ?? 'What are you up to?' }}
              </div>
            </QCardSection>

            <QCardSection class="col-2 q-pt-none">
              <div class="text-weight-bolder text-right">
                {{ activeTargetDate }}
              </div>
            </QCardSection>
          </QCardSection>

          <!--// The tab bar //-->
          <QCardSection horizontal class="">
            <QCardSection class="col q-pt-none">
              <div id="tab-track">
                <QTabs
                  v-model="selectedTab"
                  align="left"
                  dense
                  no-caps
                  inline-label
                >
                  <!--// Tabs //-->
                  <QTab
                    v-for="(workstream, index) in activeWorkspace?.workstreams"
                    :key="`workstream-${index}`"
                    :name="workstream.uid"
                    :icon="tabHexagons"
                    :label="workstream.name"/>
                </QTabs>
              </div>
            </QCardSection>
          </QCardSection>

          <!--// The individual members //-->
          <QCardSection class="">
            <MemberCard/>
          </QCardSection>
        </QCardSection>
      </QCardSection>
    </QCard>

    <!-- Register dialogs here -->
    <SettingsDialog v-model="showSettings"/>
    <UsersDialog v-model="showUsers"/>
    <WorkspacesDialog v-model="showWorkspaces"/>
    <WorkspaceOptionsDialog v-model="showOptions"/>
  </QPage>
</template>

<script setup lang="ts">
import {
  tabEditCircle,
  tabHexagons,
  tabSwitchHorizontal,
} from 'quasar-extras-svg-icons/tabler-icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSubscribeWorkspace } from '../composables/workspaces'

const showSettings = ref(false)
const showUsers = ref(false)
const showWorkspaces = ref(false)
const showOptions = ref(false)

dayjs.extend(relativeTime)
const appStore = useAppStore()
const route = useRoute()
const { dark, activeWorkspace } = storeToRefs(appStore)

let unsubscribeListeners: () => void

// Start workspace specific subscriptions
onMounted(() => {
  const { unsubscribeAll } = useSubscribeWorkspace(route.params.uid as string)
  unsubscribeListeners = unsubscribeAll
})

// End workspace specific subscriptions
onBeforeRouteUpdate((to, from) => {
  if (to.params.uid !== from.params.uid) {
    unsubscribeListeners()
  }
})

const selectedTab = ref(activeWorkspace.value.workstreams[0].uid)
const tabIndicatorColor = computed(() => (dark.value ? '#0cada0' : '#282828'))
const tabTrackColor = computed(() => (dark.value ? '#424242' : '#dddddd'))
const placeholderOpacity = computed(() => (dark.value ? 1 : 0.2))
const activeTargetDate = computed(() => {
  return activeWorkspace.value.activeTargetDate
    ? dayjs().to(dayjs(activeWorkspace.value.activeTargetDate, 'YYYY/MM/DD'))
    : 'No target date'
})
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

#tab-track {
  border-bottom: 2px solid v-bind(tabTrackColor);
  position: relative;
  height: 36px;
}
:deep(.q-tabs) {
  margin-bottom: -2px;
  position: absolute;
}
:deep(.q-tab__indicator) {
  background: v-bind(tabTrackColor);
  opacity: 1;
}
:deep(.q-tab[aria-selected='true'] .q-tab__indicator) {
  background: v-bind(tabIndicatorColor);
  opacity: 1;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.25;
  background: #eee;
}

:deep(.tempo-task-drop) {
  border: 2px dotted #ccc;
  opacity: v-bind(placeholderOpacity);
}

:deep(.q-manual-focusable--focused > .q-focus-helper) {
  background: #0cada0 !important;
}
</style>
