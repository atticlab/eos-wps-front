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
              proposal_name: data.proposal_name,
              title: data.title,
              proposal_json: data.proposal_json,
            },
          },
        ];
        if (data.monthly_budget && data.duration) {
          payload.push({
            actionName: 'modifybudget',
            data: {
              proposer: this.getAccountName,
              proposal_name: data.proposal_name,
              monthly_budget: data.monthly_budget,
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
