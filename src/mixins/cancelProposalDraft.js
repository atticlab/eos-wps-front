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
        throw new Error('eos don\'t inited');
      }
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        this.isCancelProposalDraftLoading = true;
        const res = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'canceldraft',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposalName,
            },
          }]),
        );
        return res.transaction_id;
      } catch (e) {
        console.error('$_cancelProposalDraft', e);
        this.$errorsHandler.handleError(e);
        return null;
      } finally {
        this.isCancelProposalDraftLoading = false;
      }
    },
  },
};
