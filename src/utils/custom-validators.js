import PhoneNumber from "awesome-phonenumber";
import discountCodes from "../config/discount-codes.js";

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = formatMinutes(minutes);
  return hours + ":" + minutes + " " + ampm;
}

function formatMinutes(minutes) {
  return minutes < 10 ? "0" + minutes : minutes;
}

export const phoneNumber = {
  getMessage: (field) => `${field} is not a valid US phone number`,
  validate(value) {
    let phone = new PhoneNumber(value, "US");
    return phone.isValid();
  },
};

export const discountCode = {
  getMessage: () => `discount code not found`,
  validate(value) {
    console.log(discountCodes);
    return discountCodes.some((discountCode) => discountCode.code === value);
  },
};

export const tomorrow = {
  getMessage() {
    return "Online catering orders require a minimum of 24 hours notice.";
  },
  validate(value, args) {
    value.setHours(0, 0, 0, 0);
    args[0].setHours(0, 0, 0, 0);
    return value.getTime() >= args[0].getTime();
  },
};

export const hours = {
  getMessage(field, args) {
    return (
      "Orders can be placed between " +
      formatTime(args[0]) +
      " and " +
      formatTime(args[1])
    );
  },
  validate(value, args) {
    const minTime =
      args[0].getHours().toString() +
      formatMinutes(args[0].getMinutes()).toString();
    const maxTime =
      args[1].getHours().toString() +
      formatMinutes(args[1].getMinutes()).toString();
    const submittedTime =
      value.getHours().toString() +
      formatMinutes(value.getMinutes()).toString();

    return submittedTime >= minTime && submittedTime <= maxTime;
  },
};

export default {
  tomorrow,
  hours,
  phoneNumber,
};
