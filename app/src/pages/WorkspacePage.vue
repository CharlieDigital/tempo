<template>
  <QPage
    padding
    class="row justify-center"
    :class="{
      'bg-grey-10': dark,
    }"
  >
    <!--// Card for milestone/iteration -->
    <QCard
      class="full-width"
      :class="{
        'text-primary': !dark,
        'bg-grey-2': !dark,
        'text-grey-4': dark,
        'bg-dark': dark,
      }"
      flat
    >
      <QCardSection class="q-pa-none">
        <QCardSection class="q-pa-none">
          <!--// The tab bar //-->
          <QCardSection horizontal>
            <QCardSection class="col q-pt-none q-pa-none">
              <div id="tab-track">
                <QTabs v-model="selectedTab" align="left" dense no-caps inline-label>
                  <!--// Tabs //-->
                  <QTab
                    v-for="(workstream, index) in activeWorkspace?.workstreams"
                    :key="`workstream-${index}`"
                    :name="workstream.uid"
                    :icon="tabHexagons"
                    :label="workstream.name"
                  />
                </QTabs>
              </div>
            </QCardSection>
          </QCardSection>

          <!--// The individual members //-->
          <QCardSection class="q-px-none">
            <MemberCard />
          </QCardSection>
        </QCardSection>
      </QCardSection>
      <QCardActions align="center">
        <QBtn label="Add Member" :icon="tabUserPlus" flat no-caps />
      </QCardActions>
    </QCard>

    <!-- Register dialogs here -->
    <SettingsDialog v-model="showSettings" />
    <UsersDialog v-model="showUsers" />
    <WorkspacesDialog v-model="showWorkspaces" />
    <WorkspaceOptionsDialog v-model="showOptions" />

    <!-- Right side drawer teleports -->
    <Teleport defer to="#right-drawer">
      <WorkspaceCard
        @show-options="showOptions = true"
        @show-workspaces="showWorkspaces = true"
      />

      <MilestonesSection />
    </Teleport>

    <!-- Left side drawer teleports -->
    <Teleport defer to="#left-drawer">
      <MembersSection />

      <TimelineSection />
    </Teleport>
  </QPage>
</template>

<script setup lang="ts">
import { tabHexagons } from "quasar-extras-svg-icons/tabler-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSubscribeWorkspace } from "../composables/workspaces";
import { tabUserPlus } from "quasar-extras-svg-icons/tabler-icons-v2";

const showSettings = ref(false);
const showUsers = ref(false);
const showWorkspaces = ref(false);
const showOptions = ref(false);

dayjs.extend(relativeTime);
const appStore = useAppStore();
const route = useRoute();
const { dark, activeWorkspace, focusMode } = storeToRefs(appStore);

let unsubscribeListeners: () => void;

// Start workspace specific subscriptions
onMounted(() => {
  const { unsubscribeAll } = useSubscribeWorkspace(route.params.uid as string);
  unsubscribeListeners = unsubscribeAll;
});

// End workspace specific subscriptions
onBeforeRouteUpdate((to, from) => {
  if (to.params.uid !== from.params.uid) {
    unsubscribeListeners();
  }
});

const selectedTab = ref(activeWorkspace.value.workstreams[0].uid);
const tabIndicatorColor = computed(() => (dark.value ? "#0cada0" : "#282828"));
const tabTrackColor = computed(() => (dark.value ? "#424242" : "#dddddd"));
const placeholderOpacity = computed(() => (dark.value ? 1 : 0.2));
const activeTargetDate = computed(() => {
  return activeWorkspace.value.activeTargetDate
    ? dayjs().to(dayjs(activeWorkspace.value.activeTargetDate, "YYYY/MM/DD"))
    : "No target date";
});
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
:deep(.q-tab[aria-selected="true"] .q-tab__indicator) {
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
