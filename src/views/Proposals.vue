<template>
  <div class="py-12">
    <v-container class="container--custom">
      <h1 class="display-1 font-weight-regular">
        {{ proposalsTitle }}
      </h1>

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

      <template v-else-if="!isDrafts">
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

        <div>
          <h2 class="font-weight-regular green--text mb-6">
            {{ $t('common.paidProposals') }}
          </h2>
          <template
            v-if="proposalsFullInfo.paidProposals
              && proposalsFullInfo.paidProposals.length !== 0"
          >
            <ProposalItem
              v-for="(proposal, index) in proposalsFullInfo.paidProposals"
              :key="index"
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
          </template>
          <div v-else>
            {{ $t('noDataTexts.nothingToDisplay') }}
          </div>
        </div>

        <v-divider class="my-12" />

        <div>
          <h2 class="font-weight-regular red--text mb-6">
            {{ $t('common.unpaidProposals') }}
          </h2>

          <div class="mb-6">
            <h3 class="font-weight-regular warning--text mb-6">
              {{ $t('proposalItem.insufficientBudget') }}
            </h3>
            <template
              v-if="proposalsFullInfo.insufficientBudgetProposals
                && proposalsFullInfo.insufficientBudgetProposals.length !== 0"
            >
              <ProposalItem
                v-for="(proposal, index) in proposalsFullInfo.insufficientBudgetProposals"
                :key="index"
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
            </template>
            <div v-else>
              {{ $t('noDataTexts.nothingToDisplay') }}
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-weight-regular warning--text mb-6">
              {{ $t('proposalItem.insufficientVotes') }}
            </h3>
            <template
              v-if="proposalsFullInfo.insufficientVotesProposals
                && proposalsFullInfo.insufficientVotesProposals.length !== 0"
            >
              <ProposalItem
                v-for="(proposal, index) in proposalsFullInfo.insufficientVotesProposals"
                :key="index"
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
            </template>
            <div v-else>
              {{ $t('noDataTexts.nothingToDisplay') }}
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <template v-if="proposalsParsed && proposalsParsed.length !== 0">
          <ProposalItem
            v-for="(proposal, index) in proposalsParsed"
            :key="index"
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
        </template>
        <div v-else>
          {{ $t('noDataTexts.nothingToDisplay') }}
        </div>
      </template>
    </v-container>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ProposalItem from '@/components/ProposalItem.vue';
  import ActionType from '@/store/constants';

  export default {
    name: 'Proposals',
    components: {
      ProposalItem,
    },
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
      ...mapState({
        proposals: state => state.userService.proposals,
        draftProposals: state => state.userService.draftProposals,
        isActiveProposalsLoading: state => state.userService.isActiveProposalsLoading,
        isSettingsLoading: state => state.userService.isSettingsLoading,
        proposalsSettings: state => state.userService.proposalsSettings,
        isDraftProposalByAccountNameLoading: state => state
          .userService.isDraftProposalByAccountNameLoading,
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
        if ((!this.proposals || this.proposals.length === 0)
        && (!this.draftProposals || this.draftProposals.length === 0)) return [];

        const proposalsClone = this.$helpers.copyDeep(this.proposals);
        const draftProposalsClone = this.$helpers.copyDeep(this.draftProposals);
        const mapProposalsClone = proposalsClone
          .map(
            proposal => this.$helpers.parseProposal(proposal),
          );
        const mapDraftProposalsClone = draftProposalsClone
          .map(
            proposal => this.$helpers.parseProposal(proposal),
          );
        return [...mapProposalsClone, ...mapDraftProposalsClone];
      },
      proposalsFullInfo() {
        if (!this.proposalsParsed || this.proposalsParsed.length === 0
          || !this.proposalsSettings || Object.keys(this.proposalsSettings).length === 0
          || this.isDrafts) return [];

        // Add statuses by votes to proposals
        const proposalsWithStatusesByVotes = this.proposalsParsed.map(proposal => ({
          ...proposal,
          ...{
            statusByVotes: this.defineStatus(
                proposal.total_net_votes,
                this.proposalsSettings.vote_margin,
                Boolean(proposal.eligible),
              ),
          },
        }));

        const proposalsOrdered = this.restructureProposalsToObject(proposalsWithStatusesByVotes);

        return this.defineAvailableBudget(
            proposalsOrdered,
            this.proposalsSettings.max_monthly_budget,
          );
      },
      isAllDataLoading() {
        return this.isActiveProposalsLoading
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
            this[ActionType.REQUEST_SETTINGS]();
            this[ActionType.REQUEST_PROPOSALS]();
          } else {
            this[ActionType.REQUEST_DRAFTS_BY_ACCOUNT_NAME]();
          }
        },
      },
    },
    methods: {
      ...mapActions('userService', [
        ActionType.REQUEST_PROPOSALS,
        ActionType.REQUEST_SETTINGS,
        ActionType.REQUEST_DRAFTS_BY_ACCOUNT_NAME,
      ]),
      getLastPartOfRoute(path) {
        const pathItems = path.split('/');
        return pathItems[pathItems.length - 1];
      },
      defineStatus(totalNetVotes, voteMargin, isEligible) {
        return totalNetVotes >= voteMargin && isEligible
               ? this.$t('proposalStatuses.paid')
               : this.$t('proposalStatuses.unpaid');
      },
      sortProposalsByVotes(proposals) {
        return proposals
          .sort((proposal1, proposal2) => proposal2.total_net_votes - proposal1.total_net_votes);
      },
      restructureProposalsToObject(proposals) {
        const paidProposals = this.sortProposalsByVotes(
          proposals
            .filter(proposal => proposal.statusByVotes
              === this.$t('proposalStatuses.paid')),
        );

        const unpaidProposals = proposals
          .filter(proposal => proposal.statusByVotes
            === this.$t('proposalStatuses.unpaid'));

        const insufficientBudgetProposals = this.sortProposalsByVotes(
          unpaidProposals
            .filter(proposal => Boolean(proposal.eligible) === false && proposal.total_net_votes
              >= this.proposalsSettings.vote_margin),
        );

        const insufficientVotesProposals = this.sortProposalsByVotes(
          unpaidProposals
            .filter(proposal => proposal.total_net_votes < this.proposalsSettings.vote_margin),
        );

        return {
          ...(paidProposals && paidProposals.length !== 0)
          && { paidProposals },

          ...(insufficientBudgetProposals && insufficientBudgetProposals.length !== 0)
          && { insufficientBudgetProposals },

          ...(insufficientVotesProposals && insufficientVotesProposals.length !== 0)
          && { insufficientVotesProposals },
        };
      },
      defineAvailableBudget(proposals, maxMonthlyBudget) {
        const proposalsCopy = this.$helpers.copyDeep(proposals);
        let budget;
        let prevProposalTotalBudget;

        return Object.keys(proposalsCopy).reduce((acc, proposalsType, typeIndex) => {
          proposalsCopy[proposalsType].forEach((proposal, index) => {
            if (typeIndex === 0 && index === 0) {
              budget = +maxMonthlyBudget.split(' ')[0];
              // eslint-disable-next-line prefer-destructuring
              prevProposalTotalBudget = proposal.total_budget.split(' ')[0];
            } else {
              budget -= +prevProposalTotalBudget;
              // eslint-disable-next-line prefer-destructuring
              prevProposalTotalBudget = proposal.total_budget.split(' ')[0];
            }

            // eslint-disable-next-line no-param-reassign
            proposal.available_budget = `${budget} EOS`;
            if (proposalsType in acc) {
              acc[proposalsType].push(proposal);
            } else {
              // eslint-disable-next-line no-param-reassign
              acc = { ...acc, ...{ [proposalsType]: [proposal] } };
            }
            return acc;
          });
          return acc;
        }, {});
      },
    },
  };
</script>

<style scoped>

</style>
