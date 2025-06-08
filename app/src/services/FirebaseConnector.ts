import { defaultProfile, useAppStore } from "../stores/appStore";
import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  type NextFn,
  type User,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { useRouter, type Router } from "vue-router";
import { baseUrl } from "../utils/environment";
import { firebaseSubscriptions } from "./FirebaseSubscriptions";

/**
 * Class which encapsulates Firebase operations.
 */
class FirebaseConnector {
  /**
   * The Firebase configuration exported from the console.
   */
  private firebaseConfig = {
    apiKey: "AIzaSyDnLABPMEvzzwPzTqetiDOscFTWGbULQww",
    authDomain: "usetempo-app.firebaseapp.com",
    projectId: "usetempo-app",
    storageBucket: "usetempo-app.firebasestorage.app",
    messagingSenderId: "132409542105",
    appId: "1:132409542105:web:c6dc006a842ccc0f3a45c8",
    measurementId: "G-Y3X3XS9KRM",
  };

  private readonly googleProvider;
  private readonly microsoftProvider;
  private readonly githubProvider;
  private readonly app;
  private readonly auth;
  private readonly firestore;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.microsoftProvider = new OAuthProvider("microsoft.com");
    this.githubProvider = new GithubAuthProvider();
    this.app = initializeApp(this.firebaseConfig, "usetempo-app");
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);

    if (import.meta.env.DEV) {
      connectAuthEmulator(this.auth, "http://localhost:9099", {
        disableWarnings: true,
      });
      connectFirestoreEmulator(this.db, "localhost", 8080);
    }

    this.auth.onAuthStateChanged(
      this.handleUserStateChanged as NextFn<User | null>
    );

    this.auth.onIdTokenChanged(
      this.handleTokenStateChanged as NextFn<User | null>
    );
  }

  /**
   * The Firestore instance we're connected to.
   */
  public get db() {
    return this.firestore;
  }

  /**
   * Performs a login and then redirects the user to the requested page.
   * @param setUser The function to set the user in the store.
   * @param router The router instance used to route to the home page.
   */
  public loginGoogle(
    setUser: (authUser: User) => Promise<void>,
    router: Router
  ) {
    this.login(setUser, router, this.googleProvider);
  }

  /**
   * Performs a login and then redirects the user to the requested page.
   * @param setUser The function to set the user in the store.
   * @param router The router instance used to route to the home page.
   */
  public loginMicrosoft(
    setUser: (authUser: User) => Promise<void>,
    router: Router
  ) {
    this.login(setUser, router, this.microsoftProvider);
  }

  /**
   * Performs a login and then redirects the user to the requested page.
   * @param setUser The function to set the user in the store.
   * @param router The router instance used to route to the home page.
   */
  public loginGithub(
    setUser: (authUser: User) => Promise<void>,
    router: Router
  ) {
    this.login(setUser, router, this.githubProvider);
  }

  private login(
    setUser: (authUser: User) => Promise<void>,
    router: Router,
    provider: GoogleAuthProvider | GithubAuthProvider | OAuthProvider
  ) {
    signInWithPopup(this.auth, provider)
      .then(async (result) => {
        setUser(result.user);

        const route = router.currentRoute.value;
        const redirect = route.query.redirect?.toString();
        await router.replace(redirect ?? route.redirectedFrom?.fullPath ?? "/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Performs a logout and clears the current user from the store.
   * @param router The router instance used to route to the login page
   */
  public async logout(router: Router) {
    console.log(" 🔐 Logout");

    // Use this to trigger unsubscribe in all contexts.
    firebaseSubscriptions.dispose();

    await signOut(this.auth);

    try {
      const appStore = useAppStore();
      appStore.clearUser();

      // TODO: Reset any state

      // This event triggers the subscriptions to be disposed.
      document.dispatchEvent(new Event("tempo_logout"));

      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Gets the authorization token for the current user.
   */
  public getCurrentUserToken() {
    return this.auth.currentUser?.getIdToken(false);
  }

  /**
   * Invoked when the token state changes; this can occur when the token is
   * refreshed automatically.  Triggers 3 times on sign in, sign out, and refresh.
   * @param user The user
   */
  private handleTokenStateChanged(user: User) {
    const appStore = useAppStore();

    if (!user) {
      console.log(` 🔐 Token state changed; no user present`);

      return;
    }

    console.log(` 🔐 Token state changed; user present`);

    if (appStore.profile && appStore.profile.uid !== defaultProfile.uid) {
      console.log(` 🔐 Profile already present: ${appStore.profile.email}`);
      return;
    }

    console.log(` 🔐 Setting user`);

    appStore.setUser(user).then(async () => {
      console.log(
        ` 🔐 Current location: ${window.location.href}; baseUrl: ${baseUrl}`
      );

      if (
        window.location.href.replace(/\/$/gi, "") === baseUrl ||
        window.location.href.includes("/blog")
      ) {
        return;
      }

      const params = new URLSearchParams(window.location.search);

      // Check if there is a redirect and if the user is NOT on the /login page
      // Then we keep the user on that page without redirecting.
      if (!params.has("redirect") && !window.location.href.includes("/login")) {
        return;
      }

      const redirect = params.get("redirect") ?? "/home";

      const target = `${baseUrl}${redirect}`;

      console.log(
        ` 🔐 Redirect: ${redirect}, target: ${target}, location: ${window.location.href}`
      );

      // Only redirect if we're not already on the page and it's not the landing page
      if (target !== window.location.href) {
        console.log(` 🔐 Redirecting user to ${redirect}`);

        await appStore.route(redirect);
      }
    });
  }

  /**
   * Invoked when the user state is changed and the user is logged in.  This is
   * not as reliable since the user may already be considered logged in to the
   * SSO account so it may not trigger in all cases such as when the token is
   * still valid.
   * @param user The user
   */
  private handleUserStateChanged(user: User) {
    console.log(` 🔐 User state: ${user?.email ?? "logged out"}`);

    if (!user || !window.location.href.includes("login")) {
      console.log(` 🔐 No user or the URL is not the login page.`);
      return;
    }
  }
}

export const firebaseConnector = new FirebaseConnector();
