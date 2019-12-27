export default {
  data() {
    return {
      isProposalVotesLoading: false,
      votesByProposalName: [],
    };
  },
  methods: {
    async $_getVotesByProposalName(proposalName) {
      if (!proposalName) {
        // TODO: notify about err
        throw new Error('you should specify proposalName');
      }
      const votesTable = 'votes';
      const indexPosition = 1;

      try {
        this.isProposalVotesLoading = true;
        const response = await this.$independentEosApi
          .getTableRows(
            votesTable,
            this.$constants.CONTRACT_NAME,
            this.$constants.CONTRACT_NAME,
            proposalName,
            proposalName,
            indexPosition,
          );
        const result = response.rows;

        if (!result || !result.length) {
          this.votesByProposalName = [];
          return this.votesByProposalName;
        }

        this.votesByProposalName = this.$helpers.copyDeep(result);
        return this.votesByProposalName;
      } catch (e) {
        console.error('isProposalVotesLoading', e);
        this.$errorsHandler.handleError(e);
        return [];
      } finally {
        this.isProposalVotesLoading = false;
      }
    },
  },
};
