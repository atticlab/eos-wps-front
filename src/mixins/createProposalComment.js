import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isCreateProposalCommentLoading: false,
    };
  },
  computed: {
    ...mapState({
      eos: state => state.userService.eos,
      eosAccount: state => state.userService.eosAccount,
      isBp: state => state.userService.isBp,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_createProposalComment(data) {
      if (!data || !Object.keys(data).length) {
        throw new Error('empty data');
      }

      try {
        if (!this.eosAccount) {
          throw new Error('notifications.mustLogin');
        }
        if (!this.isBp && this.getAccountName !== data.account) {
          throw new Error('notifications.cannotComment');
        }

        this.isCreateProposalCommentLoading = true;
        const { signatureProvider } = window;
        const res = await signatureProvider.signTransaction(
          this.$helpers.buildBaseTransactionPayload([{
            actionName: 'comment',
            data: {
              account: data.account,
              proposal_name: data.proposalName,
              comment_json: data.comment,
            },
          }]),
          { expireSeconds: 120, blocksBehind: 3 },
        );
        return res.transaction_id || res.transactionId;
      } catch (e) {
        console.error('$_createProposalComment', e);
        this.$errorsHandler.handleError(e);
        throw e;
      } finally {
        this.isCreateProposalCommentLoading = false;
      }
    },
  },
};
