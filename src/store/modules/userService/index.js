import Vue from 'vue';
import mutations from './mutations';
import actions from './actions';

const state = {
  routeTo: null,
  eos: null,
  eosAccount: null,

  isBp: false,

  isActiveProposalByProposalNameLoading: false,
  isActiveProposalsLoading: false,
  isPendingProposalsLoading: false,
  isDepositsLoading: false,
  isDraftProposalByProposalNameLoading: false,
  isDraftProposalByAccountNameLoading: false,
  isEosPriceLoading: false,
  isSettingsLoading: false,
  isStateLoading: false,
  isVotesLoading: false,
  isProposalVotesLoading: false,
  isProposalCommentsLoading: false,

  proposal: {},
  proposals: [],
  pendingProposals: [],
  draftProposals: [],
  proposalDeposit: {},
  eosPrice: 0,
  proposalsSettings: {},
  proposalState: {},
  proposalsVotes: [],
  votesByProposalName: [],
  proposalComments: [],

  proposalInitialDuration: 0,
  proposalInitialMonthlyBudget: '',
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
  },
  getDaysBeforeCurrentVotingPeriodExpires(state) {
    if (!state.proposalState) return null;
    const nextPeriodDate = Vue.prototype.$moment.utc(state.proposalState.next_voting_period).startOf('day');
    const todayDate = Vue.prototype.$moment.utc().startOf('day');

    return nextPeriodDate.diff(todayDate, 'days');
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
