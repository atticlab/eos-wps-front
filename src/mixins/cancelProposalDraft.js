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
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'canceldraft',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposalName,
            },
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id || res.transactionId;
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
