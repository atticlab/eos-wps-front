import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isClaimLoading: false,
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
    async $_claimAction(proposalName) {
      if (!proposalName) {
        throw new Error('empty proposalName');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }

        this.isClaimLoading = true;
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'claim',
            data: {
              proposal_name: proposalName,
            },
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id || res.transactionId;
      } catch (e) {
        console.error('$_claimAction', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isClaimLoading = false;
      }
    },
  },
};
