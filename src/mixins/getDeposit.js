import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isDepositsLoading: false,
      proposalsDeposits: [],
    };
  },
  computed: {
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_getDeposit() {
      const lowerBound = this.getAccountName;
      const upperBound = this.getAccountName;
      let response = null;
      const depositsTable = 'deposits';
      const indexPosition = 1;

      try {
        this.isDepositsLoading = true;
        response = await this.$independentEosApi
                             .getTableRows(
                               depositsTable,
                               this.$constants.CONTRACT_NAME,
                               this.$constants.CONTRACT_NAME,
                               lowerBound,
                               upperBound,
                               indexPosition,
                             );
        const result = response.rows;
        if (!result || !result.length) {
          return [];
        }

        this.proposalsDeposits = this.$helpers.copyDeep(result);
        return this.proposalsDeposits;
      } catch (e) {
        console.error('$_getDeposit', e);
        this.$errorsHandler.handleError(e);
        return [];
      } finally {
        this.isDepositsLoading = false;
      }
    },
  },
};
