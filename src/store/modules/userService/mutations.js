import ActionType from '../../constants';

export default {
  [ActionType.SET_EOS]: (state, data) => {
    state.eos = Object.assign({}, data);
  },
  [ActionType.SET_EOS_ACCOUNT]: (state, data) => {
    state.eosAccount = data;
  },
  [ActionType.SET_IS_BP]: (state, data) => {
    state.isBp = data;
  },
  [ActionType.SET_IS_SCATTER_LOGIN_LOADING]: (state, data) => {
    state.isScatterLoginLoading = data;
  },
  [ActionType.SET_IS_SCATTER_NOT_CONNECTED]: (state, data) => {
    state.isScatterNotConnected = data;
  },
  [ActionType.SET_ROUTE_TO]: (state, data) => {
    state.routeTo = data;
  },
};
