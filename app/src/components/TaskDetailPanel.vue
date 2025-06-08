<template>
  <QCard flat>
    <QCardSection horizontal>
      <QCardSection class="col">
        <div class="text-h6 text-weight-bold">Today</div>
      </QCardSection>

      <QCardSection class="col-4 q-mt-xs" style="position: relative">
        <QAvatar
          class="tempo-overlapping"
          color="orange"
          text-color="white"
          style="right: 8px"
          size="24px"
          >CC</QAvatar
        >

        <QAvatar
          class="tempo-overlapping"
          color="cyan"
          text-color="white"
          style="right: 24px"
          size="24px"
          >TE</QAvatar
        >
      </QCardSection>
    </QCardSection>

    <QCardSection class="q-py-none">
      <QSlider
        v-model="progress"
        snap
        :step="1"
        :min="0"
        :max="5"
        dense
        track-size="14px"
        :track-color="dark ? 'grey-8' : 'grey-2'"
        thumb-size="36px"
        thumb-path="M7,5 h4 a3,3 0 0 1 3,3 v4 a3,3 0 0 1 -3,3 h-4 a3,3 0 0 1 -3,-3 v-4 a3,3 0 0 1 3,-3 z"
        color="accent"
      />

      <QToolbar
        class="q-px-none">
        <QBtn flat dense :icon="tabArrowLeft" />
        <QSpace />
        <QBtn flat dense :icon="tabPencil" />
        <QBtn flat dense :icon="tabBell" />
        <QBtn flat dense :icon="tabArchive" />
        <QBtn flat dense :icon="tabFlag" />
        <QBtn flat dense :icon="tabShare" />
        <QBtn flat dense :icon="tabTrash" />
        <QSpace />
        <QBtn flat dense :icon="tabArrowRight" />
      </QToolbar>
    </QCardSection>

    <QCardSection class="q-py-none">
      <div class="text-subtitle1 text-weight-bold tempo-skew">
        Get this thing done!
      </div>
      <div class="text-subtitle2">
        Nullam tristique facilisis orci ac tempor. Suspendisse dapibus imperdiet
        arcu, eget tincidunt ante ornare nec. Mauris vulputate mollis erat, eu
        imperdiet odio laoreet eget. Nam et volutpat tellus
      </div>
      <!-- Tags for the task; future
      <div class="text-right q-my-md">
        <QChip color="pink" dark size="md" dense removable> Task </QChip>
        <QChip color="purple" dark size="md" dense removable> Important </QChip>
        <QChip color="amber" dark size="md" dense removable> Late </QChip>
        <QChip :color="dark ? 'white' : 'black'" size="md" dense :icon="tabCirclePlus" outline>
          Add
        </QChip>
      -->

      <QSeparator spaced />

      <QList>
        <QItem class="q-px-none q-py-md">
          <QItemSection>
            <QItemLabel class="text-weight-bold">
              <QIcon :name="tabMessage" size="xs" />
              5 days ago
            </QItemLabel>
            <QItemLabel caption>Tyrone Engels</QItemLabel>
            <QItemLabel
              >Curabitur dolor augue, eleifend sit amet tortor quis, venenatis
              auctor erat. Aenean cursus molestie neque nec pretium. Duis
              euismod id velit vitae efficitur. Sed turpis diam, dignissim eu
              tortor nec, luctus auctor erat.</QItemLabel
            >
          </QItemSection>
          <QItemSection side top class="text-right">
            <QAvatar color="cyan" text-color="white" class="q-mb-sm"
              >TE</QAvatar
            >
            <QBtn flat size="md" round :icon="tabPlus" />
          </QItemSection>
        </QItem>

        <QSeparator spaced />

        <QItem class="q-px-none q-py-md">
          <QItemSection>
            <QItemLabel class="text-weight-bold">
              <QIcon :name="tabMessage" size="xs" />
              3 days ago
            </QItemLabel>
            <QItemLabel caption>Charles Chen</QItemLabel>
            <QItemLabel
              >Fusce arcu lacus, faucibus at mauris quis, consectetur malesuada
              elit. Nam volutpat tellus vitae posuere pellentesque.</QItemLabel
            >
          </QItemSection>
          <QItemSection side top class="text-right">
            <QAvatar color="orange" text-color="white" class="q-mb-sm"
              >CC</QAvatar
            >
            <QBtn flat size="md" round :icon="tabPlus" />
          </QItemSection>
        </QItem>

        <QSeparator spaced />

        <QItem class="q-px-none q-pt-none">
          <QInput
            v-model="newComment"
            class="full-width"
            label="New comment"
            clearable
            :clear-icon="tabX"
            :color="dark ? 'accent' : 'dark'"
            autogrow
          />
        </QItem>

        <QItem class="q-px-none q-pt-none">
          <QItemSection>
            <QItemLabel class="text-weight-bold">
              <QIcon :name="carbon32Image" size="xs" />
              Images
            </QItemLabel>
            <div class="row q-col-gutter-sm q-mt-sm">
              <div class="col">
                <QCard class="col-3" flat>
                  <QImg
                    height="86px"
                    src="/samples/sample1.jpg"
                    :ratio="1 / 1"
                  />
                </QCard>
              </div>

              <div class="col">
                <QCard class="col-3" flat>
                  <QImg
                    height="86px"
                    src="/samples/sample2.jpg"
                    :ratio="1 / 1"
                  />
                </QCard>
              </div>

              <div class="col">
                <QCard class="col-3" flat>
                  <QImg
                    height="86px"
                    src="/samples/sample3.jpg"
                    :ratio="1 / 1"
                  />
                </QCard>
              </div>

              <div class="col">
                <QCard class="col-3" flat>
                  <QImg
                    height="86px"
                    src="/samples/sample4.jpg"
                    :ratio="1 / 1"
                  />
                </QCard>
              </div>
            </div>
          </QItemSection>
        </QItem>

        <QSeparator spaced />

        <QItem class="q-px-none q-pt-none">
          <QItemSection>
            <QItemLabel class="text-weight-bold">
              <QIcon :name="tabPaperclip" size="xs" />
              Files
            </QItemLabel>
            <QList>
              <QItem class="q-px-none" dense>
                <QItemSection side>
                  <QIcon :name="carbon32DocumentPdf" size="18px" />
                </QItemSection>
                <QItemSection>
                  <QItemLabel>This is a file.pdf</QItemLabel>
                </QItemSection>
                <QItemSection side>
                  <QItemLabel caption>3 days ago</QItemLabel>
                </QItemSection>
              </QItem>

              <QItem class="q-px-none" dense>
                <QItemSection side>
                  <QIcon :name="carbon32DocumentPdf" size="18px" />
                </QItemSection>
                <QItemSection>
                  <QItemLabel>Another file uploaded.pdf</QItemLabel>
                </QItemSection>
                <QItemSection side>
                  <QItemLabel caption>4 days ago</QItemLabel>
                </QItemSection>
              </QItem>
            </QList>
          </QItemSection>
        </QItem>
      </QList>
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  tabArchive,
  tabArrowLeft,
  tabArrowRight,
  tabBell,
  tabFlag,
  tabMessage,
  tabPlus,
  tabPaperclip,
  tabShare,
  tabTrash,
  tabX,
  tabCirclePlus,
tabPencil,
} from "quasar-extras-svg-icons/tabler-icons";
import {
  carbon32Image,
  carbon32DocumentPdf,
} from "quasar-extras-svg-icons/carbon-icons-v11";
import { useQuasar } from "quasar";

const $q = useQuasar()
const dark = computed(() => $q.dark.isActive)

const progress = ref(2);
const newComment = ref("");


</script>

<style scoped>

</style>
