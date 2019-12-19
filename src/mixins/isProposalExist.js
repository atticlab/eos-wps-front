export default {
  data() {
    return {
      isProposalExistLoading: false,
    };
  },
  methods: {
    async $_isProposalExist(candidateName) {
      const proposalsTable = 'proposals';
      const draftsTable = 'drafts';

      if (!candidateName) {
        throw new Error('$_isProposalExist empty candidateName');
      }

      try {
        this.isProposalExistLoading = true;
        const promiseArr = [this.$independentEosApi.getTableRows(
          proposalsTable,
          this.$constants.CONTRACT_NAME,
          this.$constants.CONTRACT_NAME,
          candidateName,
          candidateName,
        )];
        if (this.getAccountName) {
          promiseArr.push(this.$independentEosApi
            .getTableRows(
              draftsTable,
              this.$constants.CONTRACT_NAME,
              this.getAccountName,
              candidateName,
              candidateName,
            ));
        }
        const [activeProposal, draftProposal] = await Promise.all(promiseArr);
        if (!this.getAccountName) {
          return !!activeProposal.rows.length;
        }
        return !!activeProposal.rows.length || !!draftProposal.rows.length;
      } catch (e) {
        // TODO: notify about err
        console.error('$_isProposalExist', e);
        return false;
      } finally {
        this.isProposalExistLoading = false;
      }
    },
  },
};
