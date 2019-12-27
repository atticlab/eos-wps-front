<template>
  <div class="py-12 proposal">
    <v-container class="container--custom">
      <div class="mb-12">
        <h1 class="display-1 font-weight-regular mb-3">
          {{ proposalFullInfo.title }}
        </h1>
        <p class="font-weight-bold body-2 mb-0">
          <span class="text-uppercase">
            {{ $t('proposalPage.proposedBy') }}:
          </span>
          <span class="cyan--darken-2--bold">
            {{ proposalFullInfo.proposer }}
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
            :style="{ 'background-image': proposalFullInfo.proposal_json &&
              proposalFullInfo.proposal_json.img
              ? `url(${proposalFullInfo.proposal_json.img})`
              : `url(${$constants.PROPOSAL_IMAGE_STUB_URL})`}"
            class="proposal__img"
          />
        </v-col>
        <v-col>
          <div class="cards-wrapper">
            <div v-if="isDraft">
              <v-btn
                block
                class="mb-4"
                color="blue darken-3 white--text"
                @click="transfer"
              >
                {{ $t('proposalPage.payFee') }}
              </v-btn>
              <v-btn
                block
                class="mb-4"
                color="blue darken-3 white--text"
                @click="activateProposal"
              >
                {{ $t('proposalPage.activate') }}
              </v-btn>
              <v-btn
                block
                class="mb-4"
                color="blue darken-3 white--text"
                :to="`/proposal-editor/${proposalId}`"
              >
                {{ $t('proposalCreationPage.editProposal') }}
              </v-btn>
              <v-btn
                block
                class="mb-4"
                color="blue darken-3 white--text"
                @click="refund"
              >
                {{ $t('proposalPage.refund') }}
              </v-btn>
              <v-btn
                block
                class="mb-4"
                color="error"
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
                      {{ proposalFullInfo.total_budget }}
                    </div>
                  </div>
                  <div>
                    <div>{{ $t('common.payments') }}:</div>
                    <div class="font-weight-bold body-1">
                      {{ proposalFullInfo.payments }}
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
                    {{ proposalFullInfo.total_net_votes }}
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

        <v-tab-item background-color="tile">
          <Overview
            :overview="proposalFullInfo.proposal_json && proposalFullInfo.proposal_json.overview
              ? proposalFullInfo.proposal_json.overview
              : ''"
            :proposer="proposalFullInfo.proposer"
            :hash="proposalFullInfo.proposal_json && proposalFullInfo.proposal_json.hash"
            :category="proposalFullInfo.proposal_json && proposalFullInfo.proposal_json.category"
            :created="proposalFullInfo.proposal_json && proposalFullInfo.proposal_json.created"
          />
        </v-tab-item>
        <v-tab-item>
          <BudgetOverview
            :monthly-budget="proposalFullInfo.monthly_budget"
            :total-budget="proposalFullInfo.total_budget"
            :duration="proposalFullInfo.duration"
            :budget-data="proposalFullInfo.proposal_json &&
              proposalFullInfo.proposal_json.budget_data"
          />
        </v-tab-item>
        <v-tab-item>
          <TimelineOverview
            :milestones-raw="proposalFullInfo.proposal_json &&
              proposalFullInfo.proposal_json.milestones"
          />
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Overview from '@/components/proposal-tabs/Overview.vue';
  import BudgetOverview from '@/components/proposal-tabs/BudgetOverview.vue';
  import TimelineOverview from '@/components/proposal-tabs/TimelineOverview.vue';
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

  export default {
    name: 'Proposal',
    components: {
      Overview,
      BudgetOverview,
      TimelineOverview,
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
    ],
    data() {
      return {
        proposalId: this.$route.params.slug,
        proposal: {},
        vote: {},
      };
    },
    computed: {
      ...mapState({
        isBp: state => state.userService.isBp,
      }),
      isDraft() {
        return this.$route.path.includes('draft');
      },
      proposalFullInfo() {
        if (!this.$_proposalParsed
          || Object.keys(this.$_proposalParsed).length === 0
          || !this.vote
          || Object.keys(this.vote).length === 0) return [];

        return this.$helpers.mergeVoteWithProposal(this.vote, this.$_proposalParsed);
      },
    },
    // Get a proposal if a user is already on the proposal page
    watch: {
      $route: {
        immediate: true,
        async handler() {
          // Request either active proposal or draft
          if (!await this.$_isProposalExist(this.proposalId)) {
            this.$router.push({ name: 'Not found' });
            return;
          }

          this.getProposal();

          // get votes
          // await this.$_getVotesByProposalName(this.proposalId);
          // eslint-disable-next-line prefer-destructuring
          this.vote = this.$constants.VOTES[0];
        },
      },
    },
    methods: {
      getProposal() {
        if (this.isDraft) {
          this.$_getDraftProposalByProposalName(this.proposalId);
        } else {
          this.$_getActiveProposalByProposalName(this.proposalId);
        }
      },
      async transfer() {
        try {
          const txId = await this.$_sendDeposit();
          console.log(txId);
          // TODO: notify user
        } catch (e) {
          // TODO: handle err
          console.error('transfer', e);
        }
      },
      async refund() {
        try {
          const txId = await this.$_refund();
          console.log(txId);
          // TODO: notify user
        } catch (e) {
          // TODO: handle err
          console.error('refund', e);
        }
      },
      async activateProposal() {
        try {
          const state = await this.$_getState();
          const txId = await this.$_activateProposal({
            proposalName: this.proposalId,
            // TODO: add ui element
            // can be current_voting_period or next_voting_period
            startVotingPeriod: state.current_voting_period,
          });
          console.log(txId);
          // TODO: notify user
        } catch (e) {
          // TODO: handle err
          console.error('activateProposal', e);
        }
      },
      async deleteProposal() {
        try {
          const txId = await this.$_cancelProposalDraft({
            proposalName: this.proposalId,
          });
          console.log(txId);
          this.$router.push({ name: 'ProposalsDrafts' });
        } catch (e) {
          // TODO: handle err
          console.error('activateProposal', e);
        }
      },
      async handleVote(voteType) {
        if (!voteType || (![this.$constants.VOTE_ABSTAIN, this.$constants.VOTE_YES,
          this.$constants.VOTE_NO].includes(voteType))) {
          // TODO: handle err
          alert('wrong Vote type');
          return;
        }

        try {
          const txId = await this.$_voteProposal({
            proposalName: this.proposalId,
            vote: voteType,
          });
          console.log(txId);
          // TODO: notify user
        } catch (e) {
          // TODO: handle err
          console.error('handleVote', e);
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
      background-repeat: no-repeat;
      min-height: 400px;
    }
  }
</style>
