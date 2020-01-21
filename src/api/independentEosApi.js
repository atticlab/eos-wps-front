import Vue from 'vue';
import Eos from 'eosjs';
import config from '@/config';

const independentEosApi = Eos(config.eos);

const independentEosCalls = {
  getTableRows(table, code, scope, lowerBound = null, upperBound = null, indexPosition = 1) {
    const reqObj = {
      json: true,
      code,
      scope,
      table,
      table_key: '',
      lower_bound: lowerBound,
      upper_bound: upperBound,
      index_position: indexPosition,
      key_type: 'i64',
      limit: 1000,
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
