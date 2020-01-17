<template>
  <div class="py-12 proposal">
    <v-container class="container--custom">
      <div
        v-if="isDataLoading"
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
        <div class="mb-12">
          <h1 class="display-1 font-weight-regular mb-3">
            {{ $_proposalParsed.title }}
          </h1>
          <p class="font-weight-bold body-2 mb-0">
            <span class="text-uppercase">
              {{ $t('proposalPage.proposedBy') }}:
            </span>
            <span class="cyan--darken-2--bold">
              {{ $_proposalParsed.proposer }}
            </span>
          </p>
        </div>

        <v-row class="mb-12">
          <v-col
            cols="12"
            md="7"
            lg="8"
          >
            <div
              :style="{ 'background-image': $_proposalParsed.proposal_json &&
                $_proposalParsed.proposal_json.img
                ? `url(${$_proposalParsed.proposal_json.img})`
                : `url(${$constants.PROPOSAL_IMAGE_STUB_URL})`}"
              class="proposal__img"
            />
          </v-col>
          <v-col>
            <div class="cards-wrapper">
              <div v-if="isDraft">
                <v-btn
                  v-if="!isMinDepositPaid"
                  block
                  class="mb-4"
                  color="blue darken-3 white--text"
                  :disabled="isSendDepositLoading"
                  @click="transfer"
                >
                  {{ $t('proposalPage.payFee') }}
                </v-btn>

                <v-dialog
                  v-if="isMinDepositPaid"
                  v-model="activationDialog"
                  width="600px"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      block
                      class="mb-4"
                      color="blue darken-3 white--text"
                      :disabled="isSendDepositLoading"
                      v-on="on"
                    >
                      {{ $t('proposalPage.activate') }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Proposal activation</span>
                    </v-card-title>
                    <v-card-text>
                      <p class="body-1">
                        {{ $t('proposalPage.sureToActivate') }}
                      </p>
                      <i18n
                        path="proposalPage.currentVotingPeriodEndsIn"
                        tag="p"
                        class="warning--text body-1"
                      >
                        <template #daysTillEnd>
                          {{ daysBeforeCurrentVotingPeriodExpires }}
                        </template>
                      </i18n>
                    </v-card-text>
                    <v-card-actions class="flex-wrap">
                      <div class="ml-4">
                        <v-btn
                          class="mr-2 mb-4"
                          color="green white--text"
                          :disabled="isActivateProposalLoading"
                          @click="activateProposal(false)"
                        >
                          <i18n path="proposalPage.activateFor">
                            <template #votingPeriod>
                              <span class="yellow--text">
                                {{ $t('proposalPage.current') }}
                              </span>
                            </template>
                          </i18n>
                        </v-btn>
                        <v-btn
                          class="ml-0 mb-4"
                          color="green white--text"
                          :disabled="isActivateProposalLoading"
                          @click="activateProposal(true)"
                        >
                          <i18n path="proposalPage.activateFor">
                            <template #votingPeriod>
                              <span class="yellow--text">
                                {{ $t('proposalPage.next') }}
                              </span>
                            </template>
                          </i18n>
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-btn
                  block
                  class="mb-4"
                  color="blue darken-3 white--text"
                  :to="`/proposal-editor/${proposalId}`"
                >
                  {{ $t('proposalCreationPage.editProposal') }}
                </v-btn>
                <v-btn
                  v-if="isMinDepositPaid"
                  block
                  class="mb-4"
                  color="blue darken-3 white--text"
                  :disabled="isRefundLoading"
                  @click="refund"
                >
                  {{ $t('proposalPage.refund') }}
                </v-btn>
                <v-btn
                  block
                  class="mb-4"
                  color="error"
                  :disabled="isCancelProposalDraftLoading"
                  @click="deleteProposal"
                >
                  {{ $t('proposalPage.deleteProposal') }}
                </v-btn>
              </div>

              <v-card
                class="text-center"
                color="pink darken-4 white--text mb-5"
              >
                <v-card-title class="justify-center pa-2">
                  {{ $t('proposalPage.paymentInfo') }}:
                </v-card-title>
                <v-card-text class="white pt-4 word-break">
                  <div class="d-flex justify-space-around">
                    <div class="mr-3">
                      <div>{{ $t('common.requested') }}:</div>
                      <div class="font-weight-bold body-1">
                        {{ $_proposalParsed.total_budget }}
                      </div>
                    </div>
                    <div v-if="!isDraft">
                      <div>{{ $t('common.payments') }}:</div>
                      <div class="font-weight-bold body-1">
                        {{ $_proposalParsed.payouts }}
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>

              <v-card
                v-if="!isDraft"
                class="text-center mb-12"
                color="pink darken-4 white--text"
              >
                <v-card-title class="justify-center pa-2">
                  {{ $t('common.votes') }}:
                </v-card-title>
                <v-card-text class="white pt-4 word-break">
                  <div class="d-flex justify-space-around">
                    <div class="font-weight-bold body-1">
                      {{ $_proposalParsed.total_net_votes }}
                    </div>
                  </div>
                </v-card-text>
              </v-card>

              <template
                v-if="isBp && !isDraft"
              >
                <v-btn
                  class="mb-4"
                  block
                  color="success"
                  @click="handleVote($constants.VOTE_YES)"
                >
                  {{ $t('proposalPage.upvote') }}
                </v-btn>
                <v-btn
                  class="mb-4"
                  block
                  color="blue darken-3 white--text"
                  @click="handleVote($constants.VOTE_ABSTAIN)"
                >
                  {{ $t('proposalPage.abstain') }}
                </v-btn>
                <v-btn
                  class="mb-4"
                  block
                  color="error"
                  @click="handleVote($constants.VOTE_NO)"
                >
                  {{ $t('proposalPage.downvote') }}
                </v-btn>
              </template>
            </div>
          </v-col>
        </v-row>

        <v-tabs
          class="elevation-2"
          dark
          background-color="primary"
        >
          <v-tab>{{ $t('proposalPage.overview') }}</v-tab>
          <v-tab>{{ $t('common.budget') }}</v-tab>
          <v-tab>{{ $t('common.timeline') }}</v-tab>
          <v-tab>{{ $t('proposalPage.voters') }}</v-tab>

          <v-tab-item background-color="tile">
            <Overview
              :overview="$_proposalParsed.proposal_json && $_proposalParsed.proposal_json.overview"
              :proposer="$_proposalParsed.proposer"
              :hash="$_proposalParsed.proposal_json && $_proposalParsed.proposal_json.hash"
              :category="$_proposalParsed.proposal_json && $_proposalParsed.proposal_json.category"
              :created="$_proposalParsed.proposal_json && $_proposalParsed.proposal_json.created"
              :video="$_proposalParsed.proposal_json && $_proposalParsed.proposal_json.video"
            />
          </v-tab-item>
          <v-tab-item>
            <BudgetOverview
              :monthly-budget="$_proposalParsed.monthly_budget"
              :total-budget="$_proposalParsed.total_budget"
              :duration="$_proposalParsed.duration"
              :budget-data="$_proposalParsed.proposal_json &&
                $_proposalParsed.proposal_json.budgets"
            />
          </v-tab-item>
          <v-tab-item>
            <TimelineOverview
              :milestones-raw="$_proposalParsed.proposal_json &&
                $_proposalParsed.proposal_json.milestones"
            />
          </v-tab-item>
          <v-tab-item>
            <Voters :votes-initial="votesByProposalName" />
          </v-tab-item>
        </v-tabs>
      </template>
    </v-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Overview from '@/components/proposal-tabs/Overview.vue';
  import BudgetOverview from '@/components/proposal-tabs/BudgetOverview.vue';
  import TimelineOverview from '@/components/proposal-tabs/TimelineOverview.vue';
  import Voters from '@/components/proposal-tabs/Voters.vue';
  import proposalParsed from '@/mixins/proposalParsed';
  import voteProposal from '@/mixins/voteProposal';
  import sendDeposit from '@/mixins/sendDeposit';
  import refund from '@/mixins/refund';
  import activateProposal from '@/mixins/activateProposal';
  import cancelProposalDraft from '@/mixins/cancelProposalDraft';
  import getDraftByProposalName from '@/mixins/getDraftByProposalName';
  import isProposalExist from '@/mixins/isProposalExist';
  import getActiveProposalByProposalName from '@/mixins/getActiveProposalByProposalName';
  import getState from '@/mixins/getState';
  import getVotesByProposalName from '@/mixins/getVotesByProposalName';
  import getDeposit from '@/mixins/getDeposit';
  import notification from '@/mixins/notification';

  export default {
    name: 'Proposal',
    components: {
      Overview,
      BudgetOverview,
      TimelineOverview,
      Voters,
    },
    mixins: [
      proposalParsed,
      voteProposal,
      sendDeposit,
      refund,
      activateProposal,
      cancelProposalDraft,
      getDraftByProposalName,
      isProposalExist,
      getActiveProposalByProposalName,
      getState,
      getVotesByProposalName,
      getDeposit,
      notification,
    ],
    data() {
      return {
        proposalId: this.$route.params.slug,
        proposal: {},
        activationDialog: false,
        isDataLoading: true,
      };
    },
    computed: {
      ...mapState({
        isBp: state => state.userService.isBp,
      }),
      isDraft() {
        return this.$route.path.includes('draft');
      },
      daysBeforeCurrentVotingPeriodExpires() {
        if (!this.proposalState) return null;
        const nextPeriodDate = this.$moment.utc(this.proposalState.next_voting_period).startOf('day');
        const todayDate = this.$moment.utc().startOf('day');

        return nextPeriodDate.diff(todayDate, 'days');
      },
      isMinDepositPaid() {
        if (!this.proposalDeposit || Object.keys(this.proposalDeposit).length === 0) return 0;

        return Number(this.proposalDeposit.balance.split(' ')[0])
          >= this.$constants.MIN_DEPOSIT;
      },
    },
    // Get a proposal if a user is already on the proposal page
    watch: {
      $route: {
        immediate: true,
        async handler() {
          try {
            this.isDataLoading = true;

            // Request either active proposal or draft
            if (!await this.$_isProposalExist(this.proposalId)) {
              this.$router.push({ name: 'Not found' });
              return;
            }

            if (this.isDraft) {
              await this.$_getState();
              await this.$_getDeposit();
              this.$_getDraftProposalByProposalName(this.proposalId);
            } else {
              this.$_getActiveProposalByProposalName(this.proposalId);
            }

            // get votes
            await this.$_getVotesByProposalName(this.proposalId);
          } catch (error) {
            // No catch
          } finally {
            this.isDataLoading = false;
          }
        },
      },
    },
    methods: {
      async transfer() {
        try {
          await this.$_sendDeposit();
          this.showSuccessMsg(this.$t('notifications.sentDeposit'));
        } catch {} // eslint-disable-line no-empty
      },
      async refund() {
        try {
          await this.$_refund();
          this.showSuccessMsg(this.$t('notifications.sentRefund'));
        } catch {} // eslint-disable-line no-empty
      },
      async activateProposal(isNext = false) {
        try {
          // const state = await this.$_getState();
          await this.$_activateProposal({
            proposalName: this.proposalId,
            startVotingPeriod: isNext
                               ? this.proposalState.next_voting_period
                               : this.proposalState.current_voting_period,
          });
          this.showSuccessMsg(this.$t('notifications.proposalActivated'));
          this.$router.push({ name: 'ProposalsActive' });
        } catch {
          // TODO: handle errors
        } finally {
          this.activationDialog = false;
        }
      },
      async deleteProposal() {
        try {
          await this.$_cancelProposalDraft({
            proposalName: this.proposalId,
          });
          this.$eventBus.$emit('proposal-deleted', true);
          this.showSuccessMsg(this.$t('notifications.proposalDeleted'));
          this.$router.push({ name: 'ProposalsDrafts' });
        } catch {} // eslint-disable-line no-empty
      },
      async handleVote(voteType) {
        if (!voteType || (![this.$constants.VOTE_ABSTAIN, this.$constants.VOTE_YES,
          this.$constants.VOTE_NO].includes(voteType))) {
          this.showErrorMsg(this.$t('notifications.wrongVoteType'));
          return;
        }

        try {
          await this.$_voteProposal({
            proposalName: this.proposalId,
            vote: voteType,
          });
          this.showSuccessMsg(this.$t('notifications.sentVote'));
        } catch {} // eslint-disable-line no-empty
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  .proposal {
    &__img {
      background-position: center;
      background-repeat: no-repeat;
      min-height: 400px;
    }
  }
</style>
