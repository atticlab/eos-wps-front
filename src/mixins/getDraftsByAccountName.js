import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      proposals: [],
      isDraftProposalByAccountLoading: false,
    };
  },
  computed: {
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_getDraftProposalByAccount() {
      let lowerBound = '';
      const draftsTable = 'drafts';

      if (!this.getAccountName) {
        // TODO: notify about err
        throw new Error('you should login in Scatter');
      }
      try {
        this.isDraftProposalByAccountLoading = true;
        let response = await this.$independentEosApi
                                 .getTableRows(
                                   draftsTable,
                                   this.getAccountName,
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
          response = await this.$independentEosApi
                               .getTableRows(
                                 draftsTable,
                                 this.$constants.CONTRACT_NAME,
                                 lowerBound,
                                 lowerBound
                               );
          /* eslint-enable */
          result.push(...response.rows);
        }
        this.proposals = this.$helpers.copyDeep(result);
        return result;
      } catch (e) {
        console.error('$_getDraftProposalByAccount', e);
        return [];
      } finally {
        this.isDraftProposalByAccountLoading = false;
      }
    },
  },
};
