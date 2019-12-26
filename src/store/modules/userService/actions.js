import Eos from 'eosjs';
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs';
import ActionType from '../../constants';
import config from '@/config';

ScatterJS.plugins(new ScatterEOS());

export default {
  [ActionType.SCATTER_INIT]: async ({ commit }) => {
    try {
      commit(ActionType.SET_IS_SCATTER_INIT_LOADING, true);

      const connected = await ScatterJS.connect(config.appName, { network: config.eos });
      if (!connected) {
        throw new Error('Scatter not connected');
      }
      if (ScatterJS.isExtension) {
        throw new Error('Web scatter not supported');
      }
      commit(ActionType.SET_EOS, ScatterJS.eos(config.eos, Eos));

      if (!await ScatterJS.scatter.login()) return new Error('no identity');

      commit(ActionType.SET_EOS_ACCOUNT, ScatterJS.account('eos'));
      window.scatter = null;
      window.ScatterJS = null;
      return true;
    } catch (e) {
      console.error('ActionType.SCATTER_INIT', e);
      commit(ActionType.SET_IS_SCATTER_NOT_CONNECTED, true);
      throw e;
    } finally {
      commit(ActionType.SET_IS_SCATTER_INIT_LOADING, false);
    }
  },
  [ActionType.SCATTER_LOGOUT]: ({ commit }) => {
    if (ScatterJS && ScatterJS.scatter && ScatterJS.scatter.logout) {
      ScatterJS.scatter.logout();
    }
    commit(ActionType.SET_EOS, null);
    commit(ActionType.SET_EOS_ACCOUNT, null);
    commit(ActionType.SET_IS_BP, false);
  },
  [ActionType.SET_IS_BP]: ({ commit }, data) => commit(ActionType.SET_IS_BP, data),
  [ActionType.DEFINE_ROUTE_TO]: ({ commit }, data) => {
    commit(ActionType.SET_ROUTE_TO, data);
  },
};
