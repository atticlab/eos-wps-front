import ActionType from '../../constants';

export default {
  [ActionType.SET_EOS]: (state, data) => {
    state.eos = Object.assign({}, data);
  },
  [ActionType.SET_EOS_ACCOUNT]: (state, data) => {
    state.eosAccount = data;
  },
};
