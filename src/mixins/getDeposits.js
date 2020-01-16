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
    async $_getDeposits() {
      // let lowerBound = '';
      let lowerBound = this.getAccountName;
      const upperBound = this.getAccountName;
      let response = null;
      const depositsTable = 'deposits';
      const result = [];
      const indexPosition = 1;

      try {
        this.isDepositsLoading = true;
        do {
          /* eslint-disable */
          response = await this.$independentEosApi
            .getTableRows(
              depositsTable,
              this.$constants.CONTRACT_NAME,
              this.$constants.CONTRACT_NAME,
              lowerBound,
              // null,
              upperBound,
              indexPosition,
            );
          /* eslint-enable */
          result.push(...response.rows);
          lowerBound = response.next_key;
        } while (response.more);

        if (!result || !result.length) {
          return [];
        }

        this.proposalsDeposits = this.$helpers.copyDeep(result);
        return this.proposalsDeposits;
      } catch (e) {
        console.error('$_getDeposits', e);
        this.$errorsHandler.handleError(e);
        return [];
      } finally {
        this.isDepositsLoading = false;
      }
    },
  },
};
