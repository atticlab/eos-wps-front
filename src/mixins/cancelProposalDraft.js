import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isCancelProposalDraftLoading: false,
    };
  },
  computed: {
    ...mapState({
      eos: state => state.userService.eos,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_cancelProposalDraft(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        this.isCancelProposalDraftLoading = true;
        const res = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload('canceldraft', {
            proposer: this.getAccountName,
            proposal_name: data.proposalName,
          }),
        );
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_cancelProposalDraft', e);
        return null;
      } finally {
        this.isCancelProposalDraftLoading = false;
      }
    },
  },
};
