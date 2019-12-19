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
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_sendDeposit() {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isSendDepositLoading = true;
        const response = await this.eos.transfer(
          this.getAccountName,
          this.$constants.CONTRACT_NAME,
          '100.0000 EOS', '',
        );
        return response.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_sendDeposit', e);
        return null;
      } finally {
        this.isSendDepositLoading = false;
      }
    },
  },
};
