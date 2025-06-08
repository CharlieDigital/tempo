<template>
  <div id="container" class="row full-height flex-center">
    <QCard class="text-center q-pa-xl">
      <QBtn
        flat
        round
        :icon="$q.dark.isActive ? tabMoon : tabSun"
        class="absolute"
        size="sm"
        style="right: 8px; top: 8px;"
        @click="toggleDarkMode">
        <QTooltip>{{ $q.dark.isActive ? 'Light Mode' : 'Dark Mode'  }}</QTooltip>
      </QBtn>
      <QCardSection>
        <QImg :src="logoVariant" :ratio="342/96" />
      </QCardSection>
      <QCardSection class="text-h4 tempo-skew">
        Hey there! 👋🏼 Let's get started.
      </QCardSection>
      <QCardSection  class="tempo-skew q-pa-xs">
        Select account:
      </QCardSection>
      <QCardActions align="center">
        <QBtn
          size="xl"
          :icon="tabBrandGoogle"
          label="Google"
          @click="loginGoogle"
          flat
          no-caps
        />
        <QBtn
          size="xl"
          :icon="bxlMicrosoft"
          label="Microsoft"
          @click="loginMicrosoft"
          flat
          no-caps />
        <QBtn
          size="xl"
          :icon="bxlGithub"
          label="Github"
          @click="loginGithub"
          flat
          no-caps />
      </QCardActions>
    </QCard>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/appStore'
import { tabMoon, tabSun, tabBrandGoogle } from 'quasar-extras-svg-icons/tabler-icons'
import { bxlGithub, bxlMicrosoft } from 'quasar-extras-svg-icons/box-icons'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { firebaseConnector } from '../services/FirebaseConnector'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const appStore = useAppStore()
const { setUser, toggleDarkMode } = appStore

const logoVariant = computed(() =>
  $q.dark.isActive ? '/logo-check-912x256-dark.png' : '/logo-check-912x256.png'
)

function loginGoogle() {
  firebaseConnector.loginGoogle(setUser, router)
}

function loginMicrosoft() {
  firebaseConnector.loginMicrosoft(setUser, router)
}

function loginGithub() {
  firebaseConnector.loginGithub(setUser, router)
}
</script>

<style scoped>
#container {
  height: 100%;
}
</style>
