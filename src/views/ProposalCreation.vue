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
            :complete="isSetupComplete"
            :step="1"
            :editable="isStepEditable"
          >
            {{ $t('proposalCreationPage.setup') }}
          </v-stepper-step>
          <v-stepper-step
            color="primary"
            class="mx-sm-12"
            :complete="isDescriptionComplete"
            :step="2"
            :editable="isStepEditable"
          >
            {{ $t('proposalCreationPage.description') }}
          </v-stepper-step>
          <v-stepper-step
            color="primary"
            :complete="isTimelineComplete"
            :step="3"
            :editable="isStepEditable"
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
              @setup-validation-result="setSetupValidationResult"
              @step="setCurrentStep"
              @is-draft-modified="setIsDraftModified"
            />
          </v-stepper-content>

          <v-stepper-content
            step="2"
            class="pb-12"
          >
            <Description
              @description-validation-result="setDescriptionValidationResult"
              @step="setCurrentStep"
              @is-draft-modified="setIsDraftModified"
            />
          </v-stepper-content>

          <v-stepper-content
            step="3"
            class="pb-12"
          >
            <TimelineEditable
              @timeline-validation-result="setTimelineValidationResult"
              @is-draft-modified="setIsDraftModified"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
  import {
mapState, mapGetters, mapActions, mapMutations,
} from 'vuex';
  import ActionType from '@/store/constants';
  import Setup from '@/components/proposal-creation-steps/Setup.vue';
  import Description from '@/components/proposal-creation-steps/Description.vue';
  import TimelineEditable from '@/components/proposal-creation-steps/TimelineEditable.vue';
  import isProposalExist from '@/mixins/isProposalExist';

  export default {
    name: 'ProposalCreation',
    components: {
      Setup,
      Description,
      TimelineEditable,
    },
    mixins: [isProposalExist],
    data() {
      return {
        currentStep: 1,
        isDraftModified: false,
        setupValidationResult: true,
        descriptionValidationResult: true,
        timelineValidationResult: true,
      };
    },
    computed: {
      ...mapState({
        isDraftProposalByProposalNameLoading: state => state
          .userService.isDraftProposalByProposalNameLoading,
        proposal: state => state.userService.proposal,
      }),
      ...mapGetters('userService', {
        getProposalParsed: 'getProposalParsed',
      }),
      proposalId() {
        return this.$route.params.slug ? this.$route.params.slug : '';
      },
      isOverviewAvailable() {
        if (!this.getProposalParsed || Object.keys(this.getProposalParsed).length === 0) {
          return false;
        }
        return !!(this.getProposalParsed.proposal_json.overview);
      },
      isMilestonesAvailable() {
        if (!this.getProposalParsed || Object.keys(this.getProposalParsed).length === 0) {
          return false;
        }
        return !!(this.getProposalParsed.proposal_json.milestones
          && JSON.parse(this.getProposalParsed.proposal_json.milestones).length !== 0);
      },
      isSetupComplete() {
        return this.currentStep !== 1 && this.setupValidationResult;
      },
      isDescriptionComplete() {
        return this.currentStep !== 2
          && this.descriptionValidationResult
          && this.isOverviewAvailable;
      },
      isTimelineComplete() {
        return this.currentStep !== 3
          && this.timelineValidationResult
          && this.isMilestonesAvailable;
      },
      isStepEditable() {
        return this.setupValidationResult
          && this.descriptionValidationResult
          && this.timelineValidationResult;
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
            this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({});
            return;
          }
          if (!await this.$_isProposalExist(this.proposalId)) {
            this.$router.push({ name: 'Not found' });
            return;
          }

          this[ActionType.REQUEST_DRAFT_BY_PROPOSAL_NAME](this.proposalId);
        },
      },
      // async currentStep() {
      //   if (!this.proposalId) return;
      //   if (!await this.$_isProposalExist(this.proposalId)) {
      //     this.$router.push({ name: 'Not found' });
      //     return;
      //   }
      //
      //   this[ActionType.REQUEST_DRAFT_BY_PROPOSAL_NAME](this.proposalId);
      // },
      async isDraftModified() {
        if (!this.proposalId) return;
        if (!await this.$_isProposalExist(this.proposalId)) {
          this.$router.push({ name: 'Not found' });
          return;
        }

        this[ActionType.REQUEST_DRAFT_BY_PROPOSAL_NAME](this.proposalId);
      },
    },
    methods: {
      ...mapActions('userService', [
        ActionType.REQUEST_DRAFT_BY_PROPOSAL_NAME,
      ]),
      ...mapMutations('userService', [
        ActionType.SET_DRAFT_BY_PROPOSAL_NAME,
      ]),
      setCurrentStep(stepNumber) {
        this.currentStep = stepNumber;
      },
      setIsDraftModified(bool) {
        this.isDraftModified = bool;
      },
      setSetupValidationResult(bool) {
        this.setupValidationResult = bool;
      },
      setDescriptionValidationResult(bool) {
        this.descriptionValidationResult = bool;
      },
      setTimelineValidationResult(bool) {
        this.timelineValidationResult = bool;
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
      background-color: $primary--bg;
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
