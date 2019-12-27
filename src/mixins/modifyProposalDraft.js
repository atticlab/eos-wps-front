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
      eosAccount: state => state.userService.eosAccount,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_modifyProposalDraft(data) {
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }
        this.isModifyProposalDraftLoading = true;
        const payload = [
          {
            actionName: 'modifydraft',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposalName,
              title: data.title,
              proposal_json: data.proposalJson,
            },
          },
        ];
        if (data.monthlyBudget && data.duration) {
          payload.push({
            actionName: 'modifybudget',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposalName,
              monthly_budget: data.monthlyBudget,
              duration: data.duration,
            },
          });
        }

        const response = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload(payload),
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
