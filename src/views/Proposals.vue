<template>
  <div class="py-12">
    <v-container class="container--custom">
      <div class="d-flex justify-space-between flex-wrap">
        <h1 class="fs-50 font-weight-bold">
          {{ proposalsTitle }}
        </h1>

        <div class="fs-50 font-weight-bold">
          {{ proposalsNumber }}.
        </div>
      </div>

      <v-divider class="my-12" />

      <div
        v-if="isAllDataLoading || isDraftProposalByAccountNameLoading"
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
        <template v-if="!isDrafts">
          <!--        <v-row v-if="!isDrafts">-->
          <!--          <v-col-->
          <!--            sm="4"-->
          <!--            md="3"-->
          <!--          >-->
          <!--            <div class="sort-by">-->
          <!--              <v-select-->
          <!--                v-model="selectedSortOption"-->
          <!--                :items="sortByOptions"-->
          <!--                label="Sort by"-->
          <!--                outlined-->
          <!--                dense-->
          <!--                :menu-props="{ offsetY:true }"-->
          <!--              />-->
          <!--            </div>-->
          <!--          </v-col>-->
          <!--        </v-row>-->

          <div class="mb-12">
            <h2 class="fs-30 mb-12">
              {{ $t('common.passingProposals') }}
            </h2>
            <v-row>
              <template v-if="passingProposals && passingProposals.length !== 0">
                <v-col
                  v-for="(proposal, index) in passingProposals"
                  :key="index"
                  md="6"
                >
                  <ProposalItem
                    :proposal-name="proposal.proposal_name"
                    :title="proposal.title"
                    :proposer="proposal.proposer"
                    :available-budget="proposal.available_budget"
                    :img="proposal.proposal_json.img || undefined"
                    :category="proposal.proposal_json.category"
                    :summary="proposal.proposal_json.summary"
                    :budget="proposal.total_budget"
                    :duration="proposal.duration"
                    :payments="proposal.payments"
                    :status-by-votes="proposal.statusByVotes"
                    :votes="proposal.total_net_votes"
                    :is-draft="proposal.isDraft"
                  />
                </v-col>
              </template>
              <v-col v-else>
                <span class="font-weight-bold">
                  {{ $t('noDataTexts.nothingToDisplay') }}
                </span>
              </v-col>
            </v-row>
          </div>

          <div class="mb-12">
            <h2 class="fs-30 mb-12">
              {{ $t('common.notPassingProposals') }}
            </h2>
            <v-row>
              <template v-if="notPassingProposals && notPassingProposals.length !== 0">
                <v-col
                  v-for="(proposal, index) in notPassingProposals"
                  :key="index"
                  md="6"
                >
                  <ProposalItem
                    :proposal-name="proposal.proposal_name"
                    :title="proposal.title"
                    :proposer="proposal.proposer"
                    :available-budget="proposal.available_budget"
                    :img="proposal.proposal_json.img || undefined"
                    :category="proposal.proposal_json.category"
                    :summary="proposal.proposal_json.summary"
                    :budget="proposal.total_budget"
                    :duration="proposal.duration"
                    :payments="proposal.payments"
                    :status-by-votes="proposal.statusByVotes"
                    :votes="proposal.total_net_votes"
                    :is-draft="proposal.isDraft"
                  />
                </v-col>
              </template>
              <v-col v-else>
                <span class="font-weight-bold">
                  {{ $t('noDataTexts.nothingToDisplay') }}
                </span>
              </v-col>
            </v-row>
          </div>
        </template>

        <template v-else>
          <v-row class="mb-12">
            <template v-if="proposalsParsed && proposalsParsed.length !== 0">
              <v-col
                v-for="(proposal, index) in proposalsParsed"
                :key="index"
                md="6"
              >
                <ProposalItem
                  :proposal-name="proposal.proposal_name"
                  :title="proposal.title"
                  :proposer="proposal.proposer"
                  :available-budget="proposal.available_budget"
                  :img="proposal.proposal_json.img || undefined"
                  :category="proposal.proposal_json.category"
                  :summary="proposal.proposal_json.summary"
                  :budget="proposal.total_budget"
                  :duration="proposal.duration"
                  :payments="proposal.payments"
                  :status-by-votes="proposal.statusByVotes"
                  :votes="proposal.total_net_votes"
                  :is-draft="isDrafts"
                />
              </v-col>
            </template>
            <v-col v-else>
              {{ $t('noDataTexts.nothingToDisplay') }}
            </v-col>
          </v-row>
        </template>

        <div
          v-if="getAccountNameWithAuthority"
          class="create-proposal"
        >
          <div class="d-flex align-center justify-center flex-column">
            <v-btn
              fab
              color="primary"
              class="mb-4"
              :elevation="0"
              :large="true"
              :to="{ name: 'Proposal editor' }"
            >
              <v-icon
                class="fs-17"
                dark
              >
                mdi-plus
              </v-icon>
            </v-btn>
            <div class="font-weight-bold fs-13">
              {{ $t('common.createProposal') }}
            </div>
          </div>
        </div>
      </template>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import ProposalItem from '@/components/ProposalItem.vue';
  import getActiveProposals from '@/mixins/getActiveProposals';
  import getDraftsByAccountName from '@/mixins/getDraftsByAccountName';
  import getVotes from '@/mixins/getVotes';
  import getSettings from '@/mixins/getSettings';

  export default {
    name: 'Proposals',
    components: {
      ProposalItem,
    },
    mixins: [
      getActiveProposals,
      getDraftsByAccountName,
      getVotes,
      getSettings,
    ],
    data() {
      return {
        sortByOptions: [
          { value: 'date', text: 'Date' },
          { value: 'votes', text: 'Votes' },
        ],
        selectedSortOption: null,
        // Active or drafts
        proposalsType: '',
      };
    },
    computed: {
      ...mapGetters('userService', {
        getAccountNameWithAuthority: 'getAccountNameWithAuthority',
      }),
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
        return proposalsClone
          .map(
            proposal => this.$helpers.parseProposal(proposal),
          );
      },
      proposalsNumber() {
        if (!this.proposalsParsed || this.proposalsParsed.length === 0) return 0;

        const numOfProposals = this.proposalsParsed.length;

        return numOfProposals < 10 && numOfProposals > 0
               ? `0${numOfProposals}`
               : `${numOfProposals}`;
      },
      proposalsFullInfo() {
        if (!this.proposalsParsed || this.proposalsParsed.length === 0
          // || !this.proposalsVotes || this.proposalsVotes.length === 0
          || !this.proposalsSettings || Object.keys(this.proposalsSettings).length === 0
          || this.isDrafts) return [];

        const proposalsParsedCopy = this.$helpers.copyDeep(this.proposalsParsed);

        // Add statuses to proposals
        const proposalsWithStatuses = proposalsParsedCopy.map((proposal) => {
          // eslint-disable-next-line no-param-reassign
          proposal.statusByVotes = this.defineStatus(
            proposal.total_net_votes,
            this.proposalsSettings.vote_margin,
          );
          return proposal;
        });

        // Sort proposals
        // proposalsWithStatuses.sort((proposal1, proposal2) => {
        //   return new Date(proposal1.created) - new Date(proposal2.created);
        // });
        proposalsWithStatuses
          .sort((proposal1, proposal2) => proposal2.total_net_votes - proposal1.total_net_votes);

        return this.defineAvailableBudget(
          proposalsWithStatuses,
          this.proposalsSettings.max_monthly_budget,
        );
      },
      passingProposals() {
        if (!this.proposalsFullInfo && this.proposalsFullInfo.length === 0) return [];

        return this.proposalsFullInfo.filter(proposal => proposal.statusByVotes
          === this.$t('proposalStatuses.passing'));
      },
      notPassingProposals() {
        if (!this.proposalsFullInfo && this.proposalsFullInfo.length === 0) return [];

        return this.proposalsFullInfo.filter(proposal => proposal.statusByVotes
          === this.$t('proposalStatuses.notPassing'));
      },
      isAllDataLoading() {
        return this.isActiveProposalsLoading
          // && this.isVotesLoading
          && this.isSettingsLoading;
      },
    },
    watch: {
      $route: {
        immediate: true,
        handler(val) {
          // Request either active proposals or drafts
          this.proposalsType = this.getLastPartOfRoute(val.path);
          if (this.proposalsType === 'active') {
            // this.$_getVotes();
            this.$_getSettings();
            this.$_getActiveProposals();
          } else {
            this.$_getDraftProposalByAccountName();
          }
        },
      },
    },
    methods: {
      getLastPartOfRoute(path) {
        const pathItems = path.split('/');
        return pathItems[pathItems.length - 1];
      },
      defineStatus(totalNetVotes, voteMargin) {
        return totalNetVotes >= voteMargin
               ? this.$t('proposalStatuses.passing')
               : this.$t('proposalStatuses.notPassing');
      },
      defineAvailableBudget(proposals, maxMonthlyBudget) {
        let acc;
        const proposalsCopy = this.$helpers.copyDeep(proposals);
        return proposalsCopy.map((proposal, index) => {
          if (index === 0) {
            acc = +maxMonthlyBudget.split(' ')[0];
            // eslint-disable-next-line no-param-reassign
            proposal.available_budget = `${acc.toFixed(4)} EOS`;
          } else {
            acc -= proposalsCopy[index - 1].total_budget.split(' ')[0];
            // eslint-disable-next-line no-param-reassign
            proposal.available_budget = `${acc.toFixed(4)} EOS`;
          }

          return proposal;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  .create-proposal {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dotted $grey--2;
    height: 235px;
  }
</style>
