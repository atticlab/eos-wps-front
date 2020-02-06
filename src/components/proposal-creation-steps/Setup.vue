<template>
  <div>
    <v-form>
      <div class="mb-4">
        <label
          for="proposalName"
          class="body-1 font-weight-bold d-inline-flex required"
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
          class="body-1 font-weight-bold d-inline-flex required"
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
          class="body-1 font-weight-bold d-inline-flex required"
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
          class="body-1 font-weight-bold d-inline-flex required"
        >
          {{ $t('proposalCreationPage.proposalCategory') }}
        </label>
        <v-select
          id="proposalCategory"
          v-model="setupData.category"
          :error-messages="categoryErrors"
          required
          :menu-props="{ offsetY:true }"
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
          class="body-1 font-weight-bold d-block"
        >
          {{ $t('proposalCreationPage.heroImg') }}
        </label>
        <v-text-field
          id="proposalImage"
          v-model="setupData.img"
          :error-messages="imgErrors"
          :label="$t('proposalCreationPage.attachImgUrl')"
          @input="validateSingleField('img')"
          @blur="validateSingleField('img')"
        />
      </div>

      <div class="mb-4">
        <label
          for="proposalVideo"
          class="body-1 font-weight-bold d-block"
        >
          {{ $t('proposalCreationPage.videoLink') }}
        </label>
        <v-text-field
          id="proposalVideo"
          v-model="setupData.video"
          :error-messages="videoErrors"
          :label="$t('proposalCreationPage.attachVideoUrl')"
          @input="validateSingleField('video')"
          @blur="validateSingleField('video')"
        />
      </div>

      <v-card
        class="mb-12"
        flat
      >
        <div class="mb-6">
          <h2 class="body-1 font-weight-bold mb-1">
            {{ $t('proposalCreationPage.buildBudget') }}
          </h2>
          <p class="accent--text font-weight-medium body-2">
            {{ $t('proposalCreationPage.budgetEos') }}
          </p>
        </div>

        <BudgetTable
          v-if="!isExistingProposalWithoutBudgets"
          :is-editable="true"
          :budget-data-init="budgetData"
          :eos-price="eosPrice"
          @total-budget="setTotalBudget"
          @budget-data-new="setBudgetItemsNew"
        />

        <div
          v-else
          class="mb-4"
        >
          <label
            for="monthlyBudget"
            class="body-1 font-weight-bold d-block"
          >
            {{ $t('proposalCreationPage.monthlyEosBudget') }}
          </label>
          <v-text-field
            id="monthlyBudget"
            v-model.number="setupData.monthlyBudgetAlt"
            :error-messages="monthlyBudgetErrors"
            :label="$t('proposalCreationPage.addMonthlyBudget')"
            prefix="EOS"
            @input="validateSingleField('monthlyBudgetAlt')"
            @blur="validateSingleField('monthlyBudgetAlt')"
            @keypress="$helpers.isNumberDecimalOnly($event)"
          />
        </div>

        <div>
          <div class="mt-12">
            <h2 class="body-1 font-weight-bold mb-6">
              {{ $t('common.paymentsDuration') }}
            </h2>

            <v-select
              v-model="setupData.duration"
              :items="$constants.DURATIONS_OF_PAYMENTS"
              :label="$t('proposalCreationPage.chooseDuration')"
              required
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

        <div
          v-if="!isExistingProposalWithoutBudgets"
          class="d-flex justify-end my-12"
        >
          <div class="pr-3 d-flex flex-wrap">
            <h2 class="body-1 font-weight-bold required mr-5">
              {{ $t('proposalCreationPage.monthlyEosBudget') }}:
            </h2>
            <div
              :class="{
                'font-weight-bold body-2': true,
                'primary--text': monthlyBudget
                  ? monthlyBudget.split(' ')[0] >= 100
                  : false,
                'red--text text-underline': monthlyBudget
                  ? monthlyBudget.split(' ')[0] < 100
                  : true,
              }"
            >
              {{ monthlyBudget }}
            </div>
          </div>
        </div>

        <div
          v-else
          class="d-flex justify-end my-12"
        >
          <div class="pr-3 d-flex flex-wrap">
            <h2 class="body-1 font-weight-bold required mr-5">
              {{ $t('proposalCreationPage.monthlyEosBudget') }}
            </h2>
            <div
              :class="{
                'font-weight-bold body-2': true,
                'primary--text': monthlyBudgetAltEos
                  ? monthlyBudgetAltEos.split(' ')[0] >= 100
                  : false,
                'red--text text-underline': monthlyBudgetAltEos
                  ? monthlyBudgetAltEos.split(' ')[0] < 100
                  : true,
              }"
            >
              {{ monthlyBudgetAltEos }}
            </div>
          </div>
        </div>
      </v-card>
    </v-form>

    <div class="d-flex justify-center">
      <template v-if="!proposalId">
        <v-btn
          color="primary"
          :large="true"
          class="text-transform-none mr-2"
          height="50"
          :disabled="isCreateProposalDraftLoading"
          @click="propose(true)"
        >
          {{ $t('proposalCreationPage.saveDraft') }}
        </v-btn>

        <v-btn
          color="primary"
          :large="true"
          class="text-transform-none mr-2"
          height="50"
          :disabled="isCreateProposalDraftLoading"
          @click="propose(false)"
        >
          {{ $t('proposalCreationPage.continue') }}
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          color="primary"
          :large="true"
          class="text-transform-none mr-2"
          height="50"
          :disabled="isModifyProposalDraftLoading"
          @click="modify(true)"
        >
          {{ $t('proposalCreationPage.saveDraft') }}
        </v-btn>

        <v-btn
          color="primary"
          :large="true"
          class="text-transform-none mr-2"
          height="50"
          :disabled="isModifyProposalDraftLoading"
          @click="modify(false)"
        >
          {{ $t('proposalCreationPage.continue') }}
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {
    required, minLength, maxLength, helpers, numeric, minValue,
    maxValue, url, decimal,
  } from 'vuelidate/lib/validators';
  import {
 mapState, mapGetters, mapActions, mapMutations,
} from 'vuex';
  import ActionType from '@/store/constants';
  import BudgetTable from '@/components/BudgetTable.vue';
  import createProposalDraft from '@/mixins/createProposalDraft';
  import isProposalExist from '@/mixins/isProposalExist';
  import modifyProposalDraft from '@/mixins/modifyProposalDraft';
  import notification from '@/mixins/notification';

  export default {
    name: 'Setup',
    components: {
      BudgetTable,
    },
    mixins: [
      validationMixin,
      createProposalDraft,
      isProposalExist,
      modifyProposalDraft,
      notification,
    ],
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
          url,
        },
        duration: {
          required,
          numeric,
          minValue: minValue(1),
          maxValue: maxValue(6),
        },
        monthlyBudgetAlt: {
          decimal,
        },
      },
    },
    data() {
      return {
        componentKey: 0,
        setupData: {
          proposal_name: null,
          title: '',
          summary: '',
          category: '',
          img: '',
          video: '',
          duration: 1,
          monthlyBudgetAlt: 0,
        },
        totalBudget: 0,
        budgetItemsNew: [],
      };
    },
    computed: {
      ...mapState({
        proposalsSettings: state => state.userService.proposalsSettings,
        eosPrice: state => state.userService.eosPrice,
        isDraftProposalByProposalNameLoading: state => state
          .userService.isDraftProposalByProposalNameLoading,
      }),
      ...mapGetters('userService', {
        getProposalParsed: 'getProposalParsed',
      }),
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
        !this.$v.setupData.video.url && errors.push(this.$t('validationMessages.urlString'));

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
      monthlyBudgetErrors() {
        const errors = [];
        if (!this.$v.setupData.monthlyBudgetAlt.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.monthlyBudgetAlt.decimal
        && errors.push(this.$t('validationMessages.onlyNumbersDecimals'));

        return errors;
      },
      isExistingProposalWithoutBudgets() {
        return Boolean(this.proposalId && this.getProposalParsed.proposal_json
          && !this.getProposalParsed.proposal_json.budgets);
      },
      monthlyBudget() {
        if (!this.setupData.duration || !this.eosPrice) return 0;
        if (this.isExistingProposalWithoutBudgets) return this.getProposalParsed.monthly_budget;

        const totalBudgetInEos = this.totalBudget / this.eosPrice;
        return `${(totalBudgetInEos / this.setupData.duration)
          .toFixed(this.$constants.EOS_MAX_DIGITS)} EOS`;
      },
      monthlyBudgetAltEos() {
        if (!this.setupData.duration || !this.eosPrice) return 0;
        if (!this.isExistingProposalWithoutBudgets) return 0;

        return `${(this.setupData.monthlyBudgetAlt * this.setupData.duration)
                  .toFixed(this.$constants.EOS_MAX_DIGITS)} EOS`;
      },
      budgetData() {
        if (!this.getProposalParsed || Object.keys(this.getProposalParsed).length === 0) return '';
        return this.getProposalParsed.proposal_json.budgets;
      },
      proposalId() {
        return this.$route.params.slug ? this.$route.params.slug : '';
      },
    },
    watch: {
      setupData: {
        deep: true,
        async handler() {
          if (!this.proposalId) {
            if (!this.validateBeforePropose(false)) {
              this.$emit('setup-validation-result', false);
              return;
            }

            const payload = this.formPayloadBeforePropose();

            if (await this.$_isProposalExist(payload.proposal_name)) {
              this.showErrorMsg(this.$t('notifications.proposalNameExists'));
              return;
            }
            this.$emit('setup-validation-result', true);

            this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });
          }
        },
      },
      async monthlyBudget() {
        if (!this.proposalId) {
          if (!this.validateBeforePropose(false)) {
            this.$emit('setup-validation-result', false);
            return;
          }

          const payload = this.formPayloadBeforePropose();

          if (await this.$_isProposalExist(payload.proposal_name)) {
            this.showErrorMsg(this.$t('notifications.proposalNameExists'));
            return;
          }
          this.$emit('setup-validation-result', true);

          this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });
        }
      },
      budgetItemsNew: {
        deep: true,
        async handler() {
          if (!this.proposalId) {
            if (!this.validateBeforePropose(false)) {
              this.$emit('setup-validation-result', false);
              return;
            }

            const payload = this.formPayloadBeforePropose();

            if (await this.$_isProposalExist(payload.proposal_name)) {
              this.showErrorMsg(this.$t('notifications.proposalNameExists'));
              return;
            }

            // if ((Number(this.monthlyBudget.split(' ')[0])
            //   > Number(this.proposalsSettings.max_monthly_budget.split(' ')[0]))) {
            //   return;
            // }
            this.$emit('setup-validation-result', true);

            this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });
          }
        },
      },

      $route: {
        immediate: true,
        handler() {
          this[ActionType.REQUEST_EOS_PRICE]();

          if (!this.proposalId) {
            Object.keys(this.setupData).forEach((key) => {
              if (key === 'duration') {
                this.setupData[key] = 1;
              } else if (key === 'monthlyBudgetAlt') {
                this.setupData[key] = 0;
              } else {
                this.setupData[key] = '';
              }
            });
            this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({});
          }
        },
      },
      isDraftProposalByProposalNameLoading(val) {
        if (val) return;
        if (!this.getProposalParsed && Object.keys(this.getProposalParsed).length === 0) return;

        this.setupData.proposal_name = this.getProposalParsed.proposal_name;
        this.setupData.title = this.getProposalParsed.title;
        this.setupData.summary = this.getProposalParsed.proposal_json.summary || '';
        this.setupData.category = this.getProposalParsed.proposal_json.category;
        this.setupData.img = this.getProposalParsed.proposal_json.img || '';
        this.setupData.video = this.getProposalParsed.proposal_json.video || '';
        this.setupData.monthlyBudgetAlt = Number(this.getProposalParsed.monthly_budget.split(' ')[0]);
      },
    },
    created() {
      this[ActionType.REQUEST_SETTINGS]();
    },
    methods: {
      ...mapMutations('userService', [
        ActionType.SET_DRAFT_BY_PROPOSAL_NAME,
      ]),
      ...mapActions('userService', [
        ActionType.REQUEST_SETTINGS,
        ActionType.REQUEST_EOS_PRICE,
      ]),
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
      validateBeforePropose(showMsg = true) {
        if (!this.validateAll()) {
          if (showMsg) {
            this.showErrorMsg(this.$t('notifications.fillFields'));
          }
          return false;
        }

        if (!this.setupData.duration) {
          if (showMsg) {
            this.showErrorMsg(this.$t('notifications.durationErr'));
          }
          return false;
        }

        if (!this.monthlyBudget || this.monthlyBudget.split(' ')[0] < 100) {
          if (showMsg) {
            this.showErrorMsg(this.$t('notifications.budgetErr'));
          }
          return false;
        }

        if (Number(this.monthlyBudget.split(' ')[0])
          > Number(this.proposalsSettings.max_monthly_budget.split(' ')[0])) {
          if (showMsg) {
            this.showErrorMsg(this.$t(
              'notifications.budgetErrMax',
              { maxMonthlyBudget: this.proposalsSettings.max_monthly_budget },
            ));
          }
          return false;
        }

        if (this.budgetItemsNew.length > this.$constants.MAX_TABLE_ITEMS) {
          if (showMsg) {
            this.showErrorMsg(this.$t('notifications.tooManyItems'));
          }
          return false;
        }

        if (!this.getProposalParsed
            && !this.getProposalParsed.proposal_json
            && !this.getProposalParsed.proposal_json.overview
            && this.this.getProposalParsed.proposal_json.overview.length === 0
            && this.this.getProposalParsed.proposal_json.overview.length > 12000) {
          if (showMsg) {
            this.showErrorMsg(this.$t('overview err'));
          }
          return false;
        }

        return true;
      },
      validateBeforeModify() {
        if (!this.validateAll()) {
          this.showErrorMsg(this.$t('notifications.fillFields'));
          return false;
        }

        if (!this.setupData.duration) {
          this.showErrorMsg(this.$t('notifications.durationErr'));
          return false;
        }

        if (this.isExistingProposalWithoutBudgets) {
          if (!this.monthlyBudgetAltEos || this.monthlyBudgetAltEos.split(' ')[0] < 100) {
            this.showErrorMsg(this.$t('notifications.budgetErr'));
            return false;
          }

          if (Number(this.monthlyBudgetAltEos.split(' ')[0])
            > Number(this.proposalsSettings.max_monthly_budget.split(' ')[0])) {
            this.showErrorMsg(this.$t(
              'notifications.budgetErrMax',
              { maxMonthlyBudget: this.proposalsSettings.max_monthly_budget },
            ));
            return false;
          }
        } else if (!this.monthlyBudget || this.monthlyBudget.split(' ')[0] < 100) {
          this.showErrorMsg(this.$t('notifications.budgetErr'));
          return false;
        } else if (Number(this.monthlyBudget.split(' ')[0])
          > Number(this.proposalsSettings.max_monthly_budget.split(' ')[0])) {
          this.showErrorMsg(this.$t(
            'notifications.budgetErrMax',
            { maxMonthlyBudget: this.proposalsSettings.max_monthly_budget },
          ));
          return false;
        }

        return true;
      },
      formPayloadBeforePropose() {
        const proposalAdditionalInfo = {
          summary: this.setupData.summary,
          category: this.setupData.category,
          budgets: JSON.stringify(this.budgetItemsNew),
        };

        if (this.setupData.img) proposalAdditionalInfo.img = this.setupData.img;
        if (this.setupData.video) proposalAdditionalInfo.video = this.setupData.video;
        if (this.getProposalParsed
            && Object.keys(this.getProposalParsed).length !== 0
            && this.getProposalParsed.proposal_json.overview) {
          proposalAdditionalInfo.overview = this.getProposalParsed.proposal_json.overview;
        }
        if (this.getProposalParsed
          && Object.keys(this.getProposalParsed).length !== 0
          && this.getProposalParsed.proposal_json.milestones
          && JSON.parse(this.getProposalParsed.proposal_json.milestones).length !== 0) {
          proposalAdditionalInfo.milestones = this.getProposalParsed.proposal_json.milestones;
        }

        return {
          proposal_name: this.setupData.proposal_name,
          title: this.setupData.title,
          monthly_budget: this.monthlyBudget,
          duration: this.setupData.duration,
          proposal_json: this.$helpers
                            .restructureProposalAdditionalInfo(proposalAdditionalInfo),
        };
      },
      formPayloadBeforeModify() {
        const proposalAdditionalInfo = this.$helpers.copyDeep(this.getProposalParsed.proposal_json);
        proposalAdditionalInfo.summary = this.setupData.summary;
        proposalAdditionalInfo.category = this.setupData.category;

        if (this.setupData.budgets) {
          proposalAdditionalInfo.budgets = JSON.stringify(this.budgetItemsNew);
        }

        if (this.setupData.img) {
          proposalAdditionalInfo.img = this.setupData.img;
        } else {
          delete proposalAdditionalInfo.img;
        }

        if (this.setupData.video) {
          proposalAdditionalInfo.video = this.setupData.video;
        } else {
          delete proposalAdditionalInfo.video;
        }

        return {
          proposal_name: this.setupData.proposal_name,
          title: this.setupData.title,
          monthly_budget: this.isExistingProposalWithoutBudgets
                         ? this.monthlyBudgetAltEos
                         : this.monthlyBudget,
          duration: this.setupData.duration,
          proposal_json: this.$helpers
                            .restructureProposalAdditionalInfo(proposalAdditionalInfo),
        };
      },
      async propose(pushTransaction = true) {
        if (!this.validateBeforePropose()) return;

        const payload = this.formPayloadBeforePropose();

        if (await this.$_isProposalExist(payload.proposal_name)) {
          this.showErrorMsg(this.$t('notifications.proposalNameExists'));
          return;
        }

        this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME](payload);
        this.$emit('setup-validation-result', true);

        if (!pushTransaction) {
          this.changeCurrentStep(2);
          return;
        }

        if (await this.$_createProposalDraft(payload)) {
          this.$eventBus.$emit('proposal-created', true);
          this.$router.push(`proposal-editor/${this.setupData.proposal_name}`);
          this.changeCurrentStep(2);
        }
      },
      async modify(pushTransaction = true) {
        if (!this.validateBeforeModify()) return;

        const payload = this.formPayloadBeforeModify();

        this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME](payload);

        if (!pushTransaction) {
          this.changeCurrentStep(2);
          return;
        }

        if (await this.$_modifyProposalDraft(payload)) {
          this.$emit('is-draft-modified', true);
          this.changeCurrentStep(2);
        }
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
