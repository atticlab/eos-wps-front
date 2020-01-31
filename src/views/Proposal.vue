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
        <v-row>
          <v-col
            cols="12"
            :md="!isBp && !isDraft ? '12' : '7'"
            class="d-flex"
          >
            <v-card
              class="flex-fill"
              flat
            >
              <v-container
                fluid
                class="secondary--text font-weight-medium"
              >
                <div class="text-uppercase font-weight-semi-bold accent--text body-2 mt-2">
                  {{ $t('proposalPage.proposalInfo') }}
                </div>

                <h1 class="fs-40 secondary--text mb-2">
                  {{ $_proposalParsed.title }}
                </h1>

                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    :md="!isBp && !isDraft ? '4' : '6'"
                    :lg="!isBp && !isDraft ? '2' : '4'"
                  >
                    <div>
                      <div class="text-uppercase accent--text font-weight-semi-bold body-2 mb-1">
                        {{ $t('proposalPage.proposedBy') }}
                      </div>
                      <div class="font-weight-semi-bold fs-20">
                        {{ $_proposalParsed.proposer }}
                      </div>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    :md="!isBp && !isDraft ? '4' : '6'"
                    :lg="!isBp && !isDraft ? '2' : '4'"
                  >
                    <div>
                      <div class="text-uppercase accent--text font-weight-semi-bold body-2 mb-1">
                        {{ $t('proposalPage.category') }}
                      </div>
                      <div
                        v-if="$_proposalParsed.proposal_json
                          && $_proposalParsed.proposal_json.category"
                        class="primary--text font-weight-semi-bold text-capitalize fs-20"
                      >
                        {{ $_proposalParsed.proposal_json.category }}
                      </div>
                    </div>
                  </v-col>
                  <v-col
                    v-if="!isDraft"
                    cols="12"
                    sm="4"
                    :md="!isBp && !isDraft ? '4' : '6'"
                    :lg="!isBp && !isDraft ? '2' : '4'"
                  >
                    <div>
                      <div class="text-uppercase accent--text font-weight-semi-bold body-2 mb-1">
                        {{ $t('common.payments') }}
                      </div>
                      <div class="primary--text font-weight-semi-bold fs-20 text-capitalize">
                        {{ $_proposalParsed.payouts }}
                      </div>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    :md="!isBp && !isDraft ? '4' : '6'"
                    :lg="!isBp && !isDraft ? '2' : '4'"
                  >
                    <div>
                      <div class="text-uppercase accent--text font-weight-semi-bold body-2 mb-1">
                        {{ $t('common.requested') }}
                      </div>
                      <div class="font-weight-semi-bold fs-20">
                        {{ $_proposalParsed.total_budget }}
                      </div>
                    </div>
                  </v-col>
                  <v-col
                    v-if="!isDraft"
                    cols="12"
                    sm="4"
                    :md="!isBp && !isDraft ? '4' : '6'"
                    :lg="!isBp && !isDraft ? '2' : '4'"
                  >
                    <div>
                      <div class="text-uppercase accent--text font-weight-semi-bold body-2 mb-1">
                        {{ $t('common.votes') }}
                      </div>
                      <div
                        :class="{'font-weight-semi-bold fs-20': true,
                                 'primary--text': $_proposalParsed.total_net_votes > 0,
                                 'error--text': $_proposalParsed.total_net_votes < 0}"
                      >
                        {{ $_proposalParsed.total_net_votes }}
                      </div>
                    </div>
                  </v-col>
                  <v-col
                    v-if="!isDraft"
                    cols="12"
                    sm="4"
                    :md="!isBp && !isDraft ? '4' : '6'"
                    :lg="!isBp && !isDraft ? '2' : '4'"
                  >
                    <div>
                      <div class="text-uppercase accent--text font-weight-semi-bold body-2 mb-1">
                        {{ $t('proposalPage.published') }}
                      </div>
                      <div class="font-weight-semi-bold fs-20">
                        {{ $moment($_proposalParsed.created).format($constants.DATE_FORMAT) }}
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <p
                  v-if="$_proposalParsed.proposal_json
                    && $_proposalParsed.proposal_json.summary"
                  class="my-4 body-2 font-weight-medium"
                >
                  {{ $_proposalParsed.proposal_json.summary }}
                </p>

                <p
                  v-if="$_proposalParsed.proposal_json
                    && $_proposalParsed.proposal_json.video"
                  class="mt-8 mb-4 body-2 font-weight-medium"
                >
                  <span>
                    {{ $t('proposalPage.video') }}:
                  </span>
                  <a
                    :href="$_proposalParsed.proposal_json.video"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ $_proposalParsed.proposal_json.video }}
                  </a>
                </p>
              </v-container>
            </v-card>
          </v-col>
          <v-col
            v-if="isDraft || isBp"
            cols="12"
            class="d-flex"
            md="5"
          >
            <v-card
              class="flex-fill"
              flat
            >
              <v-container
                fluid
                class="secondary--text font-weight-semi-bold"
              >
                <div class="text-uppercase font-weight-medium accent--text fs-14 mb-4 mt-2">
                  {{ $t('common.actions') }}
                </div>

                <template v-if="isBp && !isDraft">
                  <div class="d-flex justify-space-between align-center flex-wrap mb-4">
                    <div class="actions-left">
                      <div class="font-weight-semi-bold text-uppercase">
                        {{ $t('proposalPage.voteFor') }}
                      </div>
                    </div>

                    <div class="actions-btn-container">
                      <v-btn
                        block
                        :elevation="0"
                        class="btn--alt"
                        :disabled="isVoteProposalLoading"
                        @click="handleVote($constants.VOTE_YES)"
                      >
                        {{ $t('proposalPage.upvote') }}
                      </v-btn>
                    </div>
                  </div>

                  <div class="d-flex justify-space-between align-center flex-wrap mb-4">
                    <div class="actions-left">
                      <div class="font-weight-semi-bold text-uppercase">
                        {{ $t('proposalPage.abstainIn') }}
                      </div>
                    </div>

                    <div class="actions-btn-container">
                      <v-btn
                        block
                        :elevation="0"
                        class="btn--alt"
                        :disabled="isVoteProposalLoading"
                        @click="handleVote($constants.VOTE_ABSTAIN)"
                      >
                        {{ $t('proposalPage.abstain') }}
                      </v-btn>
                    </div>
                  </div>

                  <div class="d-flex justify-space-between align-center flex-wrap mb-4">
                    <div class="actions-left">
                      <div class="font-weight-semi-bold text-uppercase">
                        {{ $t('proposalPage.voteAgainst') }}
                      </div>
                    </div>

                    <div class="actions-btn-container">
                      <v-btn
                        block
                        :elevation="0"
                        class="btn--alt"
                        :disabled="isVoteProposalLoading"
                        @click="handleVote($constants.VOTE_NO)"
                      >
                        {{ $t('proposalPage.downvote') }}
                      </v-btn>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div
                    v-if="!isMinDepositPaid"
                    class="d-flex justify-space-between align-center flex-wrap mb-4"
                  >
                    <div class="actions-left">
                      <div class="font-weight-semi-bold text-uppercase mb-1">
                        {{ $t('proposalPage.payDepositFee') }}
                      </div>
                      <div class="accent--text fs-12">
                        {{ $t('proposalPage.payFeeDesc') }}
                      </div>
                    </div>

                    <div class="actions-btn-container">
                      <v-btn
                        block
                        :elevation="0"
                        class="btn--alt"
                        :disabled="isSendDepositLoading"
                        :ripple="false"
                        @click="transfer"
                      >
                        {{ $t('proposalPage.payFeeShort') }}
                      </v-btn>
                    </div>
                  </div>
                  <div
                    v-if="isMinDepositPaid"
                    class="d-flex justify-space-between align-center flex-wrap mb-4"
                  >
                    <div class="actions-left">
                      <div class="font-weight-semi-bold text-uppercase mb-1">
                        {{ $t('proposalPage.activateProposal') }}
                      </div>
                      <div class="accent--text fs-12">
                        {{ $t('proposalPage.activateDesc') }}
                      </div>
                    </div>

                    <div class="actions-btn-container">
                      <v-dialog
                        v-model="activationDialog"
                        width="600px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            block
                            :elevation="0"
                            class="btn--alt"
                            :ripple="false"
                            v-on="on"
                          >
                            {{ $t('proposalPage.activate') }}
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="font-weight-bold">
                              {{ $t('proposalPage.proposalActivation') }}
                            </span>
                          </v-card-title>
                          <v-card-text>
                            <p class="font-weight-medium">
                              {{ $t('proposalPage.sureToActivate') }}
                            </p>
                            <i18n
                              path="proposalPage.currentVotingPeriodEndsIn"
                              tag="p"
                              class="red--text font-weight-medium mb-0"
                            >
                              <template #daysTillEnd>
                                {{ daysBeforeCurrentVotingPeriodExpires }}
                              </template>
                            </i18n>
                          </v-card-text>
                          <v-card-actions class="flex-wrap">
                            <v-spacer />

                            <div>
                              <v-btn
                                :elevation="0"
                                class="text-transform-none mr-2 mb-2"
                                color="primary"
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
                                :elevation="0"
                                class="text-transform-none ml-0 mb-2"
                                color="primary"
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
                    </div>
                  </div>
                  <div
                    v-if="isMinDepositPaid"
                    class="d-flex justify-space-between align-center flex-wrap mb-4"
                  >
                    <div class="actions-left">
                      <div class="font-weight-semi-bold text-uppercase mb-1">
                        {{ $t('proposalPage.refund') }}
                      </div>
                      <div class="accent--text fs-12">
                        {{ $t('proposalPage.refundDesc') }}
                      </div>
                    </div>

                    <div class="actions-btn-container">
                      <v-btn
                        block
                        :elevation="0"
                        class="btn--alt"
                        :disabled="isRefundLoading"
                        :ripple="false"
                        @click="refund"
                      >
                        {{ $t('proposalPage.refund') }}
                      </v-btn>
                    </div>
                  </div>

                  <div class="d-flex justify-space-between align-center flex-wrap mb-4">
                    <div class="actions-left">
                      <div class="font-weight-semi-bold text-uppercase mb-1">
                        {{ $t('proposalCreationPage.editProposal') }}
                      </div>
                      <div class="accent--text fs-12">
                        {{ $t('proposalPage.editDesc') }}
                      </div>
                    </div>

                    <div class="actions-btn-container">
                      <v-btn
                        block
                        :elevation="0"
                        class="btn--alt"
                        :ripple="false"
                        :to="`/proposal-editor/${proposalId}`"
                      >
                        {{ $t('proposalPage.edit') }}
                      </v-btn>
                    </div>
                  </div>

                  <div class="d-flex justify-space-between align-center flex-wrap mb-4">
                    <div class="actions-left">
                      <div class="font-weight-semi-bold text-uppercase mb-1">
                        {{ $t('proposalPage.deleteProposal') }}
                      </div>
                      <div class="accent--text fs-12">
                        {{ $t('proposalPage.deleteDesc') }}
                      </div>
                    </div>

                    <div class="actions-btn-container">
                      <v-btn
                        block
                        :elevation="0"
                        class="btn--alt"
                        :ripple="false"
                        :disabled="isCancelProposalDraftLoading"
                        @click="deleteProposal"
                      >
                        {{ $t('proposalCreationPage.delete') }}
                      </v-btn>
                    </div>
                  </div>
                </template>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mb-3">
          <v-col
            cols="12"
          >
            <div
              :style="{ 'background-image': $_proposalParsed.proposal_json &&
                $_proposalParsed.proposal_json.img
                ? `url(${$_proposalParsed.proposal_json.img})`
                : `url(${$constants.PROPOSAL_IMAGE_STUB_URL})`}"
              class="proposal__img"
            />
          </v-col>
        </v-row>

        <v-tabs
          hide-slider
          show-arrows
          class="font-weight-medium body-2"
        >
          <v-tab
            class="text-transform-none font-weight-semi-bold body-1 px-12"
            active-class="v-tab--active"
            :ripple="false"
          >
            {{ $t('common.overview') }}
          </v-tab>
          <v-tab
            class="text-transform-none font-weight-semi-bold body-1 px-12"
            active-class="v-tab--active"
            :ripple="false"
          >
            {{ $t('common.budget') }}
          </v-tab>
          <v-tab
            class="text-transform-none font-weight-semi-bold body-1 px-12"
            active-class="v-tab--active"
            :ripple="false"
          >
            {{ $t('common.timeline') }}
          </v-tab>
          <v-tab
            class="text-transform-none font-weight-semi-bold body-1 px-12"
            active-class="v-tab--active"
            :ripple="false"
          >
            {{ $t('proposalPage.voters') }}
          </v-tab>

          <v-tab-item>
            <Overview
              :overview="$_proposalParsed.proposal_json && $_proposalParsed.proposal_json.overview"
              :created="$_proposalParsed.created && $_proposalParsed.created"
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
  import { mapState, mapActions } from 'vuex';
  import ActionType from '@/store/constants';
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
  import isProposalExist from '@/mixins/isProposalExist';
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
      isProposalExist,
      notification,
    ],
    data() {
      return {
        proposalId: this.$route.params.slug,
        activationDialog: false,
        isDataLoading: true,
      };
    },
    computed: {
      ...mapState({
        isBp: state => state.userService.isBp,
        proposal: state => state.userService.proposal,
        draftProposal: state => state.userService.draftProposal,
        proposalState: state => state.userService.proposalState,
        votesByProposalName: state => state.userService.votesByProposalName,
        proposalDeposit: state => state.userService.proposalDeposit,
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
          this.getData();
        },
      },
    },
    methods: {
      ...mapActions('userService', [
        ActionType.REQUEST_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME,
        ActionType.REQUEST_DEPOSIT,
        ActionType.REQUEST_STATE,
        ActionType.REQUEST_VOTES_BY_PROPOSAL_NAME,
        ActionType.REQUEST_DRAFT_BY_PROPOSAL_NAME,
      ]),
      async transfer() {
        try {
          await this.$_sendDeposit();
          this.getData();
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
      async getData() {
        try {
          this.isDataLoading = true;

          // Request either active proposal or draft
          if (!await this.$_isProposalExist(this.proposalId)) {
            this.$router.push({ name: 'Not found' });
            return;
          }

          if (this.isDraft) {
            await this[ActionType.REQUEST_STATE]();
            await this[ActionType.REQUEST_DEPOSIT]();
            this[ActionType.REQUEST_DRAFT_BY_PROPOSAL_NAME](this.proposalId);
          } else {
            this[ActionType.REQUEST_ACTIVE_PROPOSAL_BY_PROPOSAL_NAME](this.proposalId);
          }
          // get votes
          await this[ActionType.REQUEST_VOTES_BY_PROPOSAL_NAME](this.proposalId);
        } catch (error) {
          console.error('Error', error);
        } finally {
          this.isDataLoading = false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  .proposal {
    &__img {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      height: 480px;
    }
  }

  .actions-left {
    max-width: 230px;
    font-size: 14px;
  }

  .actions-btn-container {
    width: 140px;
  }

  .v-tab--active {
    background-color: $white;

    &:before {
      display: none;
    }
  }

  @media (max-width: 1263px) {
    .actions-left {
      max-width: 60%;
      margin-right: 16px;
      margin-bottom: 16px;
    }
  }

  @media (max-width: 599px) {
    .actions-left {
      max-width: 100%;
    }
  }
</style>
