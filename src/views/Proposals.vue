<template>
  <div class="py-12">
    <v-container class="container--custom">
      <h1 class="display-1 font-weight-regular">
        {{ proposalsTitle }}
      </h1>

      <v-divider class="my-12" />

      <div
        v-if="isActiveProposalsLoading || isDraftProposalByAccountNameLoading"
        class="d-flex justify-center"
      >
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        />
      </div>

      <template v-else>
        <v-row v-if="!isDrafts">
          <v-col
            sm="4"
            md="3"
          >
            <div class="sort-by">
              <v-select
                v-model="selectedSortOption"
                :items="sortByOptions"
                label="Sort by"
                outlined
                dense
                :menu-props="{ offsetY:true }"
              />
            </div>
          </v-col>
        </v-row>

        <ProposalItem
          v-for="(proposal, index) in proposalsFullInfo"
          :key="index"
          :proposal-name="proposal.proposal_name"
          :title="proposal.title"
          :proposer="proposal.proposer"
          :img="proposal.proposal_json.img"
          :category="proposal.proposal_json.category"
          :summary="proposal.proposal_json.summary"
          :budget="proposal.total_budget"
          :duration="proposal.duration"
          :payments="proposal.payments"
          :status="proposal.status"
          :votes="proposal.total_net_votes"
          :is-draft="proposal.isDraft"
        />
      </template>
    </v-container>
  </div>
</template>

<script>
  import ProposalItem from '@/components/ProposalItem.vue';
  import getActiveProposals from '@/mixins/getActiveProposals';
  import getDraftsByAccountName from '@/mixins/getDraftsByAccountName';

  export default {
    name: 'Proposals',
    components: {
      ProposalItem,
    },
    mixins: [getActiveProposals, getDraftsByAccountName],
    data() {
      return {
        sortByOptions: [
          { value: 'date', text: 'Date' },
          { value: 'votes', text: 'Votes' },
        ],
        selectedSortOption: null,
        // Active or drafts
        proposalsType: '',
        // proposals: [],
        votes: [],
      };
    },
    computed: {
      isDrafts() {
        return this.$route.path.includes('drafts');
      },
      proposalsTitle() {
        return this.proposalsType === 'active'
               ? this.$t('common.activeProposals')
               : this.$t('common.drafts');
      },
      proposalsParsed() {
        if (!this.proposals || this.proposals.length === 0) return [];
        const proposalsClone = this.$helpers.copyDeep(this.proposals);

        return proposalsClone.map(proposal => this.$helpers.parseProposal(proposal));
      },
      proposalsFullInfo() {
        if (!this.proposalsParsed || this.proposalsParsed.length === 0
          || !this.votes || this.votes.length === 0) return [];

        // Add total_net_votes to proposals
        return this.votes
                   .map(vote => this.proposalsParsed
                   .map(proposal => this.$helpers.mergeVoteWithProposal(vote, proposal)))[0];
      },
    },
    watch: {
      $route: {
        immediate: true,
        handler(val) {
          // Request either active proposals or drafts
          this.proposalsType = this.getLastPartOfRoute(val.path);
          if (this.proposalsType === 'active') {
            this.$_getActiveProposals();
          } else {
            this.$_getDraftProposalByAccountName();
          }

          // get votes
          this.votes = this.$constants.VOTES;
        },
      },
    },
    methods: {
      getLastPartOfRoute(path) {
        const pathItems = path.split('/');
        return pathItems[pathItems.length - 1];
      },
    },
  };
</script>

<style scoped>

</style>
