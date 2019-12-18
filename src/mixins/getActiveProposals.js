export default {
  data() {
    return {
      isActiveProposalsLoading: false,
      proposals: [],
    };
  },
  methods: {
    async $_getActiveProposals() {
      let lowerBound = '';
      const proposalsTable = 'proposals';

      try {
        this.isActiveProposalsLoading = true;
        let response = await this.$independentEosApi
                                .getTableRows(
                                  proposalsTable,
                                  this.$constants.CONTRACT_NAME,
                                  lowerBound,
                                  lowerBound,
                                );
        const result = response.rows;
        if (!result.length) {
          return result;
        }

        while (response.more) {
          lowerBound = result[result.length - 1].proposal_name;
          /* eslint-disable */
          response = this.$independentEosApi
                         .getTableRows(
                           proposalsTable,
                           this.$constants.CONTRACT_NAME,
                           lowerBound,
                           lowerBound,
                         );
          /* eslint-enable */
          result.push(...response.rows);
        }
        this.proposals = this.$helpers.copyDeep(result);
        return result;
      } catch (e) {
        console.error('$_getActiveProposals', e);
        return [];
      } finally {
        this.isActiveProposalsLoading = false;
      }
    },
  },
};
