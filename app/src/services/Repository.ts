import { useAppStore } from "../stores/appStore";
import { firebaseConnector } from "./FirebaseConnector";
import type { Entity, Milestone, Profile, Workspace } from "./model";
import {
  collection,
  doc,
  type DocumentChangeType,
  Firestore,
  getDoc,
  onSnapshot,
  query,
  QueryConstraint,
  setDoc,
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
    };
    await setDoc(doc(this.db, this.collectionRoot, entity.uid), entity);
  }

  public subscribe(
    handlers: Record<DocumentChangeType, (doc: T) => void>,
    condition: QueryConstraint
  ): Unsubscribe {
    const q = query(collection(this.db, this.collectionRoot), condition);

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
