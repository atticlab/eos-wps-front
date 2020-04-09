<template>
  <v-container class="pb-12 container--custom">
    <h1 class="fs-50">
      {{ $t('personalInfo.title') }}
    </h1>

    <v-divider class="v-divider--custom mt-8 mb-12" />

    <v-card
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

          <!--        :error-messages="proposerSocialMediaErrors"-->
          <v-text-field
            id="proposerSocialMedia"
            v-model="proposerData.socialMedia"
            class="mb-4"
            required
            :label="$t('personalInfo.socialMediaHint')"
            @input="validateSingleField('socialMedia')"
            @blur="validateSingleField('socialMedia')"
          />
        </div>

        <div class="d-flex justify-end">
          <v-btn
            elevation="0"
            color="primary"
            height="40"
            class="text-transform-none px-3"
          >
            {{ $t('common.submit') }}
          </v-btn>
        </div>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { maxLength, url } from 'vuelidate/lib/validators';

export default {
  name: 'PersonalInfo',
  mixins: [validationMixin],
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
      socialMedia: {},
    },
  },
  data() {
    return {
      proposerData: {
        name: '',
        description: '',
        site: '',
        socialMedia: '',
      },
    };
  },
  computed: {
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
  },
  methods: {
    validateSingleField(val) {
      console.log(val);
      this.$v.proposerData[val].$touch();
    },
    validateAllProposerData() {
      this.$v.$touch();
      return !this.$v.proposerData.$anyError;
    },
  },
};
</script>
