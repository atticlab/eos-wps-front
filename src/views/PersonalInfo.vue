<template>
  <v-container class="pb-12 container--custom">
    <h1 class="fs-50">
      {{ $t('personalInfo.title') }}
    </h1>

    <v-divider class="v-divider--custom mt-8 mb-12" />

    <div
      v-if="isProposerLoading"
      class="d-flex justify-center"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      />
    </div>

    <v-card
      v-else
      flat
      class="secondary--text py-7 px-4 px-sm-9 py-xm-12 mb-12"
    >
      <div class="mb-12">
        <p class="body-2 font-weight-medium mb-0">
          {{ $t('personalInfo.preface.canAdd') }}
        </p>
        <p class="body-2 font-weight-medium">
          {{ $t('personalInfo.preface.infoAvailable') }}
        </p>
      </div>

      <form>
        <div class="mb-4">
          <label
            for="proposalTitle"
            class="body-1 font-weight-bold d-inline-flex"
          >
            {{ $t('personalInfo.name') }}
          </label>

          <v-text-field
            id="proposerName"
            v-model.trim="proposerData.name"
            :error-messages="proposerNameErrors"
            :counter="300"
            :label="$t('personalInfo.nameHint')"
            @input="validateSingleField('name')"
            @blur="validateSingleField('name')"
          />
        </div>

        <div class="mb-4">
          <label
            for="proposalTitle"
            class="body-1 font-weight-bold d-inline-flex"
          >
            {{ $t('personalInfo.description') }}
          </label>

          <v-textarea
            id="proposerDescription"
            v-model.trim="proposerData.description"
            filled
            :error-messages="proposerDescriptionErrors"
            :counter="12000"
            :label="$t('personalInfo.descriptionHint')"
            @input="validateSingleField('description')"
            @blur="validateSingleField('description')"
          />
        </div>

        <div class="mb-4">
          <label
            for="proposalTitle"
            class="body-1 font-weight-bold d-inline-flex"
          >
            {{ $t('personalInfo.website') }}
          </label>

          <v-text-field
            id="proposerSite"
            v-model="proposerData.site"
            class="mb-4"
            :error-messages="proposerSiteErrors"
            :label="$t('personalInfo.websiteHint')"
            @input="validateSingleField('site')"
            @blur="validateSingleField('site')"
          />
        </div>

        <div class="mb-4">
          <label
            for="proposalTitle"
            class="body-1 font-weight-bold d-inline-flex"
          >
            {{ $t('personalInfo.socialMedia') }}
          </label>

          <v-text-field
            id="proposerSocialMedia"
            v-model="proposerData.media"
            class="mb-4"
            required
            :label="$t('personalInfo.socialMediaHint')"
            @input="validateSingleField('media')"
            @blur="validateSingleField('media')"
          />
        </div>

        <div class="d-flex justify-end">
          <v-btn
            elevation="0"
            color="primary"
            height="40"
            class="text-transform-none px-3"
            :disabled="isSetProposerLoading"
            @click="submitProposerData(proposerDataRestructured)"
          >
            {{ $t('common.submit') }}
          </v-btn>
        </div>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { maxLength, url } from 'vuelidate/lib/validators';
import setProposer from '@/mixins/setProposer';
import notification from '@/mixins/notification';
import ActionType from '@/store/constants';

export default {
  name: 'PersonalInfo',
  mixins: [validationMixin, setProposer, notification],
  validations: {
    proposerData: {
      name: {
        maxLength: maxLength(300),
      },
      description: {
        maxLength: maxLength(12000),
      },
      site: {
        url,
      },
      media: {},
    },
  },
  data() {
    return {
      proposerData: {
        name: '',
        description: '',
        site: '',
        media: '',
      },
    };
  },
  computed: {
    ...mapState('userService', {
      proposer: state => state.proposer,
      isProposerLoading: state => state.isProposerLoading,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
    proposerNameErrors() {
      const errors = [];
      if (!this.$v.proposerData.name.$dirty) return errors;

      // eslint-disable-next-line no-unused-expressions
      !this.$v.proposerData.name.maxLength
      && errors.push(this.$t('validationMessages.maxLength', { numberOfChars: 300 }));

      return errors;
    },
    proposerDescriptionErrors() {
      const errors = [];
      if (!this.$v.proposerData.description.$dirty) return errors;

      // eslint-disable-next-line no-unused-expressions
      !this.$v.proposerData.description.maxLength
      && errors.push(this.$t('validationMessages.maxLength', { numberOfChars: 12000 }));

      return errors;
    },
    proposerSiteErrors() {
      const errors = [];
      if (!this.$v.proposerData.site.$dirty) return errors;

      // eslint-disable-next-line no-unused-expressions
      !this.$v.proposerData.site.url && errors.push(this.$t('validationMessages.urlString'));

      return errors;
    },
    proposerDataRestructured() {
      return Object.entries(this.proposerData)
        .filter(entry => Boolean(entry[1]))
        .map(entry => ({
          key: entry[0],
          value: entry[1],
        }));
    },
  },
  watch: {
    proposer(val) {
      if (this.isProposerLoading) return;

      val.metadata_json.forEach((proposerDataObj) => {
        if (!proposerDataObj.key) return;
        this.proposerData[proposerDataObj.key] = proposerDataObj.value;
      });
    },
  },
  created() {
    this[ActionType.REQUEST_PROPOSER](this.getAccountName);
  },
  methods: {
    ...mapActions('userService', [
      ActionType.REQUEST_PROPOSER,
    ]),
    validateSingleField(val) {
      this.$v.proposerData[val].$touch();
    },
    validateAllProposerData() {
      this.$v.$touch();
      return !this.$v.proposerData.$anyError;
    },
    async submitProposerData(proposerData) {
      if (!this.validateAllProposerData()) return;

      try {
        await this.$_setProposer(proposerData);
        this[ActionType.REQUEST_PROPOSER](this.getAccountName);
        this.showSuccessMsg(this.$t('notifications.personalInfoSubmitted'));
      } catch {
      //  empty
      }
    },
  },
};
</script>
