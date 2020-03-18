import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isCreateProposalDraftLoading: false,
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
    async $_createProposalDraft(data) {
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }

        this.isCreateProposalDraftLoading = true;
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'submitdraft',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposal_name,
              title: data.title,
              monthly_budget: data.monthly_budget,
              duration: data.duration,
              proposal_json: data.proposal_json,
            },
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id || res.transactionId;
      } catch (e) {
        console.error('$_createProposalDraft', e);
        this.$errorsHandler.handleError(e);
        return null;
      } finally {
        this.isCreateProposalDraftLoading = false;
      }
    },
  },
};
