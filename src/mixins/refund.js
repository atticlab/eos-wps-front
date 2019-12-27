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
        const res = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'refund',
            data: {
              account: this.getAccountName,
            },
          }]),
        );
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_refund', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isRefundLoading = false;
      }
    },
  },
};
