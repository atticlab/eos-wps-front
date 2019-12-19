import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isActivateProposalLoading: false,
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
    async $_activateProposal(data) {
      if (!this.eos) {
        // TODO: notify about err
        throw new Error('eos don\'t inited');
      }
      try {
        this.isActivateProposalLoading = true;
        const res = await this.eos.transaction(
          this.$helpers.buildBaseTransactionPayload('activate', {
            proposer: this.getAccountName,
            proposal_name: data.proposalName,
          }),
        );
        return res.transaction_id;
      } catch (e) {
        // TODO: notify about err
        console.error('$_modifyProposal', e);
        return null;
      } finally {
        this.isActivateProposalLoading = false;
      }
    },
  },
};
