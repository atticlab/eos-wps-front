export default {
  methods: {
    $_defineProposalStatus(totalNetVotes, voteMargin, isEligible) {
      return totalNetVotes >= voteMargin && isEligible
        ? this.$t('proposalItem.passing')
        : this.$t('proposalItem.notPassing');
    },
  },
};
