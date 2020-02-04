import Vue from 'vue';
import mutations from './mutations';
import actions from './actions';

const state = {
  routeTo: null,
  eos: null,
  eosAccount: null,
  scatter: null,

  isBp: false,
  isScatterLoginLoading: false,
  isScatterNotConnected: false,

  isActiveProposalByProposalNameLoading: false,
  isActiveProposalsLoading: false,
  isDepositsLoading: false,
  isDraftProposalByProposalNameLoading: false,
  isDraftProposalByAccountNameLoading: false,
  isEosPriceLoading: false,
  isSettingsLoading: false,
  isStateLoading: false,
  isVotesLoading: false,
  isProposalVotesLoading: false,

  proposal: {},
  proposals: [],
  draftProposals: [],
  proposalDeposit: {},
  eosPrice: 0,
  proposalsSettings: {},
  proposalState: {},
  proposalsVotes: [],
  votesByProposalName: [],
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
  getProposalParsed(state) {
    return state.proposal && Object.keys(state.proposal).length
           ? Vue.prototype.$helpers.parseProposal(state.proposal)
           : {};
  }
};
/* eslint-enable */

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
