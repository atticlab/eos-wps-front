import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isVoteProposalLoading: false,
    };
  },
  computed: {
    ...mapState({
      eos: state => state.userService.eos,
      eosAccount: state => state.userService.eosAccount,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_voteProposal(data) {
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }

        this.isVoteProposalLoading = true;
        const res = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'vote',
            data: {
              voter: this.getAccountName,
              proposal_name: data.proposalName,
              vote: data.vote,
            },
          }]),
        );
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_voteProposal', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isVoteProposalLoading = false;
      }
    },
  },
};
