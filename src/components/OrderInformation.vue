<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column is-12">
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
              :disabled="timepickerDisabled"
              class="text-field"
              v-model="time"
              name="time"
              hour-format="12"
              icon="clock"
              :increment-minutes="15"
              :min-time="minTime"
              :max-time="maxTime"
              :mobile-native="false"
              :unselectable-times="unselectableTimes"
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
            <b-checkbox type="is-warning" v-model="curbside">
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
import LogRocket from "logrocket";
import cleave from "../utils/cleave-directive";
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
      minTime.setHours(this.orderStartTime, 0, 0);
      return minTime;
    },
    maxTime() {
      let maxTime = new Date();
      maxTime.setHours(this.orderEndTime, 45, 0);
      return maxTime;
    },
  },
  created() {
    this.now = new Date();
    if (this.now.getHours() >= 21 || this.now.getHours() < 10) {
      this.timepickerDisabled = true;
      this.time.setHours(this.orderStartTime);
      this.time.setMinutes(0);
    } else if (this.now.getHours() >= 10 && this.now.getHours() < 11) {
      // allow morning orders between 10 and 11
      let startTime = new Date();
      startTime.setHours(11, 0, 0);
      this.time = startTime;
    } else {
      this.timepickerDisabled = false;
      let startTime = new Date(this.now.getTime() + 15 * 60000);
      const minutes = startTime.getMinutes();
      const hours = startTime.getHours();

      let m = ((((minutes + 7.5) / 15) | 0) * 15) % 60;
      let h = (((minutes / 105 + 0.5) | 0) + hours) % 24;

      startTime.setMinutes(m);
      startTime.setHours(h);

      this.time = startTime;
    }
    this.setUnselectableHours();
  },
  data() {
    return {
      tipDollars: "",
      unselectableTimes: [],
      now: null,
      orderStartTime: 11,
      orderEndTime: 20,
      timepickerDisabled: false,
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
          this.formError();
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
    formError() {
      this.$buefy.toast.open({
        duration: 1000,
        message: `Please correct the form errors`,
        position: "is-top",
        type: "is-danger",
      });
    },
    setUnselectableHours() {
      const quarterHours = [0, 15, 30, 45];
      for (let i = this.orderStartTime; i <= this.now.getHours(); i++) {
        for (let j = 0; j < 4; j++) {
          let unselectableTime = new Date();
          unselectableTime.setHours(i);
          unselectableTime.setMinutes(quarterHours[j]);
          if (unselectableTime <= this.now) {
            this.unselectableTimes.push(unselectableTime);
          }
        }
      }
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
  margin: 0px !important;
  padding: 10px 0 10px 0;
}

@media screen and (max-width: 480px) {
  .container {
    width: 90%;
  }
}
</style>
