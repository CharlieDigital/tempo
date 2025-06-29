import { useAppStore } from "../stores/appStore";
import { firebaseConnector } from "./FirebaseConnector";
import type {
  ActionType,
  Entity,
  EntityRef,
  Profile,
  TimelineEvent,
  Workspace,
  WorkspaceTimeline,
} from "./model";
import {
  arrayUnion,
  collection,
  doc,
  type DocumentChangeType,
  type DocumentData,
  FieldValue,
  Firestore,
  getDoc,
  onSnapshot,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import type { Unsubscribe } from "firebase/auth";

/**
 * Base class for repositories.  Provides abstractions for commong CRUD operations and a
 * container for encapsulating the queries.
 */
export abstract class Repository<T extends Entity> {
  protected readonly db: Firestore;

  constructor(db?: Firestore) {
    if (db) {
      this.db = db;
    } else {
      this.db = firebaseConnector.db;
    }
  }

  protected abstract get collectionRoot(): string;

  public async findByUid(uid: string): Promise<T | undefined> {
    const docRef = doc(this.db, this.collectionRoot, uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : undefined;
  }

  public async create(entity: T) {
    const { profile } = useAppStore();

    if (!profile) {
      throw Error("No profile available.");
    }

    entity.schemaVersion = import.meta.env.VITE_SCHEMA_VERSION ?? 0;
    entity.createdUtc = dayjs().format();
    entity.createdBy = {
      uid: profile.uid,
      name: profile.name,
      type: "profile",
    };
    await setDoc(doc(this.db, this.collectionRoot, entity.uid), entity);
  }

  public async update(entity: T) {
    const { profile } = useAppStore();

    if (!profile) {
      throw Error("No profile available.");
    }

    entity.updatedUtc = dayjs().format();
    entity.createdBy = {
      uid: profile.uid,
      name: profile.name,
      type: "profile",
    };
    await setDoc(doc(this.db, this.collectionRoot, entity.uid), entity);
  }

  /**
   * Updates a single field on the document.  The update need not include all fields
   * so we can accept a partial field.
   * @param uid The UID of the entity to update; does not need to be attached to the entity
   * @param entity The document entity to update.
   */
  public async updateFields(
    uid: string,
    entity: { [P in keyof T]?: T[P] | undefined | FieldValue }
  ) {
    const { profile } = useAppStore();

    if (!profile) {
      throw Error("No profile available; user is not logged in.");
    }

    entity.updatedBy = {
      uid: profile.uid,
      name: profile.name,
      createdUtc: dayjs.utc().toISOString(),
      type: "profile",
    } as EntityRef;

    entity.updatedUtc = dayjs.utc().toISOString();

    const docRef = doc(this.db, this.collectionRoot, uid);
    await updateDoc(docRef, entity as DocumentData);
  }

  public subscribe(
    handlers: Record<DocumentChangeType, (doc: T) => void>,
    ...condition: QueryConstraint[]
  ): Unsubscribe {
    const q = query(collection(this.db, this.collectionRoot), ...condition);

    return onSnapshot(q, (snapshot) => {
      for (const docChange of snapshot.docChanges()) {
        handlers[docChange.type](docChange.doc.data() as T);
      }
    });
  }
}

/**
 * Repository for working with profiles.
 */
class ProfileRepository extends Repository<Profile> {
  constructor(db?: Firestore) {
    super(db);
  }

  protected get collectionRoot(): string {
    return "profiles";
  }
}

export const profileRepository = new ProfileRepository();

/**
 * Repository for workspaces
 */
class WorkspaceRepository extends Repository<Workspace> {
  constructor(db?: Firestore) {
    super(db);
  }

  protected get collectionRoot(): string {
    return "workspaces";
  }
}

export const workspaceRepository = new WorkspaceRepository();

/**
 * Repository for timelines.  Each timeline is a collection of
 * timeline events that are associated with a workspace for a given
 * day, one day at a time.
 */
class TimelineRepository extends Repository<WorkspaceTimeline> {
  constructor(db?: Firestore) {
    super(db);
  }

  protected get collectionRoot(): string {
    return "timelines";
  }

  async logAdd(text: string, scope: EntityRef, name?: string) {
    return await this.log(text, "add", scope, name);
  }

  async logDelete(text: string, scope: EntityRef, name?: string) {
    return await this.log(text, "delete", scope, name);
  }

  async logUpdate(text: string, scope: EntityRef, name?: string) {
    return await this.log(text, "update", scope, name);
  }

  async log(
    text: string,
    actionType: ActionType,
    scope: EntityRef,
    name?: string
  ) {
    const { profile } = useAppStore();
    const { activeWorkspace } = useDataStore();

    if (!profile) {
      throw Error("No profile available; user is not logged in.");
    }

    const workspaceUid = activeWorkspace?.uid;

    const uid = makeTimelineId(workspaceUid);

    const docRef = doc(this.db, this.collectionRoot, uid);

    const now = dayjs().utc().toISOString();

    const event: TimelineEvent = {
      affectedEntity: {
        ...scope,
        createdUtc: now,
      },
      createdBy: {
        uid: profile.uid,
        name: profile.name ?? profile.email,
        type: "profile",
      },
      text,
      actionType: actionType,
      uid: nanoid(4),
      name: name ?? scope.name,
      workspaceUid,
      createdUtc: now,
    };

    await setDoc(
      docRef,
      {
        uid,
        workspaceUid,
        events: arrayUnion(event),
      } as DocumentData,
      { merge: true }
    );
  }
}

export const timelineRepository = new TimelineRepository();

export const recordAdd = async (
  text: string,
  scope: EntityRef,
  name?: string
) => {
  return await timelineRepository.log(text, "add", scope, name);
};

export const recordDelete = async (
  text: string,
  scope: EntityRef,
  name?: string
) => {
  return await timelineRepository.log(text, "delete", scope, name);
};

export const recordUpdate = async (
  text: string,
  scope: EntityRef,
  name?: string
) => {
  return await timelineRepository.log(text, "update", scope, name);
};

/**
 * Makes a timeline ID.
 * @param workspaceUid The UID of the workspace
 */
export const makeTimelineId = (workspaceUid: string) =>
  `${workspaceUid}_${dayjs().utc().format("YYYY_MM_DD")}`;
