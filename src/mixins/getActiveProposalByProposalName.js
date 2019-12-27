export default {
  data() {
    return {
      isActiveProposalByProposalNameLoading: false,
      proposal: {},
    };
  },
  methods: {
    async $_getActiveProposalByProposalName(proposalName) {
      if (!proposalName) {
        // TODO: notify about err
        throw new Error('you should specify proposalName');
      }
      const proposalsTable = 'proposals';
      const indexPosition = 1; // proposalName

      try {
        this.isActiveProposalByProposalNameLoading = true;
        const response = await this.$independentEosApi
          .getTableRows(
            proposalsTable,
            this.$constants.CONTRACT_NAME,
            this.$constants.CONTRACT_NAME,
            proposalName,
            proposalName,
            indexPosition,
          );
        const result = response.rows;
        if (!result || !result.length) {
          this.proposal = {};
          return this.proposal;
        }

        this.proposal = this.$helpers.copyDeep(result[0]);
        return this.proposal;
      } catch (e) {
        console.error('$_getActiveProposalByProposalName', e);
        this.$errorsHandler.handleError(e);
        return [];
      } finally {
        this.isActiveProposalByProposalNameLoading = false;
      }
    },
  },
};
