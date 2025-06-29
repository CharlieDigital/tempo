<template>
  <QDialog
    v-model="visible"
    :position="position"
    :maximized="$q.screen.lt.sm"
    :persistent="persistent"
    transition-duration="200"
    full-height>
    <QCard
      class="column full-height full-width no-wrap dialog-card"
      ref="dropZone"
      :style="
        $q.screen.lt.sm
          ? `min-width: ${$q.screen.width}px`
          : `min-width: ${widthPx ?? '480px'}`
      ">
      <QToolbar>
        <!-- Left side close button -->
        <QBtn
          :icon="tabX"
          @click="visible = false"
          flat
          dense/>
        <!-- The header text -->
        <QToolbarTitle>{{ title }}</QToolbarTitle>
        <QAvatar>
          <QIcon
            :name="icon"
            size="md" />
        </QAvatar>
      </QToolbar>
      <template v-if="fillHeight">
        <slot name="full-height-content"> </slot>
      </template>
      <QScrollArea
        v-else
        class="full-height">
        <QCardSection
          :class="noPadding ? 'q-px-none' : undefined"
          :style="{
            width: $q.screen.lt.sm
              ? `${$q.screen.width}px`
              : `${widthPx ?? '480px'}`,
          }">
          <slot>
            <!-- Contents Here -->
          </slot>

          <div
            class="full-width"
            :class="noPadding ? 'q-px-md' : undefined">
            <QBtn
              v-if="showClose"
              :icon="tabX"
              label="Close"
              class="full-width q-mt-md"
              @click="visible = false"
              flat
              no-caps />
          </div>
        </QCardSection>
      </QScrollArea>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tabFileUpload, tabX } from 'quasar-extras-svg-icons/tabler-icons'
import { useQuasar } from 'quasar';

const visible = defineModel<boolean>({ required: true })

const props = withDefaults(
  defineProps<{
    title: string
    icon: string
    position?: 'left' | 'right'
    showClose?: boolean
    widthPx?: string
    fillHeight?: boolean
    helpUrl?: string
    noPadding?: boolean
    persistent?: boolean
  }>(),
  {
    position: 'right',
    showClose: true,
    persistent: false
  }
)
</script>

<style scoped>
.dialog-card {
  box-shadow: 2px 2px 16px 8px rgba(0, 0, 0, 0.1);
}
</style>
