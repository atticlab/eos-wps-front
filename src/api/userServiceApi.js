import Vue from 'vue';
import axios from 'axios';

const userServiceApi = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API_HOST,
  withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const userServiceApiCalls = {
  test() {
    userServiceApi.get();
  },
};

// Use userServiceApi as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$userServiceApi = userServiceApiCalls;
  },
});
