import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isCreateProposalDraftLoading: false,
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
    async $_createProposalDraft(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isCreateProposalDraftLoading = true;
        const response = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload('submitdraft', {
            proposer: this.getAccountName,
            proposal_name: data.proposal_name,
            title: data.title,
            monthly_budget: data.monthly_budget,
            duration: data.duration,
            proposal_json: data.proposal_json,
          }),
        );
        return response.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_createProposal', e);
        return null;
      } finally {
        this.isCreateProposalDraftLoading = false;
      }
    },
  },
};
