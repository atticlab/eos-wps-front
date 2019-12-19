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
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_refund() {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isRefundLoading = true;
        const res = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload('refund', {
            account: this.getAccountName,
          }),
        );
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_refund', e);
        return null;
      } finally {
        this.isRefundLoading = false;
      }
    },
  },
};
