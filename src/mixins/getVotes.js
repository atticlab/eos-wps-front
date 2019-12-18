export default {
  data() {
    return {
      isVotesLoading: false,
      proposalsVotes: [],
    };
  },
  methods: {
    async $_getVotes() {
      let lowerBound = '';
      const votesTable = 'votes';

      try {
        this.isVotesLoading = true;
        let response = await this.$independentEosApi
                                .getTableRows(
                                  votesTable,
                                  this.$constants.CONTRACT_NAME,
                                  lowerBound,
                                  null,
                                );
        const result = response.rows;
        if (!result || !result.length) {
          return [];
        }

        while (response.more) {
          lowerBound = result[result.length - 1].proposal_name;
          /* eslint-disable */
          response = this.$independentEosApi
                         .getTableRows(
                           votesTable,
                           this.$constants.CONTRACT_NAME,
                           lowerBound,
                           null,
                         );
          /* eslint-enable */
          result.push(...response.rows);
        }
        this.proposalsVotes = this.$helpers.copyDeep(result);
        return this.proposalsVotes;
      } catch (e) {
        console.error('$_getVotes', e);
        return [];
      } finally {
        this.isVotesLoading = false;
      }
    },
  },
};
