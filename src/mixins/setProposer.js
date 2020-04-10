import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isSetProposerLoading: false,
    };
  },
  computed: {
    ...mapState({
      eosAccount: state => state.userService.eosAccount,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_setProposer(data = []) {
      if (!data) {
        throw new Error('empty data');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }

        this.isSetProposerLoading = true;
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'setproposer',
            data: {
              proposer: this.getAccountName,
              proposer_json: data,
            },
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id || res.transactionId;
      } catch (e) {
        console.error('$_setProposer', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isSetProposerLoading = false;
      }
    },
  },
};
