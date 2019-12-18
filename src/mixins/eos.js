import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isSendDepositLoading: false,
      isCreateProposalDraft: false,
      isModifyProposalDraftLoading: false,
      isCancelProposalDraftLoading: false,
      isRefundLoading: false,
      isActivateProposalLoading: false,
      isVoteProposalLoading: false,
    };
  },
  methods: {
    $_buildBaseTransactionPayload(actionName, data) {
      if (!actionName) throw new Error('empty actionName');
      if (!data) throw new Error('empty data');

      return {
        actions: [
          {
            account: this.$constants.CONTRACT_NAME,
            name: actionName,
            authorization: [{
              actor: this.getAccountName,
              permission: this.getAccountPermission,
            }],
            data,
          },
        ],
      };
    },
    async $_sendDeposit() {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isSendDepositLoading = true;
        const res = await this.eos.transfer(this.getAccountName, this.$constants.CONTRACT_NAME, '100.0000 EOS', '');
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_sendDeposit', e);
        return null;
      } finally {
        this.isSendDepositLoading = false;
      }
    },
    async $_createProposalDraft(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isCreateProposalDraft = true;
        const res = await this.eos.transaction(this.$_buildBaseTransactionPayload('submitdraft', {
          proposer: this.getAccountName,
          proposal_name: data.proposalName,
          title: data.title,
          monthly_budget: data.monthly_budget,
          duration: data.duration,
          proposal_json: data.proposal_json,
        }));
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_createProposal', e);
        return null;
      } finally {
        this.isCreateProposalDraft = false;
      }
    },
    async $_modifyProposalDraft(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isModifyProposalDraftLoading = true;
        const res = await this.eos.transaction(this.$_buildBaseTransactionPayload('modifydraft', {
          proposer: this.getAccountName,
          proposal_name: data.proposalName,
          title: data.title,
          proposal_json: data.proposal_json,
        }));
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_modifyProposal', e);
        return null;
      } finally {
        this.isModifyProposalDraftLoading = false;
      }
    },
    async $_cancelProposalDraft(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isCancelProposalDraftLoading = true;
        const res = await this.eos.transaction(this.$_buildBaseTransactionPayload('canceldraft', {
          proposer: this.getAccountName,
          proposal_name: data.proposalName,
        }));
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_cancelProposalDraft', e);
        return null;
      } finally {
        this.isCancelProposalDraftLoading = false;
      }
    },
    async $_refund() {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isRefundLoading = true;
        const res = await this.eos.transaction(this.$_buildBaseTransactionPayload('refund', {
          account: this.getAccountName,
        }));
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_refund', e);
        return null;
      } finally {
        this.isRefundLoading = false;
      }
    },
    async $_activateProposal(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isActivateProposalLoading = true;
        const res = await this.eos.transaction(this.$_buildBaseTransactionPayload('activate', {
          proposer: this.getAccountName,
          proposal_name: data.proposalName,
        }));
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_modifyProposal', e);
        return null;
      } finally {
        this.isActivateProposalLoading = false;
      }
    },
    async $_voteProposal(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isVoteProposalLoading = true;
        const res = await this.eos.transaction(this.$_buildBaseTransactionPayload('vote', {
          voter: this.getAccountName,
          proposal_name: data.proposalName,
          vote: data.vote,
        }));
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_voteProposal', e);
        return null;
      } finally {
        this.isVoteProposalLoading = false;
      }
    },
  },
  computed: {
    ...mapState({
      eos: state => state.userService.eos,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
      getAccountPermission: 'getAccountPermission',
    }),
  },
};
