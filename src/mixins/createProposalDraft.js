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
      eosAccount: state => state.userService.eosAccount,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_createProposalDraft(data) {
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }

        this.isCreateProposalDraftLoading = true;
        const response = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'submitdraft',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposalName,
              title: data.title,
              monthly_budget: data.monthlyBudget,
              duration: data.duration,
              proposal_json: data.proposalJson,
            },
          }]),
        );
        return response.transaction_id;
      } catch (e) {
        console.error('$_createProposalDraft', e);
        this.$errorsHandler.handleError(e);
        return null;
      } finally {
        this.isCreateProposalDraftLoading = false;
      }
    },
  },
};
