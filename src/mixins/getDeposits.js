export default {
  data() {
    return {
      isDepositsLoading: false,
      proposalsDeposits: [],
    };
  },
  methods: {
    async $_getDeposits() {
      let lowerBound = '';
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
              null,
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
        return [];
      } finally {
        this.isDepositsLoading = false;
      }
    },
  },
};
