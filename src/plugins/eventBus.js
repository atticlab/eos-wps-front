import Vue from 'vue';

const EventBus = new Vue();

Vue.use({
  install() {
    Vue.prototype.$eventBus = EventBus;
  },
});
