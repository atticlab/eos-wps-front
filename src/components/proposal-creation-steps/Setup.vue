<template>
  <div>
    <v-form>
      <div class="mb-4">
        <label
          for="proposalName"
          class="title d-inline-flex mb-2 required"
        >
          {{ $t('proposalCreationPage.proposalName') }}
        </label>
        <v-text-field
          id="proposalName"
          v-model="setupData.proposal_name"
          :error-messages="nameErrors"
          required
          :counter="12"
          :label="$t('proposalCreationPage.giveProposalName')"
          :disabled="!!proposalId"
          @input="validateSingleField('proposal_name')"
          @blur="validateSingleField('proposal_name')"
        />
      </div>

      <div class="mb-4">
        <label
          for="proposalTitle"
          class="title d-inline-flex mb-2 required"
        >
          {{ $t('proposalCreationPage.proposalTitle') }}
        </label>
        <v-text-field
          id="proposalTitle"
          v-model="setupData.title"
          :error-messages="titleErrors"
          required
          :counter="60"
          :label="$t('proposalCreationPage.giveProposalTitle')"
          @input="validateSingleField('title')"
          @blur="validateSingleField('title')"
        />
      </div>

      <div class="mb-4">
        <label
          for="proposalSummary"
          class="title d-inline-flex mb-2 required"
        >
          {{ $t('proposalCreationPage.proposalSummary') }}
        </label>
        <v-text-field
          id="proposalSummary"
          v-model="setupData.summary"
          :error-messages="summaryErrors"
          required
          :counter="150"
          :label="$t('proposalCreationPage.shortlyDescribeProposal')"
          @input="validateSingleField('summary')"
          @blur="validateSingleField('summary')"
        />
      </div>

      <div class="mb-4">
        <label
          for="proposalCategory"
          class="title d-inline-flex mb-2 required"
        >
          {{ $t('proposalCreationPage.proposalCategory') }}
        </label>
        <v-select
          id="proposalCategory"
          v-model="setupData.category"
          :error-messages="categoryErrors"
          required
          :items="$constants.PROPOSAL_CATEGORIES"
          :label="$t('proposalCreationPage.chooseCategory')"
          @input="validateSingleField('category')"
          @blur="validateSingleField('category')"
        >
          <template v-slot:selection="{item}">
            <span class="text-capitalize">
              {{ item }}
            </span>
          </template>
          <template v-slot:item="{item}">
            <span class="text-capitalize">
              {{ item }}
            </span>
          </template>
        </v-select>
      </div>

      <div class="mb-4">
        <label
          for="proposalImage"
          class="title d-block mb-2"
        >
          {{ $t('proposalCreationPage.heroImg') }}
          <span class="d-block body-2 grey--text">
            {{ $t('proposalCreationPage.attachImgUrl') }}
          </span>
        </label>
        <v-text-field
          id="proposalImage"
          v-model="setupData.img"
          :error-messages="imgErrors"
          :label="$t('proposalCreationPage.imgUrl')"
          @input="validateSingleField('img')"
          @blur="validateSingleField('img')"
        />
      </div>

      <div class="mb-4">
        <label
          for="proposalVideo"
          class="title d-block mb-2"
        >
          {{ $t('proposalCreationPage.videoLink') }}
          <span class="d-block body-2 grey--text">
            {{ $t('proposalCreationPage.attachVideoUrl') }}
          </span>
        </label>
        <v-text-field
          id="proposalVideo"
          v-model="setupData.video"
          :error-messages="videoErrors"
          :label="$t('proposalCreationPage.videoUrl')"
          @input="validateSingleField('video')"
          @blur="validateSingleField('video')"
        />
      </div>

      <v-card
        class="mb-12 border--grey pa-4"
      >
        <h2 class="title mb-6">
          {{ $t('proposalCreationPage.buildBudget') }}
        </h2>

        <BudgetTable
          :is-editable="true"
          :budget-data-init="budgetData"
          @total-budget="setTotalBudget"
          @budget-data-new="setBudgetItemsNew"
        />

        <div>
          <!--      <div class="mb-12">-->
          <!--        <h2 class="font-weight-regular mb-6">-->
          <!--          {{ $t('proposalCreationPage.chooseConversion') }}-->
          <!--        </h2>-->

          <!--        <v-btn-toggle-->
          <!--          v-model="conversionRateOption"-->
          <!--          mandatory-->
          <!--        >-->
          <!--          <v-btn>-->
          <!--            <div class="d-flex flex-column">-->
          <!--              <span>{{ $t('proposalCreationPage.spotPrice') }}</span>-->
          <!--              <span>{{ `($${eosRate})` }}</span>-->
          <!--            </div>-->
          <!--          </v-btn>-->
          <!--          <v-btn>-->
          <!--            <div class="d-flex flex-column">-->
          <!--              <span>{{ $t('proposalCreationPage.thirtyDaysSMA') }}</span>-->
          <!--              <span>{{ `($${eosRate30SMA})` }}</span>-->
          <!--            </div>-->
          <!--          </v-btn>-->
          <!--        </v-btn-toggle>-->
          <!--      </div>-->

          <div class="mt-12">
            <h2 class="title mb-6">
              {{ $t('common.paymentsDuration') }}
            </h2>


            <v-select
              v-model="setupData.duration"
              :items="$constants.DURATIONS_OF_PAYMENTS"
              :label="$t('proposalCreationPage.chooseDuration')"
              required
              type="number"
              :error-messages="durationErrors"
              dense
              :menu-props="{ offsetY:true }"
              @input="validateSingleField('duration')"
              @blur="validateSingleField('duration')"
            >
              <template v-slot:selection="{item}">
                {{ `${item} ${$t('common.months')}` }}
              </template>
              <template v-slot:item="{item}">
                {{ `${item} ${$t('common.months')}` }}
              </template>
            </v-select>
          </div>
        </div>

        <div class="d-flex justify-end my-12">
          <div>
            <h2 class="title">
              {{ $t('proposalCreationPage.requestedEosPerMonth') }}
            </h2>
            <div class="font-weight-bold indigo--text title">
              {{ monthlyBudget }}
            </div>
          </div>
        </div>
      </v-card>
    </v-form>

    <v-btn
      v-if="!proposalId"
      color="success"
      class="mr-2"
      @click="propose"
    >
      {{ $t('proposalCreationPage.continue') }}
    </v-btn>
    <v-btn
      v-else
      color="success"
      class="mr-2"
      @click="modify"
    >
      {{ $t('proposalCreationPage.continue') }}
    </v-btn>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {
    required, minLength, maxLength, helpers, numeric, minValue,
    maxValue, url,
  } from 'vuelidate/lib/validators';
  import BudgetTable from '@/components/BudgetTable.vue';

  export default {
    name: 'Setup',
    components: {
      BudgetTable,
    },
    mixins: [validationMixin],
    validations: {
      setupData: {
        proposal_name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(12),
          regex: helpers.regex('regex', /^[a-z1-5.]+$/),
        },
        title: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(60),
          latin: helpers.regex('latin',
            /^[A-Za-z0-9\s -~`!@"№#$;%:^&?*()_=+/\\[\]{}|,.]+$/),
          notOnlySpaces: helpers.regex('notOnlySpaces',
            /^(?!\s+$).+/),
        },
        summary: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(150),
          latin: helpers.regex('latin',
            /^[A-Za-z0-9\s -~`!@"№#$;%:^&?*()_=+/\\[\]{}|,.]+$/),
          notOnlySpaces: helpers.regex('notOnlySpaces',
            /^(?!\s+$).+/),
        },
        category: {
          required,
        },
        img: {
          url,
        },
        video: {
          allowedVideoUrls: helpers.regex('allowedVideoUrls',
          // /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)?
          // |http(?:s?):\/\/(?:www\.)
          // ?youku.com?|http(?:s?):\/\/(?:www\.)?tudou.com?|http(?:s?):\/\/(?:www\.)?iqiyi.com?/),
          /youtu(?:be\.com\/watch\?v=|\.be\/)?|youku.com?|tudou.com?|iqiyi.com?/),
        },
        duration: {
          required,
          numeric,
          minValue: minValue(1),
          maxValue: maxValue(6),
        },
      },
    },
    notifications: {
      showErrorMsg: {
        type: 'error',
      },
    },
    props: {
      proposalInitial: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        componentKey: 0,
        setupData: {
          proposal_name: null,
          title: null,
          summary: null,
          category: null,
          img: null,
          video: null,
          duration: 1,
        },
        proposal: {},
        totalBudget: 0,
        budgetItemsNew: [],
        eosRate: this.$constants.EOS_RATE,
      };
    },
    computed: {
      nameErrors() {
        const errors = [];
        if (!this.$v.setupData.proposal_name.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.proposal_name.minLength
        && errors.push(this.$t('validationMessages.minLength', { numberOfChars: 3 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.proposal_name.maxLength
        && errors.push(this.$t('validationMessages.maxLength', { numberOfChars: 12 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.proposal_name.required
        && errors.push(this.$t('validationMessages.required'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.proposal_name.regex
        && errors.push(this.$t('validationMessages.proposalNameRegex'));

        return errors;
      },
      titleErrors() {
        const errors = [];
        if (!this.$v.setupData.title.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.title.minLength
        && errors.push(this.$t('validationMessages.minLength', { numberOfChars: 3 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.title.maxLength
        && errors.push(this.$t('validationMessages.maxLength', { numberOfChars: 60 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.title.required && errors.push(this.$t('validationMessages.required'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.title.latin && errors.push(this.$t('validationMessages.latinRegex'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.title.notOnlySpaces && errors.push(this.$t('validationMessages.notOnlySpaces'));

        return errors;
      },
      summaryErrors() {
        const errors = [];
        if (!this.$v.setupData.summary.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.summary.minLength
        && errors.push(this.$t('validationMessages.minLength', { numberOfChars: 3 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.summary.maxLength
        && errors.push(this.$t('validationMessages.maxLength', { numberOfChars: 150 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.summary.required && errors.push(this.$t('validationMessages.required'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.summary.latin && errors.push(this.$t('validationMessages.latinRegex'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.summary.notOnlySpaces && errors.push(this.$t('validationMessages.notOnlySpaces'));

        return errors;
      },
      categoryErrors() {
        const errors = [];
        if (!this.$v.setupData.category.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.category.required && errors.push(this.$t('validationMessages.required'));

        return errors;
      },
      imgErrors() {
        const errors = [];
        if (!this.$v.setupData.img.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.img.url && errors.push(this.$t('validationMessages.urlString'));

        return errors;
      },
      videoErrors() {
        const errors = [];
        if (!this.$v.setupData.video.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.video.allowedVideoUrls && errors.push(this.$t('validationMessages.allowedVideo'));

        return errors;
      },
      durationErrors() {
        const errors = [];
        if (!this.$v.setupData.duration.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.duration.required
        && errors.push(this.$t('validationMessages.required'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.duration.numeric
        && errors.push(this.$t('validationMessages.onlyNumbers'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.duration.minValue
        && errors.push(this.$t('validationMessages.minValue', { value: 1 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.duration.maxValue
        && errors.push(this.$t('validationMessages.maxValue', { value: 6 }));

        return errors;
      },
      // eosRate30SMA() {
      //   // the average of all of the prices for a coin for the last month
      //   return (2 * 31) / 31;
      // },
      // selectedConversionRate() {
      //   // button groups set numbers to the data
      //   if (this.conversionRateOption === 0) return this.eosRate;
      //
      //   return this.eosRate30SMA;
      // },
      monthlyBudget() {
        const totalBudgetInEos = this.totalBudget * this.eosRate;
        if (!this.setupData.duration) return 0;
        return `${(totalBudgetInEos / this.setupData.duration)
          .toFixed(this.$constants.EOS_MAX_DIGITS)} EOS`;
      },
      budgetData() {
        if (!this.proposal || Object.keys(this.proposal).length === 0) return [];
        return this.proposal.proposal_json.budget_data;
      },
      proposalId() {
        return this.$route.params.slug ? this.$route.params.slug : '';
      },
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
          if (this.proposalId) {
            this.proposal = this.$helpers.copyDeep(this.proposalInitial);
          } else {
            Object.keys(this.setupData).forEach((key) => {
              if (key === 'duration') {
                this.setupData[key] = 1;
              } else {
                this.setupData[key] = null;
              }
            });
            this.proposal = {};
          }
        },
      },
      proposal: {
        immediate: true,
        deep: true,
        handler(val) {
          if (!val || Object.keys(val).length === 0) return {};
          this.setupData.proposal_name = val.proposal_name;
          this.setupData.title = val.title;
          this.setupData.summary = val.proposal_json.summary || null;
          this.setupData.category = val.proposal_json.category;
          this.setupData.img = val.proposal_json.img || null;
          this.setupData.video = val.proposal_json.video || null;
          return null;
        },
      },
    },
    methods: {
      changeCurrentStep(val) {
        this.$emit('step', val);
      },
      validateSingleField(val) {
        this.$v.setupData[val].$touch();
      },
      setTotalBudget(val) {
        this.totalBudget = val;
      },
      setBudgetItemsNew(val) {
        this.budgetItemsNew = val;
      },
      validateAll() {
        this.$v.$touch();
        return !this.$v.setupData.$anyError;
      },
      propose() {
        if (!this.validateAll()) {
          this.showErrorMsg({
            title: this.$t('notifications.error'),
            message: this.$t('notifications.fillFields'),
          });
          return;
        }

        if (!this.setupData.duration) {
          this.showErrorMsg({
            title: this.$t('notifications.error'),
            message: this.$t('notifications.durationErr'),
          });
          return;
        }

        if (!this.monthlyBudget || this.monthlyBudget.split(' ')[0] < 100) {
          this.showErrorMsg({
            title: this.$t('notifications.error'),
            message: this.$t('notifications.budgetErr'),
          });
          return;
        }

        this.$router.push(`proposal-editor/${this.setupData.proposal_name}`);
        this.changeCurrentStep(2);
      },
      modify() {
        alert('Modify');
        this.changeCurrentStep(2);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variables';

  .required {
    position: relative;

    &:after {
      content: ' *';
      color: $red;
      position: absolute;
      top: 0;
      right: -12px;
    }
  }

</style>
