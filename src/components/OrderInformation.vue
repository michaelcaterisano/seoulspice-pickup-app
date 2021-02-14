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
              data-cy="info-name"
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
              data-cy="info-email"
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
              data-cy="info-phone"
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
          <p v-if="preorder || closed" class="timepicker-message">
            {{ timepickerMessage }}
          </p>
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
              data-cy="info-tip"
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
import {
  openingTimeHour,
  closingTimeHour,
  closingTimeMinute
} from "../config/config";

const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField"
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
      "tip"
    ]),
    ...mapGetters(["subtotal", "items", "taxRate"]),
    minTime() {
      let minTime = new Date();
      minTime.setHours(openingTimeHour, 0, 0);
      return minTime;
    },
    maxTime() {
      let maxTime = new Date();
      maxTime.setHours(closingTimeHour, closingTimeMinute, 0);
      return maxTime;
    },
    timepickerMessage() {
      if (this.preorder) {
        return `Preorder for ${this.pickupDate}`;
      } else if (this.closed) {
        return "Sorry, we're no longer accepting orders";
      } else {
        return "";
      }
    },
    pickupDate() {
      const date = new Date(this.now);
      if (date.getHours() >= closingTimeHour) {
        date.setDate(date.getDate() + 1);
      }
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
  },
  created() {
    this.now = new Date();
    this.openingTime = new Date(this.now);
    this.closingTime = new Date(this.now);
    this.openingTime.setHours(openingTimeHour);
    this.closingTime.setHours(closingTimeHour);
    this.closingTime.setMinutes(closingTimeMinute);
    if (this.now < this.openingTime) {
      this.time = new Date();
      this.time.setHours(openingTimeHour);
      this.time.setMinutes(0);
    } else if (this.tooLate(this.now)) {
      this.closed = true;
      this.timepickerDisabled = true;
      this.time = this.closingTime;
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

      //don't allow orders after 8:45pm
      if (this.tooLate(startTime)) {
        this.time.setHours(closingTimeHour);
        this.time.setMinutes(closingTimeMinute);
      } else {
        this.time = startTime;
      }
    }
    this.setUnselectableHours();
  },
  mounted() {
    if (this.isPM()) {
      this.disableAM();
    }
  },
  data() {
    return {
      tipDollars: "",
      unselectableTimes: [],
      now: null,
      openingTime: null,
      closingTime: null,
      timepickerDisabled: false,
      preorder: false,
      closed: false,
      masks: {
        numeral: {
          numeral: true,
          numeralDecimalScale: 2,
          numeralThousandsGroupStyle: "thousand",
          prefix: "$ "
        }
      }
    };
  },
  directives: { cleave },
  methods: {
    pay() {
      if (!this.closed) {
        this.$validator.validateAll().then(result => {
          if (result) {
            if (process.env.NODE_ENV === "production") {
              LogRocket.identify(this.email, {
                name: this.name
              });
            }
            this.$emit("update", "payment"); // emits event to change active component
          } else {
            this.formError();
            window.scrollTo(0, 0);
          }
        });
      } else {
        this.$buefy.toast.open({
          duration: 2000,
          message: "Sorry, we're no longer accepting orders for today.",
          type: "is-danger"
        });
      }
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
        type: "is-danger"
      });
    },
    setUnselectableHours() {
      const quarterHours = [0, 15, 30, 45];
      for (let i = 0; i <= this.now.getHours(); i++) {
        for (let j = 0; j < 4; j++) {
          let unselectableTime = this.getUnselectableTime(
            i,
            quarterHours[j],
            0,
            0
          );
          if (unselectableTime <= this.now || this.tooSoon(unselectableTime)) {
            this.unselectableTimes.push(unselectableTime);
          }
        }
      }
    },
    getUnselectableTime(hours, minutes, seconds, milliseconds) {
      let unselectableTime = new Date();
      unselectableTime.setHours(hours);
      unselectableTime.setMinutes(minutes);
      unselectableTime.setSeconds(seconds);
      unselectableTime.setMilliseconds(milliseconds);
      return unselectableTime;
    },
    tooSoon(time) {
      return (
        time.getHours() === this.now.getHours() &&
        Math.abs(time.getMinutes() - this.now.getMinutes()) < 8
      );
    },
    tooLate(time) {
      return time > this.closingTime;
    },
    isPM() {
      const noon = new Date();
      noon.setHours(12);
      noon.setMinutes(0);
      noon.setSeconds(0);
      noon.setMilliseconds(0);
      return this.now >= noon;
    },
    disableAM() {
      const options = document.getElementsByTagName("option");
      for (let option of options) {
        if (option.value === "AM") {
          option.disabled = true;
        }
      }
    }
  },
  name: "OrderInformation"
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

.timepicker-message {
  margin-top: -15px;
  color: red;
  font-size: 17px;
}

@media screen and (max-width: 480px) {
  .container {
    width: 90%;
  }
}
</style>
