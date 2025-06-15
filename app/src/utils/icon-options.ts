import {
  tabAdjustments,
  tabAlertTriangle,
  tabAlarm,
  tabArchive,
  tabArrowsSplit,
  tabAt,
  tabBell,
  tabCheckbox,
  tabBook,
  tabCalendar,
  tabCheckupList,
  tabClock,
  tabCloud,
  tabDatabase,
  tabDeviceDesktop,
  tabDeviceMobile,
  tabEdit,
  tabEye,
  tabFlag2,
  tabFlask,
  tabFolder,
  tabHeart,
  tabHelpSquareRounded,
  tabHourglass,
  tabKeyboard,
  tabLock,
  tabMail,
  tabMessage,
  tabPackage,
  tabPencil,
  tabPhotoSquareRounded,
  tabSpeakerphone,
  tabStack2,
  tabStar,
  tabSwitch,
  tabTags,
  tabUser,
  tabVideo,
  tabUsersGroup,
  tabTransfer,
  tabBattery,
  tabBattery1,
  tabBattery2,
  tabBattery4,
  tabBattery3,
} from "quasar-extras-svg-icons/tabler-icons-v2";

import {
  suiSignalFull,
  suiSignalLow,
  suiSignalMedium,
  suiSignalNone,
} from "quasar-extras-svg-icons/system-uicons";

/**
 * Type that represents options with icons for selects.
 */
export type IconOption = {
  value: string;
  icon: string;
};

/**
 * A mapping of icon values to icon strings.  We only store the `value` since this
 * is a short name for the icon.
 */
export const iconOptions: IconOption[] = [
  { value: "alarm", icon: tabAlarm },
  { value: "alert", icon: tabAlertTriangle },
  { value: "adjustments", icon: tabAdjustments },
  { value: "archive", icon: tabArchive },
  { value: "arrowsSplit", icon: tabArrowsSplit },
  { value: "at", icon: tabAt },
  { value: "bell", icon: tabBell },
  { value: "book", icon: tabBook },
  //
  { value: "calendar", icon: tabCalendar },
  { value: "check", icon: tabCheckbox },
  { value: "checkUpList", icon: tabCheckupList },
  { value: "clock", icon: tabClock },
  { value: "cloud", icon: tabCloud },
  { value: "database", icon: tabDatabase },
  { value: "device", icon: tabDeviceDesktop },
  { value: "deviceMobile", icon: tabDeviceMobile },
  //
  { value: "edit", icon: tabEdit },
  { value: "eye", icon: tabEye },
  { value: "flag", icon: tabFlag2 },
  { value: "flask", icon: tabFlask },
  { value: "folder", icon: tabFolder },
  { value: "heart", icon: tabHeart },
  { value: "help", icon: tabHelpSquareRounded },
  { value: "hourglass", icon: tabHourglass },
  //
  { value: "keyboard", icon: tabKeyboard },
  { value: "lock", icon: tabLock },
  { value: "mail", icon: tabMail },
  { value: "message", icon: tabMessage },
  { value: "package", icon: tabPackage },
  { value: "pencil", icon: tabPencil },
  { value: "photo", icon: tabPhotoSquareRounded },
  { value: "speakerphone", icon: tabSpeakerphone },
  //
  { value: "stack", icon: tabStack2 },
  { value: "star", icon: tabStar },
  { value: "switch", icon: tabSwitch },
  { value: "tags", icon: tabTags },
  { value: "transfer", icon: tabTransfer },
  { value: "user", icon: tabUser },
  { value: "userGroup", icon: tabUsersGroup },
  { value: "video", icon: tabVideo },
];

export type IconName = (typeof iconOptions)[number]["value"];

/**
 * A list of all the icons that can be used in the app keyed by the icon value.
 */
export const iconOptionsMap = iconOptions
  .filter((i) => i.value !== "route")
  .reduce((acc, icon) => {
    acc[icon.value] = icon.icon;

    return acc;
  }, {} as Record<string, string>);

/**
 * Priority options for tasks.
 */
export const taskPriorityOptions = [
  { value: "low", icon: suiSignalNone },
  { value: "medium", icon: suiSignalLow },
  { value: "high", icon: suiSignalMedium },
  { value: "urgent", icon: suiSignalFull },
];

export const taskPriorityOptionsMap = taskPriorityOptions.reduce(
  (acc, option) => {
    acc[option.value] = option.icon;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Effort options for tasks
 */
export const taskEffortOptions = [
  { value: "low", icon: tabBattery1 },
  { value: "medium", icon: tabBattery2 },
  { value: "high", icon: tabBattery3 },
  { value: "very_high", icon: tabBattery4 },
];

export const taskEffortOptionsMap = taskEffortOptions.reduce((acc, option) => {
  acc[option.value] = option.icon;
  return acc;
}, {} as Record<string, string>);
