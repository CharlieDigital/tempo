import { orderBy, where } from "firebase/firestore";
import { firebaseSubscriptions } from "../services/FirebaseSubscriptions";
import {
  type WorkspaceTimeline,
  type Workspace,
  type TimelineEvent,
} from "../services/model";
import { makeTimelineId, timelineRepository } from "../services/Repository";
import dayjs from "dayjs";

/**
 * Store that holds the workspace timelines.  Each timeline entry here represents
 * a single day of events for the workspace.  We store all events for a day on the
 * workspace timeline so we load many entries at once and we can search by date.
 */
export function useTimeline(workspace: Ref<Workspace>) {
  const timelines = ref<WorkspaceTimeline[]>([]);

  const activeTimeline = computed<WorkspaceTimeline | undefined>(
    () => timelines.value?.[0]
  );

  watch(workspace, async () => {
    firebaseSubscriptions.unsubscribe("timeline");

    if (workspace && workspace.value.uid !== defaultWorkspace.uid) {
      await loadTimeline(workspace.value.uid);
    }
  });

  async function loadTimeline(workspaceUid: string) {
    if (workspaceUid === defaultWorkspace.uid) {
      return;
    }

    timelines.value.splice(0, timelines.value.length);

    const timelineUid = makeTimelineId(workspaceUid);

    const timelineSubscription = timelineRepository.subscribe(
      {
        added: (timeline) => {
          highlight(`Timeline loaded: ${timeline.uid}`);

          timelines.value.push(timeline);
        },
        modified: (timeline) => {
          highlight(`Timeline updated: ${timeline.uid}`);

          handleTimelineUpdate(timeline);
        },
        removed: (timeline) => {},
      },
      where("workspaceUid", "==", workspaceUid),
      where("uid", "==", timelineUid),
      orderBy("uid", "desc")
    );

    debug(
      `Subscribing to timeline for workspace: ${workspaceUid} or timeline: ${timelineUid}`
    );

    firebaseSubscriptions.register(`timelines`, timelineSubscription);
  }

  async function logTimelineEvent(event: TimelineEvent) {}

  function handleTimelineUpdate(timeline: WorkspaceTimeline) {
    if (!timeline.events || timeline.events.length === 0) {
      return;
    }

    // TODO: Do not rebind the whole list; just add the delta.
    const latest = timeline.events[timeline.events.length - 1];

    timelines.value?.[0]?.events.unshift(latest);
  }

  return {
    loadTimeline,
    logTimelineEvent,
    timelines,
    activeTimeline,
  };
}
