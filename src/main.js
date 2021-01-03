import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Buefy from "buefy";
import VueCurrencyFilter from "vue-currency-filter";
import VeeValidate from "vee-validate";
import { hours, phoneNumber } from "./utils/custom-validators";
import LogRocket from "logrocket";
import VueGtag from "vue-gtag";

// Configuration VueAnalytics
Vue.use(VueGtag, {
  config: { id: "UA-161150004-1" },
});

if (process.env.NODE_ENV === "production") {
  LogRocket.init("fe5lxt/seoulspice");
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
Vue.use(VeeValidate);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
