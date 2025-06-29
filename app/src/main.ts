import { createApp, markRaw } from "vue";
import "./style.css";
import App from "./App.vue";
import { Quasar } from "quasar";

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import "quasar/src/css/index.sass";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

import { createPinia } from "pinia";

import router from "./router";
import { type Router } from "vue-router";

import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import customParserFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import dayjs from "dayjs";

import "@quasar/extras/animate/fadeInDown.css";
import "@quasar/extras/animate/slideInDown.css";

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

const app = createApp(App);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
});

// Extend dayjs
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(customParserFormat);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Connect Pinia
const pinia = createPinia();

// Make the router available in the stores
pinia.use(({ store }) => {
  // https://stackoverflow.com/a/70905178/116051
  store.router = markRaw(router);
});

//pinia.use(firebaseSubscriptionsPlugin)
app.use(pinia);

// Connect Vue Router
app.use(router);

app.mount("#tempo-app");
