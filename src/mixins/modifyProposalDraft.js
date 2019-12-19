import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isModifyProposalDraftLoading: false,
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
    async $_modifyProposalDraft(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isModifyProposalDraftLoading = true;
        const response = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload('modifydraft', {
            proposer: this.getAccountName,
            proposal_name: data.proposalName,
            title: data.title,
            proposal_json: data.proposal_json,
          }),
        );
        return response.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_modifyProposal', e);
        return null;
      } finally {
        this.isModifyProposalDraftLoading = false;
      }
    },
  },
};
