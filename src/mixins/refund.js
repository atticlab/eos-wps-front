import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isRefundLoading: false,
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
    async $_refund() {
      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }

        this.isRefundLoading = true;
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'refund',
            data: {
              account: this.getAccountName,
            },
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id;
      } catch (e) {
        console.error('$_refund', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isRefundLoading = false;
      }
    },
  },
};
