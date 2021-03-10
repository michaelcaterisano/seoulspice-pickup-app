import { ORDER_API_URL } from "./config";
import axios from "axios";
import axiosRetry from "axios-retry";

const orderService = axios.create({
  baseURL: ORDER_API_URL,
  timeout: 5000,
});

axiosRetry(orderService, {
  retries: 3,
  retryCondition: error => {
    return error.response.status === 500;
  },
});

export { orderService };
