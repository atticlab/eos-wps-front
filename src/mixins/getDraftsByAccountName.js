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
                                   null,
                                 );
        const result = response.rows;
        if (!result || !result.length) {
          return [];
        }

        while (response.more) {
          lowerBound = result[result.length - 1].proposal_name;
          /* eslint-disable */
          response = await this.$independentEosApi
                               .getTableRows(
                                 draftsTable,
                                 this.$constants.CONTRACT_NAME,
                                 lowerBound,
                                 null
                               );
          /* eslint-enable */
          result.push(...response.rows);
        }
        this.proposals = this.$helpers.copyDeep(result);
        return this.proposals;
      } catch (e) {
        console.error('$_getDraftProposalByAccountName', e);
        return [];
      } finally {
        this.isDraftProposalByAccountLoading = false;
      }
    },
  },
};
