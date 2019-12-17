import Vue from 'vue';
import moment from 'moment';

Vue.use({
  install() {
    Vue.prototype.$moment = moment;
  },
});
