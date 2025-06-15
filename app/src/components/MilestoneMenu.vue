<template>
  <QBtn :icon="evaEditOutline" @click.stop dense flat no-caps size="md">
    <QMenu
      anchor="top left"
      self="top right"
      transition-show="jump-up"
      transition-hide="jump-down"
      :offset="[0, 0]"
      :transition-duration="200"
    >
      <QCard class="q-pa-sm" style="width: 360px">
        <!-- Header text -->
        <QCardSection class="q-pa-xs" style="font-family: Quicksand">
          <span class="text-caption text-grey-7">Edit Milestone</span>
        </QCardSection>

        <!-- Name input -->
        <QCardSection class="q-pa-xs">
          <QInput
            v-model="enteredName"
            class="q-mx-xs"
            input-style="font-family: Quicksand"
            :placeholder="`Milestone name`"
            :color="selectedColor"
            :clear-icon="tabBackspace"
            :input-class="`text-${selectedColor} text-bold`"
            @clear="enteredName = ''"
            outlined
            hide-bottom-space
            clearable
            autofocus
            dense
          >
          </QInput>
        </QCardSection>

        <!-- Colors -->
        <QCardSection class="q-pa-xs">
          <div v-for="set in colors" class="row q-mb-xs">
            <QBtn
              v-for="color in set"
              class="col"
              :key="color.value"
              :color="color.value"
              :icon="color.value === selectedColor ? evaRadioButtonOn : evaRadioButtonOff"
              :rounded="color.value !== selectedColor"
              @click="selectedColor = color.value"
              flat
              dense
            />
          </div>
        </QCardSection>

        <!-- Icons -->
        <QCardSection class="q-pa-xs q-p-none">
          <QScrollArea
            style="height: 84px"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
          >
            <div v-for="set in icons" class="row q-mb-xs">
              <QBtn
                v-for="icon in set"
                class="col"
                :key="icon.value"
                :color="selectedIcons?.includes(icon.value) ? selectedColor : 'grey-6'"
                :icon="icon.icon"
                :flat="!selectedIcons?.includes(icon.value)"
                :unelevated="selectedIcons?.includes(icon.value)"
                @click="handleToggleIcon(icon.value)"
                dense
              />
            </div>
          </QScrollArea>
        </QCardSection>

        <!-- Tags -->
        <QCardSection class="q-pa-xs q-pt-none" style="font-family: Quicksand">
          <QSelect
            label="Tags"
            v-model="enteredTags"
            input-debounce="0"
            input-style="font-family: Quicksand"
            new-value-mode="add-unique"
            :color="selectedColor"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
          />
        </QCardSection>

        <!-- Actions -->
        <QCardActions align="right" style="font-family: Quicksand">
          <QToggle
            v-model="enableDelete"
            v-show="!enableDelete"
            label="Delete"
            dense
            size="sm"
          />
          <QBtn
            v-show="enableDelete"
            v-close-popup
            label="Delete"
            class="q-ml-xs"
            color="red-8"
            :icon="evaTrashOutline"
            @click="emits('delete')"
            no-caps
            flat
            dense
          />
          <QSpace />
          <QBtn
            v-close-popup
            label="Update"
            class="q-ml-xs"
            :disable="!changed"
            :icon="evaCheckmark"
            @click="handleUpdate"
            no-caps
            flat
            dense
          />
          <QBtn
            v-close-popup
            label="Cancel"
            class="q-ml-xs"
            :icon="evaClose"
            @click="handleCancel"
            no-caps
            flat
            dense
          />
        </QCardActions>
      </QCard>
    </QMenu>
  </QBtn>
</template>

<script setup lang="ts">
import {
  evaCheckmark,
  evaClose,
  evaEditOutline,
  evaRadioButtonOff,
  evaRadioButtonOn,
  evaTrashOutline,
} from "@quasar/extras/eva-icons";
import type { ItemColor } from "../utils/color-options";
import type { IconName } from "../utils/icon-options";
import type { Milestone } from "../services/model";
import { tabBackspace } from "quasar-extras-svg-icons/tabler-icons-v2";

const props = defineProps<{
  milestone?: Milestone;
}>();

const emits = defineEmits<{
  delete: [];
  update: [{ color?: ItemColor; name: string; icons: string[]; tags: string[] }];
}>();

const enableDelete = ref<boolean>(false);
const selectedColor = ref<ItemColor | undefined>(props.milestone?.color);
const selectedIcons = ref<IconName[]>([...(props.milestone?.icons ?? [])]);
const enteredTags = ref<string[]>([...(props.milestone?.tags ?? [])]);
const enteredName = ref(props.milestone?.name ?? "");

const chunkSize = 8;

const colors = computed(() => {
  const chunks = [];

  for (let i = 0; i < colorOptions.length; i += chunkSize) {
    const chunk = colorOptions.slice(i, i + chunkSize);

    chunks.push(chunk);
  }

  return chunks;
});

const icons = computed(() => {
  const chunks = [];

  for (let i = 0; i < iconOptions.length; i += chunkSize) {
    const chunk = iconOptions.slice(i, i + chunkSize);

    chunks.push(chunk);
  }

  return chunks;
});

const changed = computed(
  () =>
    props.milestone?.name.trim() !== enteredName.value.trim() ||
    props.milestone?.color !== selectedColor.value ||
    (props.milestone?.icons ?? []).join("") !== selectedIcons.value.join("") ||
    (props.milestone?.tags ?? []).join("") !== enteredTags.value.join("")
);

function handleToggleIcon(iconName: string) {
  const index = selectedIcons.value?.indexOf(iconName) ?? -1;

  if (index >= 0) {
    selectedIcons.value?.splice(index, 1);
  } else {
    selectedIcons.value?.push(iconName);
  }
}

function handleUpdate() {
  emits("update", {
    color: selectedColor.value,
    name: enteredName.value,
    icons: selectedIcons.value,
    tags: enteredTags.value,
  });
}

function handleCancel() {
  selectedColor.value = props.milestone?.color;
  enteredName.value = props.milestone?.name ?? "";
  selectedIcons.value = [...(props.milestone?.icons ?? [])];
  enteredTags.value = [...(props.milestone?.tags ?? [])];
}
</script>

<style scoped></style>
