import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isVoteProposalLoading: false,
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
    async $_voteProposal(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isVoteProposalLoading = true;
        const res = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload('vote', {
            voter: this.getAccountName,
            proposal_name: data.proposalName,
            vote: data.vote,
          }),
        );
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
};
