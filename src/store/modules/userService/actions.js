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
      commit(ActionType.SET_EOS, scatter.eos(config.eos, Eos));
      if (scatter.identity) {
        commit(ActionType.SET_EOS_ACCOUNT, scatter.account('eos'));
      }

      window.scatter = null;
      window.ScatterJS = null;
      return true;
    } catch (e) {
      console.error('ActionType.SCATTER_INIT', e);
      return false;
    }
  },
  [ActionType.SCATTER_LOGIN]: async ({ commit, dispatch }) => {
    try {
      commit(ActionType.SET_IS_SCATTER_LOGIN_LOADING, true);

      if (!ScatterJS.scatter && !await dispatch(ActionType.SCATTER_INIT)) {
        throw new Error('fail to SCATTER_INIT');
      }
      if (!await ScatterJS.scatter.login()) return new Error('no identity');
      commit(ActionType.SET_EOS_ACCOUNT, ScatterJS.scatter.account('eos'));
      return true;
    } catch (e) {
      console.error('ActionType.SCATTER_LOGIN', e);
      commit(ActionType.SET_IS_SCATTER_NOT_CONNECTED, true);
      return false;
    } finally {
      commit(ActionType.SET_IS_SCATTER_LOGIN_LOADING, false);
    }
  },
  [ActionType.SCATTER_LOGOUT]: ({ commit, dispatch }, data) => {
    if (ScatterJS.scatter && ScatterJS.scatter.logout) {
      ScatterJS.scatter.logout();
    }
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
