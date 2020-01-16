import Eos from 'eosjs';
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs';
import router from '../../../router';
import ActionType from '../../constants';
import config from '@/config';

ScatterJS.plugins(new ScatterEOS());

export default {
  [ActionType.SCATTER_INIT]: async ({ commit }) => {
    try {
      const connected = await ScatterJS.connect(config.appName, { network: config.eos });
      if (!connected) {
        throw new Error('Scatter not connected');
      }
      if (ScatterJS.isExtension) {
        throw new Error('Web scatter not supported');
      }
      const { scatter } = ScatterJS;
      commit(ActionType.SET_SCATTER, scatter);
      commit(ActionType.SET_EOS, scatter.eos(config.eos, Eos));
      if (scatter.identity) {
        commit(ActionType.SET_EOS_ACCOUNT, scatter.account('eos'));
      }

      window.scatter = null;
      window.ScatterJS = null;
      return true;
    } catch (e) {
      console.error('ActionType.SCATTER_INIT', e);
      throw e;
    }
  },
  [ActionType.SCATTER_LOGIN]: async ({ commit, dispatch, state }) => {
    try {
      commit(ActionType.SET_IS_SCATTER_LOGIN_LOADING, true);

      if (!state.scatter) {
        await dispatch(ActionType.SCATTER_INIT);
      }
      if (!await state.scatter.login()) return new Error('no identity');
      commit(ActionType.SET_EOS_ACCOUNT, state.scatter.account('eos'));
      return true;
    } catch (e) {
      console.error('ActionType.SCATTER_LOGIN', e);
      commit(ActionType.SET_IS_SCATTER_NOT_CONNECTED, true);
      throw e;
    } finally {
      commit(ActionType.SET_IS_SCATTER_LOGIN_LOADING, false);
    }
  },
  [ActionType.SCATTER_LOGOUT]: ({ commit, dispatch, state }, data) => {
    if (state.scatter && state.scatter.logout) {
      state.scatter.logout();
    }
    commit(ActionType.SET_EOS, null);
    commit(ActionType.SET_EOS_ACCOUNT, null);
    commit(ActionType.SET_IS_BP, false);
    dispatch(ActionType.DEFINE_ROUTE_TO, null);
    if (data !== 'ProposalsActive') {
      router.push({ name: 'ProposalsActive' });
    }
  },
  [ActionType.SET_IS_BP]: ({ commit }, data) => commit(ActionType.SET_IS_BP, data),
  [ActionType.DEFINE_ROUTE_TO]: ({ commit }, data) => {
    commit(ActionType.SET_ROUTE_TO, data);
  },
};
