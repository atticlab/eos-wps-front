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
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        this.isModifyProposalDraftLoading = true;
        const response = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload('modifydraft', {
            proposer: this.getAccountName,
            proposal_name: data.proposalName,
            title: data.title,
            proposal_json: data.proposalJson,
          }),
        );
        return response.transaction_id;
      } catch (e) {
        console.error('$_modifyProposal', e);
        this.$errorsHandler.handleError(e);
        return null;
      } finally {
        this.isModifyProposalDraftLoading = false;
      }
    },
  },
};
