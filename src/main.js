import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Buefy from "buefy";
import VueCurrencyFilter from "vue-currency-filter";
import VeeValidate from "vee-validate";
import { hours, phoneNumber, discountCode } from "./utils/custom-validators";
import LogRocket from "logrocket";
import VueGtag from "vue-gtag";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

// Configuration VueAnalytics
Vue.use(VueGtag, {
  config: { id: "UA-161150004-1" },
});

if (process.env.NODE_ENV === "production") {
  LogRocket.init("mphkf6/seoulspice-pickup");
  Sentry.init({
    Vue,
    dsn:
      "https://788b08e2123e4e91b21de5b1ee06990e@o503252.ingest.sentry.io/5588157",
    autoSessionTracking: true,
    // logErrors true,
    tracingOptions: {
      trackComponents: true,
    },
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: false,
});

VeeValidate.Validator.extend("hours", hours);
VeeValidate.Validator.extend("phoneNumber", phoneNumber);
VeeValidate.Validator.extend("discountCode", discountCode);
Vue.use(VeeValidate);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
