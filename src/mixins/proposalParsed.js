export default {
  computed: {
    $_proposalParsed() {
      if (!this.proposalDraft || Object.keys(this.proposalDraft).length === 0) return {};

      const proposalClone = this.$helpers.copyDeep(this.proposalDraft);

      return this.$helpers.parseProposal(proposalClone);
    },
  },
};
