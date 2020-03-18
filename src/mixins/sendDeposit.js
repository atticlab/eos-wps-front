import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isSendDepositLoading: false,
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
    async $_sendDeposit() {
      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }

        this.isSendDepositLoading = true;
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            account: 'eosio.token',
            actionName: 'transfer',
            data: {
              from: this.getAccountName,
              to: this.$constants.CONTRACT_NAME,
              quantity: '100.0000 EOS',
              memo: '',
            },
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id;
      } catch (e) {
        console.error('$_sendDeposit', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isSendDepositLoading = false;
      }
    },
  },
};
