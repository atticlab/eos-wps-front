<template>
  <div class="py-12 proposal-creation">
    <v-container class="container--custom">
      <div class="page-header">
        <div class="page-header__top">
          <h1 class="fs-35 mb-2">
            {{ $t('proposalCreationPage.proposalCreation') }}
          </h1>
          <div class="font-weight-bold">
            {{ $t('common.createProposalOnMainnet') }}
          </div>
        </div>
        <div class="page-header__bottom" />
      </div>

      <!--      :alt-labels="true"-->
      <v-stepper
        v-model="currentStep"
        flat
        :elevation="0"
      >
        <v-stepper-header
          class="justify-center font-weight-bold"
        >
          <v-stepper-step
            color="primary"
            :complete="currentStep > 1"
            :step="1"
            :editable="currentStep >= 1"
          >
            {{ $t('proposalCreationPage.setup') }}
          </v-stepper-step>
          <!--          <v-divider />-->
          <v-stepper-step
            color="primary"
            class="mx-sm-12"
            :complete="isOverviewAvailable"
            :step="2"
            :editable="isOverviewAvailable"
          >
            {{ $t('proposalCreationPage.description') }}
          </v-stepper-step>
          <!--          <v-divider />-->
          <v-stepper-step
            color="primary"
            :complete="isMilestonesAvailable"
            :step="3"
            :editable="isMilestonesAvailable"
          >
            {{ $t('common.timeline') }}
          </v-stepper-step>
        </v-stepper-header>

        <div
          v-show="isDraftProposalByProposalNameLoading"
          :class="{
            'd-flex': isDraftProposalByProposalNameLoading,
            'justify-center': true,
          }"
        >
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          />
        </div>

        <v-stepper-items v-show="!isDraftProposalByProposalNameLoading">
          <v-stepper-content
            step="1"
            class="pb-12"
          >
            <Setup
              :proposal-initial="$_proposalParsed"
              @step="setCurrentStep"
            />
          </v-stepper-content>

          <v-stepper-content
            step="2"
            class="pb-12"
          >
            <Description
              :proposal-initial="$_proposalParsed"
              @step="setCurrentStep"
              @is-draft-modified="setIsDraftModified"
            />
          </v-stepper-content>

          <v-stepper-content
            step="3"
            class="pb-12"
          >
            <TimelineEditable
              :proposal-initial="$_proposalParsed"
              @is-draft-modified="setIsDraftModified"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
  import Setup from '@/components/proposal-creation-steps/Setup.vue';
  import Description from '@/components/proposal-creation-steps/Description.vue';
  import TimelineEditable from '@/components/proposal-creation-steps/TimelineEditable.vue';
  import proposalParsed from '@/mixins/proposalParsed';
  import getDraftByProposalName from '@/mixins/getDraftByProposalName';
  import isProposalExist from '@/mixins/isProposalExist';

  export default {
    name: 'ProposalCreation',
    components: {
      Setup,
      Description,
      TimelineEditable,
    },
    mixins: [proposalParsed, getDraftByProposalName, isProposalExist],
    data() {
      return {
        currentStep: 1,
        isDraftModified: false,
      };
    },
    computed: {
      proposalId() {
        return this.$route.params.slug ? this.$route.params.slug : '';
      },
      isOverviewAvailable() {
        if (!this.$_proposalParsed || Object.keys(this.$_proposalParsed).length === 0) return false;
        return !!(this.$_proposalParsed.proposal_json.overview);
      },
      isMilestonesAvailable() {
        if (!this.$_proposalParsed || Object.keys(this.$_proposalParsed).length === 0) return false;
        return !!(this.$_proposalParsed.proposal_json.milestones
          && this.$_proposalParsed.proposal_json.milestones.length !== 0);
      },
    },
    watch: {
      proposalId: {
        immediate: true,
        handler(val) {
          if (!val) this.currentStep = 1;
        },
      },
      $route: {
        immediate: true,
        async handler() {
          if (!this.proposalId) {
            // proposal is in the getDraftByProposalName mixin
            this.proposal = {};
            return;
          }
          if (!await this.$_isProposalExist(this.proposalId)) {
            this.$router.push({ name: 'Not found' });
            return;
          }

          this.$_getDraftProposalByProposalName(this.proposalId);
        },
      },
      async currentStep() {
        if (!this.proposalId) return;
        if (!await this.$_isProposalExist(this.proposalId)) {
          this.$router.push({ name: 'Not found' });
          return;
        }

        this.$_getDraftProposalByProposalName(this.proposalId);
      },
      async isDraftModified() {
        if (!this.proposalId) return;
        if (!await this.$_isProposalExist(this.proposalId)) {
          this.$router.push({ name: 'Not found' });
          return;
        }

        this.$_getDraftProposalByProposalName(this.proposalId);
      },
    },
    methods: {
      setCurrentStep(stepNumber) {
        this.currentStep = stepNumber;
      },
      setIsDraftModified(bool) {
        this.isDraftModified = bool;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  .page-header {
    background-color: $white;
    margin-bottom: 30px;

    &__top {
      background-color: rgba(48, 146, 130, 0.13);
      background-image: url("~@/assets/img/bg-top.png");
      background-size: 35%;
      background-position: center right;
      padding: 30px;
      height: 200px;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    &__bottom {
      height: 60px;
    }
  }

  @media (max-width: 599px) {
    .page-header__top {
      background-image: none;
    }
  }
</style>
