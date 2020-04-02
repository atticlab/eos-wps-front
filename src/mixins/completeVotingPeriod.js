import { mapState, mapGetters } from 'vuex';

export default {
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
    async $_completeVotingPeriod() {
      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'complete',
            data: {},
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id || res.transactionId;
      } catch (e) {
        console.error('$_completeVotingPeriod', e);
        this.$errorsHandler.handleError(e);
        throw e;
      }
    },
  },
};
