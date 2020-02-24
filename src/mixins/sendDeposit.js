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
        const response = await this.eos.transfer(
          this.getAccountName,
          this.$constants.CONTRACT_NAME,
          '100.0000 EOS', '',
        );
        return response.transaction_id;
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
