import Vue from 'vue';
import Vuex from 'vuex';
import userService from './modules/userService';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userService,
  },
  strict: process.env.NODE_ENV !== 'production',
});

// Use the store globally as a plugin
Vue.use({
  install() {
    Vue.prototype.$store = store;
  },
});

export default store;
