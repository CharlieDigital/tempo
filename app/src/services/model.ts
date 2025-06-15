import type { ItemColor } from "../utils/color-options";

/**
 * A simple reference type that holds a UID and name because this is a
 * document oriented database.
 */
export type Ref = {
  uid: string;
  name: string;
};

/**
 * The base entity type that holds common fields for all entities.
 */
export type Entity = {
  createdBy?: Ref;
  updatedBy?: Ref;
  createdUtc?: string;
  updatedUtc?: string;
  schemaVersion?: number;
} & Ref;

/**
 * An invite created for another user to join the workspace.
 */
export type Invite = {
  /**
   * The email address of the user the invite is for.
   */
  email: string;
  /**
   * The first name of the invitee
   */
  firstName: string;
  /**
   * The last name of the invitee
   */
  lastName: string;
  /**
   * The message associated with the invite
   */
  message: string;
} & Entity;

/**
 * A user profile represents the user in the system.
 */
export type Profile = {
  /**
   * The email address of the user.
   */
  email: string;
  /**
   * True if the user completed onboarding
   */
  completedOnboarding?: boolean;
  /**
   * The default workspace for the user.
   */
  defaultWorkspace?: Ref;
} & Entity;

/**
 * A workspace is a container for the tasks, milestones, and objectives.
 */
export type Workspace = {
  /**
   * The list of objectives associated with this workspace
   */
  objectives?: Ref[];
  /**
   * The list of users associated with this workspace; use a record for rule eval.
   */
  users?: Record<string, string>;
  /**
   * The heading for the workspace; represents the current sprint, current goal, etc.
   */
  headline?: string;
  /**
   * The description of the current iteration
   */
  headlineDetails?: string;
  /**
   * The active target date
   */
  activeTargetDate?: string;
  /**
   * A string array that represents the groupings of tasks (embedded)
   */
  workstreams: Workstream[];
  /**
   * The milestones for this workspace (embedded)
   */
  milestones: Milestone[];
} & Entity;

/**
 * Represents a named workstream within a workspace.  These can be
 * different subsets of work such as "Sales" or "Engineering".
 */
export type Workstream = {} & Ref;

/**
 * A milestone represents a specific objective within a workspace.
 */
export type Milestone = {
  /**
   * The description about the milestone's objective
   */
  objective: string;
  /**
   * The target date for the milestone in ISO8601 format
   */
  targetDate?: string;
  /**
   * A set of tags associated with this milestone
   */
  tags?: string[];
  /**
   * A color associated with the milestone
   */
  color?: ItemColor;
  icons?: IconName[];
} & Ref;

/**
 * A task associated with the workspace and assigned to one or more users.
 */
export type Task = {
  /**
   * The UID of the workspace (for ease of retrieval)
   */
  workspaceUid: string;
  /**
   * A task belongs to a single milestone.
   */
  milestoneUid?: string;
  /**
   * The assignees for the task
   */
  assignees: Record<string, string>;
  /**
   * The current completion step of the task.  This is a number between
   * 0 and 10 that represents completion percentage.
   */
  step: number;
  /**
   * The tags associated with the task
   */
  tags?: string[];
  /**
   * The detailed text associated with the task
   */
  description?: string;
  /**
   * A Lexorank string that represents the task's rank in the list.
   */
  rank: string;
  targetDate: string;
  icon?: IconName;
  color?: ItemColor;
} & Entity;

/**
 * A timeline event represents a specific event that occurred within a workspace.
 */
export type TimelineEvent = {
  /**
   * The UID of the workspace (for ease of retrieval)
   */
  workspaceUid: string;
  /**
   * A description of the event
   */
  text: string;
  /**
   * Date and time the event occurred in ISO 8601 UTC format.
   */
  createdUtc: string;
  /**
   * A reference pointing to the user that generated the timeline event
   */
  createdBy: Ref;
} & Entity;
