export default {
  computed: {
    $_proposalParsed() {
      if (!this.proposal || Object.keys(this.proposal).length === 0) return {};

      const proposalClone = this.$helpers.copyDeep(this.proposal);

      return this.$helpers.parseProposal(proposalClone);
    },
  },
};
