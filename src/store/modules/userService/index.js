import mutations from './mutations';
import actions from './actions';

const state = {
  eos: null,
  eosAccount: null,
  scatter: null,
};

/* eslint-disable */
const getters = {
  getAccountNameWithAuthority(state, getters) {
    return state.eosAccount ? `${getters.getAccountName}@${getters.getAccountPermission}` : '';
  },
  getAccountName(state) {
    return state.eosAccount ?  state.eosAccount.name : '';
  },
  getAccountPermission(state) {
    return state.eosAccount ?  state.eosAccount.authority : '';
  },
};
/* eslint-enable */

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
