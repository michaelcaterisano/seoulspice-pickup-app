import { ORDER_API_URL } from "./config";
import axios from "axios";
import axiosRetry from "axios-retry";

const orderService = axios.create({
  baseURL: ORDER_API_URL,
  timeout: 5000,
});

let serverErrorNumbers = Array(100)
  .fill()
  .map((v, i) => i + 500);

axiosRetry(orderService, {
  retries: 3,
  retryCondition: error => {
    console.log("retrying");
    return serverErrorNumbers.includes(error.response.status);
  },
});

export { orderService };
