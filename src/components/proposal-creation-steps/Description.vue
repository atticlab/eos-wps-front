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
      class="h"
    />

    <div class="d-flex justify-center">
      <v-btn
        color="primary"
        large
        height="50"
        class="text-transform-none fs-13 font-weight-bold"
        :disabled="isModifyProposalDraftLoading"
        @click="modify"
      >
        {{ $t('proposalCreationPage.continue') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueQuillEditor from 'vue-quill-editor';
  import { validationMixin } from 'vuelidate';
  import { required, maxLength } from 'vuelidate/lib/validators';
  import modifyProposalDraft from '@/mixins/modifyProposalDraft';
  import notification from '@/mixins/notification';

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
    mixins: [validationMixin, modifyProposalDraft, notification],
    validations: {
      text: {
        required,
        maxLength: maxLength(12000),
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
        content: '',
        text: '',
        proposal: {},
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
      proposalId() {
        return this.$route.params.slug ? this.$route.params.slug : '';
      },
    },
    watch: {
      proposalInitial: {
        immediate: true,
        handler(val) {
          if (this.proposalId) {
            this.proposal = this.$helpers.copyDeep(val);
          }
        },
      },
      $route: {
        immediate: true,
        handler() {
          if (this.proposalId) {
            this.proposal = this.$helpers.copyDeep(this.proposalInitial);
          }
        },
      },
      proposal: {
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
      changeCurrentStep(val) {
        this.$emit('step', val);
      },
      validateAll() {
        this.$v.$touch();
        return !this.$v.text.$anyError;
      },
      async modify() {
        if (!this.validateAll()) {
          this.showErrorMsg(this.$t('notifications.overviewEmpty'));
          return;
        }

        const proposalAdditionalInfo = this.$helpers.copyDeep(this.proposal.proposal_json);
        proposalAdditionalInfo.overview = this.text;

        const proposalAdditionalInfoRestructured = this.$helpers.restructureProposalAdditionalInfo(
            proposalAdditionalInfo,
        );

        const payload = {
          proposalName: this.proposal.proposal_name,
          title: this.proposal.title,
          proposalJson: proposalAdditionalInfoRestructured,
        };

        if (await this.$_modifyProposalDraft(payload)) {
          this.$emit('is-draft-modified', true);
          this.changeCurrentStep(3);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .h {
    min-height: 400px;
  }
</style>
