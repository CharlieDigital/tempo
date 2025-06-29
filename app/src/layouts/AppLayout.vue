<template>
  <div
    :class="{
      constrained: focusMode,
      'bg-grey-2': !dark,
      'bg-grey-10': dark,
    }"
  >
    <QLayout view="lHr LpR fFf">
      <!--// Header //-->
      <QHeader
        :class="{
          'text-primary': !dark,
          'bg-grey-2': !dark,
          'text-grey-4': dark,
          'bg-grey-10': dark,
        }"
      >
        <div class="q-ma-md q-px-xs">
          <QToolbar
            class="rounded-borders"
            :class="{
              'text-primary': !dark,
              'bg-white': !dark,
              'text-grey-4': dark,
              'bg-dark': dark,
            }"
          >
            <QToolbarTitle>
              <QImg :src="logoVariant" width="85px" height="24px" />
              <div
                id="header-title"
                class="q-ml-lg tempo-skew"
                style="display: inline-block"
              ></div>
            </QToolbarTitle>
            <QSpace />
            <!--
          <QBtn
            flat
            round
            dense
            :icon="tabMessagePlus"
            :to="{ name: $route.name === 'Home' ? 'FeedbackDialog' : 'FeedbackDialogWorkspace' }"
            class="q-mr-sm">
            <QTooltip>Request a Feature</QTooltip>
          </QBtn>
          <QBtn
            flat
            round
            dense
            :icon="tabBug"
            :to="{ name: $route.name === 'Home' ? 'BugReportDialog' : 'BugReportDialogWorkspace' }"
            class="q-mr-sm">
            <QTooltip>Report a Bug</QTooltip>
          </QBtn>
          -->
            <QBtn
              class="q-mr-sm"
              color="grey-7"
              :icon="tabArrowBarBoth"
              @click="toggleFocusMode"
              flat
              round
              dense
            >
              <QTooltip>Focus Mode</QTooltip>
            </QBtn>
            <QBtn
              class="q-mr-sm"
              color="grey-7"
              :icon="dark ? tabMoon : tabSun"
              @click="appStore.toggleDarkMode"
              round
              dense
              flat
            >
              <QTooltip>{{ dark ? "Light Mode" : "Dark Mode" }}</QTooltip>
            </QBtn>
            <QBtn
              class="q-mr-sm"
              color="grey-7"
              :icon="tabLogout"
              @click="logout"
              round
              dense
              flat
            >
              <QTooltip>Logout</QTooltip>
            </QBtn>
          </QToolbar>
        </div>
      </QHeader>

      <!-- Main content of the router -->
      <QPageContainer :class="[dark ? 'bg-grey-10' : 'bg-grey-2']">
        <RouterView v-slot="{ Component, route }">
          <Transition :name="(route.meta.transitionName as string)" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </QPageContainer>

      <!--// Left drawer //-->
      <QDrawer show-if-above v-model="leftDrawerOpen" side="left" :width="380">
        <div id="left-drawer"></div>
      </QDrawer>

      <!--// Right drawer //-->
      <QDrawer show-if-above v-model="rightDrawerOpen" side="right" :width="380">
        <div id="right-drawer"></div>
      </QDrawer>

      <!-- Global Dialogs -->
      <!--
        <BugReportDialog/>
        <FeedbackDialog/>
      -->
    </QLayout>
  </div>
</template>

<script setup lang="ts">
import { tabLogout, tabMoon, tabSun } from "quasar-extras-svg-icons/tabler-icons";
import { useQuasar } from "quasar";
import { useAppStore } from "../stores/appStore";
import { useRouter } from "vue-router";
import { firebaseConnector } from "../services/FirebaseConnector";
import { tabArrowBarBoth } from "quasar-extras-svg-icons/tabler-icons-v2";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

const { dark, focusMode } = storeToRefs(appStore);

const $q = useQuasar();
const logoVariant = computed(() =>
  dark.value ? "/logo-check-85x24-dark.png" : "/logo-check-85x24.png"
);

const leftDrawerOpen = ref(true);
const rightDrawerOpen = ref(true);

watch(
  () => route.name,
  (name) => {
    console.log("Route changed to:", name);
    if (name === "Home") {
      leftDrawerOpen.value = false;
      rightDrawerOpen.value = false;
    } else {
      leftDrawerOpen.value = true;
      rightDrawerOpen.value = true;
    }
  },
  { immediate: true }
);

watch(focusMode, (focus) => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  rightDrawerOpen.value = !rightDrawerOpen.value;
});

async function logout() {
  await firebaseConnector.logout(router);
}

function toggleFocusMode() {
  focusMode.value = !focusMode.value;
}
</script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap");

.constrained {
  width: 100%;
  height: 100%;
}

.constrained .q-layout,
.constrained .q-header,
.constrained .q-footer {
  margin: 0 auto;
  max-width: 1024px !important;
}

.nav-btn {
  min-width: 90px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
