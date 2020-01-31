<template>
  <v-container class="py-12 container--custom">
    <h1 class="fs-50">
      {{ $t('about.wpsFull') }}
    </h1>

    <v-divider class="v-divider--custom my-12" />

    <v-card
      flat
      class="secondary--text py-12 px-9 mb-12"
    >
      <div class="sections-wrapper">
        <section class="mb-9">
          <h2 class="fs-40 mb-2">
            {{ $t('common.overview') }}
          </h2>

          <i18n
            class="body-2 font-weight-medium"
            tag="p"
            path="about.overviewP1"
          >
            <template #dashNexus>
              <a
                href="https://docs.dash.org/en/stable/governance/understanding.html#budgets-and-masternode-voting"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('about.dashProposalSystem') }},
              </a>
            </template>
          </i18n>

          <i18n
            class="body-2 font-weight-medium"
            tag="p"
            path="about.overviewP2"
          >
            <template #eosio>
              <span class="font-weight-bold">
                eosio.wps
              </span>
            </template>
          </i18n>
        </section>

        <section class="mb-9">
          <h2 class="fs-40 mb-2">
            {{ $t('about.votingPeriodsAndFunding') }}
          </h2>

          <i18n
            class="body-2 font-weight-medium"
            tag="p"
            path="about.votingPeriodsAndFundingP1"
          >
            <template #maxMonthlyBudget>
              <span class="font-weight-bold">
                {{ maxMonthlyBudget }}
              </span>
            </template>

            <template #votingPeriod>
              <span class="font-weight-bold">
                {{ $t('about.votingPeriod', {days: $constants.VOTING_PERIOD}) }}
              </span>
            </template>
          </i18n>

          <i18n
            class="body-2 font-weight-medium"
            tag="p"
            path="about.votingPeriodsAndFundingP2"
          >
            <template #eosio>
              <span class="font-weight-bold">
                eosio.wps
              </span>
            </template>
          </i18n>

          <p class="body-2 font-weight-medium">
            {{ $t('about.votingPeriodsAndFundingP3') }}
          </p>
        </section>

        <section class="mb-9">
          <div class="mb-9">
            <h2 class="fs-40 mb-2">
              {{ $t('about.passingProposals') }}
            </h2>

            <i18n
              class="body-2 font-weight-medium"
              tag="p"
              path="about.passingProposalsP"
            >
              <template #proposalThreshold>
                <span class="font-weight-bold">
                  {{ $t('about.proposalThresholdSmall') }}
                </span>
              </template>
            </i18n>
          </div>

          <div class="mb-9">
            <h3 class="fs-30 font-weight-semi-bold mb-8">
              {{ $t('about.proposalThreshold') }}:
            </h3>

            <div class="d-flex align-center mb-6">
              <div class="mr-9 num">
                01.
              </div>
              <div
                class="body-2 font-weight-medium"
              >
                {{ $t('about.proposalThresholdP1', {voteMargin}) }}
              </div>
            </div>

            <div class="d-flex align-center">
              <div class="mr-9 num">
                02.
              </div>
              <div class="body-2 font-weight-medium">
                <div>
                  {{ $t('about.proposalThresholdP2', {maxMonthlyBudget}) }}
                </div>
                <div>{{ $t('about.proposalThresholdP3') }}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="fs-30 font-weight-semi-bold mb-8">
              {{ $t('about.eligibleVoter') }}:
            </h3>

            <i18n
              class="body-2 font-weight-medium"
              tag="p"
              path="about.eligibleVoterP1"
            >
              <template #eligibleVoter>
                <span class="font-weight-bold d-inline-block">
                  {{ $t('about.eligibleVoterSmall') }}
                </span>
              </template>
            </i18n>

            <p class="body-2 font-weight-medium">
              {{ $t('about.eligibleVoterP2') }}
            </p>
          </div>
        </section>

        <section class="mb-9">
          <h2 class="fs-40 mb-2">
            {{ $t('about.requirements') }}
          </h2>

          <p class="body-2 font-weight-medium">
            {{ $t('about.requirementsP', { depositFee: depositRequired }) }}
          </p>
        </section>
      </div>

      <section>
        <h2 class="fs-40 mb-2">
          {{ $t('about.guide') }}
        </h2>

        <v-container fluid>
          <v-row class="mb-12">
            <v-col>
              <div class="guide-item">
                <div class="guide-item__icon">
                  <i class="wps-ic-wallet fs-70" />
                </div>
                <div class="guide-item__para">
                  <h5>{{ $t('about.periodBudget') }}</h5>
                  <div class="body-2 font-weight-medium">
                    {{ maxMonthlyBudget }}
                  </div>
                </div>
              </div>
            </v-col>
            <v-col>
              <div class="guide-item">
                <div class="guide-item__icon">
                  <i class="wps-ic-clock fs-70" />
                </div>
                <div class="guide-item__para">
                  <h5>{{ $t('about.periodDuration') }}</h5>
                  <div class="body-2 font-weight-medium">
                    {{ `${$constants.VOTING_PERIOD} days` }}
                  </div>
                </div>
              </div>
            </v-col>
            <v-col>
              <div class="guide-item">
                <div class="guide-item__icon">
                  <i class="wps-ic-cert fs-70" />
                </div>
                <div class="guide-item__para">
                  <h5>{{ $t('about.proposalFee') }}</h5>
                  <div class="body-2 font-weight-medium">
                    {{ depositRequired }}
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row class="mb-12">
            <v-col>
              <div class="guide-item">
                <div class="guide-item__icon">
                  <i class="wps-ic-screens fs-70" />
                </div>
                <div class="guide-item__para">
                  <h5>{{ $t('about.passingThreshold') }}</h5>
                  <div class="body-2 font-weight-medium">
                    {{ $t('about.votesAtClose', { votes: voteMargin }) }}
                  </div>
                </div>
              </div>
            </v-col>
            <v-col>
              <div class="guide-item">
                <div class="guide-item__icon">
                  <i class="wps-ic-planchette fs-70" />
                </div>
                <div class="guide-item__para">
                  <h5>{{ $t('about.passingThreshold') }}</h5>
                  <div class="body-2 font-weight-medium">
                    {{ $t('about.eligibleVoterThreshold') }}
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row class="mb-12">
            <v-col>
              <div class="guide-item">
                <div class="guide-item__icon">
                  <i class="wps-ic-people-rotation fs-70" />
                </div>
                <div class="guide-item__para">
                  <h5>{{ $t('about.voteWeight') }}</h5>
                  <div class="body-2 font-weight-medium">
                    {{ $t('about.voteWeightP') }}
                  </div>
                </div>
              </div>
            </v-col>
            <v-col>
              <div class="guide-item">
                <div class="guide-item__icon">
                  <i class="wps-ic-system-blocks fs-70" />
                </div>
                <div class="guide-item__para">
                  <h5>{{ $t('about.fundSource') }}</h5>
                  <div class="body-2 font-weight-medium">
                    {{ $t('about.fundSourceP') }}
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-card>

    <v-card
      flat
      class="secondary--text py-12 px-9"
    >
      <section>
        <h2 class="fs-40 mb-12">
          {{ $t('about.faq') }}
        </h2>

        <v-expansion-panels
          accordion
          tile
          class="accordion"
        >
          <v-expansion-panel
            v-for="(item,i) in faq"
            :key="i"
            class="no-shadow"
            active-class="highlight-header"
          >
            <v-expansion-panel-header
              class="fs-20 accordion-line-height px-0 py-7"
              active-clas="primary--text"
              expand-icon="mdi-plus"
              disable-icon-rotate
              hide-actions
            >
              <div class="d-flex">
                <v-icon class="mr-2">
                  mdi-plus
                </v-icon>

                <div>
                  {{ item.question }}
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="body-2 font-weight-medium">
              {{ item.answer }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>
    </v-card>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ActionType from '@/store/constants';

  export default {
    name: 'About',
    data() {
      return {
        faq: [
          {
            question: this.$t('about.faqs.1.question'),
            answer: this.$t('about.faqs.1.answer'),
          },
          {
            question: this.$t('about.faqs.2.question'),
            answer: this.$t('about.faqs.2.answer'),
          },
          {
            question: this.$t('about.faqs.3.question'),
            answer: this.$t('about.faqs.3.answer'),
          },
          {
            question: this.$t('about.faqs.4.question'),
            answer: this.$t('about.faqs.4.answer'),
          },
          {
            question: this.$t('about.faqs.5.question'),
            answer: this.$t('about.faqs.5.answer'),
          },
          {
            question: this.$t('about.faqs.6.question'),
            answer: this.$t('about.faqs.6.answer'),
          },
          {
            question: this.$t('about.faqs.7.question'),
            answer: this.$t('about.faqs.7.answer'),
          },
          {
            question: this.$t('about.faqs.8.question'),
            answer: this.$t('about.faqs.8.answer'),
          },
          {
            question: this.$t('about.faqs.9.question'),
            answer: this.$t('about.faqs.9.answer'),
          },
          {
            question: this.$t('about.faqs.10.question'),
            answer: this.$t('about.faqs.10.answer'),
          },
          {
            question: this.$t('about.faqs.11.question'),
            answer: this.$t('about.faqs.11.answer'),
          },
          {
            question: this.$t('about.faqs.12.question'),
            answer: this.$t('about.faqs.12.answer'),
          },
        ],
      };
    },
    computed: {
      ...mapState({
        proposalsSettings: state => state.userService.proposalsSettings,
      }),
      maxMonthlyBudget() {
        if (!this.proposalsSettings
          || Object.keys(this.proposalsSettings).length === 0) {
          return this.$constants.MAX_MONTHLY_BUDGET;
        }

        return `${Math.round(this.proposalsSettings.max_monthly_budget.split(' ')[0])} EOS`;
      },
      depositRequired() {
        if (!this.proposalsSettings
          || Object.keys(this.proposalsSettings).length === 0) {
          return `${this.$constants.MIN_DEPOSIT} EOS`;
        }

        return `${Math.round(this.proposalsSettings.deposit_required.split(' ')[0])} EOS`;
      },
      voteMargin() {
        if (!this.proposalsSettings
          || Object.keys(this.proposalsSettings).length === 0) {
          return this.$constants.VOTE_MARGIN;
        }

        return this.proposalsSettings.vote_margin;
      },
    },
    created() {
      this[ActionType.REQUEST_SETTINGS]();
    },
    methods: {
      ...mapActions('userService', [
        ActionType.REQUEST_SETTINGS,
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  .sections-wrapper {
    max-width: 740px;
  }

  .num {
    color: $grey--2;
    font-size: 44px;
    font-weight: bold;
    min-width: 68px;
  }

  .accordion-line-height {
    line-height: 1.5;
  }

  .guide-item {
    display: flex;
    align-items: center;
    transition: all 0.2s;

    &:hover {
      color: $primary;
    }

    &__icon {
      margin-right: 30px;

      i {
        display: block;
        max-height: 74px;
      }
    }

    &__para {
      max-width: 312px;
    }
  }

  .no-shadow {
    &:before {
      box-shadow: none;
    }
  }

  .v-expansion-panel-header {
    transition: all 0.2s;

    &:hover {
      color: $primary;

      .v-icon {
        color: $primary;
      }
    }

    &--active {
      .v-icon {
        color: $primary;

        &:before {
          content: "\F156";
        }
      }
    }
  }

  .highlight-header {
    .v-expansion-panel-header {
      color: $primary;
    }
  }
</style>
