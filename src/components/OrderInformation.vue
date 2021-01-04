<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <b-message
            type="is-danger"
            aria-close-label="Form Error"
            v-if="formError"
          >
            Please correct the form errors.
          </b-message>
          <b-field
            label="Enter Name for Pickup"
            :type="{ 'is-danger': errors.has('name') }"
            :message="errors.first('name')"
          >
            <b-input
              class="text-field"
              v-model="name"
              name="name"
              type="text"
              key="name-input"
              v-validate="'required'"
            ></b-input>
          </b-field>
          <b-field
            label="Email"
            :type="{ 'is-danger': errors.has('email') }"
            :message="errors.first('email')"
          >
            <b-input
              class="text-field"
              v-model="email"
              name="email"
              type="email"
              icon="envelope"
              v-validate="'required|email'"
            ></b-input>
          </b-field>
          <b-field
            label="Phone Number"
            :type="{ 'is-danger': errors.has('phone') }"
            :message="errors.first('phone')"
          >
            <b-input
              class="text-field"
              v-model="phone"
              name="phone"
              type="phone"
              icon="phone"
              v-validate="'required|phoneNumber'"
            ></b-input>
          </b-field>
          <b-field
            label="Time"
            :type="{ 'is-danger': errors.has('time') }"
            :message="errors.first('time')"
          >
            <b-timepicker
              v-model="time"
              name="time"
              hour-format="12"
              icon="clock"
              :increment-minutes="15"
              :min-time="minTime"
              :max-time="maxTime"
              :mobile-native="false"
              v-validate="{ required: true, hours: [minTime, maxTime] }"
              :use-html5-validation="false"
            ></b-timepicker>
          </b-field>
          <b-field label="Would you like to add a tip?">
            <div class="tip-buttons is-size-7">
              <b-radio name="name" native-value=".1" @input="updateTip">
                10%
              </b-radio>
              <b-radio name="name" native-value=".15" @input="updateTip">
                15%
              </b-radio>
              <b-radio name="name" native-value=".2" @input="updateTip">
                20%
              </b-radio>
            </div>
          </b-field>
          <b-field
            message="Choose a percentage or enter a custom amount in the provided box."
          >
            <b-input
              class="text-field"
              v-cleave="masks.numeral"
              v-model="tipDollars"
              @change.native="setCustomTip"
            ></b-input>
          </b-field>
          <b-field>
            <b-checkbox
              class="curbside-checkbox"
              type="is-warning"
              v-model="curbside"
            >
              Curbside pickup
            </b-checkbox>
          </b-field>
          <div class="has-text-centered buttons">
            <b-button class="button is-success" @click.prevent="pay">
              <span>FINISH AND PAY</span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
import { mapGetters } from "vuex";
import locations from "../config/locations";
import LogRocket from "logrocket";
import cleave from "../utils/cleave-directive";
import { orderStartTime, orderEndTime } from "../config/config";
import money from "currency.js";

const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});
export default {
  computed: {
    ...mapFields([
      "name",
      "email",
      "phone",
      "location",
      "time",
      "curbside",
      "tip",
    ]),
    ...mapGetters(["subtotal", "items", "taxRate"]),
    minTime() {
      let minTime = new Date();
      minTime.setHours(orderStartTime, 0, 0);
      return minTime;
    },
    maxTime() {
      let maxTime = new Date();
      maxTime.setHours(orderEndTime, 0, 0);
      return maxTime;
    },
  },
  created() {
    const now = new Date();

    if (now.getHours() >= orderEndTime || now.getHours() < orderStartTime) {
      now.setHours(orderStartTime);
      now.setMinutes(0);
      this.time = now;
    } else {
      let startTime = new Date(now.getTime() + 15 * 60000);
      const minutes = startTime.getMinutes();
      const hours = startTime.getHours();

      let m = ((((minutes + 7.5) / 15) | 0) * 15) % 60;
      let h = (((minutes / 105 + 0.5) | 0) + hours) % 24;

      startTime.setMinutes(m);
      startTime.setHours(h);

      this.time = startTime;
    }
  },
  data() {
    return {
      locations: locations,
      tipDollars: "",
      formError: false,
      masks: {
        numeral: {
          numeral: true,
          numeralDecimalScale: 2,
          numeralThousandsGroupStyle: "thousand",
          prefix: "$ ",
        },
      },
    };
  },
  directives: { cleave },
  methods: {
    pay() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (process.env.NODE_ENV === "production") {
            LogRocket.identify(this.email, {
              name: this.name,
            });
          }
          this.$emit("update", "payment"); // emits event to change active component
        } else {
          this.formError = true;
          window.scrollTo(0, 0);
        }
      });
    },
    updateTip(val) {
      let tipAmountCents = Math.round(this.subtotal * val);
      this.tip = tipAmountCents;
      this.tipDollars = money(tipAmountCents, { pattern: `! #` })
        .divide(100)
        .format();
    },
    setCustomTip(e) {
      this.tip = money(e.target.value).multiply(100).value;
    },
  },
  name: "OrderInformation",
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 600px !important;
}
.columns {
  padding: 10px;
}
.b-checkbox {
  margin-top: 1em;
}
.text-field {
  border: 1px solid black;
  border-radius: 2px;
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  width: 100%;
}

.b-checkbox.checkbox {
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: transparent !important;
  outline: none;
  color: black;
}

@media screen and (max-width: 480px) {
  .container {
    width: 90%;
  }
}
</style>
