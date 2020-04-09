import ActionType from '../../constants';

export default {
  [ActionType.SET_EOS]: (state, data) => {
    state.eos = Object.assign({}, data);
  },
  [ActionType.SET_SIGNATURE_PROVIDER]: (state, data) => {
    state.signatureProvider = Object.assign({}, data);
  },
  [ActionType.SET_EOS_ACCOUNT]: (state, data) => {
    state.eosAccount = data;
  },
  [ActionType.SET_IS_BP]: (state, data) => {
    state.isBp = data;
  },
  [ActionType.SET_IS_UAL_LOGIN_LOADING]: (state, data) => {
    state.isUALLoginLoading = data;
  },
  [ActionType.SET_IS_UAL_NOT_CONNECTED]: (state, data) => {
    state.isUALNotConnected = data;
  },
  [ActionType.SET_ROUTE_TO]: (state, data) => {
    state.routeTo = data;
  },

  [ActionType.SET_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME]: (state, data) => {
    state.proposal = data;
  },
  [ActionType.SET_PROPOSALS]: (state, data) => {
    state.proposals = data;
  },
  [ActionType.SET_PENDING_PROPOSALS]: (state, data) => {
    state.pendingProposals = data;
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
  [ActionType.SET_PROPOSAL_INITIAL_DURATION]: (state, data) => {
    state.proposalInitialDuration = data;
  },
  [ActionType.SET_PROPOSAL_INITIAL_MONTHLY_BUDGET]: (state, data) => {
    state.proposalInitialMonthlyBudget = data;
  },
  [ActionType.SET_PROPOSAL_COMMENTS]: (state, data) => {
    state.proposalComments = data;
  },

  // flags
  [ActionType.SET_IS_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME_LOADING]: (state, data) => {
    state.isActiveProposalByProposalNameLoading = data;
  },
  [ActionType.SET_IS_ACTIVE_PROPOSALS_LOADING]: (state, data) => {
    state.isActiveProposalsLoading = data;
  },
  [ActionType.SET_IS_PENDING_PROPOSALS_LOADING]: (state, data) => {
    state.isPendingProposalsLoading = data;
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
  [ActionType.SET_IS_PROPOSAL_COMMENTS_LOADING]: (state, data) => {
    state.isProposalCommentsLoading = data;
  },
  [ActionType.SET_PROPOSER]: (state, data) => {
    state.proposer = data;
  },
};
