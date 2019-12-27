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
      let response = null;
      const votesTable = 'votes';
      const result = [];
      const indexPosition = 1;

      try {
        this.isVotesLoading = true;
        do {
          /* eslint-disable */
          response = await this.$independentEosApi
            .getTableRows(
              votesTable,
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
