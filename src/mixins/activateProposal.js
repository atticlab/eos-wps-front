import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isActivateProposalLoading: false,
    };
  },
  computed: {
    ...mapState({
      eos: state => state.userService.eos,
      eosAccount: state => state.userService.eosAccount,
      isBp: state => state.userService.isBp,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_activateProposal(data) {
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }
        if (this.isBp) {
          throw new Error('notifications.forbiddenForBp');
        }

        this.isActivateProposalLoading = true;
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'activate',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposalName,
              activate_next: data.activateNext, // activate for the current or next period
            },
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id || res.transactionId;
      } catch (e) {
        console.error('$_activateProposal', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isActivateProposalLoading = false;
      }
    },
  },
};
