import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isCancelProposalDraftLoading: false,
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
    async $_cancelProposalDraft(data) {
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }

        this.isCancelProposalDraftLoading = true;
        const res = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'canceldraft',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposalName,
            },
          }]),
        );
        return res.transaction_id;
      } catch (e) {
        console.error('$_cancelProposalDraft', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isCancelProposalDraftLoading = false;
      }
    },
  },
};
