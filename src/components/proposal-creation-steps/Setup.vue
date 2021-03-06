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


      <div class="mb-4">
        <label
          for="proposalDiscussionChannel"
          class="body-1 font-weight-bold d-block"
        >
          {{ $t('proposalCreationPage.proposalDiscussionChannel') }}
        </label>
        <v-text-field
          id="proposalDiscussionChannel"
          v-model="setupData.discussionChanel"
          :label="$t('proposalCreationPage.provideDiscussionChannel')"
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
            for="totalBudgetFromContract"
            class="body-1 font-weight-bold d-block"
          >
            {{ $t('proposalCreationPage.totalEosBudget') }}
          </label>
          <v-text-field
            id="totalBudgetFromContract"
            v-model.number="setupData.totalBudgetFromContract"
            :error-messages="totalBudgetFromContractErrors"
            :label="$t('proposalCreationPage.addTotalBudget')"
            suffix="EOS"
            @input="validateSingleField('totalBudgetFromContract')"
            @blur="validateSingleField('totalBudgetFromContract')"
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
                'primary--text': monthlyBudgetAlt
                  ? monthlyBudgetAlt.split(' ')[0] >= 100
                  : false,
                'red--text text-underline': monthlyBudgetAlt
                  ? monthlyBudgetAlt.split(' ')[0] < 100
                  : true,
              }"
            >
              {{ monthlyBudgetAlt }}
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
        totalBudgetFromContract: {
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
          discussionChanel: '',
          duration: 1,
          totalBudgetFromContract: 0,
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
        proposalInitialDuration: state => state.userService.proposalInitialDuration,
        proposalInitialMonthlyBudget: state => state.userService.proposalInitialMonthlyBudget,
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
      totalBudgetFromContractErrors() {
        const errors = [];
        if (!this.$v.setupData.totalBudgetFromContract.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.setupData.totalBudgetFromContract.decimal
        && errors.push(this.$t('validationMessages.onlyNumbersDecimals'));

        return errors;
      },
      isExistingProposalWithoutBudgets() {
        return Boolean(this.proposalId && this.getProposalParsed.proposal_json
          && !this.getProposalParsed.proposal_json.budgets);
      },
      monthlyBudget() {
        if (!this.setupData.duration) return 0;
        if (this.isExistingProposalWithoutBudgets) return this.getProposalParsed.monthly_budget;

        return `${(this.totalBudget / this.setupData.duration)
          .toFixed(this.$constants.EOS_MAX_DIGITS)} EOS`;
      },
      monthlyBudgetAlt() {
        if (!this.setupData.duration) return 0;
        if (!this.isExistingProposalWithoutBudgets) return 0;

        return `${(this.setupData.totalBudgetFromContract / this.setupData.duration)
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
            const payload = await this.prepareDataBeforePropose(false, false);

            if (!payload) return;

            this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });
          } else {
            const payload = await this.prepareDataBeforeModify(false);

            if (!payload) return;

            this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });
          }
        },
      },
      async monthlyBudget() {
        if (!this.proposalId) {
          const payload = await this.prepareDataBeforePropose(false, false);

          if (!payload) return;

          this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });
        } else {
          const payload = await this.prepareDataBeforeModify(false);

          if (!payload) return;

          this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });
        }
      },
      budgetItemsNew: {
        deep: true,
        async handler() {
          if (!this.proposalId) {
            const payload = await this.prepareDataBeforePropose(false, false);

            if (!payload) return;

            this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });
          } else {
            const payload = await this.prepareDataBeforeModify(false);

            if (!payload) return;

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
              } else if (key === 'totalBudgetFromContract') {
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
        this.setupData.duration = this.getProposalParsed.duration;
        this.setupData.summary = this.getProposalParsed.proposal_json.summary || '';
        this.setupData.category = this.getProposalParsed.proposal_json.category;
        this.setupData.img = this.getProposalParsed.proposal_json.img || '';
        this.setupData.video = this.getProposalParsed.proposal_json.video || '';
        this.setupData.discussionChanel = this.getProposalParsed.proposal_json.discussion || '';
        this.setupData.totalBudgetFromContract = Number(
          this.getProposalParsed.total_budget.split(' ')[0],
        );
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
      validateAll(touchFields = true) {
        if (touchFields) {
          this.$v.$touch();
        }
        return !this.$v.setupData.$anyError;
      },
      async validateBeforePropose(showMsg = true, touchFields = true) {
        if (!this.validateAll(touchFields)) {
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

        if (await this.$_isProposalExist(this.setupData.proposal_name)) {
          if (showMsg) {
            this.showErrorMsg(this.$t('notifications.proposalNameExists'));
          }
          return false;
        }

        return true;
      },
      validateBeforeModify(showMsg = true, touchFields = true) {
        if (!this.validateAll(touchFields)) {
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

        if (this.isExistingProposalWithoutBudgets) {
          if (!this.monthlyBudgetAlt || this.monthlyBudgetAlt.split(' ')[0] < 100) {
            if (showMsg) {
              this.showErrorMsg(this.$t('notifications.budgetErr'));
            }
            return false;
          }

          if (Number(this.monthlyBudgetAlt.split(' ')[0])
            > Number(this.proposalsSettings.max_monthly_budget.split(' ')[0])) {
            if (showMsg) {
              this.showErrorMsg(this.$t(
                'notifications.budgetErrMax',
                { maxMonthlyBudget: this.proposalsSettings.max_monthly_budget },
              ));
            }
            return false;
          }
        } else if (!this.monthlyBudget || this.monthlyBudget.split(' ')[0] < 100) {
          if (showMsg) {
            this.showErrorMsg(this.$t('notifications.budgetErr'));
          }
          return false;
        } else if (Number(this.monthlyBudget.split(' ')[0])
          > Number(this.proposalsSettings.max_monthly_budget.split(' ')[0])) {
          if (showMsg) {
            this.showErrorMsg(this.$t(
              'notifications.budgetErrMax',
              { maxMonthlyBudget: this.proposalsSettings.max_monthly_budget },
            ));
          }
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
        if (this.setupData.discussionChanel) {
          proposalAdditionalInfo.discussion = this.setupData.discussionChanel;
        }
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

        if (this.budgetData) {
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

        if (this.setupData.discussionChanel) {
          proposalAdditionalInfo.discussion = this.setupData.discussionChanel;
        } else {
          delete proposalAdditionalInfo.discussionChanel;
        }

        const payload = {
          proposal_name: this.setupData.proposal_name,
          title: this.setupData.title,
          duration: this.setupData.duration,
          monthly_budget: this.isExistingProposalWithoutBudgets
                                 ? this.monthlyBudgetAlt
                                 : this.monthlyBudget,
          proposal_json: this.$helpers
                             .restructureProposalAdditionalInfo(proposalAdditionalInfo),
        };

        return payload;
      },
      async prepareDataBeforePropose(showMsg = true, touchFields = true) {
        if (!await this.validateBeforePropose(showMsg, touchFields)) {
          this.$emit('setup-validation-result', false);
          return;
        }

        const payload = this.formPayloadBeforePropose();

        this.$emit('setup-validation-result', true);

        // eslint-disable-next-line consistent-return
        return payload;
      },
      prepareDataBeforeModify(showMsg = true) {
        if (!this.validateBeforeModify(showMsg)) {
          this.$emit('setup-validation-result', false);
          return;
        }

        const payload = this.formPayloadBeforeModify();

        this.$emit('setup-validation-result', true);

        // eslint-disable-next-line consistent-return
        return payload;
      },
      async propose(pushTransaction = true) {
        const payload = await this.prepareDataBeforePropose(true);

        if (!payload) return;

        this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME](payload);

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
        const payload = this.prepareDataBeforeModify(true);

        if (!payload) return;

        this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME]({ ...this.getProposalParsed, ...payload });

        if (payload.duration !== this.proposalInitialDuration
          || payload.monthly_budget !== this.proposalInitialMonthlyBudget) {
          payload.duration = this.setupData.duration;
          payload.monthly_budget = this.isExistingProposalWithoutBudgets
                                   ? this.monthlyBudgetAlt
                                   : this.monthlyBudget;
        } else {
          delete payload.duration;
          delete payload.monthly_budget;
        }


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
