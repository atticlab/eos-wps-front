import Vue from 'vue';
import Eos from 'eosjs';
import config from '@/config';

const independentEosApi = Eos(config.eos);

const independentEosCalls = {
  getTableRows(table, scope, lowerBound = null, upperBound = null) {
    const reqObj = {
      json: true,
      code: Vue.prototype.$constants.CONTRACT_NAME,
      scope,
      table,
      table_key: '',
      lower_bound: lowerBound,
      upper_bound: upperBound,
      index_position: 1,
      key_type: 'i64',
      limit: 100,
      reverse: false,
      show_payer: false,
    };

    return independentEosApi.getTableRows(reqObj);
  },
};

// Use independentEosApi as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$independentEosApi = independentEosCalls;
  },
});
