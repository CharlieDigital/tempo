<template>
  <QMenu
    ref="menu"
    anchor="top left"
    self="top right"
    transition-show="jump-up"
    transition-hide="jump-down"
    :target
    :offset="[0, 0]"
    :transition-duration="50"
  >
    <QCard class="q-pa-sm" style="width: 360px">
      <!-- Header text -->
      <QCardSection class="q-pa-xs row" style="font-family: Quicksand">
        <div class="col text-caption text-grey-7">
          {{ milestone ? "Edit Milestone" : "Add Milestone" }}
        </div>
        <QSpace />
        <div class="col col-shrink">
          <QBtn size="sm" :icon="tabX" v-close-popup dense flat />
        </div>
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

      <!-- Objective input -->
      <QCardSection class="q-pa-xs">
        <QInput
          v-model="enteredObjective"
          class="q-mx-xs"
          type="textarea"
          input-style="font-family: Quicksand"
          hint="The objective for this milestone"
          :placeholder="`Objective`"
          :color="selectedColor"
          :clear-icon="tabBackspace"
          @clear="enteredObjective = ''"
          hide-bottom-space
          clearable
          autogrow
          dense
        >
        </QInput>
      </QCardSection>

      <!-- Colors -->
      <QCardSection class="q-pa-xs">
        <div v-for="set in colors" class="row q-mb-xs q-gutter-xs">
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
        <QScrollArea style="height: 84px" :thumb-style="thumbStyle" :bar-style="barStyle">
          <div v-for="set in icons" class="row q-mb-xs q-gutter-xs">
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
          placeholder="Tags"
          hint="Tags (ENTER to add))"
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
          v-show="!enableDelete && milestone"
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
          label="Save"
          class="q-ml-xs"
          :disable="!changed"
          :icon="evaCheckmark"
          @click="handleSave"
          no-caps
          flat
          dense
        />
        <QBtn
          v-close-popup
          label="Cancel"
          class="q-ml-xs"
          :icon="evaClose"
          no-caps
          flat
          dense
        />
      </QCardActions>
    </QCard>
  </QMenu>
</template>

<script setup lang="ts">
import {
  evaCheckmark,
  evaClose,
  evaRadioButtonOff,
  evaRadioButtonOn,
  evaTrashOutline,
} from "@quasar/extras/eva-icons";
import type { ItemColor } from "../../utils/color-options";
import type { IconName } from "../../utils/icon-options";
import type { Milestone } from "../../services/model";
import { tabBackspace, tabX } from "quasar-extras-svg-icons/tabler-icons-v2";
import type { QMenu } from "quasar";

const props = defineProps<{
  milestone?: Milestone;
  target: string | boolean;
}>();

const emits = defineEmits<{
  delete: [];
  save: [milestone: Milestone, mode: "add" | "update"];
}>();

const enableDelete = ref<boolean>(false);
const selectedColor = ref<ItemColor | undefined>(props.milestone?.color);
const selectedIcons = ref<IconName[]>([...(props.milestone?.icons ?? [])]);
const enteredTags = ref<string[]>([...(props.milestone?.tags ?? [])]);
const enteredName = ref(props.milestone?.name ?? "");
const enteredObjective = ref(props.milestone?.objective ?? "");

const menu = ref<QMenu>();

/**
 * Watch for changes in the target and show the menu if it is a valid change.
 */
watch(
  () => props.target,
  (target) => {
    if (target) {
      menu.value?.show();
    }
  }
);

/**
 * Watch for a change in the milestone UID and load the properties from the
 * selected milestone.  This allows the menu to be reused for both adding and
 * editing.
 */
watch(
  () => props.milestone?.uid,
  (uid) => {
    if (!uid || !props.milestone) {
      selectedColor.value = undefined;
      selectedIcons.value = [];
      enteredTags.value = [];
      enteredName.value = "";
      enteredObjective.value = "";
    } else {
      selectedColor.value = props.milestone.color;
      selectedIcons.value = [...(props.milestone.icons ?? [])];
      enteredTags.value = [...(props.milestone.tags ?? [])];
      enteredName.value = props.milestone.name ?? "";
      enteredObjective.value = props.milestone.objective ?? "";
    }
  },
  { immediate: true }
);

const chunkSize = 8;

/**
 * Compute the colors in chunks to display as a grid.
 */
const colors = computed(() => {
  const chunks = [];

  for (let i = 0; i < colorOptions.length; i += chunkSize) {
    const chunk = colorOptions.slice(i, i + chunkSize);

    chunks.push(chunk);
  }

  return chunks;
});

/**
 * Compute the icons in chunks to display as a grid.
 */
const icons = computed(() => {
  const chunks = [];

  for (let i = 0; i < iconOptions.length; i += chunkSize) {
    const chunk = iconOptions.slice(i, i + chunkSize);

    chunks.push(chunk);
  }

  return chunks;
});

/**
 * Computed which returns true when one of the values has changed.
 */
const changed = computed(
  () =>
    props.milestone?.name.trim() !== enteredName.value.trim() ||
    props.milestone?.color !== selectedColor.value ||
    props.milestone?.objective !== enteredObjective.value.trim() ||
    (props.milestone?.icons ?? []).join("") !== selectedIcons.value.join("") ||
    (props.milestone?.tags ?? []).join("") !== enteredTags.value.join("")
);

/**
 * Handles the select of an icon (on/off).  Each milestone can have multiple icons
 */
function handleToggleIcon(iconName: string) {
  const index = selectedIcons.value?.indexOf(iconName) ?? -1;

  if (index >= 0) {
    selectedIcons.value?.splice(index, 1);
  } else {
    selectedIcons.value?.push(iconName);
  }
}

/**
 * One save, we construct the milestone that we want to save.
 */
function handleSave() {
  const milestone: Milestone = {
    uid: props.milestone?.uid ?? nanoid(4),
    name: enteredName.value.trim(),
    color: selectedColor.value,
    icons: [...selectedIcons.value],
    tags: [...enteredTags.value],
    objective: enteredObjective.value.trim(),
    type: "milestone",
    rank: props.milestone?.rank ?? "",
  };

  const mode = props.milestone ? "update" : "add";

  emits("save", milestone, mode);
}
</script>

<style scoped></style>
