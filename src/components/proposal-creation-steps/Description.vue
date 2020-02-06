<template>
  <div>
    <h2 class="body-1 font-weight-bold mb-4 mt-12 ml-4">
      {{ $t('proposalCreationPage.description') }}
    </h2>

    <v-text-field
      ref="textInput"
      v-model="text"
      required
      class="d-none"
    />
    <quill-editor
      ref="editor"
      v-model="text"
      :content="content"
      :options="editorOptions"
      class="editor"
    />

    <div class="d-flex justify-center">
      <template v-if="!proposalId">
        <v-btn
          color="primary"
          large
          height="50"
          class="text-transform-none mr-2"
          :disabled="isCreateProposalDraftLoading"
          @click="propose(true)"
        >
          {{ $t('proposalCreationPage.saveDraft') }}
        </v-btn>

        <v-btn
          color="primary"
          large
          height="50"
          class="text-transform-none"
          :disabled="isCreateProposalDraftLoading"
          @click="propose(false)"
        >
          {{ $t('proposalCreationPage.continue') }}
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          color="primary"
          large
          height="50"
          class="text-transform-none mr-2"
          :disabled="isModifyProposalDraftLoading"
          @click="modify(true)"
        >
          {{ $t('proposalCreationPage.saveDraft') }}
        </v-btn>

        <v-btn
          color="primary"
          large
          height="50"
          class="text-transform-none"
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
  import Vue from 'vue';
  import { mapGetters, mapMutations } from 'vuex';
  import VueQuillEditor from 'vue-quill-editor';
  import { validationMixin } from 'vuelidate';
  import { required, maxLength } from 'vuelidate/lib/validators';
  import modifyProposalDraft from '@/mixins/modifyProposalDraft';
  import createProposalDraft from '@/mixins/createProposalDraft';
  import notification from '@/mixins/notification';
  import ActionType from '@/store/constants';

  // require styles
  // eslint-disable-next-line import/no-extraneous-dependencies
  import 'quill/dist/quill.core.css';
  // eslint-disable-next-line import/no-extraneous-dependencies
  import 'quill/dist/quill.snow.css';
  // eslint-disable-next-line import/no-extraneous-dependencies
  import 'quill/dist/quill.bubble.css';

  // mount with global
  Vue.use(VueQuillEditor);

  export default {
    name: 'Description',
    mixins: [validationMixin, createProposalDraft, modifyProposalDraft, notification],
    validations: {
      text: {
        required,
        maxLength: maxLength(12000),
      },
    },
    data() {
      return {
        content: '',
        text: '',
        editorOptions: {
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],

              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],

              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['link'],
              ['clean'],
            ],
          },
        },
      };
    },
    computed: {
      ...mapGetters('userService', {
        getProposalParsed: 'getProposalParsed',
      }),
      proposalId() {
        return this.$route.params.slug ? this.$route.params.slug : '';
      },
    },
    watch: {
      text() {
        if (!this.proposalId) {
          this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME](
            { ...this.getProposalParsed, ...this.formProposalJSON() },
            );
        }
      },
      getProposalParsed: {
        immediate: true,
        deep: true,
        handler(val) {
          if (!val || Object.keys(val).length === 0) return;
          this.content = val.proposal_json.overview;
          this.text = val.proposal_json.overview;
        },
      },
    },
    methods: {
      ...mapMutations('userService', [
        ActionType.SET_DRAFT_BY_PROPOSAL_NAME,
      ]),
      changeCurrentStep(val) {
        this.$emit('step', val);
      },
      validateAll() {
        this.$v.$touch();
        return !this.$v.text.$anyError;
      },
      formProposalJSON() {
        const proposalAdditionalInfo = this.$helpers.copyDeep(this.getProposalParsed.proposal_json);
        proposalAdditionalInfo.overview = this.text;
        if (this.getProposalParsed
          && Object.keys(this.getProposalParsed).length !== 0
          && this.getProposalParsed.proposal_json.milestones
          && JSON.parse(this.getProposalParsed.proposal_json.milestones).length !== 0) {
          proposalAdditionalInfo.milestones = this.getProposalParsed.proposal_json.milestones;
        } else {
          delete proposalAdditionalInfo.milestones;
        }

        const proposalAdditionalInfoRestructured = this.$helpers.restructureProposalAdditionalInfo(
          proposalAdditionalInfo,
        );

        return {
          proposal_json: proposalAdditionalInfoRestructured,
        };
      },
      async propose(pushTransaction = true) {
        if (!this.validateAll()) {
          this.showErrorMsg(this.$t('notifications.overviewEmpty'));
          return;
        }

        const payload = { ...this.getProposalParsed, ...this.formProposalJSON() };

        this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME](payload);

        if (!pushTransaction) {
          this.changeCurrentStep(3);
          return;
        }

        if (await this.$_createProposalDraft(payload)) {
          this.$eventBus.$emit('proposal-created', true);
          this.$router.push(`proposal-editor/${this.getProposalParsed.proposal_name}`);
          this.changeCurrentStep(3);
        }
      },
      async modify(pushTransaction = true) {
        if (!this.validateAll()) {
          this.showErrorMsg(this.$t('notifications.overviewEmpty'));
          return;
        }

        const payload = { ...this.getProposalParsed, ...this.formProposalJSON() };

        this[ActionType.SET_DRAFT_BY_PROPOSAL_NAME](payload);

        if (!pushTransaction) {
          this.changeCurrentStep(3);
          return;
        }

        if (await this.$_modifyProposalDraft(payload)) {
          this.$emit('is-draft-modified', true);
          this.changeCurrentStep(3);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .editor {
    min-height: 400px;
  }
</style>
