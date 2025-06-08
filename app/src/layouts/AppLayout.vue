<template>
  <div class="constrained bg-grey-2">
    <QLayout view="lHr lpR lFr">
      <!--// Header //-->
      <QHeader>
        <QToolbar
          :class="{
            'text-primary': !dark,
            'bg-white': !dark,
            'text-grey-4': dark,
            'bg-dark' : dark
          }">
          <QToolbarTitle>
            <QImg :src="logoVariant" width="85px" height="24px" />
          </QToolbarTitle>
          <QSpace/>
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
            flat
            round
            dense
            :icon="dark ? tabMoon : tabSun"
            class="q-mr-sm"
            @click="toggleDarkMode">
            <QTooltip>{{ dark ? 'Light Mode' : 'Dark Mode'  }}</QTooltip>
          </QBtn>
          <QBtn
            flat
            round
            dense
            :icon="tabLogout"
            @click="logout"
            color="grey-7"
            class="q-mr-sm">
            <QTooltip>Logout</QTooltip>
          </QBtn>
        </QToolbar>
      </QHeader>

      <!-- Main content of the router -->
      <QPageContainer :class="dark ? 'bg-grey-10' : 'bg-grey-2' ">
        <RouterView v-slot="{ Component, route }">
          <Transition
            :name="(route.meta.transitionName as string)" mode="out-in">
            <component :is="Component" :key="route.path"/>
          </Transition>
        </RouterView>
      </QPageContainer>

      <!-- Global Dialogs -->
      <!--
        <BugReportDialog/>
        <FeedbackDialog/>
      -->
    </QLayout>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { tabBug, tabLogout, tabMessagePlus, tabMoon, tabSun } from 'quasar-extras-svg-icons/tabler-icons'
import { useQuasar } from 'quasar'
import { useAppStore } from "../stores/appStore"
import { useRouter } from "vue-router"
import { firebaseConnector } from "../services/FirebaseConnector"

const router = useRouter()
const appStore = useAppStore()

const { toggleDarkMode } = appStore

const $q = useQuasar()
const dark = computed(() => $q.dark.isActive)
const logoVariant = computed(() => dark.value
  ? "/logo-check-85x24-dark.png"
  : "/logo-check-85x24.png")

async function logout() {
  await firebaseConnector.logout(router)
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
  /* max-width: 1245px !important; */
}

.nav-btn {
  min-width: 90px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .1s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
