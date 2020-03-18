<template>
  <div class="pb-12">
    <v-container class="container--custom">
      <div class="d-flex justify-space-between flex-wrap">
        <h1 class="fs-50 font-weight-bold">
          {{ proposalsTitle }}
        </h1>

        <div class="fs-50 font-weight-bold">
          {{ proposalsNumber }}.
        </div>
      </div>

      <v-divider class="v-divider--custom my-6" />

      <div class="layout-toggler mb-2 text-right">
        <v-btn
          elevation="0"
          fab
          :class="{
            'accent--text': !isList,
            'primary--text': isList,
            'white--text': true
          }"
          class="mr-4"
          small
          @click="isList = true"
        >
          <v-icon
            class="fs-17"
            dark
          >
            fas fa-list
          </v-icon>
        </v-btn>

        <v-btn
          elevation="0"
          fab
          :class="{
            'accent--text': isList,
            'primary--text': !isList,
            'white--text': true
          }"
          small
          @click="isList = false"
        >
          <v-icon
            class="fs-17"
            dark
          >
            fas fa-th-large
          </v-icon>
        </v-btn>
      </div>

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
          <div class="mb-6">
            <h2 class="fs-30">
              {{ $t('common.passingProposals') }}
            </h2>

            <v-row>
              <template
                v-if="proposalsFullInfo.paidProposals
                  && proposalsFullInfo.paidProposals.length !== 0"
              >
                <template v-if="!isList">
                  <v-col
                    v-for="(proposal, index) in proposalsFullInfo.paidProposals"
                    :key="index"
                    md="6"
                  >
                    <ProposalItem
                      :is-list="isList"
                      :proposal-name="proposal.proposal_name"
                      :title="proposal.title"
                      :proposer="proposal.proposer"
                      :available-budget="proposal.available_budget"
                      :img="proposal.proposal_json.img || undefined"
                      :category="proposal.proposal_json.category"
                      :summary="proposal.proposal_json.summary"
                      :budget="proposal.total_budget"
                      :duration="proposal.duration"
                      :payments="proposal.payouts"
                      :status-by-votes="proposal.statusByVotes"
                      :votes="proposal.total_net_votes"
                      :is-draft="proposal.isDraft"
                    />
                  </v-col>
                </template>

                <template v-else>
                  <v-col>
                    <v-simple-table
                      :fixed-header="true"
                      class="w-100"
                    >
                      <ProposalsColTitles :is-draft="isDrafts" />

                      <tbody>
                        <ProposalItem
                          v-for="(proposal, index) in proposalsFullInfo.paidProposals"
                          :key="index"
                          :is-list="isList"
                          :proposal-name="proposal.proposal_name"
                          :title="proposal.title"
                          :proposer="proposal.proposer"
                          :available-budget="proposal.available_budget"
                          :img="proposal.proposal_json.img || undefined"
                          :category="proposal.proposal_json.category"
                          :summary="proposal.proposal_json.summary"
                          :budget="proposal.total_budget"
                          :duration="proposal.duration"
                          :payments="proposal.payouts"
                          :status-by-votes="proposal.statusByVotes"
                          :votes="proposal.total_net_votes"
                          :is-draft="proposal.isDraft"
                        />
                      </tbody>
                    </v-simple-table>
                  </v-col>
                </template>
              </template>
              <v-col v-else>
                <span class="font-weight-bold body-2">
                  {{ $t('noDataTexts.nothingToDisplay') }}
                </span>
              </v-col>
            </v-row>
          </div>

          <div>
            <h2 class="fs-30">
              {{ $t('common.notMeetingThreshold') }}
            </h2>

            <template
              v-if="proposalsFullInfo.insufficientBudgetProposals
                && proposalsFullInfo.insufficientBudgetProposals.length !== 0
                || proposalsFullInfo.insufficientVotesProposals
                && proposalsFullInfo.insufficientVotesProposals.length !== 0"
            >
              <div
                v-if="proposalsFullInfo.insufficientBudgetProposals
                  && proposalsFullInfo.insufficientBudgetProposals.length !== 0"
              >
                <h3 class="red--text body-2 font-weight-bold">
                  {{ $t('proposalItem.insufficientBudget') }}
                </h3>

                <v-row>
                  <template v-if="!isList">
                    <v-col
                      v-for="(proposal, index) in proposalsFullInfo.insufficientBudgetProposals"
                      :key="index"
                      cols="12"
                      :md="isList ? 12 : 6"
                    >
                      <v-card
                        flat
                        class="responsive-card"
                      >
                        <ProposalItem
                          :is-list="isList"
                          :proposal-name="proposal.proposal_name"
                          :title="proposal.title"
                          :proposer="proposal.proposer"
                          :available-budget="proposal.available_budget"
                          :img="proposal.proposal_json.img || undefined"
                          :category="proposal.proposal_json.category"
                          :summary="proposal.proposal_json.summary"
                          :budget="proposal.total_budget"
                          :duration="proposal.duration"
                          :payments="proposal.payouts"
                          :status-by-votes="proposal.statusByVotes"
                          :votes="proposal.total_net_votes"
                          :is-draft="proposal.isDraft"
                        />
                      </v-card>
                    </v-col>
                    >
                  </template>

                  <template v-else>
                    <v-col>
                      <v-simple-table
                        :fixed-header="true"
                        class="w-100"
                      >
                        <ProposalsColTitles :is-draft="isDrafts" />

                        <tbody>
                          <ProposalItem
                            v-for="(proposal, index)
                              in proposalsFullInfo.insufficientBudgetProposals"
                            :key="index"
                            :is-list="isList"
                            :proposal-name="proposal.proposal_name"
                            :title="proposal.title"
                            :proposer="proposal.proposer"
                            :available-budget="proposal.available_budget"
                            :img="proposal.proposal_json.img || undefined"
                            :category="proposal.proposal_json.category"
                            :summary="proposal.proposal_json.summary"
                            :budget="proposal.total_budget"
                            :duration="proposal.duration"
                            :payments="proposal.payouts"
                            :status-by-votes="proposal.statusByVotes"
                            :votes="proposal.total_net_votes"
                            :is-draft="proposal.isDraft"
                          />
                        </tbody>
                      </v-simple-table>
                    </v-col>
                  </template>
                </v-row>
              </div>

              <div
                v-if="proposalsFullInfo.insufficientVotesProposals
                  && proposalsFullInfo.insufficientVotesProposals.length !== 0"
                class="mb-6"
              >
                <h3 class="red--text body-2 font-weight-bold">
                  {{ $t('proposalItem.insufficientVotes') }}
                </h3>

                <v-row>
                  <template v-if="!isList">
                    <v-col
                      v-for="(proposal, index) in proposalsFullInfo.insufficientVotesProposals"
                      :key="index"
                      :md="6"
                    >
                      <ProposalItem
                        :is-list="isList"
                        :proposal-name="proposal.proposal_name"
                        :title="proposal.title"
                        :proposer="proposal.proposer"
                        :available-budget="proposal.available_budget"
                        :img="proposal.proposal_json.img || undefined"
                        :category="proposal.proposal_json.category"
                        :summary="proposal.proposal_json.summary"
                        :budget="proposal.total_budget"
                        :duration="proposal.duration"
                        :payments="proposal.payouts"
                        :status-by-votes="proposal.statusByVotes"
                        :votes="proposal.total_net_votes"
                        :is-draft="proposal.isDraft"
                      />
                    </v-col>
                  </template>

                  <template v-else>
                    <v-col>
                      <v-simple-table
                        :fixed-header="true"
                        class="w-100"
                      >
                        <ProposalsColTitles :is-draft="isDrafts" />

                        <tbody>
                          <ProposalItem
                            v-for="(proposal, index)
                              in proposalsFullInfo.insufficientVotesProposals"
                            :key="index"
                            :is-list="isList"
                            :proposal-name="proposal.proposal_name"
                            :title="proposal.title"
                            :proposer="proposal.proposer"
                            :available-budget="proposal.available_budget"
                            :img="proposal.proposal_json.img || undefined"
                            :category="proposal.proposal_json.category"
                            :summary="proposal.proposal_json.summary"
                            :budget="proposal.total_budget"
                            :duration="proposal.duration"
                            :payments="proposal.payouts"
                            :status-by-votes="proposal.statusByVotes"
                            :votes="proposal.total_net_votes"
                            :is-draft="proposal.isDraft"
                          />
                        </tbody>
                      </v-simple-table>
                    </v-col>
                  </template>
                </v-row>
              </div>
            </template>

            <span
              v-else
              class="font-weight-bold body-2"
            >
              {{ $t('noDataTexts.nothingToDisplay') }}
            </span>
          </div>
        </template>

        <template v-else>
          <v-row class="mb-6">
            <template v-if="proposalsParsed && proposalsParsed.length !== 0">
              <template v-if="!isList">
                <v-col
                  v-for="(proposal, index) in proposalsParsed"
                  :key="index"
                  md="6"
                >
                  <ProposalItem
                    :is-list="isList"
                    :proposal-name="proposal.proposal_name"
                    :title="proposal.title"
                    :proposer="proposal.proposer"
                    :available-budget="proposal.available_budget"
                    :img="proposal.proposal_json.img || undefined"
                    :category="proposal.proposal_json.category"
                    :summary="proposal.proposal_json.summary"
                    :budget="proposal.total_budget"
                    :duration="proposal.duration"
                    :payments="proposal.payouts"
                    :status-by-votes="proposal.statusByVotes"
                    :votes="proposal.total_net_votes"
                    :is-draft="isDrafts"
                  />
                </v-col>
              </template>

              <template v-else>
                <v-col>
                  <v-simple-table
                    :fixed-header="true"
                    class="w-100"
                  >
                    <ProposalsColTitles :is-draft="isDrafts" />

                    <tbody>
                      <ProposalItem
                        v-for="(proposal, index) in proposalsParsed"
                        :key="index"
                        :is-list="isList"
                        :proposal-name="proposal.proposal_name"
                        :title="proposal.title"
                        :proposer="proposal.proposer"
                        :available-budget="proposal.available_budget"
                        :img="proposal.proposal_json.img || undefined"
                        :category="proposal.proposal_json.category"
                        :summary="proposal.proposal_json.summary"
                        :budget="proposal.total_budget"
                        :duration="proposal.duration"
                        :payments="proposal.payouts"
                        :status-by-votes="proposal.statusByVotes"
                        :votes="proposal.total_net_votes"
                        :is-draft="isDrafts"
                      />
                    </tbody>
                  </v-simple-table>
                </v-col>
              </template>
            </template>
            <v-col v-else>
              <span class="font-weight-bold body-2">
                {{ $t('noDataTexts.nothingToDisplay') }}
              </span>
            </v-col>
          </v-row>
        </template>
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
            height="68"
            width="68"
            :to="{ name: 'Proposal editor' }"
          >
            <v-icon
              class="fs-17"
              dark
            >
              mdi-plus
            </v-icon>
          </v-btn>
          <div class="font-weight-bold body-2">
            {{ $t('common.createProposal') }}
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import ProposalItem from '@/components/ProposalItem.vue';
  import ProposalsColTitles from '@/components/ProposalsColTitles.vue';
  import ActionType from '@/store/constants';

  export default {
    name: 'Proposals',
    components: {
      ProposalItem,
      ProposalsColTitles,
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
        isList: true,
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
        if ((!this.proposals || this.proposals.length === 0)
        && (!this.draftProposals || this.draftProposals.length === 0)) return [];

        let proposalsClone;
        if (this.isDrafts) {
          proposalsClone = this.$helpers.copyDeep(this.draftProposals);
        } else {
          proposalsClone = this.$helpers.copyDeep(this.proposals);
        }

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
          ? this.$t('proposalItem.passing')
          : this.$t('proposalItem.notPassing');
      },
      sortProposalsByVotes(proposals) {
        return proposals
          .sort((proposal1, proposal2) => proposal2.total_net_votes - proposal1.total_net_votes);
      },
      restructureProposalsToObject(proposals) {
        const paidProposals = this.sortProposalsByVotes(
          proposals
            .filter(proposal => proposal.statusByVotes
              === this.$t('proposalItem.passing')),
        );

        const unpaidProposals = proposals
          .filter(proposal => proposal.statusByVotes
            === this.$t('proposalItem.notPassing'));

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
            proposal.available_budget = `${budget.toFixed(this.$constants.EOS_MAX_DIGITS)} EOS`;
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

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  .create-proposal {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 235px;

    background-image:
      radial-gradient(circle at 2px, #4a4a4a 1px, rgba(255,255,255,0) 1px),
      radial-gradient(circle at 4.5px, #4a4a4a 1px, rgba(255,255,255,0) 1px),
      radial-gradient(circle at 2px, #4a4a4a 1px, rgba(255,255,255,0) 1px),
      radial-gradient(circle at 4.5px, #4a4a4a 1px, rgba(255,255,255,0) 1px);
    background-position: top, right, bottom, left;
    background-size: 15px 5px, 5px 15px;
    background-repeat: repeat-x, repeat-y;
  }

  .responsive-card {
    overflow-x: auto;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .w-100 {
    width: 100%;
  }
</style>
