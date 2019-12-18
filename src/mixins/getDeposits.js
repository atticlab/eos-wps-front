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
      const depositsTable = 'deposits';

      try {
        this.isDepositsLoading = true;
        let response = await this.$independentEosApi
                                .getTableRows(
                                  depositsTable,
                                  this.$constants.CONTRACT_NAME,
                                  lowerBound,
                                  null,
                                );
        const result = response.rows;
        if (!result || !result.length) {
          return [];
        }

        while (response.more) {
          lowerBound = result[result.length - 1].account;
          /* eslint-disable */
          response = this.$independentEosApi
                         .getTableRows(
                           depositsTable,
                           this.$constants.CONTRACT_NAME,
                           lowerBound,
                           null,
                         );
          /* eslint-enable */
          result.push(...response.rows);
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
