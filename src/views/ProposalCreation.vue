<template>
  <div class="py-12 proposal-creation">
    <v-container class="container--custom">
      <h1 class="display-1 font-weight-regular mb-3">
        {{ $t('proposalCreationPage.proposalCreation') }}
      </h1>

      <v-divider class="my-12" />

      <v-stepper
        v-model="currentStep"
        :alt-labels="true"
      >
        <v-stepper-header>
          <v-stepper-step
            :complete="currentStep > 1"
            :step="1"
            :editable="currentStep >= 1"
          >
            {{ $t('proposalCreationPage.setup') }}
          </v-stepper-step>
          <v-divider />
          <v-stepper-step
            :complete="isBudgetDataAvailable"
            :step="2"
            :editable="isBudgetDataAvailable"
          >
            {{ $t('proposalCreationPage.description') }}
          </v-stepper-step>
          <v-divider />
          <v-stepper-step
            :complete="isMilestonesAvailable"
            :step="3"
            :editable="isMilestonesAvailable"
          >
            {{ $t('common.timeline') }}
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <Setup
              :proposal-initial="$_proposalParsed"
              @step="setCurrentStep"
            />
          </v-stepper-content>

          <v-stepper-content step="2">
            <Description
              :proposal-initial="$_proposalParsed"
              @step="setCurrentStep"
            />
          </v-stepper-content>

          <v-stepper-content step="3">
            <TimelineEditable
              :proposal-initial="$_proposalParsed"
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

  export default {
    name: 'ProposalCreation',
    components: {
      Setup,
      Description,
      TimelineEditable,
    },
    mixins: [proposalParsed, getDraftByProposalName],
    data() {
      return {
        currentStep: 1,
        proposal: {},
      };
    },
    computed: {
      proposalId() {
        return this.$route.params.slug ? this.$route.params.slug : '';
      },
      isBudgetDataAvailable() {
        if (!this.$_proposalParsed || Object.keys(this.$_proposalParsed).length === 0) return false;
        return !!(this.$_proposalParsed.proposal_json.budget_data
          && this.$_proposalParsed.proposal_json.budget_data.length !== 0);
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
        handler() {
          if (this.proposalId) {
            // get proposal from the contract
            // this.proposal = this.$constants.PROPOSAL_DRAFT;
            this.$_getDraftProposalByProposalName(this.proposalId);
          } else {
            this.proposal = {};
          }
        },
      },
      currentStep() {
        if (this.proposalId) {
          this.$_getDraftProposalByProposalName(this.proposalId);
        }
      },
    },
    methods: {
      setCurrentStep(stepNumber) {
        this.currentStep = stepNumber;
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
