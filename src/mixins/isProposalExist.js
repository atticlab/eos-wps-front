import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isProposalExistLoading: false,
    };
  },
  computed: {
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_isProposalExist(candidateName) {
      const proposalsTable = 'proposals';
      const draftsTable = 'drafts';
      const indexPosition = 1;

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
          indexPosition,
        )];
        if (this.getAccountName) {
          promiseArr.push(this.$independentEosApi
            .getTableRows(
              draftsTable,
              this.$constants.CONTRACT_NAME,
              this.getAccountName,
              candidateName,
              candidateName,
              indexPosition,
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
        this.$errorsHandler.handleError(e);
        return false;
      } finally {
        this.isProposalExistLoading = false;
      }
    },
  },
};
