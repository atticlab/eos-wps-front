import Vue from 'vue';
import Eos from 'eosjs';
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs';
import router from '../../../router';
import ActionType from '../../constants';
import config from '@/config';

const proposalsTable = 'proposals';
const depositsTable = 'deposits';
const draftsTable = 'drafts';
const eosPriceTable = 'orarates';
const settingsTable = 'settings';
const stateTable = 'state';
const votesTable = 'votes';

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

      if ((!ScatterJS.scatter
          && !await dispatch(ActionType.SCATTER_INIT))
          || !ScatterJS.scatter.login) {
        throw new Error('Failed to SCATTER_INIT');
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

  [ActionType.REQUEST_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME]: async ({ commit }, proposalName) => {
    if (!proposalName) {
      throw new Error('you should specify proposalName');
    }
    const indexPosition = 1; // proposalName

    try {
      commit(ActionType.SET_IS_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME_LOADING, true);
      const response = await Vue.prototype.$independentEosApi
        .getTableRows(
          proposalsTable,
          Vue.prototype.$constants.CONTRACT_NAME,
          Vue.prototype.$constants.CONTRACT_NAME,
          proposalName,
          proposalName,
          indexPosition,
        );
      const result = response.rows;
      if (!result || !result.length) {
        commit(ActionType.SET_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME, {});
        return;
      }

      commit(ActionType.SET_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME,
        Vue.prototype.$helpers.copyDeep(result[0]));
    } catch (e) {
      console.error('REQUEST_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME_LOADING, false);
    }
  },
  [ActionType.REQUEST_PROPOSALS]: async ({ commit }) => {
    let response = null;
    let lowerBound = 'active';
    const upperBound = lowerBound;
    const result = [];
    const indexPosition = 2; // status

    try {
      commit(ActionType.SET_IS_ACTIVE_PROPOSALS_LOADING, true);
      do {
        /* eslint-disable */
        response = await Vue.prototype.$independentEosApi
          .getTableRows(
            proposalsTable,
            Vue.prototype.$constants.CONTRACT_NAME,
            Vue.prototype.$constants.CONTRACT_NAME,
            lowerBound,
            upperBound,
            indexPosition,
          );
        /* eslint-enable */
        result.push(...response.rows);
        lowerBound = response.next_key;
      } while (response.more);

      if (!result || !result.length) {
        commit(ActionType.SET_PROPOSALS, []);
        return;
      }

      commit(ActionType.SET_PROPOSALS, Vue.prototype.$helpers.copyDeep(result));
    } catch (e) {
      console.error('REQUEST_PROPOSALS', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_ACTIVE_PROPOSALS_LOADING, false);
    }
  },
  [ActionType.REQUEST_DEPOSIT]: async ({ commit, getters }) => {
    const lowerBound = getters.getAccountName;
    const upperBound = getters.getAccountName;
    let response = null;
    const indexPosition = 1;

    try {
      commit(ActionType.SET_IS_DEPOSITS_LOADING, true);
      response = await Vue.prototype.$independentEosApi
        .getTableRows(
          depositsTable,
          Vue.prototype.$constants.CONTRACT_NAME,
          Vue.prototype.$constants.CONTRACT_NAME,
          lowerBound,
          upperBound,
          indexPosition,
        );
      const result = response.rows;
      if (!result || !result.length) {
        return;
      }

      commit(ActionType.SET_DEPOSIT, Vue.prototype.$helpers.copyDeep(result[0]));
    } catch (e) {
      console.error('REQUEST_DEPOSIT', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_DEPOSITS_LOADING, false);
    }
  },
  [ActionType.REQUEST_DRAFT_BY_PROPOSAL_NAME]: async ({ commit, getters }, proposalName) => {
    const indexPosition = 1;

    if (!getters.getAccountName) {
      throw new Error('you should login in Scatter');
    }
    if (!proposalName) {
      throw new Error('you should specify proposalName');
    }
    try {
      commit(ActionType.SET_IS_DRAFT_PROPOSAL_BY_PROPOSAL_NAME_LOADING, true);
      const response = await Vue.prototype.$independentEosApi
        .getTableRows(
          draftsTable,
          Vue.prototype.$constants.CONTRACT_NAME,
          getters.getAccountName,
          proposalName,
          proposalName,
          indexPosition,
        );
      const result = response.rows;
      if (!result || !result.length) {
        commit(ActionType.SET_DRAFT_BY_PROPOSAL_NAME, {});
        return;
      }
      commit(ActionType.SET_DRAFT_BY_PROPOSAL_NAME, Vue.prototype.$helpers.copyDeep(result[0]));
    } catch (e) {
      console.error('REQUEST_DRAFT_BY_PROPOSAL_NAME', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_DRAFT_PROPOSAL_BY_PROPOSAL_NAME_LOADING, false);
    }
  },
  [ActionType.REQUEST_DRAFTS_BY_ACCOUNT_NAME]: async ({ commit, getters }) => {
    let lowerBound = '';
    let response = null;
    const result = [];
    const indexPosition = 1;

    if (!getters.getAccountName) {
      throw new Error('you should login in Scatter');
    }
    try {
      commit(ActionType.SET_IS_DRAFTS_BY_ACCOUNT_NAME_LOADING, true);
      do {
        /* eslint-disable */
        response = await Vue.prototype.$independentEosApi
          .getTableRows(
            draftsTable,
            Vue.prototype.$constants.CONTRACT_NAME,
            getters.getAccountName,
            lowerBound,
            null,
            indexPosition,
          );
        /* eslint-enable */
        result.push(...response.rows);
        lowerBound = response.next_key;
      } while (response.more);

      if (!result || !result.length) {
        commit(ActionType.SET_DRAFTS_BY_ACCOUNT_NAME, []);
        return;
      }

      commit(ActionType.SET_DRAFTS_BY_ACCOUNT_NAME, Vue.prototype.$helpers.copyDeep(result));
    } catch (e) {
      console.error('REQUEST_DRAFTS_BY_ACCOUNT_NAME', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_DRAFTS_BY_ACCOUNT_NAME_LOADING, false);
    }
  },
  [ActionType.REQUEST_EOS_PRICE]: async ({ commit }) => {
    const indexPosition = 1;

    try {
      commit(ActionType.SET_IS_EOSPRICE_LOADING, true);
      const response = await Vue.prototype.$independentEosApi
        .getTableRows(
          eosPriceTable,
          Vue.prototype.$constants.EOS_ORACLE,
          Vue.prototype.$constants.EOS_ORACLE,
          null,
          null,
          indexPosition,
        );
      const result = response.rows;
      if (!result || !result.length) {
        return;
      }

      const eosPriceObj = result.filter(e => e.rate.search('USD') !== -1);
      if (!eosPriceObj || !eosPriceObj.length) throw new Error('can\'t find eos/usd rate');
      const parsedRate = parseFloat(eosPriceObj[0].rate);
      if (!parsedRate) throw new Error('can\'t parse eos/usd rate');

      commit(ActionType.SET_EOS_PRICE, parsedRate);
    } catch (e) {
      console.error('REQUEST_EOS_PRICE', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_EOSPRICE_LOADING, false);
    }
  },
  [ActionType.REQUEST_SETTINGS]: async ({ commit }) => {
    const indexPosition = 1;

    try {
      commit(ActionType.SET_IS_SETTINGS_LOADING, true);
      const response = await Vue.prototype.$independentEosApi
        .getTableRows(
          settingsTable,
          Vue.prototype.$constants.CONTRACT_NAME,
          Vue.prototype.$constants.CONTRACT_NAME,
          null,
          null,
          indexPosition,
        );
      const result = response.rows;
      if (!result || !result.length) {
        return;
      }

      commit(ActionType.SET_SETTINGS, Vue.prototype.$helpers.copyDeep(result[0]));
    } catch (e) {
      console.error('REQUEST_SETTINGS', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_SETTINGS_LOADING, false);
    }
  },
  [ActionType.REQUEST_STATE]: async ({ commit }) => {
    const indexPosition = 1;

    try {
      commit(ActionType.SET_IS_STATE_LOADING, true);
      const response = await Vue.prototype.$independentEosApi
        .getTableRows(
          stateTable,
          Vue.prototype.$constants.CONTRACT_NAME,
          Vue.prototype.$constants.CONTRACT_NAME,
          null,
          null,
          indexPosition,
        );
      const result = response.rows;
      if (!result || !result.length) {
        return;
      }

      commit(ActionType.SET_STATE, Vue.prototype.$helpers.copyDeep(result[0]));
    } catch (e) {
      console.error('REQUEST_STATE', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_STATE_LOADING, false);
    }
  },
  [ActionType.REQUEST_VOTES]: async ({ commit }) => {
    let lowerBound = '';
    let response = null;
    const result = [];
    const indexPosition = 1;

    try {
      commit(ActionType.SET_IS_VOTES_LOADING, true);
      do {
        /* eslint-disable */
        response = await Vue.prototype.$independentEosApi
          .getTableRows(
            votesTable,
            Vue.prototype.$constants.CONTRACT_NAME,
            Vue.prototype.$constants.CONTRACT_NAME,
            lowerBound,
            null,
            indexPosition,
          );
        /* eslint-enable */
        result.push(...response.rows);
        lowerBound = response.next_key;
      } while (response.more);

      if (!result || !result.length) {
        return;
      }

      commit(ActionType.SET_VOTES, Vue.prototype.$helpers.copyDeep(result));
    } catch (e) {
      console.error('REQUEST_VOTES', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_VOTES_LOADING, false);
    }
  },
  [ActionType.REQUEST_VOTES_BY_PROPOSAL_NAME]: async ({ commit }, proposalName) => {
    if (!proposalName) {
      throw new Error('you should specify proposalName');
    }
    const indexPosition = 1;

    try {
      commit(ActionType.SET_IS_PROPOSAL_VOTES_LOADING, true);
      const response = await Vue.prototype.$independentEosApi
        .getTableRows(
          votesTable,
          Vue.prototype.$constants.CONTRACT_NAME,
          Vue.prototype.$constants.CONTRACT_NAME,
          proposalName,
          proposalName,
          indexPosition,
        );
      const result = response.rows;

      if (!result || !result.length) {
        commit(ActionType.SET_VOTES_BY_PROPOSAL_NAME, []);
        return;
      }

      commit(ActionType.SET_VOTES_BY_PROPOSAL_NAME, Vue.prototype.$helpers.copyDeep(result));
    } catch (e) {
      console.error('REQUEST_VOTES_BY_PROPOSAL_NAME', e);
      Vue.prototype.$errorsHandler.handleError(e);
    } finally {
      commit(ActionType.SET_IS_PROPOSAL_VOTES_LOADING, false);
    }
  },
};
