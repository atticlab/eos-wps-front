import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      proposals: [],
      isDraftProposalByAccountNameLoading: false,
    };
  },
  computed: {
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_getDraftProposalByAccountName() {
      let lowerBound = '';
      let response = null;
      const draftsTable = 'drafts';
      const result = [];

      if (!this.getAccountName) {
        // TODO: notify about err
        throw new Error('you should login in Scatter');
      }
      try {
        this.isDraftProposalByAccountNameLoading = true;
        do {
          /* eslint-disable */
          response = await this.$independentEosApi
            .getTableRows(
              draftsTable,
              this.$constants.CONTRACT_NAME,
              this.getAccountName,
              lowerBound,
              null
            );
          /* eslint-enable */
          result.push(...response.rows);
          lowerBound = response.next_key;
        } while (response.more);

        if (!result || !result.length) {
          this.proposals = [];
          return [];
        }

        this.proposals = this.$helpers.copyDeep(result);
        return this.proposals;
      } catch (e) {
        console.error('$_getDraftProposalByAccountName', e);
        return [];
      } finally {
        this.isDraftProposalByAccountNameLoading = false;
      }
    },
  },
};
