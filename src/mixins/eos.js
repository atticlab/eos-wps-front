import Eos from 'eosjs';
import { mapState, mapGetters } from 'vuex';
import config from '@/config';

const proposalsTable = 'proposals';
const draftsTable = 'drafts';

export default {
  data() {
    return {
      $_independentEos: null,
      // isActiveProposalsLoading: false,
      isProposalExistLoading: false,
      // isDraftProposalByAccountLoading: false,
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
    $_getTableRows(table, scope, lowerBound = null, upperBound = null) {
      const reqObj = {
        json: true,
        code: this.$constants.CONTRACT_NAME,
        scope,
        table,
        table_key: '',
        lower_bound: lowerBound,
        upper_bound: upperBound,
        index_position: 1,
        key_type: 'i64',
        limit: 100,
        reverse: false,
        show_payer: false,
      };

      return this.$_independentEos.getTableRows(reqObj);
    },
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
    // async $_getActiveProposals() {
    //   let lowerBound = '';
    //
    //   try {
    //     this.isActiveProposalsLoading = true;
    //     let response = await this
    //       .$_getTableRows(proposalsTable, this.$constants.CONTRACT_NAME, lowerBound, lowerBound);
    //     const result = response.rows;
    //     if (!result.length) {
    //       return result;
    //     }
    //
    //     while (response.more) {
    //       lowerBound = result[result.length - 1].proposal_name;
    //       /* eslint-disable */
    //       response = await this.$_getTableRows(
    //       proposalsTable,
    //       this.$constants.CONTRACT_NAME,
    //       lowerBound,
    //       lowerBound);
    //       /* eslint-enable */
    //       result.push(...response.rows);
    //     }
    //     return result;
    //   } catch (e) {
    //     console.error('$_getActiveProposals', e);
    //     return [];
    //   } finally {
    //     this.isActiveProposalsLoading = false;
    //   }
    // },
    async $_isProposalExist(candidateName) {
      if (!candidateName) {
        throw new Error('$_isProposalExist empty candidateName');
      }

      try {
        this.isProposalExistLoading = true;
        const promiseArr = [this
          .$_getTableRows(proposalsTable, this
            .$constants.CONTRACT_NAME, candidateName, candidateName)];
        if (this.getAccountName) {
          promiseArr.push(this
            .$_getTableRows(draftsTable, this.getAccountName, candidateName, candidateName));
        }
        const [activeProposal, draftProposal] = await Promise.all(promiseArr);
        if (!this.getAccountName) {
          return !!activeProposal.rows.length;
        }
        return !!activeProposal.rows.length || !!draftProposal.rows.length;
      } catch (e) {
        // TODO: notify about err
        console.error('$_isProposalExist', e);
        return false;
      } finally {
        this.isProposalExistLoading = false;
      }
    },
    // async $_getDraftProposalByAccount() {
    //   let lowerBound = '';
    //
    //   if (!this.getAccountName) {
    //     // TODO: notify about err
    //     throw new Error('you should login in Scatter');
    //   }
    //   try {
    //     this.isDraftProposalByAccountLoading = true;
    //     let response = await this
    //       .$_getTableRows(draftsTable, this.getAccountName, lowerBound, lowerBound);
    //     const result = response.rows;
    //     if (!result.length) {
    //       return result;
    //     }
    //
    //     while (response.more) {
    //       lowerBound = result[result.length - 1].proposal_name;
    //       /* eslint-disable */
    //       response = await this.$_getTableRows(
    //       draftsTable,
    //       this.$constants.CONTRACT_NAME,
    //       lowerBound,
    //       lowerBound
    //       );
    //       /* eslint-enable */
    //       result.push(...response.rows);
    //     }
    //     return result;
    //   } catch (e) {
    //     console.error('$_getDraftProposalByAccount', e);
    //     return [];
    //   } finally {
    //     this.isDraftProposalByAccountLoading = false;
    //   }
    // },
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
  beforeCreate() {
    this.$_independentEos = Eos(config.eos);
  },
};
