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
  [ActionType.SET_SCATTER]: (state, data) => {
    state.scatter = data;
  },

  [ActionType.SET_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME]: (state, data) => {
    state.proposal = data;
  },
  [ActionType.SET_PROPOSALS]: (state, data) => {
    state.proposals = data;
  },
  [ActionType.SET_DEPOSIT]: (state, data) => {
    state.proposalDeposit = data;
  },
  [ActionType.SET_DRAFT_BY_PROPOSAL_NAME]: (state, data) => {
    state.proposal = data;
  },
  [ActionType.SET_DRAFTS_BY_ACCOUNT_NAME]: (state, data) => {
    state.draftProposals = data;
  },
  [ActionType.SET_EOS_PRICE]: (state, data) => {
    state.eosPrice = data;
  },
  [ActionType.SET_SETTINGS]: (state, data) => {
    state.proposalsSettings = data;
  },
  [ActionType.SET_STATE]: (state, data) => {
    state.proposalState = data;
  },
  [ActionType.SET_VOTES]: (state, data) => {
    state.proposalsVotes = data;
  },
  [ActionType.SET_VOTES_BY_PROPOSAL_NAME]: (state, data) => {
    state.votesByProposalName = data;
  },

  // flags
  [ActionType.SET_IS_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME_LOADING]: (state, data) => {
    state.isActiveProposalByProposalNameLoading = data;
  },
  [ActionType.SET_IS_ACTIVE_PROPOSALS_LOADING]: (state, data) => {
    state.isActiveProposalsLoading = data;
  },
  [ActionType.SET_IS_DEPOSITS_LOADING]: (state, data) => {
    state.isDepositsLoading = data;
  },
  [ActionType.SET_IS_DRAFT_PROPOSAL_BY_PROPOSAL_NAME_LOADING]: (state, data) => {
    state.isDraftProposalByProposalNameLoading = data;
  },
  [ActionType.SET_IS_DRAFTS_BY_ACCOUNT_NAME_LOADING]: (state, data) => {
    state.isDraftProposalByAccountNameLoading = data;
  },
  [ActionType.SET_IS_EOSPRICE_LOADING]: (state, data) => {
    state.isEosPriceLoading = data;
  },
  [ActionType.SET_IS_SETTINGS_LOADING]: (state, data) => {
    state.isSettingsLoading = data;
  },
  [ActionType.SET_IS_STATE_LOADING]: (state, data) => {
    state.isStateLoading = data;
  },
  [ActionType.SET_IS_VOTES_LOADING]: (state, data) => {
    state.isVotesLoading = data;
  },
  [ActionType.SET_IS_PROPOSAL_VOTES_LOADING]: (state, data) => {
    state.isProposalVotesLoading = data;
  },
};
